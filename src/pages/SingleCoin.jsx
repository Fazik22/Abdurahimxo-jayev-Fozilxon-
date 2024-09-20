import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/chart";

function SingleCoin({ currency }) {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );

        if (!response.ok) {
          throw new Error("Error fetching coin details");
        }
        const coinData = await response.json();
        setCoin(coinData);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCoin();
  }, [id]);

  if (!coin) return <div>No coin found</div>;

  const description = coin.description?.en || "";

  const truncateByWords = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="flex gap-10">
      <div className="max-w-[547px] px-6 border-r-2 border-[#808080]">
        <div className="text-center mb-5">
          <img
            src={coin.image?.large}
            alt={coin.name}
            className="w-[200px] h-[200px] ml-36"
          />
          <h4 className="text-5xl font-bold text-white mt-5">
            <strong>{coin.name}</strong>
          </h4>
        </div>

        <p
          className="text-white opacity-80"
          dangerouslySetInnerHTML={{
            __html: showFullDescription
              ? description
              : truncateByWords(description, 30),
          }}
        />

        {description.split(" ").length > 30 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-500"
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}

        <div className="mt-5">
          <p className="text-2xl text-white font-bold mb-5">
            Rank: {coin.market_cap_rank}
          </p>
          <p className="text-2xl text-white font-bold mb-5">
            Current Price:{" "}
            {coin.market_data?.current_price?.[currency.toLowerCase()]}{" "}
            {currency.toUpperCase()}
          </p>
          <p className="text-2xl text-white font-bold mb-5">
            Market Cap: {coin.market_data?.market_cap?.[currency.toLowerCase()]}{" "}
            {currency.toUpperCase()}
          </p>
        </div>
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  );
}

export default SingleCoin;
