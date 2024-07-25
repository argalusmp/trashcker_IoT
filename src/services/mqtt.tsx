import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Mqtt() {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    const mqttClient = mqtt.connect(host, mqttOption);
    setClient(mqttClient);
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
        console.log('connection successful');
      });

      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });

      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });

      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus('Connect');
          console.log('disconnected successfully');
        });
      } catch (error) {
        console.log('disconnect error:', error);
      }
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      });
    }
  };

  const handleConnect = () => {
    const host = "wss://9f02b3b96b854c22a6bd615b55c7a40a.s1.eu.hivemq.cloud:8884/mqtt";
    const options = {
      clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
      username: "fahmi",
      password: "Fahmi12345",
      protocol: "wss",
    };
    const topic = "emqx/esp32";

    mqttConnect(host, options);
    mqttSub({ topic: topic, qos: 0 });
  };

  return (
    <>
      <div>
        <button onClick={handleConnect}>Connect</button>
      </div>
    </>
  );
}
