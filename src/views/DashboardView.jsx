import Navbar from "../components/Navbar";
import AllItems from "../components/AllItems";
import TimePressedItems from "../components/TimePressedItems";

function DashboardView() {
  return (
    <>
      <Navbar />
      <div className="app__overview--container view__container">
        <TimePressedItems />
        <AllItems />
      </div>
    </>
  );
}

export default DashboardView;
