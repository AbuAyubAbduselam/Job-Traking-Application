import React from "react";

const TableComponent = () => {
  // Create an array with numbers from 1 to 30 for the column headers
  const numberColumns = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            {numberColumns.map((number) => (
              <th key={number}>{number}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            {numberColumns.map((number) => (
              <td key={number}>{number}</td>
            ))}
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
