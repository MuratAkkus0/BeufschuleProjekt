import ItemCard from "./ItemCard";
import "../assets/css/ItemList.css";

function AllItems({ showBtn }) {
  return (
    <>
      <div className="overview__items--all item__list">
        <div className="item__list--title">Alle Geräte: </div>
        <div className="all__items--items item__list--list">
          <ItemCard />
          <ItemCard />
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

export default AllItems;
