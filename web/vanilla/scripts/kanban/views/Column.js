import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./Dropzone.js";
import Entry from "./Entry.js";

export default class Column 
{
    constructor(props)
    {

        let {projectId, columnId, title} = props;
        this.projectId = projectId;

        const topDropZone = DropZone.createDropZone(projectId);

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
    
        this.elements.root.dataset.id = columnId;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanbanAPI.insertItem(projectId, columnId, "");
            this.renderItem(newItem);
        });

        KanbanAPI.getItems(projectId, columnId).forEach(item => {
            this.renderItem(item);
        });
    }   

    static createRoot()
    {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
                <button class="kanban__add-item" type="button">
                    <span class="text">+ Add Task</span>
                    <i class='bx bxs-save'></i>
                </button>
            </div>
        `).children[0];
    }

    renderItem(data)
    {
        const item = new Entry({
            projectId: this.projectId,
            entryId: data.id,
            content: data.content
        });
        this.elements.items.appendChild(item.elements.root);
    }
}