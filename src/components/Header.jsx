import React from "react";
import { Button } from "flowbite-react";

export default function Header({ onToggleDrawer }) {
  return (
    <header>
      <div className="max-w-[1140px] flex justify-between items-center bg-gray-200 mx-auto p-2 px-4 rounded-md mb-2">
        <h1 className="text-xl font-bold">Countries</h1>
        <Button onClick={onToggleDrawer}>Tanlanganlar</Button>
      </div>
    </header>
  );
}
