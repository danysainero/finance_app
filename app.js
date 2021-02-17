import { Router as router } from './routing/router.js';

router(['home', 'transactions', 'graphics', 'action'], 'home', 'router-outlet');

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

