const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const mainMenu = document.getElementById("main-menu");
const backdrop = document.getElementById("menu-backdrop");

const openMenu = () => {
  menuButton?.setAttribute("aria-expanded", "true");
  mainMenu?.classList.remove("translate-x-full");
  backdrop?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mainMenu?.classList.add("translate-x-full");
  backdrop?.classList.add("hidden");
  document.body.style.overflow = "";
};

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  
  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when clicking backdrop
backdrop?.addEventListener("click", () => {
  closeMenu();
});

// Close menu when clicking close button
closeMenuButton?.addEventListener("click", () => {
  closeMenu();
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
  }
});