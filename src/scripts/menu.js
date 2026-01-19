const menuButton = document.querySelector(".menu-button");
const mainMenu = document.getElementById("main-menu");

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  
  // Toggle aria-expanded
  menuButton.setAttribute("aria-expanded", `${!isExpanded}`);
  
  // Toggle visibility using Tailwind classes
  if (isExpanded) {
    // Hide menu
    mainMenu?.classList.add("hidden");
    mainMenu?.classList.remove("block");
  } else {
    // Show menu
    mainMenu?.classList.remove("hidden");
    mainMenu?.classList.add("block");
  }
});