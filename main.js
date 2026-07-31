const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const hero = document.querySelector(".hero");
const heroNav = document.querySelector(".hero .nav");
const pagePreloader = document.querySelector("#page-preloader");
const CMS_MESSAGES_KEY = "rr2_cms_messages";
const CMS_MENU_KEY = "rr2_cms_menu_v2";
const CMS_GALLERY_KEY = "rr2_cms_gallery";
const GALLERY_FALLBACK_IMAGES = [
  "./assets/gallery/krajobraz.webp",
  "./assets/gallery/kotlety.webp",
  "./assets/gallery/pizza1.webp",
  "./assets/gallery/mniam.webp",
  "./assets/gallery/pizza2.webp",
  "./assets/gallery/jaja.webp",
];
// Stare pliki galerii (photo-01..15.webp) zostały usunięte z repo; wpisy CMS,
// które nadal na nie wskazują, trzeba odfiltrować, inaczej galeria będzie pusta.
const LEGACY_GALLERY_URL_PATTERN = /assets\/gallery\/photo-\d{2}\.webp/i;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const MENU_CATEGORY_PHOTOS = [
  { keywords: ["zup"], src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["dania", "główne", "glowne", "obiad"], src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["pizza"], src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["ciep", "kawa", "herbat"], src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["nalewak"], src: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["bezalkohol"], src: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["piwo"], src: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["wino", "wina"], src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=70" },
  { keywords: ["napoje", "napój", "napoj", "lemoniad"], src: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=70" },
];

function findMenuCategoryPhoto(categoryName) {
  const normalizedName = String(categoryName || "").toLowerCase();
  const match = MENU_CATEGORY_PHOTOS.find((entry) =>
    entry.keywords.some((keyword) => normalizedName.includes(keyword)),
  );
  return match ? match.src : "";
}

function buildMenuCategoryMediaMarkup(categoryName, icon) {
  const photoSrc = findMenuCategoryPhoto(categoryName);
  if (photoSrc) {
    return `
      <span class="menu-category-media">
        <img class="menu-category-photo" src="${escapeHtml(photoSrc)}" alt="" aria-hidden="true" loading="lazy" decoding="async">
      </span>
    `;
  }
  return `
    <span class="menu-category-media is-fallback">
      <span class="menu-category-emoji" aria-hidden="true">${escapeHtml(icon)}</span>
    </span>
  `;
}

function setMenuCategoryExpanded(category, isExpanded) {
  const toggle = category.querySelector(".js-menu-category-toggle");
  const list = category.querySelector(".season-menu-list");

  category.classList.toggle("is-open", isExpanded);
  toggle?.setAttribute("aria-expanded", String(isExpanded));
  list?.setAttribute("aria-hidden", String(!isExpanded));
}

function attachGalleryImageFallbacks() {
  const galleryImages = document.querySelectorAll(".js-gallery-item");

  galleryImages.forEach((image, index) => {
    if (image.dataset.fallbackBound === "1") return;
    image.dataset.fallbackBound = "1";

    image.addEventListener("error", () => {
      const fallbackSrc = GALLERY_FALLBACK_IMAGES[index % GALLERY_FALLBACK_IMAGES.length];
      const fallbackUrl = new URL(fallbackSrc, document.baseURI).href;

      if (image.src === fallbackUrl) {
        image.hidden = true;
        return;
      }

      image.src = fallbackSrc;
      image.removeAttribute("srcset");
    });
  });
}

function hydrateSeasonMenuFromStorage() {
  const menuGrid = document.querySelector(".season-menu-grid");
  if (!menuGrid) return;

  let parsedMenu = null;
  try {
    const raw = window.localStorage.getItem(CMS_MENU_KEY);
    if (!raw) return;
    const candidate = JSON.parse(raw);
    if (!Array.isArray(candidate) || candidate.length === 0) return;
    parsedMenu = candidate;
  } catch (error) {
    return;
  }

  const sanitizedCategories = parsedMenu
    .filter((category) => category && typeof category === "object")
    .map((category) => {
      const name = String(category.name || "").trim();
      const icon = String(category.icon || "🍽️").trim() || "🍽️";
      const items = Array.isArray(category.items) ? category.items : [];
      const normalizedItems = items
        .filter((item) => item && typeof item === "object")
        .map((item) => {
          const itemName = String(item.name || "").trim();
          const itemPrice = String(item.price || "").trim();
          const itemSubtitle = String(item.subtitle || "").trim();
          if (!itemName || !itemPrice) return null;
          return {
            name: itemName,
            price: itemPrice,
            subtitle: itemSubtitle,
          };
        })
        .filter(Boolean);

      if (!name || normalizedItems.length === 0) return null;
      return { name, icon, items: normalizedItems };
    })
    .filter(Boolean);

  if (!sanitizedCategories.length) return;

  const menuMarkup = sanitizedCategories
    .map((category) => `
      <article class="menu-category js-menu-category" data-category-name="${escapeHtml(category.name)}">
        <button class="menu-category-toggle js-menu-category-toggle" type="button" aria-expanded="true">
          ${buildMenuCategoryMediaMarkup(category.name, category.icon)}
          <span class="menu-category-bar">
            <span class="menu-category-heading">${escapeHtml(category.name)}</span>
            <span class="menu-category-chevron" aria-hidden="true"></span>
          </span>
        </button>
        <div class="menu-category-body">
          <ul class="season-menu-list">
            ${category.items
              .map((item) => `
                <li data-menu-item>
                  <span>
                    ${escapeHtml(item.name)}
                    ${item.subtitle ? `<small class="menu-item-subtitle">${escapeHtml(item.subtitle)}</small>` : ""}
                  </span>
                  <strong>${escapeHtml(item.price)}</strong>
                </li>
              `)
              .join("")}
          </ul>
        </div>
      </article>
    `)
    .join("");

  menuGrid.innerHTML = menuMarkup;
  window.dispatchEvent(new CustomEvent("rr2:season-menu-updated"));
}

async function hydrateSeasonMenuFromCloud() {
  const cloud = window.RR2Cloud;
  if (!cloud || !cloud.isConfigured()) return;

  try {
    const menuState = await cloud.getKey(CMS_MENU_KEY, { useAuth: false });
    if (!Array.isArray(menuState) || menuState.length === 0) return;
    window.localStorage.setItem(CMS_MENU_KEY, JSON.stringify(menuState));
    hydrateSeasonMenuFromStorage();
  } catch (error) {
    // Keep local/offline fallback if cloud is unavailable.
  }
}

function hydrateGalleryFromStorage() {
  const galleryRoot = document.querySelector(".js-gallery");
  if (!galleryRoot) return;

  try {
    const raw = window.localStorage.getItem(CMS_GALLERY_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return;

    const validUrls = parsed.filter(
      (url) => typeof url === "string" && url.trim().length > 0 && !LEGACY_GALLERY_URL_PATTERN.test(url),
    );
    if (validUrls.length === 0) return;

    const galleryItemsMarkup = validUrls
      .map((url, index) => `
        <img
          class="gallery-item js-gallery-item"
          src="${escapeHtml(url)}"
          alt="Zdjęcie galerii ${index + 1}"
          ${index === 0 ? "" : 'loading="lazy"'}
        >
      `)
      .join("");

    if (galleryItemsMarkup.trim().length === 0) return;
    galleryRoot.innerHTML = galleryItemsMarkup;
  } catch (error) {
    // Keep original gallery if local data is invalid.
  }
}

function formatMessageDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function persistContactMessage(formData) {
  const message = {
    id: Date.now(),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    date: formatMessageDate(new Date()),
    isRead: false,
  };

  if (!message.name || !message.email || !message.message) return false;

  try {
    const raw = window.localStorage.getItem(CMS_MESSAGES_KEY);
    const parsed = JSON.parse(raw || "[]");
    const existingMessages = Array.isArray(parsed) ? parsed : [];
    existingMessages.unshift(message);
    window.localStorage.setItem(CMS_MESSAGES_KEY, JSON.stringify(existingMessages));
    const cloud = window.RR2Cloud;
    if (cloud && cloud.isConfigured()) {
      cloud.appendMessage(message).catch(() => {
        // Keep local success even if network sync fails.
      });
    }
    return true;
  } catch (error) {
    return false;
  }
}

function initHeroVideo() {
  const heroVideo = document.querySelector(".hero-video");
  if (!heroVideo) return Promise.resolve();

  heroVideo.dataset.loaded = "1";

  return new Promise((resolve) => {
    let isSettled = false;

    const finish = (isReady) => {
      if (isSettled) return;
      isSettled = true;

      if (isReady) {
        heroVideo.classList.add("is-ready");
        heroVideo.play().catch(() => {
          // If autoplay is blocked, the prepared first frame remains visible.
        });
      }

      resolve();
    };

    heroVideo.addEventListener("canplay", () => finish(true), { once: true });
    heroVideo.addEventListener("error", () => finish(false), { once: true });

    const videoSrc = heroVideo.dataset.src;
    let sourceWasAdded = false;
    if (videoSrc && !heroVideo.currentSrc) {
      // Backward compatibility for pages still using data-src.
      heroVideo.removeAttribute("data-src");
      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";
      heroVideo.appendChild(source);
      sourceWasAdded = true;
    }

    if (heroVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      finish(true);
      return;
    }

    if (sourceWasAdded) {
      heroVideo.load();
    }
    heroVideo.play().catch(() => {
      // The next attempt is made as soon as the video can play.
    });
  });
}

const heroVideoReady = initHeroVideo();

if (pagePreloader) {
  const PRELOADER_MIN_VISIBLE_MS = 650;
  const PRELOADER_MAX_WAIT_MS = 6500;
  const CRITICAL_IMAGES = [
    "./assets/optimized/logo-preloader.webp",
    "./hero.webp",
  ];

  let preloaderHidden = false;

  const hidePreloader = () => {
    if (preloaderHidden) return;
    preloaderHidden = true;

    const preparedHeroVideo = document.querySelector(".hero-video.is-ready");
    if (preparedHeroVideo) {
      preparedHeroVideo.currentTime = 0;
      preparedHeroVideo.play().catch(() => {
        // The poster remains a seamless fallback when autoplay is unavailable.
      });
    }

    pagePreloader.classList.add("is-hidden");
    document.body.classList.remove("is-preloading");

    window.setTimeout(() => {
      pagePreloader.remove();
    }, 380);
  };

  const waitForImage = (url) => new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    const finish = () => resolve();
    image.onload = finish;
    image.onerror = finish;
    image.src = url;
  });

  const waitForCriticalFonts = () => {
    if (!document.fonts?.load) return Promise.resolve();

    const fontLoads = [
      document.fonts.load('400 16px "Lato"', "Zażółć gęślą jaźń"),
      document.fonts.load('700 16px "Lato"', "Zażółć gęślą jaźń"),
      document.fonts.load('700 48px "Caveat"', "Smak lata nad Zegrzem"),
      document.fonts.load('700 24px "Playfair Display"', "Pyszne jedzenie"),
    ];

    return Promise.allSettled(fontLoads);
  };

  const minimumDisplayTime = new Promise((resolve) => {
    window.setTimeout(resolve, PRELOADER_MIN_VISIBLE_MS);
  });
  const maximumWait = new Promise((resolve) => {
    window.setTimeout(resolve, PRELOADER_MAX_WAIT_MS);
  });
  const criticalContentReady = Promise.all([
    minimumDisplayTime,
    Promise.all(CRITICAL_IMAGES.map(waitForImage)),
    waitForCriticalFonts(),
    heroVideoReady,
  ]);

  Promise.race([criticalContentReady, maximumWait]).then(hidePreloader);
}

if (menuToggle && menu) {
  const closeNavigationMenu = () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigationMenu);
  });

  document.addEventListener("pointerdown", (event) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(event.target) || menuToggle.contains(event.target)) return;
    closeNavigationMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("open")) return;
    closeNavigationMenu();
    menuToggle.focus();
  });
}

