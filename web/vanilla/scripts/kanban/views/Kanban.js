import Column from "./Column.js";
import Key from "../../enum/keys.js";
import TaskAPI from "../../api/storage.js";

export default class Kanban
{
    constructor(params, root)
    {
        this.root = root;
        this.projectId = params.id;

        const project = TaskAPI.getItem(Key.PROJECT, this.projectId);

        project.columns.forEach( column => {

            const columnView = new Column({
                projectId: this.projectId,
                columnId: column.id,
                title: column.title
            });

            this.root.appendChild(columnView.elements.root);
        });
    }
  
}