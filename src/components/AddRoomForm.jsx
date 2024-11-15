import { useEffect, useState } from "react";
import FormPartInput from "./formParts/FormPartInput";
function AddRoomForm() {
  const [roomList, setRoomList] = useState(
    JSON.parse(localStorage.getItem("roomList")) ?? []
  );
  const [roomId, setRoomId] = useState(generateId());
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    localStorage.setItem("roomList", JSON.stringify(roomList));
  }, [roomList]);

  function generateId() {
    let id = Math.floor(Math.random() * 1000);
    let isUnique = !roomList.some((room) => room.id == id);
    if (isUnique) {
      return id;
    } else {
      generateId();
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomList((prev) => [...prev, { id: roomId, name: roomName }]);
    setRoomId(generateId());
    setRoomName("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="add__form--container">
        <FormPartInput
          labelText="Id :"
          labelFor="id"
          inputValue={roomId}
          isDisabled={true}
        />
        <FormPartInput
          onValueChange={(e) => setRoomName(e.target.value)}
          labelText="Name :"
          labelFor="name"
          inputValue={roomName}
          isDisabled={false}
          isRequired={true}
        />

        <button className="btn">Add Room</button>
      </form>
    </>
  );
}

export default AddRoomForm;
