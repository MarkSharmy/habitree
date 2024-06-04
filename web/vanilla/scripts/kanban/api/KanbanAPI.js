import TaskAPI from "../../api/storage.js";
import Key from "../../enum/keys.js";

export default class KanbanAPI
{
    static getItems(projectId, columnId)
    {
        const column = read(projectId).find( column => column.id == columnId);

        if(!column) throw Error("Data error. No column iD");

        return column.entries;
    }

    static insertItem(projectId, columnId, content)
    {
        const data = read(projectId);
        const column = data.find(column => column.id == columnId);
        
        const entry = {
            id: Math.floor(Math.random() * 1000),
            content: content
        };

        if(!column) throw Error("Data error. No column iD");

        column.entries.push(entry);
        save(data);

        return item;
    }
}

function read(projectId)
{
    const data = TaskAPI.getItem(Key.PROJECT, projectId);

    return data;
}

function save(project)
{
    TaskAPI.updateItem(Key.PROJECT, project);
}