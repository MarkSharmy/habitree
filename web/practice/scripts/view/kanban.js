import Column from "./column.js";

export default class Kanban {
    constructor(root)
    {
        this.root = root;

        Kanban.columns().forEach(column => {
            const columnComponent = new Column(column.id, column.title);
            
            this.root.appendChild(columnComponent.elements.root);
        });
    }

    static columns() 
    {
        return [
            {
                id: 0,
                title: "Backlog"
            },
            {
                id: 1,
                title: "Design"
            },
            {
                id:2,
                title: "Todo"
            },
            {
                id:3,
                title: "Doing"
            },
            {
                id: 4,
                title: "Completed"
            }
        ];
    }
}