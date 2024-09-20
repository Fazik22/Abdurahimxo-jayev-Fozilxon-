import { Button, Drawer } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCoin } from "../store/selectedCoinsSlice";
import { Link } from "react-router-dom";

export default function Header({ onCurrencyChange }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedCoins = useSelector((state) => state.selectedCoins);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleRemoveCoin = (id) => {
    dispatch(removeCoin(id));
  };

  return (
    <header className="flex justify-between px-[320px] pt-5 pb-3">
      <Link className="text-[#87CEEB] text-xl" to="/">
        CRYPTOFOLIO
      </Link>

      <div className="flex">
        <select
          className="bg-[#16171A] text-white mr-4 border-none"
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="aed">AED</option>
        </select>
        <Button onClick={toggleDrawer} className="bg-[#87CEEB] text-black">
          WATCH LIST
        </Button>

        <Drawer position="right" onClose={toggleDrawer} open={isDrawerOpen} className="bg-[#515151] p-9 w-[500px]">
            <h5 className="text-xl font-semibold text-white text-center mb-10">
              WATCH LIST
            </h5>

          <Drawer.Items className="grid grid-rows-2 grid-cols-2 gap-10"> 
            {selectedCoins.length > 0 ? (
              selectedCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex flex-col bg-[#14161A] px-10 py-4 gap-9 rounded-3xl"
                >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-[118px] h-[118px]"
                    />
                    <div className="flex flex-col">
                      <p className="text-[#A9A9A9] text-center mb-4">{coin.price}</p>
                  <button
                    onClick={() => handleRemoveCoin(coin.id)}
                    className="text-xl bg-red-600 text-white block"
                    >
                    Remove
                  </button>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">
                No coins in your watch list.
              </p>
            )}
          </Drawer.Items>
        </Drawer>
      </div>
    </header>
  );
}
