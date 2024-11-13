import { useEffect, useState } from "react";

export default function AddPersonalForm() {
  const [personalList, setPersonList] = useState(
    JSON.parse(localStorage.getItem("personalList")) ?? []
  );
  const [personId, setPersonId] = useState(generateId());
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    department: "",
    jobTitle: "",
  });

  useEffect(() => {
    let isUnique = true;
    personalList.forEach((person) => {
      if (person.id == personId) isUnique = false;
    });
    if (isUnique) {
      localStorage.setItem("personalList", JSON.stringify(personalList));
    } else {
      alert("This personal already exists.");
    }
  }, [personalList]);

  function generateId() {
    let id = Math.floor(Math.random() * 1000);
    let isUnique = !personalList.some((personal) => personal.id == id);
    if (isUnique) {
      return id;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = {
      id: personId,
      ...formData,
    };
    let isUnique = !personalList.some((person) => person.id === personId);
    if (isUnique) {
      setPersonList((prev) => [...prev, person]);
      setPersonId(generateId());
      setFormData({
        name: "",
        surname: "",
        department: "",
        jobTitle: "",
      });
    } else {
      alert("This personal already exists.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add__form--container">
        <div className="form__part">
          <label
            onChange={handleInputChange}
            className="labels"
            htmlFor="personId"
          >
            Id :
          </label>
          <input value={personId} type="text" id="personId" disabled={true} />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="personName">
            Name :
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            name="personName"
            id="personName"
            value={formData.name}
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="personSurname">
            Surname :
          </label>
          <input
            value={formData.surname}
            onChange={handleInputChange}
            type="text"
            id="personSurname"
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="personDep">
            Department :
          </label>
          <input
            value={formData.department}
            onChange={handleInputChange}
            type="text"
            id="personDep"
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="personJobTitle">
            Job Title :
          </label>
          <input
            value={formData.jobTitle}
            onChange={handleInputChange}
            type="text"
            id="personJobTitle"
          />
        </div>
        <button className="btn">Add Person</button>
      </form>
    </>
  );
}
