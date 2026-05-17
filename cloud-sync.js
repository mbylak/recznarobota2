(() => {
  const CLOUD_STATE_KEY = "rr2_supabase_session_v1";
  const CMS_KV_TABLE = "cms_kv";
  const CLOUD_SYNC_KEYS = [
    "rr2_cms_content_v1",
    "rr2_cms_settings",
    "rr2_cms_menu_v2",
    "rr2_cms_blog_v1",
    "rr2_cms_gallery",
    "rr2_cms_messages",
  ];
  const MESSAGE_KEY = "rr2_cms_messages";

  const config = window.RR2_APP_CONFIG || {};
  const supabaseUrl = String(config.supabaseUrl || "").replace(/\/+$/, "");
  const supabaseAnonKey = String(config.supabaseAnonKey || "");
  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  let isHydrating = false;
  let isAutoSyncEnabled = false;
  let originalSetItem = null;

  function getStoredSession() {
    try {
      const raw = window.localStorage.getItem(CLOUD_STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function setStoredSession(session) {
    try {
      if (!session) {
        window.localStorage.removeItem(CLOUD_STATE_KEY);
        return;
      }
      window.localStorage.setItem(CLOUD_STATE_KEY, JSON.stringify(session));
    } catch (error) {
      // Ignore storage errors.
    }
  }

  function getAccessToken() {
    const session = getStoredSession();
    const token = session?.access_token;
    return typeof token === "string" && token.length > 0 ? token : null;
  }

  function buildHeaders({ useAuth = false, prefer = "" } = {}) {
    const headers = {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    };

    if (prefer) headers.Prefer = prefer;

    if (useAuth) {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("Brak aktywnej sesji administratora. Zaloguj się ponownie.");
      }
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }

  async function request(path, { method = "GET", body, useAuth = false, prefer = "" } = {}) {
    if (!isConfigured) {
      throw new Error("Supabase nie jest skonfigurowany (app-config.js).");
    }

    const response = await fetch(`${supabaseUrl}${path}`, {
      method,
      headers: buildHeaders({ useAuth, prefer }),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const errorMessage = payload?.message || payload?.error_description || payload?.error || "Nieznany błąd Supabase.";
      throw new Error(errorMessage);
    }

    return payload;
  }

  function toStorageValue(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  function fromStorageValue(rawValue) {
    if (typeof rawValue !== "string") return rawValue;
    try {
      return JSON.parse(rawValue);
    } catch (error) {
      return rawValue;
    }
  }

  async function signIn(email, password) {
    const payload = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      body: { email, password },
    });
    setStoredSession(payload);
    return payload;
  }

  async function ensureAdminSessionWithPrompt() {
    if (!isConfigured) return null;
    const existing = getStoredSession();
    if (existing?.access_token) return existing;

    const email = window.prompt("Podaj e-mail administratora Supabase:");
    if (!email) return null;
    const password = window.prompt("Podaj hasło administratora:");
    if (!password) return null;
    return signIn(email.trim(), password);
  }

  async function getKey(key, { useAuth = false } = {}) {
    const encodedKey = encodeURIComponent(key);
    const rows = await request(`/rest/v1/${CMS_KV_TABLE}?select=value&key=eq.${encodedKey}&limit=1`, {
      useAuth,
    });
    if (!Array.isArray(rows) || rows.length === 0) return null;
    return rows[0]?.value ?? null;
  }

  async function upsertKey(key, value, { useAuth = false } = {}) {
    return request(`/rest/v1/${CMS_KV_TABLE}`, {
      method: "POST",
      useAuth,
      prefer: "resolution=merge-duplicates,return=minimal",
      body: [{ key, value }],
    });
  }

  async function pullKeysToLocalStorage(keys, { useAuth = false } = {}) {
    if (!isConfigured) return;
    if (!Array.isArray(keys) || keys.length === 0) return;

    const sanitizedKeys = keys.map((key) => String(key).trim()).filter(Boolean);
    if (!sanitizedKeys.length) return;

    const keyList = sanitizedKeys.map((key) => `"${key.replace(/"/g, '\\"')}"`).join(",");
    const rows = await request(`/rest/v1/${CMS_KV_TABLE}?select=key,value&key=in.(${encodeURIComponent(keyList)})`, {
      useAuth,
    });

    if (!Array.isArray(rows)) return;
    isHydrating = true;
    try {
      rows.forEach((row) => {
        if (!row || typeof row.key !== "string") return;
        const serialized = toStorageValue(row.value);
        window.localStorage.setItem(row.key, serialized);
      });
    } finally {
      isHydrating = false;
    }
  }

  async function syncSingleKeyToCloud(key) {
    if (!isConfigured || isHydrating) return;
    if (!CLOUD_SYNC_KEYS.includes(key)) return;

    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) return;
    const parsedValue = fromStorageValue(rawValue);

    const useAuth = key !== MESSAGE_KEY;
    await upsertKey(key, parsedValue, { useAuth });
  }

  function enableLocalStorageAutoSync() {
    if (!isConfigured || isAutoSyncEnabled) return;
    originalSetItem = window.localStorage.setItem.bind(window.localStorage);

    window.localStorage.setItem = function patchedSetItem(key, value) {
      originalSetItem(key, value);
      syncSingleKeyToCloud(String(key)).catch((error) => {
        console.error("Cloud sync error:", error);
      });
    };

    isAutoSyncEnabled = true;
  }

  async function appendMessage(message) {
    if (!isConfigured) return;
    const existing = (await getKey(MESSAGE_KEY, { useAuth: false })) || [];
    const safeList = Array.isArray(existing) ? existing : [];
    safeList.unshift(message);
    await upsertKey(MESSAGE_KEY, safeList, { useAuth: false });
  }

  window.RR2Cloud = {
    isConfigured: () => isConfigured,
    ensureAdminSessionWithPrompt,
    signIn,
    getKey,
    upsertKey,
    pullKeysToLocalStorage,
    enableLocalStorageAutoSync,
    appendMessage,
    syncSingleKeyToCloud,
    keys: {
      sync: CLOUD_SYNC_KEYS,
      messages: MESSAGE_KEY,
    },
  };
})();

