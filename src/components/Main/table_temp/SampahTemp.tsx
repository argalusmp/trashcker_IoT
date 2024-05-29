"use server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SampahTemp({ trashs, onEditClick, onDeleteClick }) {
  return (
    <>
      <thead className=" text-xs text-gray-900 uppercase dark:text-gray-400 ">
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
          <tr key={trash.id} className="dark:text-white">
            <th
              scope="row"
              className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {trash.name}
            </th>
            <td className="px-6 py-1">
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(trash.price ?? 0)}
            </td>
            <td className="px-6 py-1">{trash.code}</td>
            <td className="px-6 py-4">
              <div className="action flex flex-grow ">
                <a
                  onClick={() => onEditClick(trash)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <FontAwesomeIcon icon={"pen-to-square"} color="#ABF600" />
                </a>
                <p className="mx-2"> | </p>
                <a
                  onClick={() => onDeleteClick(trash.id)}
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
