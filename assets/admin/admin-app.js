(() => {
  const rootNode = document.getElementById("app");

  const showError = (error) => {
    rootNode.replaceChildren();

    const wrapper = document.createElement("main");
    wrapper.className = "admin-loading";

    const card = document.createElement("section");
    card.className = "admin-loading-card";
    card.setAttribute("role", "alert");

    const heading = document.createElement("h1");
    heading.textContent = "Nie udało się uruchomić panelu";

    const message = document.createElement("p");
    message.textContent = "Odśwież stronę. Jeśli problem się powtórzy, sprawdź połączenie lub skontaktuj się z administratorem.";

    const details = document.createElement("details");
    details.style.marginTop = "16px";
    const summary = document.createElement("summary");
    summary.textContent = "Szczegóły techniczne";
    const code = document.createElement("pre");
    code.style.whiteSpace = "pre-wrap";
    code.style.textAlign = "left";
    code.textContent = String(error);
    details.append(summary, code);

    card.append(heading, message, details);
    wrapper.append(card);
    rootNode.append(wrapper);
    console.error(error);
  };

  const setupCloudSync = async () => {
    const cloud = window.RR2Cloud;
    if (!cloud || !cloud.isConfigured()) return;

    const session = await cloud.ensureAdminSessionWithPrompt();
    if (!session) {
      throw new Error("Logowanie administratora zostało anulowane.");
    }

    await cloud.pullKeysToLocalStorage(cloud.keys.sync, { useAuth: true });
    cloud.enableLocalStorageAutoSync();
  };

  const mount = async () => {
    if (!window.React || !window.ReactDOM || !window.CMSAdminApp) {
      throw new Error("Nie załadowano lokalnych składników aplikacji.");
    }

    await setupCloudSync();
    const root = window.ReactDOM.createRoot(rootNode);
    root.render(window.React.createElement(window.CMSAdminApp));
  };

  mount().catch(showError);
})();
