import { marketChart, getCoinDetail } from "../../services/cryptoApi";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { searchCoin } from "../../services/cryptoApi";
import styles from "./Search.module.css";

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
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="2"
              strokeColor="#3874ff"
            />
          )}
          <ul>
            {coins.map((coin) => (
              <SearchResult coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

function SearchResult({ coin, setChart }) {
  const showHandler = async () => {
    try {
      // دو درخواست هم‌زمان: یکی برای داده‌های نمودار، یکی برای اطلاعات بازار
      const [chartRes, coinRes] = await Promise.all([
        fetch(marketChart(coin.id)),
        fetch(getCoinDetail(coin.id)),
      ]);

      const [chartData, coinData] = await Promise.all([
        chartRes.json(),
        coinRes.json(),
      ]);

      console.log(coinData);

      // از market_data داده‌های قیمت، ATH و مارکت کپ گرفته میشه
      const market = coinData.market_data;
      const fullCoin = {
        id: coin.id,
        name: coinData.name,
        image: coinData.image.small,
        current_price: market.current_price.usd,
        ath: market.ath.usd,
        market_cap: market.market_cap.usd,
      };

      // حالا هر دو داده رو باهم می‌فرستیم به setChart
      setChart({ ...chartData, coin: fullCoin });
    } catch (error) {
      console.log(error);
      setChart(null);
    }
  };

  return (
    <li key={coin.id} onClick={showHandler}>
      <img src={coin.thumb} alt={coin.name} />
      <p>{coin.name}</p>
    </li>
  );
}
