import TaskAPI from "../../api/storage.js";
import Key from "../../enum/keys.js";

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
            content: content
        };

        if(!column) throw Error("Data error. No column iD");

        column.entries.push(entry);
        save(projectId, data);

        return entry;
    }

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
 
            //Delete the entry from it's current column
            currentColumn.entries.splice(currentColumn.entries.indexOf(entry), 1);

            //Move entry into it's new column and position
            targetColumn.entries.splice(props.position, 0, entry);
            
            if(targetColumn === 3)
            {
                push(entry);
            }
            
        }

        save(projectId, data);
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

function push(entry)
{
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