import { marketChart } from "../../services/cryptoApi.js";
import { RotatingLines } from "react-loader-spinner";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className="flex justify-center my-12 mb-24 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-white">
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4">
                  Coin
                </th>
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4">
                  Name
                </th>
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4">
                  Price
                </th>
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4">
                  24h
                </th>
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4">
                  Total Volume
                </th>
                <th className="text-base md:text-lg text-left py-3 px-2 md:px-4"></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <TableRow coin={coin} key={coin.id} setChart={setChart} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coin, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr className="h-16 md:h-20 border-b border-gray-700 font-medium text-sm md:text-base hover:bg-gray-800/50 transition-colors">
      <td className="px-2 md:px-4">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={showHandler}
        >
          <img
            src={image}
            alt={name}
            className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 rounded-full"
          />
          <span className="text-gray-400 font-semibold">
            {symbol.toUpperCase()}
          </span>
        </div>
      </td>
      <td className="px-2 md:px-4 truncate max-w-[120px]">{name}</td>
      <td className="px-2 md:px-4">{current_price.toLocaleString()}</td>
      <td
        className={`px-2 md:px-4 font-medium ${
          price_change > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {price_change?.toFixed(2)}%
      </td>
      <td className="px-2 md:px-4">${total_volume.toLocaleString()}</td>
      <td className="px-2 md:px-4">
        <img
          src={price_change > 0 ? chartUp : chartDown}
          alt={price_change > 0 ? "Price up" : "Price down"}
          className="w-13 h-10"
        />
      </td>
    </tr>
  );
};