const navigationSectionLinks = Array.from(
  document.querySelectorAll('.menu a[href^="#"]'),
).map((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  return section ? { link, section } : null;
}).filter(Boolean);

if (navigationSectionLinks.length > 0) {
  let navigationUpdateFrame = null;

  const updateActiveNavigationLink = () => {
    navigationUpdateFrame = null;
    const navigationHeight = heroNav?.offsetHeight ?? 0;
    const activationLine = Math.max(
      navigationHeight + 24,
      window.innerHeight * 0.3,
    );
    let activeEntry = navigationSectionLinks[0];

    navigationSectionLinks.forEach((entry) => {
      const sectionTop = entry.section.getBoundingClientRect().top;
      if (sectionTop <= activationLine) {
        activeEntry = entry;
      }
    });

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      activeEntry = navigationSectionLinks[navigationSectionLinks.length - 1];
    }

    navigationSectionLinks.forEach(({ link }) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    activeEntry.link.classList.add("active");
    activeEntry.link.setAttribute("aria-current", "location");
  };

  const requestNavigationUpdate = () => {
    if (navigationUpdateFrame !== null) return;
    navigationUpdateFrame = window.requestAnimationFrame(updateActiveNavigationLink);
  };

  updateActiveNavigationLink();
  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  window.addEventListener("resize", requestNavigationUpdate);
  window.addEventListener("hashchange", requestNavigationUpdate);
}

