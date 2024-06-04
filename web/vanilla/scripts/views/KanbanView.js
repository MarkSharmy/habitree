import KanbanAPI from "../kanban/api/KanbanAPI.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle("Habitree: Kanban Board");
        const project = KanbanAPI.getProject(params.id);

        this.name = project.name;
        this.description = project.description;
        this.date = project.date;
        this.columns = project.columns;

    }

    async getHtml()
    {
        return `
        <div class="head-title">
            <h1>${this.name}</h1>
            <ul class="breadcrumb">
                <li><a href="/dashboard/">Dashboard</a></li>
                <li><i class="bx bx-chevron-right"></i></li>
                <li><a href="/dashboard/alltasks" data-link>Project</a></li>
                <li><i class="bx bx-chevron-right"></i></li>
                <li><a href="#" class="active">${this.name}</a></li>
            </ul>
        </div>

        <div id="display-kanban"></div>
        `;
    }
}