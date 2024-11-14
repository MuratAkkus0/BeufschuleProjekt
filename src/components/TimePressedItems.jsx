import ItemCard from "./ItemCard";
import "../assets/css/ItemList.css";

export default function TimePressedItems() {
  return (
    <>
      <div className="overview__items--time-pressed item__list">
        <div className="item__list--title">Service Wartung nähert sich: </div>
        <div className="time__pressed--items item__list--list">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
        <div className="show__more--btn">
          <a href="#" className="btn">
            Show More
          </a>
        </div>
      </div>
    </>
  );
}
