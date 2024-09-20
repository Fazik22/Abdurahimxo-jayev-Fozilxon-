import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export function HeroCarousel() {
  const selectedCoins = useSelector((state) => state.selectedCoins);

  if (selectedCoins.length === 0) {
    return null;
  }

  const coinGroups = chunkArray(selectedCoins, 4);

  return (
    <div className="mb-8">
        {/* <Carousel leftControl="left" rightControl="right" style={{backgroundImage: "public\Carousel_background.jpg"}}> */}
        {/* {coinGroups.map((group, index) => (
          <div key={index} className="flex justify-center gap-4">
            {group.map((coin) => (
              <img key={coin.id} src={coin.image} alt={coin.name} className="w-20 h-20" />
            ))}
          </div>
        ))} */}
      {/* </Carousel> */}
    </div>
  );
}
