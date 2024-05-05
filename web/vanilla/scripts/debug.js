import Key from "./enum/keys.js";
import Utils from "./utils/Utils.js";
import Status from "./enum/status.js";
import Storage from "./api/storage.js";

let myTitle = "Eat Lunch"
let listValues = ["Lunch: 13:30"];


const data = {
    id: 61762,
    title: myTitle,
    entries: listValues,
    status: Status.NOT_DONE,
    time: "",
}

export function runDebug()
{

    let key = Key.TODO;
    Storage.deleteItem(key, data);
}