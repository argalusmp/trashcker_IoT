import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scale, getScales } from "../../../services/scale_db";

import { useState, useEffect } from "react";

export default function LaporanTemp() {
  const [scales, setScale] = useState<Scale[]>([]);

  useEffect(() => {
    async function fetchdata() {
      const data = await getScales();
      setScale(data);
    }
    fetchdata();
  }, []);

  return (
    <>
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Tanggal
          </th>
          <th scope="col" className="px-6 py-3">
            Jenis Sampah
          </th>
          <th scope="col" className="px-6 py-3">
            Harga
          </th>
          <th scope="col" className="px-6 py-3">
            Berat
          </th>
          <th scope="col" className="px-6 py-3">
            Jumlah
          </th>
          <th scope="col" className="px-6 py-3">
            Penjual
          </th>
          {/* <th scope="col" className="px-6 py-3">
            Action
          </th> */}
        </tr>
      </thead>
      <tbody>
        {scales.map((scale) => (
          <tr className="dark:text-white text-black">
            <th
              scope="row"
              className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {scale.updatedAt &&
                new Date(scale.updatedAt.seconds * 1000).toLocaleString()}
            </th>
            <td className="px-6 py-1">{scale.trash?.name}</td>
            <td className="px-6 py-1">{scale.trash?.price}</td>
            <td className="px-6 py-1">{scale.weight}</td>
            <td className="px-6 py-1">{scale.total_price}</td>
            <td className="px-6 py-1">{scale.user?.name}</td>
            {/* <td className="px-6 py-4">
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
            </td> */}
          </tr>
        ))}
      </tbody>
    </>
  );
}
