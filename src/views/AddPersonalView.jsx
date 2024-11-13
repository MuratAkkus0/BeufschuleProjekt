import AddPersonalForm from "../components/AddPersonalForm";
import Navbar from "../components/Navbar";

function AddPersonalView() {
  return (
    <>
      <Navbar />
      <div className="add__personal--container view__container">
        <AddPersonalForm />
      </div>
    </>
  );
}

export default AddPersonalView;
