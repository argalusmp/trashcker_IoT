import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { collectionRoute } from "../enum";
import { db } from "./services";

class Scaling{
  id?: string;
  weight?: number;

  constructor(id?: string, weight?: number){
    this.id = id,
    this.weight = weight
  }
}

async function listenScaling(onNext: (scale: Scaling)=>void){
    return onSnapshot(collection(db, collectionRoute.scaling),
     (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0];
          onNext(new Scaling(data.id, data.data().weight))
        }
      },)
}

async function stopScaling(id: string){
  await deleteDoc(doc(db, collectionRoute.scaling, id))
}

async function startScaling(){
  await addDoc(collection(db, collectionRoute.scaling), { weight:0 });
}



export { Scaling, listenScaling, stopScaling, startScaling }
