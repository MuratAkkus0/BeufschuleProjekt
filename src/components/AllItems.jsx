import ItemCard from "./ItemCard";
import "../assets/css/ItemList.css";

function AllItems({ deviceList, limit }) {
  return (
    <>
      <div className="overview__items--all item__list">
        <div className="item__list--title">Alle Geräte: </div>
        <div className="all__items--items item__list--list">
          {deviceList.length
            ? deviceList
                .slice(0, limit ?? deviceList.length)
                .map((item) => (
                  <ItemCard
                    key={item.id}
                    name={item.name}
                    room="142"
                    nextCareDate={item.nextCareDate}
                  />
                ))
            : ""}
        </div>
        {limit && deviceList.length > limit ? (
          <div className="show__more--btn">
            <a href="#" className="btn">
              Show More
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AllItems;
