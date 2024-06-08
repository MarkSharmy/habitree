import TaskAPI from "../api/storage.js";
import Calendar from "../client/Calendar.js";
import Key from "../enum/keys.js";
import Column from "../kanban/views/Column.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle("Habitree: Dashboard");
        this.refreshData();
    }

    async getHtml()
    {
        return `        
            <div class="head-title">
                <h1>Dashboard</h1>
                <ul class="breadcrumb">
                    <li><a href="/dashboard/">Dashboard</a></li>
                    <li><i class="bx bx-chevron-right"></i></li>
                    <li><a href="/dashboard/" class="active" data-link>Home</a></li>
                </ul>
            </div>
            <div id="display-dashboard">
                <div class="left">
                    <div class="date">
                        <h2 id="date">Today, 17th of April</h2>
                    </div>
                    <div class="tasks">
                        <ul class="agenda">
                            <li class="progress-bar"></li>
                            <li class="task"></li>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <h2>Overview</h2>
                    <div class="time">
                        <h3>Current Output:</h3>
                        <div id="output">04:56:47</div>
                    </div>
                    <h3>Avg. Output 7(days):</h3>
                    <div class="line-chart"></div>
                    <h3>Efficiency:</h3>
                    <div class="progress-circle"></div>
                </div>
            </div>
        `;
    }

    refreshData()
    {
        const projects = TaskAPI.getItems(Key.PROJECT);

        projects.forEach( project => {
            
            //Get "Doing" column object
            const currentColumn = project.columns.find( column => column.id == Column.DOING);
            //Get "TODO" column object
            const targetColumn = project.columns.find( column => column.id == Column.TODO);
            //Array to hold removed entries
            let lostItems = [];

            currentColumn.entries.forEach( entry => {

                if( entry.date != Calendar.getCurrentDate())
                {
                    targetColumn.entries.push(entry);
                    lostItems.push(entry);
                }
            });

            lostItems.forEach( item => {

                //Remove lost item from the "Doing" column
                currentColumn.entries.splice(currentColumn.entries.indexOf(item), 1);
            
            });

            project.columns[Column.TODO] = targetColumn;
            project.columns[Column.DOING] = currentColumn;

            TaskAPI.updateItem(Key.PROJECT, project);

        });
    }
}