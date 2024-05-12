export default class Status {
    static NOT_DONE = 0;
    static DOING = 1;
    static DONE = 2;

    static getStatus(status)
    {
        switch(status)
        {
            case 0: return "NOT_DONE";
            case 1: return "DOING";
            case 2: return "DONE";
            default: return "Error";
        }
    }
}