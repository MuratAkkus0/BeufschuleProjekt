import { useState } from "react";
import { FaComputer } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { GiLaptop } from "react-icons/gi";

function ItemCard(props) {
  const {
    setDeviceList,
    id,
    typ,
    name,
    location,
    nextCareDate,
    onClickItem,
    technicerEmail,
  } = props;
  const [deviceList, setDeviceListLS] = useState(
    JSON.parse(localStorage.getItem("devices")) || []
  );
  const deleteItem = (e) => {
    e.stopPropagation();

    let newList = deviceList.filter((item) => item.id !== id);
    localStorage.setItem("devices", JSON.stringify(newList));
    console.log(setDeviceList);
    setDeviceList([...newList]);
  };

  async function sendEmail(e) {
    e.stopPropagation();
    try {
      if ((typ, id, location)) {
        axios.post("https://beufschule-projekt.vercel.app/send_mail", {
          deviceId: id,
          deviceLocation: location,
          deviceTyp: typ,
          technicerEmail: technicerEmail,
        });
      }
      alert("Email sucessfully sended.");
    } catch (error) {
      console.log("send Email: ", error);
    }
  }

  return (
    <div onClick={onClickItem} data-id={id} className="item__card--container">
      <div className="item__card--image">
        {typ == "Laptop" ? (
          <GiLaptop className="card__icons" />
        ) : (
          <FaComputer className="card__icons" />
        )}
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
        <button onClick={sendEmail} id="sendEmailBtn">
          Send Email
        </button>
      </div>
      <div onClick={deleteItem} className="del__item">
        <MdDeleteForever className="del__icon" />
      </div>
    </div>
  );
}

export default ItemCard;
