import { useEffect, useRef, useState } from "react";
import "../assets/css/AddItemForm.css";
import FormPartInput from "./formParts/FormPartInput";
import FormPartSelect from "./formParts/FormPartSelect";
import FormPartDate from "./formParts/FormPartDate";
function AddItemForm() {
  const [deviceTyp, setDeviceTyp] = useState("Laptop");
  const [isLastStep, setIsLastStep] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [deviceId, setDeviceId] = useState(0);
  const newDevice = useRef({});
  const [deviceList, setDeviceList] = useState(
    JSON.parse(localStorage.getItem("devices")) ?? []
  );
  const [personalList, setPersonalList] = useState(
    JSON.parse(localStorage.getItem("personalList")) ?? []
  );
  const [roomList, setRoomList] = useState(
    JSON.parse(localStorage.getItem("roomList")) ?? []
  );
  const totalFormSteps = useRef(6);
  const carePeriods = [1, 3, 6, 12, 24, 36];

  useEffect(() => {
    generateDeviceId();
  }, []);

  useEffect(() => {
    if (formStep === totalFormSteps.current) {
      setIsLastStep(true);
    }
  }, [formStep]);

  const generateDeviceId = () => {
    let id = Math.floor(Math.random() * 1000);
    let isUnique = !deviceList.some((device) => device.id == id);
    if (isUnique) {
      setDeviceId(id);
    } else {
      generateDeviceId();
    }
  };

  const checkStep = () => {
    if (formStep <= totalFormSteps.current) {
      setFormStep(formStep + 1);
    }
  };

  const checkDeviceIds = () => {};

  const setItemToLS = (item) => {
    let isUnique = true;
    deviceList.forEach((device) => {
      if (device.id == item.id) isUnique = false;
    });
    if (isUnique) {
      deviceList.push(item);
      localStorage.setItem("devices", JSON.stringify(deviceList));
    } else {
      alert("This device is already exists.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLastStep) {
      //if last care date not older than purchase date and if it exists control
      let lastCareDate =
        new Date(e.target.lastCareDate.value) >=
        new Date(e.target.purchaseDate.value)
          ? e.target.lastCareDate.value
          : e.target.purchaseDate.value;

      let diffLastCareToday = new Date(
        new Date() - new Date(lastCareDate)
      ).getMonth();

      newDevice.current = {
        id: deviceId,
        name: deviceTyp.split(" ")[0] + "-" + deviceId,
        typ: deviceTyp,
        carePeriod: e.target.carePeriod.value,
        purchaseDate: e.target.purchaseDate.value,
        MAC: e.target.deviceMAC.value ?? "",

        [deviceTyp == "Laptop" ? "ownerId" : "roomId"]: e.target.location.value,

        lastCareDate: lastCareDate,
        createDate: new Date().toJSON().slice(0, 10),

        nextCareDate: new Date(
          new Date(lastCareDate).setMonth(
            new Date(lastCareDate).getMonth() + +e.target.carePeriod.value
          ) >= new Date()
            ? new Date(lastCareDate).setMonth(
                new Date(lastCareDate).getMonth() + +e.target.carePeriod.value
              )
            : new Date()
        )
          .toJSON()
          .slice(0, 10),
      };

      setItemToLS(newDevice.current);
      generateDeviceId();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="add__form--container"
        id="addItem"
      >
        <FormPartInput
          labelText="Gerät Id :"
          labelFor="deviceId"
          inputValue={deviceId}
          isDisabled={true}
        />
        <FormPartSelect
          selectValue={deviceTyp}
          onValueChange={(e) => setDeviceTyp(e.target.value)}
          labelText="Gerät Typ:"
          labelFor="deviceType"
          optionList={["Laptop", "Desktop Computer"]}
        />

        {formStep >= 2 ? (
          <>
            {deviceTyp === "Desktop Computer" ? (
              <>
                <FormPartSelect
                  labelText="Raum:"
                  labelFor="location"
                  optionList={roomList.map((item) => item.name)}
                  optionValue={roomList.map((item) => item.id)}
                />
              </>
            ) : (
              <>
                <FormPartSelect
                  labelText="Gerätebesitzer:"
                  labelFor="location"
                  optionList={personalList.map(
                    (item) => item.name + " " + item.surname
                  )}
                  optionValue={personalList.map((item) => item.id)}
                />
              </>
            )}
          </>
        ) : (
          ""
        )}
        {formStep >= 3 ? (
          <>
            <FormPartSelect
              labelText="Wartungsperiode:"
              labelFor="carePeriod"
              optionalTextFirst="jeder"
              optionalTextLast="Monat"
              optionList={carePeriods}
            />
          </>
        ) : (
          ""
        )}

        {formStep >= 4 ? (
          <>
            <FormPartInput
              labelText="Gerät Mac Adresse (optional):"
              labelFor="deviceMAC"
              placeHolder="etc. 00:00:5e:00:53:af"
              inputPattern="^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$"
            />
          </>
        ) : (
          ""
        )}
        {formStep >= 5 ? (
          <>
            <FormPartDate
              labelText="Kaufdatum:"
              labelFor="purchaseDate"
              isRequired={true}
            />
          </>
        ) : (
          ""
        )}
        {formStep >= 6 ? (
          <FormPartDate
            labelText="Last Care Date (optional):"
            labelFor="lastCareDate"
          />
        ) : (
          ""
        )}
        <button onClick={checkStep} type="submit" className="btn">
          {isLastStep ? "Add Item" : "Next"}
        </button>
      </form>
    </>
  );
}

export default AddItemForm;
