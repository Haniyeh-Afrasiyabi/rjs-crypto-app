import React from "react";

function TableCoin({ coins }) {
  console.log(coins);
  return (
    <div>
      <ul>
        {coins.map((coin) => (
          <li>{coin.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TableCoin;
