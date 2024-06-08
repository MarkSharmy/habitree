import Routes from "./routes/Routes.js";
import Kanban from "./kanban/views/Kanban.js";
import DashboardView from "./views/DashboardView.js";
import Calendar from "./views/Calendar.js";
import TasksView from "./views/TasksView.js";
import AnalyticsView from "./views/AnalyticsView.js";
import IssuesView from "./views/IssuesView.js";
import ProfileView from "./views/ProfileView.js";
import KanbanView from "./views/KanbanView.js";
import SettingsView from "./views/SettingsView.js";
import Components from "./client/components.js";


//Defacto routing function
async function router()
{
    //const routes = Routes.getRoutes();
    
    const routes = [
        {path: "/dashboard", view: DashboardView},
        {path: "/dashboard/calendar", view: Calendar},
        {path: "/dashboard/alltasks", view: TasksView},
        {path: "/dashboard/alltasks/:panel", view: TasksView},
        {path: "/dashboard/analytics", view: AnalyticsView},
        {path: "/dashboard/issues/", view: IssuesView},
        {path: "/dashboard/projects/:id", view: KanbanView},
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
    
    if(view.kanban)
    {
        new Kanban(getParams(match), document.getElementById("display-kanban"));
    }

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
            console.log("click");
            navigateTo(e.target.href);
            
        }
    });

    router();
});

export function routeToPage(url)
{
    navigateTo(url);
    router();
}

export function dataCleanUp()
{
    console.log("local Storage:", localStorage.getItem("goals"));
}