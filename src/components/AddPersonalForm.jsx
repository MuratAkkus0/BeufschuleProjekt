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
          <label className="labels" htmlFor="id">
            Id :
          </label>
          <input value={personId} type="text" id="id" disabled={true} />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="name">
            Name :
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            name="name"
            id="personName"
            value={formData.name}
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="surname">
            Surname :
          </label>
          <input
            value={formData.surname}
            onChange={handleInputChange}
            type="text"
            name="surname"
            id="surname"
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="department">
            Department :
          </label>
          <input
            value={formData.department}
            onChange={handleInputChange}
            type="text"
            id="department"
            name="department"
          />
        </div>
        <div className="form__part">
          <label className="labels" htmlFor="jobTitle">
            Job Title :
          </label>
          <input
            value={formData.jobTitle}
            onChange={handleInputChange}
            type="text"
            id="jobTitle"
            name="jobTitle"
          />
        </div>
        <button className="btn">Add Person</button>
      </form>
    </>
  );
}
