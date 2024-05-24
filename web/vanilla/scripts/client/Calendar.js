import Key from "../enum/keys.js";
import Status from "../enum/status.js";

export default class Calendar
{
    constructor(date)
    {
        this.date = date;
        this.efficiency = 0.0;
        this.output = "00:00:00";
        this.agenda = [];
        this.progress = 0.0;
    }

    tasks()
    {
        return this.agenda;
    }

    push(task)
    {
        this.agenda.push(task);
    }

    remove(id)
    {
        const task = this.agenda.find(task => { return task.id == id});
        this.agenda.splice(this.agenda.indexOf(task), 1);
        updateCalendar(this);
    }

    update()
    {
        this.replaceAgenda(this);
        
        let completedItems = this.agenda.filter( task => { return task.status == Status.DONE});
        this.progress = Math.floor((completedItems.length / this.agenda.length));
    }

    static getCurrentDate()
    {
        const date = new Date().toISOString().split("T").shift();
        return date;
    }

    static getAgenda(date)
    {
        const calendar = getCalendar();

        let agenda = calendar.find( agenda => {return agenda.date == date});

        if(!agenda)
        {
            agenda = new Calendar(date);
            calendar.push(agenda);
            saveCalendar(calendar);
        }

        return agenda;
    }

    static replaceAgenda(agenda)
    {
        //Get the calendar array with agendas
        const calendar = getCalendar();
        //Replace agenda of the same date with the new agenda
        calendar[calendar.indexOf(agenda)] = agenda;
        //Save new calendar to local storage
        saveCalendar(calendar);
    }
}

function getCalendar()
{
    let calendar = [];

    const data = localStorage.getItem(Key.CALENDAR);

    if(!data)
    {
        const agenda = new Calendar(Calendar.getCurrentDate());
        calendar.push(agenda);
        saveCalendar(calendar);
    }
    else {
        calendar = JSON.parse(data);
    }

    console.log("Calendar:", calendar)

    return calendar;
}

function saveCalendar(calendar)
{
    const data = JSON.stringify(calendar);
    localStorage.setItem(Key.CALENDAR, data);
}

