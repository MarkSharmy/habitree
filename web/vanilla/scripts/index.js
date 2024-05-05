import Routes from "./routes/Routes.js";
import Dashboard from "./views/Dashboard.js";
import Calendar from "./views/Calendar.js";
import TasksView from "./views/TasksView.js";
import AnalyticsView from "./views/AnalyticsView.js";
import ProjectsView from "./views/ProjectsView.js";
import ProfileView from "./views/ProfileView.js";
import SettingsView from "./views/SettingsView.js";
import Components from "./client/components.js";


//Defacto routing function
async function router()
{
    //const routes = Routes.getRoutes();
    
    const routes = [
        {path: "/dashboard", view: Dashboard},
        {path: "/dashboard/calendar", view: Calendar},
        {path: "/dashboard/alltasks", view: TasksView},
        {path: "/dashboard/analytics", view: AnalyticsView},
        {path: "/dashboard/projects", view: ProjectsView},
        {path: "/dashboard/profile", view: ProfileView},
        {path: "/dashboard/settings", view: SettingsView},

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
    Components.refresh();
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

document.addEventListener("DOMContentLoaded", () =>
{

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});