export default class Key {
    static TODO = "todo";
    static GOAL = "goals";
    static PROJECT = "projects";
    static RES = "resolution";
    static CALENDAR = "calendar";

    static getKeys()
    {
        const keys = [];
        keys.push(this.TODO);
        keys.push(this.GOAL);
        keys.push(this.PROJECT);
        keys.push(this.RES);
        keys.push(this.CALENDAR);

        return keys;
    }
}