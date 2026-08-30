(function () {
  "use strict";

  var toggle = document.querySelector("[data-menu-toggle]");
  var navigation = document.querySelector("[data-navigation]");

  if (toggle && navigation) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      navigation.classList.toggle("is-open", !expanded);
    });
  }

  document.querySelectorAll("[data-plugin-link]").forEach(function (link) {
    var url = window.SPG_SITE_CONFIG && window.SPG_SITE_CONFIG.pluginDirectoryUrl;
    if (url) {
      link.href = url;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      link.textContent = "View on WordPress.org";
    } else {
      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  });

  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-navigation] a").forEach(function (link) {
    if (link.getAttribute("href") === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}());
