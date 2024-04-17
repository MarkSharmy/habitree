export default class {

    static routes = [];

    static addRoute(route)
    {
        this.routes.push(route);
    }

    static getRoutes()
    {
        return this.routes;
    }

    static get404()
    {
        return {path: "/404", view: () => console.log("page not found")};
    }
}