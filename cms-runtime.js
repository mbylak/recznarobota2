(() => {
  const CMS_CONTENT_KEY = "rr2_cms_content_v1";
  const CMS_BLOG_KEY = "rr2_cms_blog_v1";
  const CMS_SETTINGS_KEY = "rr2_cms_settings";
  const CMS_GALLERY_KEY = "rr2_cms_gallery";

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
      about: {
        title: "O nas",
        lead1: "Ręczna Robota 2.0 Wodnik to nowe miejsce na kulinarnej mapie Nieporętu. Powstał z miłości do dobrego jedzenia, wspaniałej atmosfery i niezwykłych widoków.",
        lead2: "Znajdziesz nas w porcie Wodnik - tu, gdzie Jezioro Zegrzyńskie prezentuje się najpiękniej.",
        buttonLabel: "Dowiedz się więcej",
        buttonHref: "./o-nas.html",
      },
      aboutSlider: {
        slide1: {
          src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=75",
          alt: "Burger serwowany w restauracji",
        },
        slide2: {
          src: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=75",
          alt: "Kolorowa sałatka podana w misce",
        },
        slide3: {
          src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=75",
          alt: "Pizza z dodatkami podana na drewnianym blacie",
        },
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
      media: {
        heroImageSrc: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
        heroImageAlt: "Danie serwowane w Ręczna Robota 2.0 Wodnik",
      },
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
      id: "blog-wieczory-muzyczne",
      title: "Letnie wieczory z muzyką na tarasie nad Zegrzem",
      summary: "Sprawdź, kiedy zapraszamy na akustyczne brzmienia przy zachodzie słońca i jak zarezerwować stolik na taras.",
      date: "9 czerwca 2026",
      status: "wydarzenia",
      href: "./blog/wieczory-muzyczne-w-porcie-wodnik.html",
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Taras lokalu nad wodą o zmierzchu",
    },
    {
      id: "blog-grill",
      title: "Grillowane specjały nad Zegrzem - co serwujemy z rusztu",
      summary: "Karkówka, warzywa z grilla i sezonowe dodatki - zobacz, na co postawiliśmy w tegorocznym menu z rusztu.",
      date: "6 czerwca 2026",
      status: "kuchnia",
      href: "./blog/grillowane-specjaly-nad-zegrzem.html",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Apetyczne danie serwowane w restauracji",
    },
    {
      id: "blog-zachody-slonca",
      title: "Najpiękniejsze zachody słońca nad Zalewem Zegrzyńskim",
      summary: "Podpowiadamy, o której przyjść i gdzie usiąść, by złapać najlepsze światło i widok na wodę.",
      date: "30 maja 2026",
      status: "przewodnik",
      href: "./blog/zachody-slonca-nad-zalewem-zegrzynskim.html",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Złota godzina nad wodą o zachodzie słońca",
    },
    {
      id: "blog-aktywny-weekend",
      title: "Aktywny weekend w porcie Wodnik: kajaki, rower i obiad u nas",
      summary: "Gotowy pomysł na ruch nad wodą i smaczną przerwę - trasa, atrakcje i to, co zjeść po wysiłku.",
      date: "23 maja 2026",
      status: "przewodnik",
      href: "./blog/aktywny-weekend-w-porcie-wodnik.html",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Zielona ścieżka spacerowa przy jeziorze",
    },
    {
      id: "blog-lemoniady",
      title: "Sezonowe lemoniady 2026 - nasze 4 smaki lata",
      summary: "Sprawdź, które lemoniady królują w tym sezonie i z czym najlepiej je łączyć z naszego menu.",
      date: "16 maja 2026",
      status: "aktualności",
      href: "./blog/sezonowe-lemoniady-2026.html",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Kolorowe lemoniady podane z lodem i miętą",
    },
    {
      id: "blog-kuchnia",
      title: "Kulisy kuchni: jak powstają nasze najpopularniejsze dania",
      summary: "Zobacz, jak planujemy świeże dostawy i dlaczego stawiamy na sezonowe składniki z lokalnego rynku.",
      date: "12 maja 2026",
      status: "kuchnia",
      href: "./blog/kulisy-kuchni-reczna-robota.html",
      image: "https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=800&q=75",
      imageAlt: "Kucharz przygotowujący danie na kuchni restauracyjnej",
    },
    {
      id: "blog-weekend",
      title: "Weekend nad Zegrzem - plan na dzień w porcie Wodnik",
      summary: "Gotowy plan na sobotę lub niedzielę: spacer, obiad i chwila relaksu z widokiem na wodę.",
      date: "8 maja 2026",
      status: "przewodnik",
      href: "./blog/weekend-nad-zegrzem-plan-dnia.html",
      image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=75",
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

  function readLocalContent() {
    try {
      const localRaw = window.localStorage.getItem(CMS_CONTENT_KEY);
      const localContent = localRaw ? JSON.parse(localRaw) : null;
      const baseContent = localContent ? deepMerge(DEFAULT_CONTENT, localContent) : DEFAULT_CONTENT;
      const settingsRaw = window.localStorage.getItem(CMS_SETTINGS_KEY);
      const settings = settingsRaw ? JSON.parse(settingsRaw) : null;
      return mergeLegacySettings(baseContent, settings);
    } catch (error) {
      return DEFAULT_CONTENT;
    }
  }

  function mergeBlogPosts(storedPosts) {
    const stored = Array.isArray(storedPosts) ? storedPosts : [];
    const storedById = new Map();
    stored.forEach((post) => {
      if (post && typeof post === "object" && post.id) {
        storedById.set(post.id, post);
      }
    });

    // Domyślne wpisy z kodu są zawsze widoczne; zapisana wersja (jeśli istnieje)
    // może je nadpisać, a dodatkowe niestandardowe wpisy dokładamy na końcu.
    const merged = DEFAULT_BLOG_POSTS.map((defaultPost) => {
      const override = storedById.get(defaultPost.id);
      return override ? { ...defaultPost, ...override } : defaultPost;
    });

    const extras = stored.filter(
      (post) =>
        post &&
        typeof post === "object" &&
        (!post.id || !DEFAULT_BLOG_POSTS.some((defaultPost) => defaultPost.id === post.id)),
    );

    return [...merged, ...extras];
  }

  function readLocalBlogPosts() {
    try {
      const raw = window.localStorage.getItem(CMS_BLOG_KEY);
      if (!raw) return DEFAULT_BLOG_POSTS;
      const parsed = JSON.parse(raw);
      return mergeBlogPosts(parsed);
    } catch (error) {
      return DEFAULT_BLOG_POSTS;
    }
  }

  async function readContent() {
    try {
      const [cloudContent, cloudSettings] = await Promise.all([
        readCloudKey(CMS_CONTENT_KEY),
        readCloudKey(CMS_SETTINGS_KEY),
      ]);
      const localRaw = window.localStorage.getItem(CMS_CONTENT_KEY);
      const localContent = localRaw ? JSON.parse(localRaw) : null;
      const baseSource = cloudContent || localContent;
      const baseContent = baseSource ? deepMerge(DEFAULT_CONTENT, baseSource) : DEFAULT_CONTENT;

      if (cloudContent) {
        window.localStorage.setItem(CMS_CONTENT_KEY, JSON.stringify(cloudContent));
      }

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
        return mergeBlogPosts(cloudPosts);
      }

      const raw = window.localStorage.getItem(CMS_BLOG_KEY);
      if (!raw) return DEFAULT_BLOG_POSTS;
      const parsed = JSON.parse(raw);
      return mergeBlogPosts(parsed);
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

    const attributeMappings = [
      { datasetKey: "cmsAttrHref", attribute: "href" },
      { datasetKey: "cmsAttrSrc", attribute: "src" },
      { datasetKey: "cmsAttrAlt", attribute: "alt" },
    ];

    attributeMappings.forEach(({ datasetKey, attribute }) => {
      const selector = `[data-${datasetKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}]`;
      document.querySelectorAll(selector).forEach((node) => {
        const contentKey = node.dataset[datasetKey];
        if (!contentKey) return;
        const value = getByPath(content, contentKey);
        if (typeof value !== "string" || value.trim().length === 0) return;
        node.setAttribute(attribute, value);
      });
    });
  }

  function renderBlogPreview(posts) {
    const list = document.querySelector(".js-blog-preview");
    const emptyState = document.querySelector(".js-blog-empty");
    if (!list) return;

    const items = posts.filter((post) => post && post.title && post.summary);

    list.innerHTML = "";
    if (!items.length) {
      if (emptyState) emptyState.style.display = "block";
      window.dispatchEvent(new CustomEvent("rr2:blog-updated"));
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    items.forEach((post) => {
      const article = document.createElement("article");
      article.className = "blog-teaser-card";
      const imageSrc = typeof post.image === "string" && post.image.trim().length > 0
        ? post.image
        : "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=75";
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

    window.dispatchEvent(new CustomEvent("rr2:blog-updated"));
  }

  async function initCmsRuntime() {
    applyContent(readLocalContent());
    renderBlogPreview(readLocalBlogPosts());

    try {
      const [content, posts, cloudGallery] = await Promise.all([
        readContent(),
        readBlogPosts(),
        readCloudKey(CMS_GALLERY_KEY),
      ]);

      applyContent(content);
      renderBlogPreview(posts);

      if (Array.isArray(cloudGallery)) {
        window.localStorage.setItem(CMS_GALLERY_KEY, JSON.stringify(cloudGallery));
        window.dispatchEvent(new CustomEvent("rr2:gallery-updated"));
      }
    } catch (error) {
      // Cached content remains visible when cloud sync fails.
    }
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
