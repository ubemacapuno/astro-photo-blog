const menuButton = document.querySelector(".menu-button");
const mainMenu = document.getElementById("main-menu");

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  
  menuButton.setAttribute("aria-expanded", `${!isExpanded}`);
  
  if (isExpanded) {
    mainMenu?.classList.add("hidden");
    mainMenu?.classList.remove("block");
  } else {
    mainMenu?.classList.remove("hidden");
    mainMenu?.classList.add("block");
  }
});