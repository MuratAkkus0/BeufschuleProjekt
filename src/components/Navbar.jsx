import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <menu>
        <div className="app__logo">Wartungsterminen Verwalten</div>
        <li className="menu__item">
          <Link to={"/"}>Dashboard</Link>
        </li>
        <li className="menu__item">
          <Link to={"/add-item"}>Add New Device</Link>
        </li>
        <li className="menu__item">
          <Link to={"/add-personal"}>Add New Personal</Link>
        </li>
        <li className="menu__item">
          <Link to={"/add-room"}>Add New Room</Link>
        </li>
      </menu>
    </>
  );
}

export default Navbar;