if (hero) {
  const stickyTriggerPx = 24;

  const setStickyHeroNav = (isSticky) => {
    heroNav?.classList.toggle("is-fixed", isSticky);
  };

  const updateOnScroll = () => {
    const shouldStickNav = window.scrollY > stickyTriggerPx;
    setStickyHeroNav(shouldStickNav);
  };

  updateOnScroll();
  window.addEventListener("scroll", updateOnScroll, { passive: true });
  window.addEventListener("resize", updateOnScroll);
}

const seasonMenuSection = document.querySelector(".season-menu");
const seasonMenuSearch = document.querySelector(".js-menu-search");
hydrateSeasonMenuFromStorage();
hydrateSeasonMenuFromCloud();
hydrateGalleryFromStorage();
attachGalleryImageFallbacks();
const aboutSlider = document.querySelector(".js-about-slider");
const galleryPrevButton = document.querySelector(".js-gallery-prev");
const galleryNextButton = document.querySelector(".js-gallery-next");
const contactForm = document.querySelector(".js-contact-form");
const contactFormNote = document.querySelector(".js-contact-form-note");
let contactFormNoteTimer = null;
let galleryController = null;

function initGalleryCarousel() {
  const galleryRoot = document.querySelector(".js-gallery");
  if (!galleryRoot) return;

  const galleryItems = Array.from(galleryRoot.querySelectorAll(".js-gallery-item"));
  if (!galleryItems.length) return;

  galleryController?.destroy?.();

  const AUTOPLAY_MS = 5000;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const totalSlides = galleryItems.length;
  let activeIndex = 0;
  let autoplayTimer = null;
  let touchStartX = null;
  let touchStartY = null;

  let counter = galleryRoot.querySelector(".js-gallery-counter");
  if (!counter) {
    counter = document.createElement("p");
    counter.className = "gallery-counter js-gallery-counter";
    counter.setAttribute("aria-hidden", "true");
    galleryRoot.appendChild(counter);
  }

  const renderSlide = () => {
    galleryItems.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
      item.setAttribute("aria-hidden", String(index !== activeIndex));
    });
    counter.textContent = `${activeIndex + 1} / ${totalSlides}`;

    if (galleryPrevButton) galleryPrevButton.disabled = totalSlides <= 1;
    if (galleryNextButton) galleryNextButton.disabled = totalSlides <= 1;
  };

  const goToSlide = (targetIndex) => {
    if (totalSlides <= 1) return;
    activeIndex = (targetIndex + totalSlides) % totalSlides;
    renderSlide();
  };

  const stopAutoplay = () => {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion || totalSlides <= 1 || document.hidden) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(() => {
      goToSlide(activeIndex + 1);
    }, AUTOPLAY_MS);
  };

  const onPrevClick = () => {
    goToSlide(activeIndex - 1);
    startAutoplay();
  };

  const onNextClick = () => {
    goToSlide(activeIndex + 1);
    startAutoplay();
  };

  const onTouchStart = (event) => {
    const [touch] = event.changedTouches;
    if (!touch) return;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    stopAutoplay();
  };

  const onTouchEnd = (event) => {
    startAutoplay();
    if (touchStartX === null || touchStartY === null) return;

    const [touch] = event.changedTouches;
    if (!touch) return;

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    touchStartX = null;
    touchStartY = null;

    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (Math.abs(deltaX) < 42) return;

    if (deltaX < 0) {
      goToSlide(activeIndex + 1);
    } else {
      goToSlide(activeIndex - 1);
    }
  };

  const onMouseEnter = () => stopAutoplay();
  const onMouseLeave = () => startAutoplay();
  const onVisibilityChange = () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  galleryPrevButton?.addEventListener("click", onPrevClick);
  galleryNextButton?.addEventListener("click", onNextClick);
  galleryRoot.addEventListener("touchstart", onTouchStart, { passive: true });
  galleryRoot.addEventListener("touchend", onTouchEnd, { passive: true });
  galleryRoot.addEventListener("mouseenter", onMouseEnter);
  galleryRoot.addEventListener("mouseleave", onMouseLeave);
  document.addEventListener("visibilitychange", onVisibilityChange);

  renderSlide();
  startAutoplay();

  galleryController = {
    destroy() {
      stopAutoplay();
      galleryPrevButton?.removeEventListener("click", onPrevClick);
      galleryNextButton?.removeEventListener("click", onNextClick);
      galleryRoot.removeEventListener("touchstart", onTouchStart);
      galleryRoot.removeEventListener("touchend", onTouchEnd);
      galleryRoot.removeEventListener("mouseenter", onMouseEnter);
      galleryRoot.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    },
  };
}

