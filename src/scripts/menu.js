function initMenu() {
  const menuToggleButton = document.querySelector(".menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");
  const slideOutMenu = document.getElementById("main-menu");
  const menuBackdrop = document.getElementById("menu-backdrop");
  if (menuToggleButton === null) return;

  function openMenu() {
    menuToggleButton.setAttribute("aria-expanded", "true");
    if (slideOutMenu) slideOutMenu.classList.remove("translate-x-full");
    if (menuBackdrop) menuBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuToggleButton.setAttribute("aria-expanded", "false");
    if (slideOutMenu) slideOutMenu.classList.add("translate-x-full");
    if (menuBackdrop) menuBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  menuToggleButton.addEventListener("click", function () {
    const isMenuExpanded =
      menuToggleButton.getAttribute("aria-expanded") === "true";
    if (isMenuExpanded) closeMenu();
    else openMenu();
  });
  if (menuBackdrop) menuBackdrop.addEventListener("click", closeMenu);
  if (closeMenuButton) closeMenuButton.addEventListener("click", closeMenu);
  if (slideOutMenu) {
    slideOutMenu.addEventListener("click", function (clickEvent) {
      const clickedLink =
        clickEvent.target &&
        clickEvent.target.closest &&
        clickEvent.target.closest("a");
      if (
        clickedLink &&
        menuToggleButton.getAttribute("aria-expanded") === "true"
      )
        closeMenu();
    });
  }
}

function onEscapeKey(event) {
  if (event.key !== "Escape") return;
  const menuToggleButton = document.querySelector(".menu-button");
  if (
    menuToggleButton &&
    menuToggleButton.getAttribute("aria-expanded") === "true"
  ) {
    const slideOutMenu = document.getElementById("main-menu");
    const menuBackdrop = document.getElementById("menu-backdrop");
    menuToggleButton.setAttribute("aria-expanded", "false");
    if (slideOutMenu) slideOutMenu.classList.add("translate-x-full");
    if (menuBackdrop) menuBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function setupMenu() {
  document.removeEventListener("keydown", onEscapeKey);
  document.addEventListener("keydown", onEscapeKey);
  initMenu();
}

setupMenu();
document.addEventListener("astro:after-swap", setupMenu);
