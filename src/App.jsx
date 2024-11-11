import AllItems from "./components/AllItems";
import ItemCard from "./components/ItemCard";
import Navbar from "./components/Navbar";
import TimePressedItems from "./components/TimePressedItems";
function App() {
  return (
    <>
      <Navbar />
      <div className="app__overview--container">
        <TimePressedItems />
        <AllItems />
      </div>
    </>
  );
}

export default App;
