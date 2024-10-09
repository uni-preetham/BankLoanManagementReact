import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js"; // Import registerables
import axios from "axios";

// Register all components, scales, and controllers from Chart.js
Chart.register(...registerables);

const RevenueChart = () => {
  const chartRef = useRef(null); // Reference to the canvas element
  const myChartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bankloanmanagementsystem/api/banks/monthly", { withCredentials: "true" });
        const revenueData = response.data;

        if (!revenueData || revenueData.length === 0) {
          console.error("No revenue data found for the bank.");
          return;
        }

        // Month names array
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        // Map month numbers to month names
        const labels = revenueData.map((data) => monthNames[data.month - 1]); // Adjust for zero-based index
        const dataPoints = revenueData.map((data) => data.totalRevenue);

        // Create the chart
        const ctx = chartRef.current.getContext("2d");

        // Destroy the previous chart if it exists
        if (myChartRef.current) {
          myChartRef.current.destroy();
        }

        // Create a new chart instance
        myChartRef.current = new Chart(ctx, {
          type: "bar", // Change to 'bar' for a bar chart
          data: {
            labels: labels,
            datasets: [
              {
                label: "Total Revenue",
                data: dataPoints,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.5)", // Adjusted for better visibility
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Revenue ($)",
                },
                beginAtZero: true, // Start the y-axis at 0
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();

    // Cleanup on component unmount
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="">
      <h2 className="px-4 pt-4 fw-bold display-6">Expected Revenue Generated</h2>
      <canvas ref={chartRef} id="myChart" />
    </div>
  );
};

export default RevenueChart;
