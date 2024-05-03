export default class Storage {

    static getItem(key, id)
    {

    }
    
    static insertItem(key, entry)
    {

    }

}

function read(key)
{
    const data = localStorage.getItem(key);

    if (!data)
        return null;
    else
        return JSON.parse(data);
}

function save(key, data)
{
    localStorage.setItem(key, JSON.stringify(data));
}