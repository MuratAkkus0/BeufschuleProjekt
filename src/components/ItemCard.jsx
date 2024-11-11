import { FaComputer } from "react-icons/fa6";
function ItemCard() {
  let obj = {
    name: "Computer 101",
    room: "Room 142",
    nextMaintenanceDate: "01/01/2025",
  };

  const { name, room, nextMaintenanceDate } = obj;

  return (
    <div className="item__card--container">
      <div className="item__card--image">
        <FaComputer className="card__icons" />
      </div>
      <div className="item__card--details">
        <p className="card__details--title">{name}</p>
        <p className="card__details--room">
          <span className="detail__subtitles">Room:</span> {room}
        </p>
        <p className="card__details--next-date">
          <span className="detail__subtitles">Wartungstermin:</span>{" "}
          {nextMaintenanceDate}
        </p>
        <button id="sendEmailBtn">Send Email</button>
      </div>
    </div>
  );
}

export default ItemCard;
