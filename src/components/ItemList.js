import React from "react";
import { Card_Menu_Img } from "../elementary/URL";
import { useDispatch } from "react-redux";
import { addItem } from "../elementary/cartSlice";


const ItemList = ({ items}) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between transition-transform duration-300 hover:scale-105"
        >
          <div className="w-9/12">
            <div className="py-2 text-xl font-bold">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="p-4 font-serif text-xl">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
          <div className="absolute">
              <button
                className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
                onClick={() => handleAddItem(item)}
              >
                Add +
              </button>
            </div>
            <div className="w-56">
            <img src={Card_Menu_Img + item.card.info.imageId} className="w-48 h-52" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;