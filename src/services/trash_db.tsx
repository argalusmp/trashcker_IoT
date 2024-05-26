import { Timestamp, addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./services";
import {collectionRoute} from "../enum"

class Trash {
    id?: string;
    name?: string;
    code?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    
    constructor(name?: string, code?: string, createdAt?: Timestamp, updatedAt?:Timestamp, id?: string){
        this.id = id;
        this.name = name;
        this.code = code;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toMap(): object{
        return {
            name: this.name,
            code: this.code,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }
}

async function store(trash: Trash){
    await addDoc(collection(db, collectionRoute.trashes),
     trash.toMap())
}

async function update(id: string, trash: Trash){
    await setDoc(doc(db, collectionRoute.trashes, id), trash.toMap());
}
async function index(): Promise<Trash[]>{
    const users: Array<Trash> = [];
    const res = (await getDocs(collection(db, collectionRoute.trashes)))
    res.docs.map((e) => {
        const data = e.data();
        users.push(new Trash(data?.name, data?.code, data?.created_at, data?.updated_at, e.id));
    })
    return users;
}

async function show(id: string): Promise<Trash | null>{
    const res = (await getDoc(doc(db, collectionRoute.trashes, id)))
    if (res.exists != null) {
        const data = res.data();
        return new Trash(data?.name, data?.code, data?.created_at, data?.updated_at, res.id);
    }
    return null;
}

export  {Trash, index as getTrashs, show as getTrashById, store as addTrash, update as updateTrash};