initGalleryCarousel();
window.addEventListener("rr2:gallery-updated", () => {
  hydrateGalleryFromStorage();
  attachGalleryImageFallbacks();
  initGalleryCarousel();
});

const blogPrevButton = document.querySelector(".js-blog-prev");
const blogNextButton = document.querySelector(".js-blog-next");
const blogToggleAllButton = document.querySelector(".js-blog-toggle-all");
const blogControls = document.querySelector(".js-blog-controls");
let blogController = null;

function initBlogTeaser() {
  const list = document.querySelector(".js-blog-preview");
  if (!list) return;

  const cards = Array.from(list.querySelectorAll(".blog-teaser-card"));

  blogController?.destroy?.();

  const perPage = window.innerWidth <= 760
    ? 1
    : window.innerWidth <= 1080
      ? 2
      : 3;
  const totalPages = Math.max(1, Math.ceil(cards.length / perPage));
  const hasPaging = cards.length > perPage;
  let currentPage = 0;
  let showAll = false;

  if (blogControls) {
    blogControls.classList.toggle("is-hidden", !hasPaging);
  }

  const render = () => {
    cards.forEach((card, index) => {
      const startIndex = currentPage * perPage;
      const endIndex = startIndex + perPage;
      const isVisible = showAll || (index >= startIndex && index < endIndex);
      card.classList.toggle("is-hidden", !isVisible);
    });

    if (blogPrevButton) {
      blogPrevButton.disabled = showAll || currentPage === 0;
    }
    if (blogNextButton) {
      blogNextButton.disabled = showAll || currentPage >= totalPages - 1;
    }
  };

  const goToPage = (targetPage) => {
    if (showAll) return;
    currentPage = Math.min(Math.max(targetPage, 0), totalPages - 1);
    render();
  };

  const onPrev = () => goToPage(currentPage - 1);
  const onNext = () => goToPage(currentPage + 1);
  const onToggleAll = () => {
    showAll = !showAll;
    if (!showAll) currentPage = 0;
    if (blogToggleAllButton) {
      blogToggleAllButton.textContent = showAll ? "Zwiń wpisy" : "Zobacz wszystkie";
      blogToggleAllButton.setAttribute("aria-expanded", String(showAll));
    }
    render();
  };

  blogPrevButton?.addEventListener("click", onPrev);
  blogNextButton?.addEventListener("click", onNext);
  blogToggleAllButton?.addEventListener("click", onToggleAll);

  render();

  blogController = {
    destroy() {
      blogPrevButton?.removeEventListener("click", onPrev);
      blogNextButton?.removeEventListener("click", onNext);
      blogToggleAllButton?.removeEventListener("click", onToggleAll);
    },
  };
}

