/**
 * Interacciones de la landing page oficial de
 * Escuela de Párvulos Municipal Campanita — Temuco, Chile
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFilterGroup({
    buttonSelector: '[data-team-filter]',
    cardSelector: '.team-card',
    attrName: 'data-team-filter',
    cardAttrName: 'data-team-group'
  });
  initFilterGroup({
    buttonSelector: '[data-filter]',
    cardSelector: '.gallery-card',
    attrName: 'data-filter',
    cardAttrName: 'data-category'
  });
  initFilterGroup({
    buttonSelector: '[data-doc-filter]',
    cardSelector: '.doc-card',
    attrName: 'data-doc-filter',
    cardAttrName: 'data-doc-category',
    countTargetId: 'docs-count-label',
    itemLabel: 'documentos oficiales'
  });
  initLightbox();
  initContactForm();
});

/** Cambia el estilo del encabezado al desplazarse verticalmente. */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

/** Controla el menú hamburguesa móvil con cierre por enlace, Escape o clic externo. */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  const setMenuOpen = (isOpen) => {
    navMenu.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
  };

  toggleBtn.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('is-open'));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      setMenuOpen(false);
      toggleBtn.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });
}

/**
 * Inicializa un grupo de botones de filtro reutilizable para tarjetas de equipo, galería o documentos.
 */
function initFilterGroup({
  buttonSelector,
  cardSelector,
  attrName,
  cardAttrName,
  countTargetId = null,
  itemLabel = ''
}) {
  const buttons = Array.from(document.querySelectorAll(buttonSelector));
  const cards = Array.from(document.querySelectorAll(cardSelector));
  if (!buttons.length || !cards.length) return;

  const countTarget = countTargetId ? document.getElementById(countTargetId) : null;

  const applyFilter = (selectedFilter) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategory = card.getAttribute(cardAttrName) || '';
      const matches = selectedFilter === 'all' || cardCategory === selectedFilter;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount += 1;
    });

    if (countTarget) {
      countTarget.textContent = `Mostrando ${visibleCount} de ${cards.length} ${itemLabel}`;
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute(attrName) || 'all';
      buttons.forEach((item) => {
        const isActive = item === btn;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      applyFilter(selectedFilter);
    });
  });

  applyFilter('all');
}

/** Modal lightbox accesible para ampliar fotografías de entornos y experiencias. */
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const triggers = document.querySelectorAll('.gallery-zoom-btn');

  if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxDesc || !closeBtn) return;

  let lastTrigger = null;

  const openLightbox = (trigger) => {
    lastTrigger = trigger;
    lightboxImg.src = trigger.getAttribute('data-image') || '';
    lightboxImg.alt = trigger.getAttribute('data-alt') || '';
    lightboxTitle.textContent = trigger.getAttribute('data-title') || '';
    lightboxDesc.textContent = trigger.getAttribute('data-desc') || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(btn));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

/** Validación accesible del formulario de contacto y preselección de nivel. */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const levelSelect = document.getElementById('contact-level');
  const levelTriggers = document.querySelectorAll('[data-select-level]');

  levelTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!levelSelect) return;
      const chosen = trigger.getAttribute('data-select-level');
      if (chosen) {
        levelSelect.value = chosen;
      }
    });
  });

  if (!form || !feedback) return;

  const showFeedback = (isSuccess, htmlContent) => {
    feedback.classList.remove('is-success', 'is-error');
    feedback.classList.add(isSuccess ? 'is-success' : 'is-error');
    feedback.innerHTML = htmlContent;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim() || '';
    const emailOrPhone = document.getElementById('contact-email')?.value.trim() || '';
    const level = levelSelect?.value || 'Consulta general';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    if (name.length < 2 || emailOrPhone.length < 5) {
      showFeedback(
        false,
        'Por favor completa tu nombre y un teléfono o correo electrónico de contacto.'
      );
      return;
    }

    const subject = encodeURIComponent(
      `Consulta Escuela de Párvulos Municipal Campanita — ${level}`
    );
    const body = encodeURIComponent(
      `Nombre de apoderado/a: ${name}\nContacto: ${emailOrPhone}\nÁrea de consulta: ${level}\n\nMensaje:\n${
        message || 'Solicito orientación e información sobre el establecimiento.'
      }`
    );
    const mailtoHref = `mailto:campanita@temuco.cl?subject=${subject}&body=${body}`;

    showFeedback(
      true,
      `¡Gracias, <strong>${escapeHtml(name)}</strong>! Tu solicitud para <strong>${escapeHtml(
        level
      )}</strong> fue preparada. Puedes enviarla directamente a <a href="${mailtoHref}">campanita@temuco.cl</a> o llamar al <a href="tel:+56452221258">45 2 221258</a>.`
    );
    form.reset();
  });
}

/** Escapa caracteres HTML especiales antes de insertar texto del usuario en DOM. */
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return map[char];
  });
}
