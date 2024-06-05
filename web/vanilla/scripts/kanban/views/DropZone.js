import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone 
{
    static createDropZone(projectId)
    {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropzone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0];

        dropzone.addEventListener("dragover", e => {
            e.preventDefault();
            dropzone.classList.add("kanban__dropzone--active");
        });

        dropzone.addEventListener("dragleave", () => {
            dropzone.classList.remove("kanban__dropzone--active");
        });

        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");
            
            const columnElement = dropzone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropzone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            
            const insertAfter = dropzone.parentElement.classList.contains(".kanban__item") ? dropzone.parentElement : dropzone;
            
            if (droppedItemElement.contains(dropzone))
            {
                return;
            }

            insertAfter.after(droppedItemElement);

            KanbanAPI.updateItem({
                entryId: itemId,
                columnId: columnId,
                projectId: projectId,
                position: droppedIndex
            });
        }); 

        return dropzone;
    }
}