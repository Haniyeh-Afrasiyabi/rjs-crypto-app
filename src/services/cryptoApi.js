const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-unuivKPot1HczUyz77e2HXs8";
const getCoinList = (page, currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;

const searchCoin = (query) =>
  `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

const marketChart = (coin) =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`;

const getCoinDetail = (coin) =>
  `${BASE_URL}/coins/${coin}?x_cg_demo_api_key=${API_KEY}`;

export { getCoinList, searchCoin, marketChart, getCoinDetail };
