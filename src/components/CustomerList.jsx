import React from "react";

function CustomerList({ customers }) {
  if (customers.length === 0) {
    return <p>No customers match your search.</p>;
  }

  return (
    <div className="customer-list">
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(({ customer_id, score }) => (
            <tr key={customer_id}>
              <td>{customer_id}</td>
              <td className="score">
                {typeof score === "number" ? score.toFixed(2) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
