import { FaComputer } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
function ItemCard(props) {
  const { id, typ, name, location, nextCareDate, onClickItem } = props;

  return (
    <div onClick={onClickItem} data-id={id} className="item__card--container">
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
      <div className="del__item">
        <MdDeleteForever className="del__icon" />
      </div>
    </div>
  );
}

export default ItemCard;
