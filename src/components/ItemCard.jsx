import { FaComputer } from "react-icons/fa6";
function ItemCard(props) {
  const { typ, name, location, nextCareDate } = props;
  console.log(location);
  return (
    <div className="item__card--container">
      <div className="item__card--image">
        <FaComputer className="card__icons" />
      </div>
      <div className="item__card--details">
        <p className="card__details--title">{name}</p>
        <p className="card__details--room">
          {typ == "Laptop" ? (
            <>
              <span className="detail__subtitles">Besitzer:</span> {location}
            </>
          ) : (
            <>
              <span className="detail__subtitles">Raum:</span> {location}
            </>
          )}
        </p>
        <p className="card__details--next-date">
          <span className="detail__subtitles">Wartungstermin:</span>{" "}
          {new Date(nextCareDate).toLocaleDateString()}
        </p>
        <button id="sendEmailBtn">Send Email</button>
      </div>
    </div>
  );
}

export default ItemCard;
