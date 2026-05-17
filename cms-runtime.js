(() => {
  const CMS_CONTENT_KEY = "rr2_cms_content_v1";
  const CMS_BLOG_KEY = "rr2_cms_blog_v1";
  const CMS_SETTINGS_KEY = "rr2_cms_settings";

  const DEFAULT_CONTENT = {
    index: {
      hero: {
        eyebrow: "Bar nad jeziorem zegrzyńskim",
        title: "Smak lata nad Zegrzem",
        lead: "Pyszne jedzenie, orzeźwiające napoje i najlepszy widok na Zalew Zegrzyński. Witaj w Ręczna Robota 2.0 Wodnik!",
        primaryCtaLabel: "Zobacz menu",
        primaryCtaHref: "#menu",
        secondaryCtaLabel: "Zarezerwuj stolik",
        secondaryCtaHref: "#kontakt",
      },
      menu: {
        note: "Menu obowiązuje przez cały sezon letni, jesteśmy czynni od wtorku do soboty w godz. 12:00 - 21:00, a w niedzielę 12:00 - 20:00.",
        phoneLabel: "+48 123 456 789",
        phoneHref: "tel:+48123456789",
      },
      hours: {
        monday: "Zamknięte",
        tuesday: "12:00 - 21:00",
        wednesday: "12:00 - 21:00",
        thursday: "12:00 - 21:00",
        friday: "12:00 - 21:00",
        saturday: "12:00 - 21:00",
        sunday: "12:00 - 20:00",
        note: "Zapraszamy od wtorku do niedzieli!",
      },
      blog: {
        title: "Blog",
        description: "Aktualności z kuchni, wydarzeń i życia naszej restauracji nad Zegrzem.",
      },
      cta: {
        title: "Wpadnij do nas!",
        description: "Dobre jedzenie, zimne napoje i widok, który zostaje w pamięci.",
        buttonLabel: "Znajdź nas w porcie Wodnik",
        buttonHref: "https://maps.app.goo.gl/abhgKGvzsiDdfsXc9",
      },
      footer: {
        company: "Ręczna Robota 2.0 Wodnik",
        phone: "+48 123 456 789",
        phoneHref: "tel:+48123456789",
        email: "kontakt@recznarobota2.pl",
        emailHref: "mailto:kontakt@recznarobota2.pl",
      },
    },
    about: {
      intro: {
        eyebrow: "Ręczna Robota 2.0 Wodnik",
        title: "Miejsce, które smakuje latem",
        lead1:
          "Jesteśmy restauracją w porcie Wodnik, stworzoną dla tych, którzy lubią dobrą kuchnię i swobodny klimat nad wodą. Łączymy lokalne smaki, sezonowe produkty i luźną atmosferę.",
        lead2:
          "U nas możesz wpaść na szybki lunch po rejsie, rodzinny obiad albo wieczór z przyjaciółmi. Każdego dnia pracujemy nad tym, żeby było smacznie, sprawnie i po prostu przyjemnie.",
        primaryCtaLabel: "Zobacz aktualne menu",
        primaryCtaHref: "./index.html#menu",
        secondaryCtaLabel: "Otwórz dojazd w Google Maps",
        secondaryCtaHref: "https://maps.app.goo.gl/abhgKGvzsiDdfsXc9",
      },
      story: {
        title: "Jak wygląda wizyta u nas",
        card1: {
          title: "Wpadasz bez spiny",
          text: "Nie musisz planować tygodniami. Wystarczy telefon albo spontaniczna decyzja i już jesteś na miejscu.",
        },
        card2: {
          title: "Zamawiasz po swojemu",
          text: "Od klasyków po lżejsze opcje - menu jest ułożone tak, żeby każdy znalazł coś dla siebie.",
        },
        card3: {
          title: "Zostajesz dla klimatu",
          text: "Widok na wodę i spokojny rytm portu sprawiają, że często zostaje się u nas dłużej niż planowano.",
        },
      },
      facts: {
        title: "Co warto wiedzieć przed wizytą",
        item1: "Gotujemy od wtorku do soboty 12:00 - 21:00, w niedzielę do 20:00.",
        item2: "Największy ruch mamy w sobotę między 15:00 a 18:00.",
        item3: "Najlepiej rezerwować stolik na większe grupy i wieczorne spotkania.",
        item4: "W menu regularnie pojawiają się sezonowe nowości i pozycje limitowane.",
      },
      faq: {
        title: "Najczęstsze pytania",
        q1: "Czy można przyjść bez rezerwacji?",
        a1: "Tak, zapraszamy również bez rezerwacji. W godzinach szczytu warto jednak zadzwonić wcześniej.",
        q2: "Czy macie opcje dla dzieci?",
        a2: "Tak, menu zawiera pozycje chętnie wybierane przez najmłodszych. Obsługa podpowie najlepszy wybór.",
        q3: "Jak najłatwiej do Was trafić?",
        a3: "Najwygodniej skorzystać z nawigacji Google Maps - pinezka prowadzi bezpośrednio do portu Wodnik.",
      },
      cta: {
        title: "Wpadnij do nas i poczuj klimat portu",
        description: "Jeśli chcesz, podpowiemy od czego najlepiej zacząć i co dziś poleca kuchnia.",
        buttonLabel: "Nawiguj do restauracji",
        buttonHref: "https://maps.app.goo.gl/abhgKGvzsiDdfsXc9",
      },
    },
  };

  const DEFAULT_BLOG_POSTS = [
    {
      id: "blog-lemoniady",
      title: "Sezonowe lemoniady 2026 - nasze 4 smaki lata",
      summary: "Sprawdź, które lemoniady królują w tym sezonie i z czym najlepiej je łączyć z naszego menu.",
      date: "16 maja 2026",
      status: "aktualności",
      href: "./blog/sezonowe-lemoniady-2026.html",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Kolorowe lemoniady podane z lodem i miętą",
    },
    {
      id: "blog-kuchnia",
      title: "Kulisy kuchni: jak powstają nasze najpopularniejsze dania",
      summary: "Zobacz, jak planujemy świeże dostawy i dlaczego stawiamy na sezonowe składniki z lokalnego rynku.",
      date: "12 maja 2026",
      status: "kuchnia",
      href: "./blog/kulisy-kuchni-reczna-robota.html",
      image: "https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Kucharz przygotowujący danie na kuchni restauracyjnej",
    },
    {
      id: "blog-weekend",
      title: "Weekend nad Zegrzem - plan na dzień w porcie Wodnik",
      summary: "Gotowy plan na sobotę lub niedzielę: spacer, obiad i chwila relaksu z widokiem na wodę.",
      date: "8 maja 2026",
      status: "przewodnik",
      href: "./blog/weekend-nad-zegrzem-plan-dnia.html",
      image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Widok na molo nad jeziorem w słoneczny dzień",
    },
  ];

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function deepMerge(base, custom) {
    if (!isObject(base) || !isObject(custom)) return custom ?? base;
    const result = { ...base };
    Object.keys(custom).forEach((key) => {
      const baseValue = base[key];
      const customValue = custom[key];
      result[key] = isObject(baseValue) && isObject(customValue)
        ? deepMerge(baseValue, customValue)
        : customValue;
    });
    return result;
  }

  function getByPath(object, path) {
    return path.split(".").reduce((acc, segment) => (acc ? acc[segment] : undefined), object);
  }

  async function readCloudKey(key) {
    const cloud = window.RR2Cloud;
    if (!cloud || !cloud.isConfigured()) return null;
    try {
      return await cloud.getKey(key, { useAuth: false });
    } catch (error) {
      return null;
    }
  }

  async function readContent() {
    try {
      const cloudContent = await readCloudKey(CMS_CONTENT_KEY);
      const localRaw = window.localStorage.getItem(CMS_CONTENT_KEY);
      const localContent = localRaw ? JSON.parse(localRaw) : null;
      const baseSource = cloudContent || localContent;
      const baseContent = baseSource ? deepMerge(DEFAULT_CONTENT, baseSource) : DEFAULT_CONTENT;

      if (cloudContent) {
        window.localStorage.setItem(CMS_CONTENT_KEY, JSON.stringify(cloudContent));
      }

      const cloudSettings = await readCloudKey(CMS_SETTINGS_KEY);
      if (cloudSettings) {
        window.localStorage.setItem(CMS_SETTINGS_KEY, JSON.stringify(cloudSettings));
      }

      return mergeLegacySettings(baseContent, cloudSettings);
    } catch (error) {
      return DEFAULT_CONTENT;
    }
  }

  function normalizePhoneHref(phoneNumber) {
    const digits = String(phoneNumber || "").replace(/[^\d+]/g, "");
    if (!digits) return "";
    return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits}`;
  }

  function mergeLegacySettings(content, providedSettings = null) {
    try {
      const parsedSettings = providedSettings || JSON.parse(window.localStorage.getItem(CMS_SETTINGS_KEY) || "null");
      if (!isObject(parsedSettings)) return content;

      const merged = JSON.parse(JSON.stringify(content));
      const hours = isObject(parsedSettings.hours) ? parsedSettings.hours : null;
      const contact = isObject(parsedSettings.contact) ? parsedSettings.contact : null;

      if (hours) {
        const map = {
          monday: "monday",
          tuesday: "tuesday",
          wednesday: "wednesday",
          thursday: "thursday",
          friday: "friday",
          saturday: "saturday",
          sunday: "sunday",
          note: "note",
        };
        Object.entries(map).forEach(([key, target]) => {
          if (typeof hours[key] === "string" && hours[key].trim().length > 0) {
            merged.index.hours[target] = hours[key];
          }
        });
      }

      if (contact) {
        if (typeof contact.phone === "string" && contact.phone.trim().length > 0) {
          const phone = contact.phone.trim();
          merged.index.footer.phone = phone;
          merged.index.menu.phoneLabel = phone;
          merged.index.footer.phoneHref = normalizePhoneHref(phone);
          merged.index.menu.phoneHref = normalizePhoneHref(phone);
        }

        if (typeof contact.email === "string" && contact.email.trim().length > 0) {
          const email = contact.email.trim();
          merged.index.footer.email = email;
          merged.index.footer.emailHref = `mailto:${email}`;
        }
      }

      return merged;
    } catch (error) {
      return content;
    }
  }

  async function readBlogPosts() {
    try {
      const cloudPosts = await readCloudKey(CMS_BLOG_KEY);
      if (Array.isArray(cloudPosts)) {
        window.localStorage.setItem(CMS_BLOG_KEY, JSON.stringify(cloudPosts));
        return cloudPosts;
      }

      const raw = window.localStorage.getItem(CMS_BLOG_KEY);
      if (!raw) return DEFAULT_BLOG_POSTS;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_BLOG_POSTS;
      return parsed;
    } catch (error) {
      return DEFAULT_BLOG_POSTS;
    }
  }

  function applyContent(content) {
    const textNodes = document.querySelectorAll("[data-cms]");
    textNodes.forEach((node) => {
      const key = node.dataset.cms;
      const value = getByPath(content, key);
      if (typeof value !== "string") return;
      node.textContent = value;
    });

    const hrefNodes = document.querySelectorAll("[data-cms-attr-href]");
    hrefNodes.forEach((node) => {
      const hrefKey = node.dataset.cmsAttrHref;
      if (hrefKey) {
        const value = getByPath(content, hrefKey);
        if (typeof value === "string" && value.trim().length > 0) {
          node.setAttribute("href", value);
        }
      }
    });
  }

  function renderBlogPreview(posts) {
    const list = document.querySelector(".js-blog-preview");
    const emptyState = document.querySelector(".js-blog-empty");
    if (!list) return;

    const items = posts
      .filter((post) => post && post.title && post.summary)
      .slice(0, 6);

    list.innerHTML = "";
    if (!items.length) {
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    items.forEach((post) => {
      const article = document.createElement("article");
      article.className = "blog-teaser-card";
      const imageSrc = typeof post.image === "string" && post.image.trim().length > 0
        ? post.image
        : "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=80";
      const imageAlt = typeof post.imageAlt === "string" && post.imageAlt.trim().length > 0
        ? post.imageAlt
        : `Zdjęcie podglądowe artykułu: ${post.title}`;
      const href = typeof post.href === "string" && post.href.trim().length > 0
        ? post.href
        : `./blog/${post.id || "artykul"}.html`;
      article.innerHTML = `
        <a class="blog-teaser-link" href="${href}">
          <img class="blog-teaser-image" src="${imageSrc}" alt="${imageAlt}" loading="lazy">
          <p class="blog-teaser-meta">${post.status || "aktualności"}${post.date ? ` · ${post.date}` : ""}</p>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <span class="blog-teaser-readmore">Czytaj artykuł</span>
        </a>
      `;
      list.appendChild(article);
    });
  }

  async function initCmsRuntime() {
    const content = await readContent();
    const posts = await readBlogPosts();
    applyContent(content);
    renderBlogPreview(posts);
  }

  initCmsRuntime();

  window.RR2CMS = {
    CMS_CONTENT_KEY,
    CMS_BLOG_KEY,
    DEFAULT_CONTENT,
    DEFAULT_BLOG_POSTS,
    getByPath,
    deepMerge,
  };
})();
