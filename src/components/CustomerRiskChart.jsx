import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale);

const CustomerRiskChart = ({ data }) => {
    // data: array of { customer_id, risk_score }
    const chartData = {
        labels: data.map((item) => item.customer_id),
        datasets: [
            {
                label: "Risk Score",
                data: data.map((item) => item.risk_score),
                backgroundColor: "rgba(75,192,192,0.6)",
            },
        ],
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <Bar data={chartData} />
        </div>
    );
};

export default CustomerRiskChart; 