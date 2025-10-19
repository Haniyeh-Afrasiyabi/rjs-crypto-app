import { useState } from "react";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  // استایل‌های مشترک
  const buttonBaseClass =
    "mx-5 bg-[#18181cdb] border border-[#3874ff] text-[#3874ff] text-base py-[5px] px-[10px] rounded-[5px] cursor-pointer transition-colors";
  const selectedButtonClass = "bg-[#3874ff] text-white";
  const detailItemClass = "flex text-lg";
  const detailLabelClass = "mr-2 text-[#3874ff] font-bold";

  return (
    <div className="fixed inset-0 backdrop-blur-sm overflow-x-auto z-50">
      <span
        className="inline-block text-xl font-bold bg-red-600 text-white w-8 h-8 leading-7 text-center mt-8 ml-8 rounded cursor-pointer hover:bg-red-700 transition-colors"
        onClick={() => setChart(null)}
      >
        ×
      </span>
      <div className="w-full max-w-4xl mx-auto my-12 p-6 bg-[#18181ce6] border-2 border-gray-700 rounded-2xl">
        <div className="flex items-center mb-8">
          <img
            src={chart.coin.image}
            alt={chart.coin.name}
            className="w-10 h-10 mr-5"
          />
          <p className="text-2xl font-bold">{chart.coin.name}</p>
        </div>

        <div className="w-full h-80 mb-8">
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>

        <div className="flex justify-start gap-4 mb-8" onClick={typeHandler}>
          <button
            className={`${buttonBaseClass} ${
              type === "prices" ? selectedButtonClass : ""
            }`}
          >
            Prices
          </button>
          <button
            className={`${buttonBaseClass} ${
              type === "market_caps" ? selectedButtonClass : ""
            }`}
          >
            Market Caps
          </button>
          <button
            className={`${buttonBaseClass} ${
              type === "total_volumes" ? selectedButtonClass : ""
            }`}
          >
            Total Volumes
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <div className={detailItemClass}>
            <p className={detailLabelClass}>Prices: </p>
            <span>${chart.coin.current_price.toLocaleString()}</span>
          </div>
          <div className={detailItemClass}>
            <p className={detailLabelClass}>ATH: </p>
            <span>${chart.coin.ath.toLocaleString()}</span>
          </div>
          <div className={detailItemClass}>
            <p className={detailLabelClass}>Market Cap: </p>
            <span>${chart.coin.market_cap.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth={2} />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
