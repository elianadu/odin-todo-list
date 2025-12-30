import {loadHome} from './home.js';
import {loadMenu} from './menu.js';
import {loadAbout} from './about.js';
import "./styles.css";

const buttonArr = Array.from(document.querySelectorAll("button"));
let contentDiv = document.querySelector("div#content");

const pages = {
    "Home": loadHome,  // or whatever loadHome is
    "Menu": loadMenu,
    "About": loadAbout,
};

for (let button of buttonArr) {
    button.addEventListener("click", () => {
        contentDiv.textContent = "";
        pages[button.textContent]();
    });
}

loadHome();