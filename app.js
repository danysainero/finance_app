import { Router as router } from './routing/router.js';

router(['home', 'action', 'graphics'], 'home', 'router-outlet');

const navbarBurger = document.querySelector('.navbar-burger');
const menuElements = document.querySelectorAll('.navbar-item');

navbarBurger.addEventListener('click', function () {
    const navbarBurgerMenu = document.querySelector('#navbar-menu');
    navbarBurgerMenu.classList.toggle('is-active');
});

menuElements.forEach((el) => {
    el.addEventListener('click', function () {
        const navbarBurgerMenu = document.querySelector('#navbar-menu');
        navbarBurgerMenu.classList.toggle('is-active');
    })
});