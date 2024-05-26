import {
  Timestamp,
  addDoc,
  collection,
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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;

  constructor(
    name?: string,
    email?: string,
    address?: string,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toMap(): object {
    return {
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
        e.id
      )
    );
  });
  return users;
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

export {
  User,
  index as getUsers,
  show as getUserById,
  store as addUser,
  update as updateUser,
};