import Routes from "./routes/Routes.js";



//Defacto routing function
async function router()
{
    //const routes = Routes.getRoutes();
    
    const routes = [
        {path: "/dashboard", view: Dashboard},
        {path: "/dashboard/calendar", view: Calendar},
        {path: "/dashboard/alltasks", view: AllTasks},
        {path: "/dashboard/analytics", view: Analytics},
        {path: "/dashboard/projects", view: Projects},
        {path: "/dashboard/profile", view: Profile},
        {path: "/dashboard/settings", view: Settings},

    ];

    const potentialMatches = routes.map((route) => {

        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };

    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match)
    {
        match = {
            route: Routes.get404(),
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
}

function navigateTo(url)
{
    history.pushState(null, null, url);
    router();
}

function getParams(match)
{
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    console.log("Array:",Array.from(match.route.path.matchAll(/:(\w+)/g)));

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
}

function pathToRegex(path)
{
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});