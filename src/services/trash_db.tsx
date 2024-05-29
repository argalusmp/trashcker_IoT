import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./services";
import { collectionRoute } from "../enum";
import { nanoid } from "nanoid";

class Trash {
  id?: string;
  name?: string;
  price?: number;
  code?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;

  constructor(
    name?: string,
    code?: string,
    price?: number,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.code = code;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toMap(): object {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      code: this.code,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

async function store(trash: Trash) {
  await addDoc(collection(db, collectionRoute.trashes), trash.toMap());
}

async function update(id: string, trash: Trash) {
  await setDoc(doc(db, collectionRoute.trashes, id), trash.toMap());
}
async function index(): Promise<Trash[]> {
  const scale: Array<Trash> = [];
  const res = await getDocs(collection(db, collectionRoute.trashes));
  res.docs.map((e) => {
    const data = e.data();
    scale.push(
      new Trash(
        data?.name || null,
        data?.code || null,
        data?.price || null,
        data?.created_at || null,
        data?.updated_at || null,
        e.id || nanoid()
      )
    );
  });
  return scale;
}

async function show(id: string): Promise<Trash | null> {
  const res = await getDoc(doc(db, collectionRoute.trashes, id));
  if (res.exists != null) {
    const data = res.data();
    return new Trash(
      data?.name,
      data?.code,
      data?.price,
      data?.created_at,
      data?.updated_at,
      res.id
    );
  }
  return null;
}

async function remove(id: string) {
  await deleteDoc(doc(db, collectionRoute.trashes, id));
}

export {
  Trash,
  index as getTrashs,
  show as getTrashById,
  store as addTrash,
  update as updateTrash,
  remove as deleteTrash,
};
