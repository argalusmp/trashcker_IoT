import { Timestamp, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./services";
import {collectionRoute} from "../enum"
import { User } from "./user_db";
import { Trash } from "./trash_db";

class Scale {
    id?: string;
    weight?: number;
    total_price?: number;
    user?: User;
    trash?: Trash;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    
    constructor(weight?: number, user?: User, trash?: Trash, total_price?: number, createdAt?: Timestamp, updatedAt?:Timestamp, id?: string){
        this.id = id;
        this.weight = weight;
        this.total_price = total_price;
        this.user = user;
        this.trash = trash;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toMap(): object{
        return {
            weight: this.weight,
            total_price: this.total_price,
            user: this.user?.toMap(),
            trash: this.trash?.toMap(),
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }
}

async function store(scale: Scale){
    await addDoc(collection(db, collectionRoute.scales),
     scale.toMap())
}

async function update(id: string, scale: Scale){
    await setDoc(doc(db, collectionRoute.scales, id), scale.toMap());
}

async function index(): Promise<Scale[]>{
    const scale: Array<Scale> = [];
    const res = (await getDocs(collection(db, collectionRoute.scales)))
    res.docs.map((e) => {
        const data = e.data();
        const user = new User(
            data?.user.name,
            data?.user.email,
            data?.user.address,
            data?.user.created_at,
            data?.user.updated_at,
            data?.user.id
          )
        const trash = new Trash(
            data?.trash.name,
             data?.trash.code,
              data?.trash.price,
               data?.trash.created_at,
                data?.trash.updated_at,
                data?.trash.id
        )
        scale.push(new Scale(data?.weight, user, trash, data?.total_price, data?.created_at, data?.updated_at, e.id));
    })
    return scale;
}

async function show(id: string): Promise<Scale | null>{
    const res = (await getDoc(doc(db, collectionRoute.scales, id)))
    if (res.exists != null) {
        const data = res.data();
        const user = new User(
            data?.user.name,
            data?.user.email,
            data?.user.address,
            data?.user.created_at,
            data?.user.updated_at,
            data?.user.id
          )
        const trash = new Trash(
            data?.trash.name,
             data?.trash.code,
              data?.trash.price,
               data?.trash.created_at,
                data?.trash.updated_at,
                data?.trash.id
            )
        return new Scale(data?.weight, user,trash, data?.total_price, data?.created_at, data?.updated_at, res.id);
    }
    return null;
}

async function calculateTotalPrice(): Promise<number> {
    let totalPrice = 0;
    const res = await getDocs(collection(db, collectionRoute.scales));
    res.docs.forEach((doc) => {
        const data = doc.data();
        if (data?.total_price) {
            totalPrice += data.total_price;
        }
    });
    return totalPrice;
}

async function calculateTotalWeight(): Promise<number> {
    const res = await getDocs(collection(db, collectionRoute.scales));
    let totalWeight = 0;
    res.forEach((doc) => {
        const data = doc.data();
        if (data.weight) {
            totalWeight += data.weight;
        }
    });
    return totalWeight;
}

export  {Scale, index as getScales, show as getScaleById, store as addScale, update as updateScale, calculateTotalPrice, calculateTotalWeight};