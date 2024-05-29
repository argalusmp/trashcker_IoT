// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width} = window;
  return {
    width : width/1.4,
  };
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

const data = [
  {
    name: "Jan",
    a: 4000,
    b: 2400,
    c: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    a: 3000,
    b: 1398,
    c: 2400,
    amt: 2210,
  },
  {
    name: "Mar",
    a: 2000,
    b: 9800,
    c: 2400,
    amt: 2290,
  },
  {
    name: "Apr",
    a: 2780,
    b: 3908,
    c: 2400,
    amt: 2000,
  },
  {
    name: "Mei",
    a: 1890,
    b: 4800,
    c: 2400,
    amt: 2181,
  },
  {
    name: "Jun",
    a: 2390,
    b: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
  {
    name: "Okt",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
  {
    name: "Des",
    a: 3490,
    b: 4300,
    amt: 2100,
  },
];


  

export default function Chart() {
const { width } = useWindowDimensions();
  return (
    <BarChart
      width={width}
      height={400}
      data={data}
      outerRadius={120}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      reverseStackOrder
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="a" radius={[10,10,0,0]} stackId="a" fill="#ABF600" />
      <Bar dataKey="b" stackId="a" fill="#5B7E0B" />
      <Bar dataKey="c" stackId="a" fill="#ABF600" />
      <Bar dataKey="d" stackId="a" fill="#5B7E0B" />
      <Bar dataKey="e" stackId="a" fill="#ABF600" />
      <Bar dataKey="f" stackId="a" fill="#5B7E0B" />
    </BarChart>
  );
}