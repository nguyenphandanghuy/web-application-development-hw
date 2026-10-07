const menuButton =
    document.querySelector("#menuButton");

const mainMenu =
    document.querySelector("#mainMenu");

menuButton.addEventListener(
    "click",
    function () {

        if (mainMenu.hidden) {

            mainMenu.hidden = false;

        } else {

            mainMenu.hidden = true;

        }
    }
);
