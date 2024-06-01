import Status from "../enum/status.js";

export default class {
    
    static generateItemID()
    {
        return Math.floor((Math.random() * 100000));
    }

    static getIcon(type)
    {
        switch(type)
        {
            case "Task": return "/images/icons_task.svg";
            case "Read": return "/images/icons_read.svg";
            case "Watch": return "/images/icons_watch.svg";
            case "Note": return "/images/icons_note.svg";
            case "Practice": return "/images/icons_practice.svg";
            default: throw Error("Icon error: Unknown type");
        }
    }

    static getCurrent(data)
    {
        let entries = data.entries;

        let current = entries.find(entry => {return entry.status != Status.DONE});
        
        if (current == null)
            return entries[entries.length]
        else
            return current.task;
    }

    static renderProgress(entries, progressNode)
    {
        let itemsDone = entries.filter(entry => {return entry.status == Status.DONE});

        let progress = Math.floor((itemsDone.length / entries.length) * 100);

        progressNode.style.width = `${progress}%`;

    }

    static getNumItemsDone(entries)
    {
        let itemsDone = entries.filter(entry => {return entry.status == Status.DONE});

        return `${itemsDone.length}`
    }

    static getItemsDonePercentile(entries)
    {
        let itemsDone = entries.filter(entry => {return entry.status == Status.DONE});

        let progress = 0.0;

        if(entries.length > 0)
            progress = Math.floor((itemsDone.length / entries.length) * 100);

        return`${progress}%`;
    }

    static getNumItemsTotal(entries)
    {
        return `${entries.length}`;
    }

}