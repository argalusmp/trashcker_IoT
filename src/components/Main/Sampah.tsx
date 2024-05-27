import Table from "./Tabel";
import SampahTemp from "./table_temp/SampahTemp";

import { Trash, addTrash } from "../../services/trash_db";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalAddSampah() {
  const [trashName, setTrashName] = useState("");
  const [trashPrice, setTrashPrice] = useState(1);
  const [trashCode, setTrashCode] = useState("");

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTrash = new Trash(
      trashName,
      trashCode,
      trashPrice,
      Timestamp.now(),
      Timestamp.now(),
      nanoid(10)
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
                <FontAwesomeIcon icon={"xmark"} color="#ABF600" />
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
                data-modal-hide="crud-modal"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tambah Sampah
                <FontAwesomeIcon
                  icon={"plus"}
                  color="#ABF600"
                  className="px-3"
                />
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
      </Table>
      <a
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mx-auto"
        type="button"
      >
        Toggle modal
      </a>
      <ModalAddSampah />
    </div>
  );
}
