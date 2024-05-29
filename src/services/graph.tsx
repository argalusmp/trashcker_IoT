import { Timestamp } from "firebase/firestore";
import { Trash } from "./trash_db";

class DashboardGraph{
    trash?: Trash;
    price?: number;
    date?: Timestamp;

    constructor(trash: Trash, price: number, date: Timestamp){
        this.trash = trash;
        this.price = price;
        this.date = date;
    }
}

export {DashboardGraph}