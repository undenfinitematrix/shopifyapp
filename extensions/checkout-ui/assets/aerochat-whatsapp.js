(function () {
  var cfg = window.__AEROCHAT_WA__;
  if (!cfg || !cfg.phone) return;

  var phone = String(cfg.phone).replace(/[^\d]/g, "");
  var text = encodeURIComponent(cfg.message || "Hi!");
  var url = "https://wa.me/" + phone + "?text=" + text;

  // Avoid duplicates if theme renders twice
  if (document.getElementById("aerochat-wa-fab")) return;

  var a = document.createElement("a");
  a.id = "aerochat-wa-fab";
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", "Chat on WhatsApp");

  a.style.position = "fixed";
  a.style.right = "20px";
  a.style.bottom = "20px";
  a.style.width = "56px";
  a.style.height = "56px";
  a.style.borderRadius = "999px";
  a.style.background = "#25D366";
  a.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
  a.style.display = "flex";
  a.style.alignItems = "center";
  a.style.justifyContent = "center";
  a.style.zIndex = "999999";

  // simple WA icon (SVG)
  a.innerHTML =
    '<svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill="white" d="M19.11 17.23c-.26-.13-1.53-.75-1.77-.83-.24-.09-.42-.13-.6.13-.18.26-.69.83-.85 1-.16.18-.31.2-.57.07-.26-.13-1.1-.4-2.1-1.28-.78-.69-1.3-1.54-1.46-1.8-.15-.26-.02-.4.12-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.44-.46-.6-.47l-.51-.01c-.18 0-.46.07-.7.33-.24.26-.93.91-.93 2.23 0 1.31.95 2.58 1.08 2.76.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.75-1.22.22-.6.22-1.11.15-1.22-.07-.11-.24-.18-.5-.31z"/>' +
    '<path fill="white" d="M16.02 3C9.39 3 4 8.26 4 14.72c0 2.54.87 4.88 2.34 6.76L5 29l7.73-1.99c1.01.28 2.07.43 3.18.43 6.63 0 12.02-5.26 12.02-11.72C28.03 8.26 22.64 3 16.02 3zm0 22.05c-1 0-1.97-.15-2.88-.44l-.62-.19-4.58 1.18 1.23-4.35-.4-.6c-1.42-1.75-2.17-3.84-2.17-6.03 0-5.25 4.4-9.52 9.8-9.52 5.41 0 9.8 4.27 9.8 9.52 0 5.25-4.4 9.52-9.8 9.52z"/>' +
    "</svg>";

  document.body.appendChild(a);
})();
