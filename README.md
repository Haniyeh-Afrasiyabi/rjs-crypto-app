# 💰 Crypto App

A modern **cryptocurrency tracking web application** built with **React.js** and **Tailwind CSS**, using the **CoinGecko API** to fetch real-time market data.  
You can search for coins, view live prices, charts, and detailed information for each cryptocurrency.

---

## 🚀 Features

- 🔍 **Search coins** by name or symbol with live suggestions
- 📊 **View real-time charts** (7-day price trends using Recharts)
- 💹 **Show market data** like price, 24h change, market cap, and volume
- 💱 **Switch between currencies** (USD, EUR, JPY)
- ⏳ **Loading states** with spinners for better UX
- 📈 **Dynamic modals** showing detailed coin charts
- 🧭 **Pagination** for browsing top market cap coins
- 🎨 **Responsive UI** with Tailwind CSS
- ⚙️ **API Integration** using CoinGecko’s free public API

---

## 🧩 Tech Stack

| Category               | Tools                            |
| ---------------------- | -------------------------------- |
| **Frontend Framework** | React 18                         |
| **Styling**            | Tailwind CSS                     |
| **Charts**             | Recharts                         |
| **Data Fetching**      | Fetch API + CoinGecko REST API   |
| **UI Components**      | React Loader Spinner             |
| **State Management**   | React useState + useEffect Hooks |

---

## 🧠 How It Works

The app displays a **paginated list of cryptocurrencies**, allowing users to navigate between pages easily.  
You can **click on any coin** to open a detailed modal that shows a **7-day price chart** along with full market data.  
Each coin includes live information such as **current price**, **market cap**, and **total volume**.

Users can **switch between currencies (USD, EUR, JPY)** to view values in their preferred currency.  
Additionally, you can **search for a specific coin** by name or symbol — once you click it, a modal appears with its **chart and detailed statistics**.  
This makes it easy to explore and compare cryptocurrencies in real time with a clean and responsive interface.

---

## 📁 Project Structure

```
src/
├── App.jsx
│
├── components/
│   ├── template/
│   │   └── HomePage.jsx
│   ├── modules/
│   │   ├── Chart.jsx
│   │   ├── Search.jsx
│   │   ├── TableCoin.jsx
│   │   └── Pagination.jsx
│   │
├── layouts/
│   └── Layout.jsx
├── helpers/
│   └── convertData.js
├── services/
│   └── cryptoApi.js
└── assets/
    ├── chart-up.svg
    └── chart-down.svg
```

---

## ⚡ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Haniyeh-Afrasiyabi/rjs-crypto-app.git
   cd crypto-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

---

## 🧩 Components Overview

| Component      | Description                                             |
| -------------- | ------------------------------------------------------- |
| **Layout**     | Header and footer wrapper                               |
| **HomePage**   | Main container managing states (coins, currency, chart) |
| **Search**     | Search input + dropdown for currency                    |
| **TableCoin**  | Displays coin list in table format                      |
| **Pagination** | Handles page navigation                                 |
| **Chart**      | Shows line chart of prices, market cap, and volume      |
