import ItemCard from "./ItemCard";
import "../assets/css/ItemList.css";

export default function TimePressedItems({
  deviceList,
  personalList,
  roomList,
  limit,
  showButton,
}) {
  console.log(limit && deviceList.length > limit);
  return (
    <>
      <div className="overview__items--time-pressed item__list">
        <div className="item__list--title">Service Wartung nähert sich: </div>
        <div className="time__pressed--items item__list--list">
          {deviceList.length
            ? deviceList
                .slice(0, limit ?? deviceList.length)
                .map((item) =>
                  item.typ == "Laptop" ? (
                    <ItemCard
                      key={item.id}
                      name={item.name}
                      location={
                        personalList.filter(
                          (person) => person.id == item.ownerId
                        )[0].name
                      }
                      nextCareDate={item.nextCareDate}
                      typ={item.typ}
                    />
                  ) : (
                    <ItemCard
                      key={item.id}
                      name={item.name}
                      location={
                        roomList.filter((room) => room.id == item.roomId)[0]
                          .name
                      }
                      nextCareDate={item.nextCareDate}
                      typ={item.typ}
                    />
                  )
                )
            : "item yok"}
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