initBlogTeaser();
window.addEventListener("rr2:blog-updated", initBlogTeaser);

let responsiveContentMode = window.innerWidth <= 760
  ? "phone"
  : window.innerWidth <= 1080
    ? "tablet"
    : "desktop";
let responsiveResizeTimer = null;

window.addEventListener("resize", () => {
  if (responsiveResizeTimer !== null) {
    window.clearTimeout(responsiveResizeTimer);
  }

  responsiveResizeTimer = window.setTimeout(() => {
    const nextMode = window.innerWidth <= 760
      ? "phone"
      : window.innerWidth <= 1080
        ? "tablet"
        : "desktop";

    if (nextMode === responsiveContentMode) return;
    responsiveContentMode = nextMode;
    initGalleryCarousel();
    initBlogTeaser();
  }, 160);
});

if (aboutSlider) {
  const slides = Array.from(aboutSlider.querySelectorAll(".about-slide"));
  const dots = Array.from(aboutSlider.querySelectorAll(".js-about-dot"));
  const prevButton = aboutSlider.querySelector(".js-about-prev");
  const nextButton = aboutSlider.querySelector(".js-about-next");
  const autoplayMs = Number(aboutSlider.dataset.autoplayMs) || 4500;
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoplayTimer = null;

  if (activeIndex < 0) activeIndex = 0;

  const setActiveSlide = (targetIndex) => {
    if (!slides.length) return;
    const normalizedIndex = (targetIndex + slides.length) % slides.length;
    activeIndex = normalizedIndex;

    slides.forEach((slide, index) => {
      const isActive = index === normalizedIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === normalizedIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  };

  const goToNextSlide = () => {
    setActiveSlide(activeIndex + 1);
  };

  const startAutoplay = () => {
    if (slides.length < 2 || autoplayTimer !== null) return;
    autoplayTimer = window.setInterval(goToNextSlide, autoplayMs);
  };

  const stopAutoplay = () => {
    if (autoplayTimer === null) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  };

  prevButton?.addEventListener("click", () => {
    setActiveSlide(activeIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    setActiveSlide(activeIndex + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = Number(dot.dataset.slideIndex);
      if (Number.isNaN(targetIndex)) return;
      setActiveSlide(targetIndex);
    });
  });

  aboutSlider.addEventListener("mouseenter", stopAutoplay);
  aboutSlider.addEventListener("mouseleave", startAutoplay);
  aboutSlider.addEventListener("focusin", stopAutoplay);
  aboutSlider.addEventListener("focusout", (event) => {
    if (aboutSlider.contains(event.relatedTarget)) return;
    startAutoplay();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  setActiveSlide(activeIndex);
  startAutoplay();
}

if (seasonMenuSection) {
  const getSeasonMenuCategories = () => Array.from(
    seasonMenuSection.querySelectorAll(".js-menu-category"),
  );

  const applyMenuFilter = () => {
    const query = (seasonMenuSearch?.value ?? "").trim().toLowerCase();
    const seasonMenuCategories = getSeasonMenuCategories();

    seasonMenuCategories.forEach((category) => {
      const categoryName = (category.dataset.categoryName ?? "").toLowerCase();
      const headingMatches = query.length > 0 && categoryName.includes(query);
      const items = Array.from(category.querySelectorAll("[data-menu-item]"));

      let visibleItems = 0;
      items.forEach((item) => {
        const itemText = item.textContent?.toLowerCase() ?? "";
        const itemMatches = headingMatches || query.length === 0 || itemText.includes(query);
        item.classList.toggle("is-hidden", !itemMatches);
        if (itemMatches) visibleItems += 1;
      });

      const categoryVisible = headingMatches || visibleItems > 0;
      category.classList.toggle("is-hidden", !categoryVisible);

      if (query.length > 0) {
        category.dataset.expandedBySearch = "true";
        setMenuCategoryExpanded(category, categoryVisible);
      } else if (category.dataset.expandedBySearch === "true") {
        delete category.dataset.expandedBySearch;
        setMenuCategoryExpanded(category, false);
      }
    });
  };

  seasonMenuSection.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const toggle = target.closest(".js-menu-category-toggle");
    if (!toggle || !seasonMenuSection.contains(toggle)) return;

    const category = toggle.closest(".js-menu-category");
    if (!category) return;

    setMenuCategoryExpanded(category, !category.classList.contains("is-open"));
  });

  const initializeSeasonMenu = () => {
    seasonMenuSection.classList.add("is-interactive");
    getSeasonMenuCategories().forEach((category) => {
      setMenuCategoryExpanded(category, false);
    });
    applyMenuFilter();
  };

  initializeSeasonMenu();
  seasonMenuSearch?.addEventListener("input", applyMenuFilter);
  window.addEventListener("rr2:season-menu-updated", initializeSeasonMenu);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const isSaved = persistContactMessage(formData);
    contactForm.reset();

    if (contactFormNote) {
      contactFormNote.textContent = isSaved
        ? "Dziękujemy! Wiadomość została zapisana i trafiła do panelu administratora."
        : "Nie udało się zapisać wiadomości. Zadzwoń proszę pod numer z sekcji kontakt.";
      contactFormNote.classList.toggle("is-success", isSaved);

      if (contactFormNoteTimer !== null) {
        window.clearTimeout(contactFormNoteTimer);
      }

      contactFormNoteTimer = window.setTimeout(() => {
        contactFormNote.textContent = "";
        contactFormNote.classList.remove("is-success");
      }, 6500);
    }
  });
}
