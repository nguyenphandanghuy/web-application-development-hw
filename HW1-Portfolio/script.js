const menuButton = document.querySelector("#menuButton");
const mainMenu = document.querySelector("#mainMenu");

menuButton.addEventListener("click", function () {

    const isHidden = mainMenu.hidden;

    mainMenu.hidden = !isHidden;

    menuButton.setAttribute(
        "aria-expanded",
        String(isHidden)
    );
});