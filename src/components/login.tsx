export default function Laporan() {
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
                    <form action="" className=" flex justify-center flex-col" method="POST">
                        <input type="text" className="w-96 h-10 rounded-2xl mb-4" placeholder="Email" />
                        <input type="text" className="w-96 h-10 rounded-2xl mb-4" placeholder="Password"/>
                        <div className="w-96 h-10 rounded-2xl bg-black hover:bg-primary-color-theme text-white flex justify-center items-center">Submit</div>
                    </form>
                </div>
            </div>
        </div>
    );
}