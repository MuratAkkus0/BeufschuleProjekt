import AddRoomForm from "../components/AddRoomForm";
import Navbar from "../components/Navbar";

function AddRoomView() {
  return (
    <>
      <Navbar />
      <div className="add__room--container view__container">
        <AddRoomForm />
      </div>
    </>
  );
}

export default AddRoomView;
