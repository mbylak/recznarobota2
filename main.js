const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const hero = document.querySelector(".hero");
const heroNav = document.querySelector(".hero .nav");
const pagePreloader = document.querySelector("#page-preloader");
const CMS_MESSAGES_KEY = "rr2_cms_messages";
const CMS_MENU_KEY = "rr2_cms_menu_v2";
const CMS_GALLERY_KEY = "rr2_cms_gallery";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

  const columns = [[], [], []];
  sanitizedCategories.forEach((category, index) => {
    columns[index % columns.length].push(category);
  });

  const menuMarkup = columns
    .map((columnCategories) => `
      <div class="season-menu-column js-menu-column">
        ${columnCategories
          .map((category) => `
            <article class="menu-category js-menu-category" data-category-name="${escapeHtml(category.name)}">
              <button class="menu-category-toggle js-menu-category-toggle" type="button" aria-expanded="true">
                <span class="menu-category-heading">
                  <span class="menu-category-emoji" aria-hidden="true">${escapeHtml(category.icon)}</span>
                  ${escapeHtml(category.name)}
                </span>
                <span class="menu-category-chevron" aria-hidden="true"></span>
              </button>
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
            </article>
          `)
          .join("")}
      </div>
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

    const galleryItemsMarkup = parsed
      .filter((url) => typeof url === "string" && url.trim().length > 0)
      .map((url, index) => `
        <img
          class="gallery-item js-gallery-item"
          src="${escapeHtml(url)}"
          alt="Zdjęcie galerii ${index + 1}"
          loading="lazy"
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

if (pagePreloader) {
  const hidePreloader = () => {
    pagePreloader.classList.add("is-hidden");
    document.body.classList.remove("is-preloading");

    window.setTimeout(() => {
      pagePreloader.remove();
    }, 380);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader, { once: true });
  }
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
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
const aboutSlider = document.querySelector(".js-about-slider");
const gallery = document.querySelector(".js-gallery");
const galleryItems = Array.from(document.querySelectorAll(".js-gallery-item"));
const galleryPrevButton = document.querySelector(".js-gallery-prev");
const galleryNextButton = document.querySelector(".js-gallery-next");
const contactForm = document.querySelector(".js-contact-form");
const contactFormNote = document.querySelector(".js-contact-form-note");
let contactFormNoteTimer = null;

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
  const mobileMenuMq = window.matchMedia("(max-width: 1080px)");
  const getSeasonMenuCategories = () => Array.from(
    seasonMenuSection.querySelectorAll(".js-menu-category"),
  );
  const getSeasonMenuColumns = () => Array.from(
    seasonMenuSection.querySelectorAll(".js-menu-column"),
  );

  const setMobileMode = (isMobile) => {
    seasonMenuSection.classList.toggle("is-mobile", isMobile);
    const seasonMenuCategories = getSeasonMenuCategories();

    seasonMenuCategories.forEach((category) => {
      const toggle = category.querySelector(".js-menu-category-toggle");
      if (!toggle) return;

      if (isMobile) {
        category.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        category.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  };

  const applyMenuFilter = () => {
    const query = (seasonMenuSearch?.value ?? "").trim().toLowerCase();
    const seasonMenuCategories = getSeasonMenuCategories();
    const seasonMenuColumns = getSeasonMenuColumns();

    seasonMenuCategories.forEach((category) => {
      const toggle = category.querySelector(".js-menu-category-toggle");
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

      if (mobileMenuMq.matches && query.length > 0 && categoryVisible) {
        category.classList.add("is-open");
        toggle?.setAttribute("aria-expanded", "true");
      }
    });

    seasonMenuColumns.forEach((column) => {
      const hasVisibleCategory = Array.from(
        column.querySelectorAll(".js-menu-category"),
      ).some((category) => !category.classList.contains("is-hidden"));
      column.classList.toggle("is-hidden", !hasVisibleCategory);
    });
  };

  seasonMenuSection.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const toggle = target.closest(".js-menu-category-toggle");
    if (!toggle || !seasonMenuSection.contains(toggle)) return;
    if (!mobileMenuMq.matches) return;

    const category = toggle.closest(".js-menu-category");
    if (!category) return;

    const isOpen = category.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  const onViewportChange = (event) => {
    setMobileMode(event.matches);
    applyMenuFilter();
  };

  setMobileMode(mobileMenuMq.matches);
  applyMenuFilter();

  if (typeof mobileMenuMq.addEventListener === "function") {
    mobileMenuMq.addEventListener("change", onViewportChange);
  } else {
    mobileMenuMq.addListener(onViewportChange);
  }

  seasonMenuSearch?.addEventListener("input", applyMenuFilter);
  window.addEventListener("rr2:season-menu-updated", () => {
    setMobileMode(mobileMenuMq.matches);
    applyMenuFilter();
  });
}

if (gallery && galleryItems.length) {
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(galleryItems.length / itemsPerPage));
  let currentPage = 0;
  let touchStartX = null;
  let touchStartY = null;

  const renderGalleryPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    galleryItems.forEach((item, index) => {
      const isVisible = index >= startIndex && index < endIndex;
      item.classList.toggle("is-hidden", !isVisible);
      item.setAttribute("aria-hidden", String(!isVisible));
    });

    if (galleryPrevButton) {
      galleryPrevButton.disabled = totalPages <= 1;
    }
    if (galleryNextButton) {
      galleryNextButton.disabled = totalPages <= 1;
    }
  };

  const goToPage = (targetPage) => {
    if (totalPages <= 1) return;
    currentPage = (targetPage + totalPages) % totalPages;
    renderGalleryPage();
  };

  galleryPrevButton?.addEventListener("click", () => {
    goToPage(currentPage - 1);
  });

  galleryNextButton?.addEventListener("click", () => {
    goToPage(currentPage + 1);
  });

  gallery.addEventListener("touchstart", (event) => {
    const [touch] = event.changedTouches;
    if (!touch) return;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  gallery.addEventListener("touchend", (event) => {
    if (touchStartX === null || touchStartY === null) return;

    const [touch] = event.changedTouches;
    if (!touch) return;

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    touchStartX = null;
    touchStartY = null;

    // Ignore vertical scrolling gestures.
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (Math.abs(deltaX) < 42) return;

    if (deltaX < 0) {
      goToPage(currentPage + 1);
    } else {
      goToPage(currentPage - 1);
    }
  }, { passive: true });

  renderGalleryPage();
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
