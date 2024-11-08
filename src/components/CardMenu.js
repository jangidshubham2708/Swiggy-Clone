import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card_Menu_Api } from "../elementary/URL";
import ShimmerMenu from "./ShimmerMenu";
import CardMenuCategory from "./CardMenuCategory";

const CardMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(Card_Menu_Api + resId);
    const json = await data.json();
    setResInfo(json.data);
    console.log(json);
  };

  if (resInfo === null) return <ShimmerMenu />;

  const { text } = resInfo?.cards[0]?.card?.card || {};
  const { cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center ">
      <h1 className="font-bold my-6 text-2xl ">{text}</h1>
      <p className="font-bold text-lg">
        {cuisines?.length > 0 ? cuisines.join(", ") : "No cuisines available"} -{" "}
        {costForTwoMessage || "Cost information not available"}
      </p>
      {categories.map((category, index) => (
        <CardMenuCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    </div>
  );
};

export default CardMenu;
