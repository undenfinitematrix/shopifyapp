(function () {
  "use strict";

  function digitsOnly(str) {
    return (str || "").toString().replace(/[^\d]/g, "");
  }

  function buildWhatsAppUrl(phone, message) {
    var cleanPhone = digitsOnly(phone);
    if (!cleanPhone) return "";
    var url = "https://wa.me/" + cleanPhone;
    if (message && message.trim()) {
      url += "?text=" + encodeURIComponent(message);
    }
    return url;
  }

  function renderWidget(settings) {
    if (document.getElementById("aerochat-wa-container")) return;

    var phone = settings.phone || "";
    var welcomeMessage = settings.welcome_message || "";
    var prefilledMessage = settings.prefilled_message || "";
    var cleanPhone = digitsOnly(phone);
    if (!cleanPhone) return;

    var waUrl = buildWhatsAppUrl(cleanPhone, prefilledMessage);

    var container = document.createElement("div");
    container.id = "aerochat-wa-container";
    container.className = "aerochat-wa-container";

    // Welcome message bubble
    if (welcomeMessage.trim()) {
      var bubble = document.createElement("div");
      bubble.className = "aerochat-wa-bubble";

      var bubbleText = document.createElement("span");
      bubbleText.className = "aerochat-wa-bubble__text";
      bubbleText.textContent = welcomeMessage;

      var bubbleClose = document.createElement("button");
      bubbleClose.className = "aerochat-wa-bubble__close";
      bubbleClose.setAttribute("aria-label", "Dismiss");
      bubbleClose.textContent = "\u00D7";
      bubbleClose.addEventListener("click", function (e) {
        e.stopPropagation();
        bubble.style.display = "none";
      });

      bubble.appendChild(bubbleText);
      bubble.appendChild(bubbleClose);
      container.appendChild(bubble);
    }

    // WhatsApp floating button
    var fab = document.createElement("a");
    fab.className = "aerochat-wa-fab";
    fab.href = waUrl;
    fab.target = "_blank";
    fab.rel = "noopener noreferrer";
    fab.setAttribute("aria-label", "Chat on WhatsApp");

    fab.innerHTML =
      '<svg class="aerochat-wa-fab__icon" viewBox="0 0 32 32" aria-hidden="true">' +
      '<path fill="white" d="M19.11 17.23c-.26-.13-1.53-.75-1.77-.83-.24-.09-.42-.13-.6.13-.18.26-.69.83-.85 1-.16.18-.31.2-.57.07-.26-.13-1.1-.4-2.1-1.28-.78-.69-1.3-1.54-1.46-1.8-.15-.26-.02-.4.12-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.47l-.51-.01c-.18 0-.46.07-.7.33-.24.26-.93.91-.93 2.23 0 1.31.95 2.58 1.08 2.76.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.75-1.22.22-.6.22-1.11.15-1.22-.07-.11-.24-.18-.5-.31z"/>' +
      '<path fill="white" d="M16.02 3C9.39 3 4 8.26 4 14.72c0 2.54.87 4.88 2.34 6.76L5 29l7.73-1.99c1.01.28 2.07.43 3.18.43 6.63 0 12.02-5.26 12.02-11.72C28.03 8.26 22.64 3 16.02 3zm0 22.05c-1 0-1.97-.15-2.88-.44l-.62-.19-4.58 1.18 1.23-4.35-.4-.6c-1.42-1.75-2.17-3.84-2.17-6.03 0-5.25 4.4-9.52 9.8-9.52 5.41 0 9.8 4.27 9.8 9.52 0 5.25-4.4 9.52-9.8 9.52z"/>' +
      "</svg>";

    container.appendChild(fab);
    document.body.appendChild(container);
  }

  function init() {
    var root = document.getElementById("aerochat-whatsapp-root");
    if (!root) return;

    var apiUrl = root.getAttribute("data-api-url");
    if (!apiUrl) return;

    fetch(apiUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var settings = data.settings;
        if (!settings || !settings.enabled) return;
        renderWidget(settings);
      })
      .catch(function (err) {
        console.warn("[AeroChat] Could not load widget settings");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
