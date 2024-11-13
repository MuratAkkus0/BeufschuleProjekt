import { useEffect, useRef, useState } from "react";
import "../assets/css/AddItemForm.css";
function AddItemForm() {
  const [deviceTyp, setDeviceTyp] = useState("Laptop");
  const [isLastStep, setIsLastStep] = useState(false);
  const [formStep, setFormStep] = useState(3);
  const [deviceId, setDeviceId] = useState(0);
  const newDevice = useRef({});
  const carePeriods = [1, 3, 6, 12, 24, 36];
  const personalList = [
    {
      id: 1,
      name: "Murat",
      surname: "Akkus",
      departmant: "Marketing",
      jobTitle: "Senior",
    },
    {
      id: 1,
      name: "Dimo",
      surname: "Backer",
      departmant: "Marketing",
      jobTitle: "Senior",
    },
    {
      id: 1,
      name: "Kjiel",
      surname: "Backer",
      departmant: "Marketing",
      jobTitle: "Senior",
    },
    {
      id: 1,
      name: "David",
      surname: "Backer",
      departmant: "Marketing",
      jobTitle: "Senior",
    },
  ];
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

  const generateDeviceId = () => {
    let id = Math.floor(Math.random() * 1000);
    setDeviceId(id);
  };
  useEffect(() => {
    if (formStep === 1) {
      setIsLastStep(true);
    }
  }, [formStep]);

  const checkStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.deviceMac.value);
    if (isLastStep) {
      newDevice.current = {
        id: deviceId,
        name: deviceTyp.split(" ")[0] + "-" + deviceId,
        typ: deviceTyp,
        carePeriod: e.target.carePeriod.value,
        purchaseDate: e.target.purchaseDate.value,
        MAC: e.target.deviceMac.value,
      };
    }
    console.log(newDevice, deviceTyp);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="add__item--form" id="addItem">
        <div className="form__part">
          <label htmlFor="deviceId">Gerät Id :</label>
          <input id="deviceId" type="text" disabled={true} value={deviceId} />
        </div>
        <div className="form__part">
          <label htmlFor="deviceType">Gerät Typ:</label>
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
        {formStep <= 2 ? (
          <div className="form__part">
            {deviceTyp === "Desktop Computer" ? (
              <>
                <label htmlFor="selectLocation">Raum:</label>
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
                <label htmlFor="deviceOwner">Gerätebesitzer:</label>
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
        {formStep <= 1 ? (
          <div className="form__part">
            <label htmlFor="carePeriod">Wartungsperiode:</label>
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
        <div className="form__part">
          <label htmlFor="deviceMAC">Gerät Mac Adresse (optional): </label>
          <input
            type="text"
            id="deviceMac"
            placeholder="etc. 00:00:5e:00:53:af"
            pattern="^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$"
          />
        </div>
        <div className="form__part">
          <label htmlFor="purchaseDate">Kaufdatum (optional):</label>
          <input type="date" name="purchaseDate" id="purchaseDate" />
        </div>
        <button onClick={checkStep} type="submit" className="btn">
          {isLastStep ? "Add Item" : "Next"}
        </button>
      </form>
    </>
  );
}

export default AddItemForm;
