import { Router as router } from './routing/router.js';
import { homeInit } from './pages/home/home.js';
import { actionInit } from './pages/action/action.js';
import { graphicsInit } from './pages/graphics/graphics.js';

const noAction = () => {};

const routes = {
    home: homeInit,
    graphics: graphicsInit,
    action: actionInit
};

router(routes, 'home', 'router-outlet');

const navbarBurger = document.querySelector('.navbar-burger');
const addButton = document.querySelector('#add-btn');
const menuElements = document.querySelectorAll('.navbar-item');

navbarBurger.addEventListener('click', function () {
    const navbarBurgerMenu = document.querySelector('#navbar-menu');
    navbarBurgerMenu.classList.toggle('is-active');
});

addButton.addEventListener('click', function () {
    location.replace('#' + 'action');
});

menuElements.forEach((el) => {
    el.addEventListener('click', function () {
        const navbarBurgerMenu = document.querySelector('#navbar-menu');
        navbarBurgerMenu.classList.toggle('is-active');
    });
});