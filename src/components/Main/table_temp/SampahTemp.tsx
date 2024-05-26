import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SampahTemp() {
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
        <tr>
          <th
            scope="row"
            className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Apple MacBook Pro 17"
          </th>
          <td className="px-6 py-1">Silver</td>
          <td className="px-6 py-1">$5121</td>
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
        <tr className="">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Microsoft Surface Pro
          </th>
          <td className="px-6 py-1">White</td>
          <td className="px-6 py-1">$5121</td>
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
        <tr className="">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Magic Mouse 2
          </th>
          <td className="px-6 py-1">Black</td>
          <td className="px-6 py-1">$56001</td>
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
      </tbody>
    </>
  );
}
