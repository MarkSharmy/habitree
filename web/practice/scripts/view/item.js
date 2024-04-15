import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./dropzone.js";

export default class Item
{
    constructor(id, content)
    {
        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

           if (newContent == this.content)
           {
                return;
           }

           this.content = newContent;
           KanbanAPI.updateItem(id, {
                content: this.content
           });
        };

        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dblclick", () => {

            const check = confirm("Are you sure want to delete this?");

            if (check)
            {
                KanbanAPI.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);

            }
        });

        this.elements.root.addEventListener("dragstart", e => {
            
            e.dataTransfer.setData("text/plain", id);

        });

        this.elements.root.addEventListener("drop", e => {
            e.preventDefault();
        });

    }

    static createRoot()
    {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
                <div class="kanban__item-box" draggable=true>
                    <div contenteditable class="kanban__item-input">
                        Design Kanban board   
                    </div>
                    <i class='bx bx-dots-vertical-rounded' ></i>
                    <div class="dropdown">
                        <button class="drop-list">
                            <span class="text">Edit</span>
                            <i class="bx bxs-edit"></i>
                        </button>
                        <button class="drop-list">
                            <span class="text">Move Forward</span>
                            <i class='bx bxs-arrow-to-right'></i>
                        </button>
                        <button class="drop-list">
                            <span class="text">Move Backward</span>
                            <i class='bx bxs-arrow-to-left'></i>
                        </button>
                        <button class="drop-list">
                            <span class="text">Do Today</span>
                            <i class='bx bx-bookmark'></i>
                        </button>
                        <button class="drop-list">
                            <span class="text">Delete</span>
                            <i class='bx bx-trash'></i>
                        </button> 
                    </div>
                </div>
        `).children[0];
    }
}