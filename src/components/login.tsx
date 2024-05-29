import { FirebaseError } from "firebase/app";
import { signIn } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Laporan() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            console.log("Sign in successful");
            navigate("/dashboard");
            // Redirect to another page or show success message

        } catch(error) {
            console.error("Failed to sign in:", error);
            // Handle login error (e.g., show error message to user)
            // example acc
            // mfhmii@gmail.com
            // pks123
        }
    };

    return (
        <div className="bg-background-color-theme h-screen">
            <h1 className="text-white p-4 font-semibold">Trashcker</h1>
            <div className="flex pt-16 flex-col items-center">
                <img
                    src="trashcker_logo.png"
                    className="w-60"
                    alt="Flowbite Logo"
                />
                <h1 className="font-semibold text-24 text-white">MASUK KE TRASHCKER</h1>
                <h2 className="text-16 text-white">Masukan Email dan Password</h2>
                <div className="mt-6">
                    <form className="flex justify-center flex-col" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            className="w-96 h-10 rounded-2xl mb-4" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            className="w-96 h-10 rounded-2xl mb-4" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button 
                            type="submit" 
                            className="w-96 h-10 rounded-2xl bg-black hover:bg-primary-color-theme text-white flex justify-center items-center">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}