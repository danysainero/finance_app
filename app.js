import { Router as router } from './routing/router.js';
import { homeInit } from './pages/home.js';

const noAction = () => {};

const routes = {
    home: homeInit,
    transactions: noAction,
    graphics: noAction,
    action: noAction
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
    })
});