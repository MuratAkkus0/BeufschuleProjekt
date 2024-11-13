import { useEffect, useRef, useState } from "react";
import "../assets/css/AddItemForm.css";
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
  const totalFormSteps = useRef(5);
  const carePeriods = [1, 3, 6, 12, 24, 36];

  const deviceLocationsList = [
    {
      ortId: 1,
      ortName: "Raum 143",
      ortCapacity: 12,
    },
    {
      ortId: 2,
      ortName: "Raum 144",
      ortCapacity: 12,
    },
    {
      ortId: 3,
      ortName: "Raum 145",
      ortCapacity: 12,
    },
    {
      ortId: 4,
      ortName: "Raum 146",
      ortCapacity: 12,
    },
  ];

  useEffect(() => {
    generateDeviceId();
  }, []);

  useEffect(() => {
    if (formStep === totalFormSteps.current) {
      setIsLastStep(true);
    }
  }, [formStep]);

  const generateDeviceId = () => {
    let isUnique = true;
    let id = Math.floor(Math.random() * 1000);
    deviceList.forEach((item) => {
      if (item.id == id) isUnique = false;
    });
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
    console.log(formStep);
    if (isLastStep) {
      newDevice.current = {
        id: deviceId,
        name: deviceTyp.split(" ")[0] + "-" + deviceId,
        typ: deviceTyp,
        carePeriod: e.target.carePeriod.value,
        purchaseDate: e.target.purchaseDate.value,
        MAC: e.target.deviceMac.value,
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
        <div className="form__part">
          <label className="labels" htmlFor="deviceId">
            Gerät Id :
          </label>
          <input id="deviceId" type="text" disabled={true} value={deviceId} />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="deviceType">
            Gerät Typ:
          </label>
          <select
            value={deviceTyp}
            onChange={(e) => setDeviceTyp(e.target.value)}
            name="deviceType"
            id="deviceType"
          >
            <option value="Laptop">Laptop</option>
            <option value="Desktop Computer">Desktop Computer</option>
          </select>
        </div>
        {formStep >= 2 ? (
          <div className="form__part">
            {deviceTyp === "Desktop Computer" ? (
              <>
                <label className="labels" htmlFor="selectLocation">
                  Raum:
                </label>
                <select name="selectLocation" id="selectLocation">
                  {deviceLocationsList.map((item, index) => {
                    return (
                      <option key={index} value={item.ortName}>
                        {item.ortName}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              <>
                <label className="labels" htmlFor="deviceOwner">
                  Gerätebesitzer:
                </label>
                <select name="deviceOwner" id="deviceOwner">
                  {personalList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name} {item.surname}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
          </div>
        ) : (
          ""
        )}
        {formStep >= 3 ? (
          <div className="form__part">
            <label className="labels" htmlFor="carePeriod">
              Wartungsperiode:
            </label>
            <select name="carePeriod" id="carePeriod">
              {carePeriods.map((item, index) => (
                <option key={index} value={item}>
                  jeder {item} Monate
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}

        {formStep >= 4 ? (
          <div className="form__part">
            <label className="labels" htmlFor="deviceMAC">
              Gerät Mac Adresse (optional):{" "}
            </label>
            <input
              type="text"
              id="deviceMac"
              placeholder="etc. 00:00:5e:00:53:af"
              pattern="^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$"
            />
          </div>
        ) : (
          ""
        )}
        {formStep >= 5 ? (
          <div className="form__part">
            <label className="labels" htmlFor="purchaseDate">
              Kaufdatum (optional):
            </label>
            <input type="date" name="purchaseDate" id="purchaseDate" />
          </div>
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
