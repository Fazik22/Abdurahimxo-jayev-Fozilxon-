import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { addCoin, removeCoin } from "../store/selectedCoinsSlice";

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow: "absolute left-0 top-0 -z-10 bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-[#87CEEB] px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-[#16171A] even:bg-[#16171A] odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

export default function HeroSection({ totalPages, currentPage, currency }) {
  const [coins, setCoins] = useState([]);
  const selectedCoins = useSelector((state) => state.selectedCoins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${totalPages}&page=${currentPage}&sparkline=false&price_change_percentage=24h`
        );

        if (!response.ok) {
          throw new Error("Error fetching coins");
        }

        const fetchedCoins = await response.json();
        setCoins(fetchedCoins);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCoins();
  }, [currency, totalPages, currentPage]);

  function handleSelectCoin(coin, selected) {
    if (selected) {
      dispatch(removeCoin(coin.id));
    } else {
      const selectedCoin = {
        id: coin.id,
        price: coin.current_price,
        image: coin.image,
      };
      dispatch(addCoin(selectedCoin));
    }
  }

  function isCoinSelected(id) {
    const selected = selectedCoins.some((coin) => coin.id === id);
    return selected;
  }

  return (
    <section>
      <img src="public\Carousel_background.jpg" alt="" />
      <div className="px-[320px]">
        <h2 className="text-center mb-4 text-white text-4xl font-no">
          Cryptocurrency Prices by Market Cap
        </h2>

        <div>
          <Table striped theme={customTheme}>
            <TableHead>
              <TableHeadCell>
                <h3>Coin</h3>
              </TableHeadCell>
              <TableHeadCell>
                <h3>Price</h3>
              </TableHeadCell>
              <TableHeadCell>
                <h3>24h Change</h3>
              </TableHeadCell>
              <TableHeadCell>
                <h3>Market Cap</h3>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {coins.map((coin) => {
                const selected = isCoinSelected(coin.id);
                return (
                  <Table.Row
                    key={coin.id}
                    className="bg-white dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => navigate(`/coins/${coin.id}`)}
                    >
                      <div className="flex gap-4">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-[50px] h-[50px]"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-white">
                            {coin.symbol.toUpperCase()}
                          </h3>
                          <p className="text-[#A9A9A9]">{coin.name}</p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-white">{coin.current_price}</p>
                    </Table.Cell>
                    <Table.Cell
                      className={
                        coin.price_change_percentage_24h > 0
                          ? "text-[#0ECB81] flex gap-4 py-8"
                          : "text-[#FF0000] flex gap-4 py-8"
                      }
                    >
                      <button
                        onClick={() => handleSelectCoin(coin, selected)}
                        className={selected ? "text-lime-500" : "text-white"}
                      >
                        <IoMdEye />
                      </button>
                      <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className="text-white">{coin.market_cap}</p>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
