import { useEffect, useState } from "react";
import Chart from '../Chart';
import { onAuthStateChange } from "../../services/auth";
import { User as UserModel } from "../../services/user_db";

export default function Dashboard() {
  // let [user, setinputvalue1] = useState("");
  // let [sampah, setinputvalue2] = useState("");
  
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  return (
  <>
  <div className="p-10 sm:ml-64 dark:bg-background-color-theme">
    <div className="dark:bg-outline-color-theme w-full h-14 rounded-xl px-6 text-2xl font-semibold dark:text-white py-3 shadow-2xl">
      {`Selamat Datang di Bank Sampah, ${user?.name || 'User'}`}
    </div>
    <div className="flex justify-around space-x-10 mb-10 w-692 items-center">
      <div className="h-52 dark:bg-outline-color-theme rounded-xl mt-12 shadow-2xl">
        <h2 className="dark:text-white p-6 text-xl font-semibold">Earnings</h2>
        <div className="flex">
          <div className="flex justify-around items-center h-28 w-80 dark:bg-background-color-theme mx-6 rounded-xl dark:text-white bg-gray-200">
            <h1 className="font-semibold">Pendapatan:</h1>
            <h1 className="text-secondary-color-theme font-semibold text-xl">Rp 200,000</h1>
          </div>
          <div className="flex justify-around items-center h-28 w-80 dark:bg-background-color-theme mx-6 rounded-xl dark:text-white bg-gray-200">
            <h1 className="font-semibold">Berat:</h1>
            <h1 className="text-secondary-color-theme font-semibold text-xl">50 Kg</h1>
          </div>
        </div>
      </div>
      <div className="h-40 w-full dark:bg-background-color-theme shadow-2xl rounded-xl mt-12 flex-col py-3 space-y-3">
      <img
        src="weighter.png"
        className="w-16 mx-20"
        alt="Wighter Logo"
      />
      <button className="rounded-2xl bg-secondary-color-theme mx-3 w-52 h-11 flex justify-center items-center font-semibold hover:bg-outline-color-theme cursor-pointer" data-modal-target="static-modal" data-modal-toggle="static-modal">Timbang</button>
      </div>
    </div>
    <Chart />

    <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="bg-white relative rounded-lg shadow dark:bg-outline-color-theme">
            <div className="p-4 md:p-5 space-y-4 flex flex-col">
              <div className='flex justify-between items-center'>
                <h3 className='dark:text-white font-semibold'>Tanggal</h3>
                <div className="flex items-center justify-between rounded-t">
                    <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
              </div>
                <input className='dark:bg-black dark:text-white rounded-xl' type="date"/>
              <h3 className='dark:text-white font-semibold'>User</h3>
                <input className='dark:bg-black dark:text-white rounded-xl' type="text" placeholder='Pilih User'/>
              <h3 className='dark:text-white font-semibold'>Jenis Sampah</h3>
                <input className='dark:bg-black dark:text-white rounded-xl' type="text" placeholder='Pilih Jenis Sampah'/>
            </div>
            <div className='flex flex-col justify-center items-center mt-5'>
              <img
                src="weighter.png"
                className="w-32"
                alt="Wighter Logo"
              />
              <h1 className='text-white font-semibold text-3xl'>10 Kg</h1>
            </div>
            <div className="flex items-center p-4 md:p-5 rounded-b mt-5">
                <button data-modal-hide="static-modal" type="button" className="text-black bg-secondary-color-theme hover:bg-gray-200 font-semibold rounded-lg text-sm px-5 py-2.5 w-full text-center" data-modal-target="timbang" data-modal-toggle="timbang">Timbang</button>
            </div>
        </div>
    </div>
    </div>

    <div id="timbang" data-modal-backdrop="static" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="bg-white relative rounded-lg shadow dark:bg-outline-color-theme">
            <div className="p-4 md:p-5 space-y-4 flex flex-col">
              <div className='flex justify-between items-center'>
                <h3 className='dark:text-white font-semibold'>Tanggal</h3>
                <div className="flex items-center justify-between rounded-t">
                    <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
              </div>
              <div className='dark:bg-black dark:text-white rounded-xl'></div>
              <h3 className='dark:text-white font-semibold'>User</h3>
              <div className='dark:bg-black dark:text-white rounded-xl'></div>
                {/* <input className='dark:bg-black dark:text-white rounded-xl' type="text" placeholder='Pilih User'/> */}
              <h3 className='dark:text-white font-semibold'>Jenis Sampah</h3>
              <div className='dark:bg-black dark:text-white rounded-xl'></div>
                {/* <input className='dark:bg-black dark:text-white rounded-xl' type="text" placeholder='Pilih Jeni s Sampah'/> */}
            </div>
            <div className="flex items-center p-4 md:p-5 rounded-b mt-10">
                <button data-modal-hide="static-modal" type="button" className="text-black bg-secondary-color-theme hover:bg-gray-200 font-semibold rounded-lg text-sm px-5 py-2.5 w-full text-center" data-modal-target="static-modal" data-modal-toggle="static-modal">Tambang</button>
            </div>
        </div>
    </div>
    </div>
  </div>
  </>
  );
}
