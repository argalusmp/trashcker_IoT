import { useEffect, useState } from "react";
import Chart from "../Chart";
import { onAuthStateChange } from "../../services/auth";
import { User, User as UserModel, getUsers } from "../../services/user_db";
import {
  Scale,
  addScale,
  calculateTotalPrice,
  calculateTotalWeight,
} from "../../services/scale_db";
import { Trash as TrashModel, getTrashs } from "../../services/trash_db";
import { NavLink, useNavigate } from "react-router-dom";
import mqtt from "mqtt";
import { Timestamp } from "firebase/firestore";

function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Info() {
  return (
    <>
      <div
        id="alert-border-1"
        className="px-16 pr-5 flex items-center p-4  sm:ml-64  justify-between text-blue-800 border-t-4 border-blue-300 bg-blue-50  dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800 align-middle "
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm font-medium">
          Data successful added go to
          <NavLink
            to="/laporan"
            className="font-semibold underline hover:no-underline"
          >
            <span className="pl-3">Laporan </span>
          </NavLink>
          . Give it a click if you wanna see
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          data-dismiss-target="#alert-border-1"
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
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
        </button>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [user, setUser] = useState<string>();
  const [trash, setTrash] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [trashes, setTrashes] = useState<TrashModel[]>([]);
  const [todayDate, setTodayDate] = useState<string>(getTodayDate());
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({ message: null });
  const navigate = useNavigate();
  const topic = "emqx/esp32";

  const [showInfo, setShowInfo] = useState(false);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttSub = (subscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    }
  };

  const setupMQTT = () => {
    const host = "wss://z9080011.ala.asia-southeast1.emqxsl.com:8084/mqtt";
    const options = {
      clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
      username: "adit",
      password: "123456",
    };

    mqttConnect(host, options);
  };

  useEffect(() => {
    onAuthStateChange((user) => {
      setCurrentUser(user);
    });

    const fetchData = async () => {
      const price = await calculateTotalPrice();
      setTotalPrice(price);

      const weight = await calculateTotalWeight();
      setTotalWeight(weight);

      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);

      const fetchedTrashes = await getTrashs();
      setTrashes(fetchedTrashes);
    };

    fetchData();
    setupMQTT();
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        console.log("connection successful");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      client.on("message", (topic, message) => {
        const payload = JSON.parse(message.toString());
        setPayload(payload);
        console.log(`received message: ${message} from topic: ${topic}`);
      });

      mqttSub({ topic: topic, qos: 0 });
    }
  }, [client]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any necessary actions here (e.g., submit form data)
    // After form submission, navigate to the dashboard
    navigate("/laporan"); // Redirect to the dashboard
  };

  return (
    <>
      {showInfo ? <Info /> : null}
      <div
        id="dashboard"
        className="p-10 sm:ml-64 dark:bg-background-color-theme"
      >
        <div className="dark:bg-outline-color-theme w-full h-14 rounded-xl px-6 text-2xl font-semibold dark:text-white py-3 shadow-2xl">
          {`Selamat Datang di Bank Sampah, ${currentUser?.name || "User"}`}
        </div>
        <div className="flex justify-around space-x-10 mb-10 w-692 items-center">
          <div className="h-52 dark:bg-outline-color-theme rounded-xl mt-12 shadow-2xl">
            <h2 className="dark:text-white p-6 text-xl font-semibold">
              Earnings
            </h2>
            <div className="flex">
              <div className="flex justify-around items-center h-28 w-80 dark:bg-background-color-theme mx-6 rounded-xl dark:text-white bg-gray-200">
                <h1 className="font-semibold">Pendapatan:</h1>
                <h1 className="text-secondary-color-theme font-semibold text-xl">{`Rp ${totalPrice.toLocaleString()}`}</h1>
              </div>
              <div className="flex justify-around items-center h-28 w-80 dark:bg-background-color-theme mx-6 rounded-xl dark:text-white bg-gray-200">
                <h1 className="font-semibold">Berat:</h1>
                <h1 className="text-secondary-color-theme font-semibold text-xl">{`${totalWeight} Kg`}</h1>
              </div>
            </div>
          </div>
          <div className="h-40 w-full dark:bg-background-color-theme shadow-2xl rounded-xl mt-12 flex-col py-3 space-y-3">
            <img src="weighter.png" className="w-16 mx-20" alt="Wighter Logo" />
            <button
              className="rounded-2xl bg-secondary-color-theme mx-3 w-52 h-11 flex justify-center items-center font-semibold hover:bg-outline-color-theme cursor-pointer"
              data-modal-target="static-modal"
              data-modal-toggle="static-modal"
            >
              Timbang
            </button>
          </div>
        </div>
        <Chart />

        <div
          id="static-modal"
          data-modal-backdrop="static"
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <form
              className="bg-white relative rounded-lg shadow dark:bg-outline-color-theme"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className="p-4 md:p-5 space-y-4 flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="dark:text-white font-semibold">Tanggal</h3>
                  <div className="flex items-center justify-between rounded-t">
                    <button
                      type="button"
                      className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="static-modal"
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
                    </button>
                  </div>
                </div>
                <input
                  className="dark:bg-black dark:text-white rounded-xl"
                  type="date"
                  value={todayDate}
                />
                <h3 className="dark:text-white font-semibold">User</h3>
                <select
                  className="dark:bg-black dark:text-white rounded-xl"
                  onChange={(e) => setUser(e.target.value)}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <h3 className="dark:text-white font-semibold">Jenis Sampah</h3>
                <select
                  className="dark:bg-black dark:text-white rounded-xl"
                  onChange={(e) => setTrash(e.target.value)}
                >
                  {trashes.map((trash) => (
                    <option key={trash.id} value={trash.id}>
                      {trash.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <img src="weighter.png" className="w-32" alt="Wighter Logo" />
                {/* <input type="text" value={ payload.berat??0 }/> */}
                <h1 className="text-white font-semibold text-3xl">
                  {payload.weight ?? 0}
                </h1>
              </div>
              <div className="flex items-center p-4 md:p-5 rounded-b mt-5">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="text-black bg-secondary-color-theme hover:bg-gray-200 font-semibold rounded-lg text-sm px-5 py-2.5 w-full text-center"
                  data-modal-target="static-modal"
                  data-modal-hide="static-modal"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  async function onSubmit() {
    if (payload.weight != null && user != null && trash != null) {
      try {
        const scale = new Scale(
          payload?.weight,
          users.find((e) => e.id == user),
          trashes.find((e) => e.id == trash),
          trashes.find((e) => e.id == trash).price * payload?.weight,
          Timestamp.now(),
          Timestamp.now()
        );
        await addScale(scale);
        setShowInfo(true);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
