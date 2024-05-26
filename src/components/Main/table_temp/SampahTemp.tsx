"use server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Trash,
  getTrashById,
  getTrashs,
  addTrash,
  updateTrash,
} from "../../../services/trash_db";
import { useState, useEffect } from "react";

export default function SampahTemp() {
  const [trashs, setTrashs] = useState<Trash[]>([]);

  useEffect(() => {
    async function fetchdata() {
      const data = await getTrashs();
      setTrashs(data);
    }
    fetchdata();
  }, []);

  return (
    <>
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Jenis Sampah
          </th>
          <th scope="col" className="px-6 py-3">
            Harga
          </th>
          <th scope="col" className="px-6 py-3">
            Kode
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {trashs.map((trash) => (
          <tr>
            <th
              scope="row"
              className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {trash.name}
            </th>
            <td className="px-6 py-1">adsfasdfasdf</td>
            <td className="px-6 py-1">{trash.code}</td>
            <td className="px-6 py-4">
              <div className="action flex flex-grow ">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <FontAwesomeIcon icon={"pen-to-square"} color="#ABF600" />
                </a>
                <p className="mx-2"> | </p>
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <FontAwesomeIcon icon={"trash"} color="#ABF600" />
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
