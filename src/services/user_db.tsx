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

class User {
  id?: string;
  name?: string;
  email?: string;
  address?: string;
  isAdmin?: boolean = false;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;

  constructor(
    name?: string,
    email?: string,
    address?: string,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
    id?: string,
    isAdmin: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toMap(): object {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

async function store(user: User) {
    await addDoc(collection(db, collectionRoute.users), user.toMap());
}

async function update(id: string, user: User) {
  await setDoc(doc(db, collectionRoute.users, id), user.toMap());
}
async function index(): Promise<User[]> {
  const users: Array<User> = [];
  const res = await getDocs(collection(db, collectionRoute.users));

  res.docs.forEach((e) => {
    const data = e.data();
    users.push(
      new User(
        data?.name,
        data?.email,
        data?.address,
        data?.created_at,
        data?.updated_at,
        e.id,
      )
    );
  });
  return users.filter((user) => {
    user.isAdmin == false;
  });
}

async function show(id: string): Promise<User | null> {
  const res = await getDoc(doc(db, collectionRoute.users, id));
  if (res.exists != null) {
    const data = res.data();
    return new User(
      data?.name,
      data?.email,
      data?.address,
      data?.created_at,
      data?.updated_at,
      res.id
    );
  }
  return null;
}
async function remove(id: string){
  await deleteDoc(doc(db, collectionRoute.users, id));
}

export {
  User,
  index as getUsers,
  show as getUserById,
  store as addUser,
  update as updateUser,
  remove as deleteUser,
};
