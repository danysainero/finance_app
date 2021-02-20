const loadPage = (pageName, routerOutletId, action) => {
    const element = document.getElementById(routerOutletId);
    const request = new XMLHttpRequest();
    request.onload = () => {
        replaceInnerHtmlWithNewPage(request, element, action);
        action();
    };
    request.open("GET", `pages/${pageName}.html`, true);
    request.send();
};

const replaceInnerHtmlWithNewPage = (response, element) => {
    if (response.readyState === 4 && response.status === 200) {
        element.innerHTML = response.responseText;
    }
};

const getNewRoute = (routes, defaultRoute) =>
    routes.find(route => window.location.hash.replace("#", "") === route) ||
    defaultRoute;

export const Router = (routes, defaultRoute, routerOutletId, actions) => {
    let newRoute = getNewRoute(Object.keys(routes), defaultRoute);
    loadPage(newRoute, routerOutletId, routes[newRoute]);
    window.addEventListener("hashchange", () => {
        let newRoute = getNewRoute(Object.keys(routes), defaultRoute);
        loadPage(newRoute, routerOutletId, routes[newRoute]);
    });
};
