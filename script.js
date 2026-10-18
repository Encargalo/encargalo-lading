(function () {
  "use strict";

  /* Sombra de la cabecera solo al hacer scroll */
  var topbar = document.querySelector(".topbar");

  if (topbar) {
    var marcarScroll = function () {
      topbar.classList.toggle("is-scrolled", window.scrollY > 4);
    };

    window.addEventListener("scroll", marcarScroll, { passive: true });
    marcarScroll();
  }

  /* Enlace activo del menú según la sección visible */
  var enlaces = document.querySelectorAll(".nav__links a");
  var secciones = ["inicio", "servicios", "testimonios", "descarga", "contacto"];
  /* Las secciones sin enlace propio (testimonios, descarga) mantienen "Servicios" */
  var enlacePorSeccion = {
    inicio: "inicio",
    servicios: "servicios",
    testimonios: "servicios",
    descarga: "servicios",
    contacto: "contacto",
  };

  var marcarActivo = function () {
    var altoCabecera = topbar ? topbar.offsetHeight : 0;
    var posicion = window.scrollY + altoCabecera + 1;
    var actual = secciones[0];

    secciones.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= posicion) actual = id;
    });

    /* Al llegar al final de la página, el pie (Contacto) puede no alcanzar la cabecera */
    var alFinalDePagina = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (alFinalDePagina) actual = "contacto";

    var destino = "#" + enlacePorSeccion[actual];
    enlaces.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === destino);
    });
  };

  if (enlaces.length) {
    window.addEventListener("scroll", marcarActivo, { passive: true });
    window.addEventListener("resize", marcarActivo);
    marcarActivo();
  }

  /* Menú móvil */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    var closeMenu = function () {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* Carrusel de opiniones */
  var pista = document.getElementById("opPista");
  var prev = document.getElementById("opPrev");
  var next = document.getElementById("opNext");

  if (pista && prev && next) {
    var paso = function () {
      var card = pista.querySelector(".opinion");
      return card ? card.offsetWidth + 24 : pista.clientWidth;
    };

    var alFinal = function () {
      return pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4;
    };

    var actualizar = function () {
      prev.disabled = pista.scrollLeft <= 4;
      next.disabled = alFinal();
    };

    prev.addEventListener("click", function () {
      pista.scrollBy({ left: -paso(), behavior: "smooth" });
    });

    next.addEventListener("click", function () {
      pista.scrollBy({ left: paso(), behavior: "smooth" });
    });

    pista.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    actualizar();

    /* Cambio automático cada 2 s; vuelve al inicio al llegar al final */
    var INTERVALO = 2000;
    var timer = null;
    var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var avanzar = function () {
      if (alFinal()) {
        pista.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        pista.scrollBy({ left: paso(), behavior: "smooth" });
      }
    };

    var iniciar = function () {
      if (reducirMovimiento || timer) return;
      timer = setInterval(avanzar, INTERVALO);
    };

    var detener = function () {
      clearInterval(timer);
      timer = null;
    };

    /* Se pausa mientras la persona lee o interactúa con el carrusel */
    var carrusel = pista.parentElement;
    carrusel.addEventListener("mouseenter", detener);
    carrusel.addEventListener("mouseleave", iniciar);
    carrusel.addEventListener("focusin", detener);
    carrusel.addEventListener("focusout", iniciar);
    carrusel.addEventListener("touchstart", detener, { passive: true });
    carrusel.addEventListener("touchend", iniciar, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        detener();
      } else {
        iniciar();
      }
    });

    iniciar();
  }
})();
