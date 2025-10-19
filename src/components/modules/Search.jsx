import { marketChart, getCoinDetail } from "../../services/cryptoApi";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { searchCoin } from "../../services/cryptoApi";

function Search({ currency, setCurrency, setChart }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();
  }, [text]);

  return (
    <div className="mt-12 relative flex flex-col sm:flex-row gap-4 items-start ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-72 md:w-80 h-12 px-4 text-base text-white bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        {(!!coins.length || isLoading) && (
          <div className="absolute top-14 left-0 w-72 md:w-80 h-80 rounded-lg overflow-y-auto bg-gray-900 border border-gray-700 shadow-lg z-20">
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <RotatingLines
                  width="50px"
                  height="50px"
                  strokeWidth="2"
                  strokeColor="#3874ff"
                />
              </div>
            )}
            {!isLoading && coins.length > 0 && (
              <ul className="w-full p-2">
                {coins.map((coin) => (
                  <SearchResult coin={coin} key={coin.id} setChart={setChart} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="h-12 px-3 bg-gray-800 border-0 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  );
}

export default Search;

function SearchResult({ coin, setChart }) {
  const [isLoading, setIsLoading] = useState(false);

  const showHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const [chartRes, coinRes] = await Promise.all([
        fetch(marketChart(coin.id)),
        fetch(getCoinDetail(coin.id)),
      ]);

      const [chartData, coinData] = await Promise.all([
        chartRes.json(),
        coinRes.json(),
      ]);

      const market = coinData.market_data;
      const fullCoin = {
        id: coin.id,
        name: coinData.name,
        image: coinData.image.small,
        current_price: market.current_price.usd,
        ath: market.ath.usd,
        market_cap: market.market_cap.usd,
      };

      setChart({ ...chartData, coin: fullCoin });
    } catch (error) {
      console.log(error);
      setChart(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      onClick={showHandler}
      className="flex items-center p-3 mb-1 rounded-md cursor-pointer hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0 last:mb-0"
    >
      <img
        src={coin.thumb}
        alt={coin.name}
        className="w-8 h-8 mr-3 rounded-full"
      />
      <div className="flex-1">
        <p className="text-white font-medium">{coin.name}</p>
        <p className="text-gray-400 text-sm">{coin.symbol?.toUpperCase()}</p>
      </div>
      {isLoading && (
        <div className="ml-2">
          <RotatingLines
            width="20px"
            height="20px"
            strokeWidth="2"
            strokeColor="#3874ff"
          />
        </div>
      )}
    </li>
  );
}
