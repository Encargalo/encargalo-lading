(function () {
  "use strict";

  /* Menú móvil */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Slider de testimonios */
  var testimonials = [
    {
      text: "Pedí unas medicinas para mi mamá y llegaron en 20 minutos. Encárgalo me salvó ese día.",
      name: "María Fernanda G.",
      initials: "MF",
    },
    {
      text: "Uso Encárgalo cada semana para el mercado. El seguimiento en tiempo real me da mucha tranquilidad.",
      name: "Carlos Rodríguez",
      initials: "CR",
    },
    {
      text: "El pago móvil integrado hace que todo sea rapidísimo. Ya no imagino pedir encargos de otra forma.",
      name: "Génesis Pérez",
      initials: "GP",
    },
  ];

  var testimonialText = document.getElementById("testimonialText");
  var testimonialName = document.getElementById("testimonialName");
  var testimonialAvatar = document.getElementById("testimonialAvatar");
  var testimonialPrev = document.getElementById("testimonialPrev");
  var testimonialNext = document.getElementById("testimonialNext");
  var currentTestimonial = 0;

  var renderTestimonial = function (index) {
    var item = testimonials[index];
    if (testimonialText) testimonialText.textContent = item.text;
    if (testimonialName) testimonialName.textContent = item.name;
    if (testimonialAvatar) testimonialAvatar.textContent = item.initials;
  };

  if (testimonialPrev && testimonialNext && testimonialText) {
    testimonialPrev.addEventListener("click", function () {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });

    testimonialNext.addEventListener("click", function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });
  }
})();
