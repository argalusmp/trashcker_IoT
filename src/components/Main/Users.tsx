"use client";
import { useEffect, useState } from "react";
import Table from "./Tabel";
import UsersTemp from "./table_temp/UsersTemp";
import {
  User,
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/user_db";
import { Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalUser({ onAdd, onEdit, userToEdit }) {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [userisAdmin, setuserisAdmin] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setuserName(userToEdit.name || "");
      setuserEmail(userToEdit.email || "");
      setuserAddress(userToEdit.address || "");
      setuserisAdmin(userToEdit.isAdmin || false);
    }
  }, [userToEdit]);

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = new User(
      userName,
      userEmail,
      userAddress,
      userToEdit ? userToEdit.createdAt : Timestamp.now(),
      Timestamp.now(),
      userToEdit ? userToEdit.id : nanoid(10),
      userisAdmin
    );

    try {
      if (userToEdit) {
        await updateUser(newUser.id, newUser);
        onEdit(newUser);
      } else {
        await addUser(newUser);
        onAdd(newUser);
      }
      // Clear form after submit
      setuserName("");
      setuserEmail("");
      setuserAddress("");
      setuserisAdmin(false);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };
  return (
    <>
      <div
        id="crud-modal-user"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {userToEdit ? "Edit User" : "Tambah User"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal-user"
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
                    htmlFor="namaUser"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama User
                  </label>
                  <input
                    type="text"
                    name="namaUser"
                    id="namaUser"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="user@gmail.com"
                    value={userEmail ?? ""}
                    onChange={(e) => setuserEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => setuserisAdmin(e.target.value === "admin")}
                  >
                    <option value="user">Basic User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={4}
                    name="address"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Beji Timur"
                    value={userAddress}
                    onChange={(e) => setuserAddress(e.target.value)}
                    required={true}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                data-modal-hide="crud-modal-user"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {userToEdit ? "Edit User" : "Tambah User"}
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

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  useEffect(() => {
    async function fetchdata() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchdata();
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleEditUser = (editedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
    setUserToEdit(null);
  };

  const handleEditButtonClick = (user: User) => {
    setUserToEdit(user);
    const modalToggleButton = document.querySelector(
      "[data-modal-toggle='crud-modal-user']"
    ) as HTMLElement;
    if (modalToggleButton) {
      modalToggleButton.click();
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="p-16 sm:ml-64 dark:bg-background-color-theme min-h-screen">
      <div className="px-6 pt-1 dark:bg-outline-color-theme rounded-2xl shadow-[10px_15px_4px_0_rgba(0,0,0,0.3)]">
        <Table>
          <UsersTemp
            users={users}
            onEditClick={handleEditButtonClick}
            onDeleteClick={handleDeleteUser}
          />
        </Table>
        <div className="btn-modal-add flex justify-start ml-4 ">
          <button
            data-modal-target="crud-modal-user"
            data-modal-toggle="crud-modal-user"
            className="block mb-12 mt-24 text-black bg-secondary-color-theme focus:ring-4 focus:outline-none  font-semibold rounded-lg font-sans"
            type="button"
          >
            <p className="text-center py-3 px-5">Tambah User</p>
          </button>
        </div>
      </div>
      <ModalUser
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        userToEdit={userToEdit}
      />
    </div>
  );
}
