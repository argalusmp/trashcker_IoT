import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getTrashs } from "../services/trash_db"; // Adjust the import path as necessary

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return { width: width / 1.4 };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function formatMonthlyData(trashData) {
  const monthlyData = {};

  trashData.forEach(trash => {
    const month = trash.updatedAt.toDate().toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) {
      monthlyData[month] = { name: month };
    }

    if (!monthlyData[month][trash.name]) {
      monthlyData[month][trash.name] = 0;
    }

    monthlyData[month][trash.name] += trash.price;
  });

  return Object.values(monthlyData);
}

export default function Chart() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trashData = await getTrashs();
      const formattedData = formatMonthlyData(trashData);
      setData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <BarChart
      width={width}
      height={400}
      data={data}
      outerRadius={120}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      reverseStackOrder
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
        <Bar key={key} dataKey={key} stackId="a" fill={index % 2 === 0 ? "#ABF600" : "#5B7E0B"} />
      ))}
    </BarChart>
  );
}
