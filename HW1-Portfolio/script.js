const menuButton = document.querySelector("#menuButton");
const mainMenu = document.querySelector("#mainMenu");

const menuLinks = mainMenu.querySelectorAll("a");


// Open / close menu
menuButton.addEventListener("click", function () {

    const isHidden = mainMenu.hidden;

    mainMenu.hidden = !isHidden;

    menuButton.setAttribute(
        "aria-expanded",
        String(isHidden)
    );

    // Move focus to first menu item when opening
    if (isHidden) {
        menuLinks[0].focus();
    } else {
        menuButton.focus();
    }
});


// Keyboard focus trap
mainMenu.addEventListener("keydown", function (event) {

    if (event.key !== "Tab") {
        return;
    }

    const firstLink = menuLinks[0];
    const lastLink = menuLinks[menuLinks.length - 1];

    // Shift + Tab from first item
    if (event.shiftKey && document.activeElement === firstLink) {

        event.preventDefault();

        lastLink.focus();

        return;
    }

    // Tab from last item
    if (!event.shiftKey && document.activeElement === lastLink) {

        event.preventDefault();

        firstLink.focus();

        return;
    }
}); 