import TaskAPI from "../../api/storage.js";
import Calendar from "../../client/Calendar.js";
import VirtualTask from "../../client/VirualTask.js";
import Key from "../../enum/keys.js";
import Status from "../../enum/status.js";
import Column from "../views/Column.js";

export default class KanbanAPI
{
    static getItems(projectId, columnId)
    {
        const column = read(projectId).find( column => column.id == columnId);

        if(!column) throw new Error("Data error. No column iD");

        return column.entries;
    }

    static insertItem(projectId, columnId, content)
    {
        const data = read(projectId);
        const column = data.find(column => column.id == columnId);
        
        const entry = {
            id: Math.floor(Math.random() * 1000000),
            content: content,
            status: Status.NOT_DONE,
        };

        if(!column) throw Error("Data error. No column iD");

        column.entries.push(entry);
        save(projectId, data);

        return entry;
    }
    
    /**
     * This function updates entries for a given column.
     * It can transfer an entry from one column to another.
     * @param {object} props - Properties object, must contain:
     * [projectId, entryId, content, {optional}position]
     */
    static updateItem(props)
    {
        const {projectId, entryId} = props;

        const data = read(projectId);

        const [entry, currentColumn] = (() => {

            for (const column of data)
            {
                const entry = column.entries.find( entry => entry.id == entryId);
                
                if(entry)
                {
                    return [entry, column];
                }
            }
        })();

        if(!entry) throw new Error("Item not found.");

        entry.content = props.content === undefined ? entry.content : props.content;

        //Update column and position
        if(props.columnId !== undefined && props.position !== undefined)
        {
            const targetColumn = data.find(column => column.id == props.columnId);
            
            if(!targetColumn) throw new Error("target column not found");
            
            if(targetColumn.id === Column.DOING)
            {
                entry.status = Status.DOING;
                entry.date = Calendar.getCurrentDate();
                push(projectId, entry);
            }

            else if(targetColumn.id === Column.DONE)
            {
                entry.status = Status.DONE;
            }

            //Delete the entry from it's current column
            currentColumn.entries.splice(currentColumn.entries.indexOf(entry), 1);

            //Move entry into it's new column and position
            targetColumn.entries.splice(props.position, 0, entry);
            
        }

        save(projectId, data);
    }

    static slateItem(projectId, entryId, currentColumnId, targetColumnId)
    {
        const project = TaskAPI.getItem(Key.PROJECT, projectId);

        const currentColumn = project.columns.find( column => column.id == currentColumnId);
        const targetColumn = project.columns.find( column => column.id == targetColumnId);

        const entry = currentColumn.entries.find( entry => entry.id == entryId);
        
        if(!entry) return;
        
        targetColumn.entries.push(entry);
        currentColumn.entries.splice(currentColumn.entries.indexOf(entry), 1);

        project.columns[targetColumnId] = targetColumn;
        project.columns[currentColumnId] = currentColumn;

        TaskAPI.updateItem(Key.PROJECT, project);

    }   

    static deleteItem(projectId, entryId)
    {
        const data = read(projectId);

        for(const column of data)
        {
            const entry = column.entries.find(entry => entry.id == entryId);

            if(entry)
            {
                column.entries.splice(column.entries.indexOf(entry), 1);
            }

            save(projectId, data);
        }
    }
}

function push(projectId, entry)
{
    const project = TaskAPI.getItem(Key.PROJECT, projectId);

    const task = new VirtualTask(
        `${project.id}-${entry.id}`,
        `${project.name} - ${entry.content}`,
        Key.PROJECT,
        true
    );

    let date_obj = new Date();

    let time = `${new String(date_obj.getHours()).padStart(2, "0")}:00`;
    
    task.setSchedule(Calendar.getCurrentDate(), time);
    task.setContent(entry.content);

    const calendar = Calendar.getAgenda(Calendar.getCurrentDate());
    calendar.push(task);
}

function read(projectId)
{
    const data = TaskAPI.getItem(Key.PROJECT, projectId);
    return data.columns;
}

function save(projectId, data)
{
    const project = TaskAPI.getItem(Key.PROJECT, projectId);
    project.columns = data;

    TaskAPI.updateItem(Key.PROJECT, project);
}