import Table from "./Tabel";
import SampahTemp from "./table_temp/SampahTemp";

import { Trash, addTrash } from "../../services/trash_db";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";

function ModalAddSampah() {
  const [trashName, setTrashName] = useState("");
  const [trashPrice, setTrashPrice] = useState(1);
  const [trashCode, setTrashCode] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTrash = new Trash(
      trashName,
      trashCode,
      trashPrice,
      Timestamp.now(),
      Timestamp.now()
    );

    try {
      await addTrash(newTrash);
      // Clear form after submit
      setTrashName("");
      setTrashPrice(1);
      setTrashCode("");
    } catch (error) {
      console.error("Error adding trash", error);
    }
  };
  return (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sampah!!!
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="namaSampah"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Sampah
                  </label>
                  <input
                    type="text"
                    name="namaSampah"
                    id="namaSampah"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    value={trashName}
                    onChange={(e) => setTrashName(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="harga"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Harga
                  </label>
                  <input
                    type="number"
                    name="harga"
                    id="harga"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Rp2999"
                    value={trashPrice ?? 0}
                    onChange={(e) => setTrashPrice(Number(e.target.value))}
                    required={true}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="kode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kode
                  </label>
                  <input
                    type="text"
                    name="kode"
                    id="kode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="serah"
                    value={trashCode}
                    onChange={(e) => setTrashCode(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Tambah Sampah!
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Sampah() {
  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <Table>
        <SampahTemp />
        <button
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mx-auto"
          type="button"
        >
          Toggle modal
        </button>
      </Table>
      <ModalAddSampah />
    </div>
  );
}
