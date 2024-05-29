"use server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UsersTemp({ users, onEditClick, onDeleteClick }) {
  return (
    <>
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nama
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Role
          </th>
          <th scope="col" className="px-6 py-3">
            Alamat
          </th>

          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <th
              scope="row"
              className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {user.name}
            </th>
            <td className="px-6 py-1">{user.email}</td>
            <td className="px-6 py-1">{user.isAdmin ? "Admin" : "User"}</td>
            <td className="px-6 py-1">{user.address}</td>
            <td className="px-6 py-4">
              <div className="action flex flex-grow ">
                <a
                  onClick={() => onEditClick(user)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <FontAwesomeIcon icon={"pen-to-square"} color="#ABF600" />
                </a>
                <p className="mx-2"> | </p>
                <a
                  onClick={() => onDeleteClick(user.id)}
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
