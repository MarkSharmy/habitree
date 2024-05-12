import Key from "../enum/keys.js"

export default class TaskAPI {

    static getItem(key, id)
    {
        let database = read(key);

        const data = database.find(item => { return item.id == id});

        return data;
    }

    static getItems(key)
    {
        return read(key);
    }

    static getAllItems()
    {
        let allTasks = [];
        const keys = Key.getKeys();

        keys.forEach( key => {
            let data = this.getItems(key);
            if (data) allTasks.push(...data);
        });

        return allTasks;
    }

    static deleteItem(key, id)
    {
        let database = read(key);
        const item = database.find(item => { return item.id == id});
        database.splice(database.indexOf(item), 1);
        save(key, database);
    }

    static updateItem(key, data)
    {
        let {id} = data;

        if (!id) throw Error("Error: Invalid ID");

        let database = read(key);
        const item = database.find(item => { return item.id == id});
        
        database[database.indexOf(item)] = data;
        save(key, database);
    }

    static insertItem(key, data)
    {
        let database = read(key);

        if (!database)
        {
            database = [data];
            save(key, database);
        }

        else
        {
            database.push(data);
            save(key, database);
        }
    }

}

function read(key)
{
    let data = localStorage.getItem(key);

    if (!data)
        return null;
    else
        return JSON.parse(data);
}

function save(key, data)
{
    localStorage.setItem(key, JSON.stringify(data));
}