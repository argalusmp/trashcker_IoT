import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./services"
import { addUser, getUserById, User, User as UserModel } from "./user_db";

async function signIn(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password);
}

async function createUser(user: UserModel, password: string, onError: Function){
    if (user.email != null) {
        try {
            await createUserWithEmailAndPassword(auth, user.email, password);
            await addUser(user);
        } catch (error) {
            onError()
        }
    }
}
async function logOut(){
    await signOut(auth);
}

function isLoggedIn(): boolean{
    onAuthStateChanged(auth, (user)=>{
        if (user) {
            return true;
        }else{
            return false;
        }
    })
    return false;
}

function onAuthStateChange(callback: (user: UserModel | null) => void) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userInfo = await getUserById(user.uid);
            callback(userInfo);
        } else {
            callback(null);
        }
    });
}

async function getCurrenUser(): Promise<User | null>{
    if (auth.currentUser?.uid != null) {
        return await getUserById(auth.currentUser?.uid);
    }
    return null;
}

export {signIn, createUser, logOut, isLoggedIn, getCurrenUser, onAuthStateChange}
