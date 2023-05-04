import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const DataGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/data-analysis");
        const jsonData = await response.json();
        setData([
          {
            x: jsonData.x,
            y: jsonData.y,
            type: "bar",
            marker: { color: "red" },
          },
        ]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Plot
      data={data}
      layout={{
        width: 800,
        height: 600,
        title: "Data Analysis Result",
      }}
    />
  );
};

export default DataGraph;
