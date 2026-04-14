import "./App.css";
import Navbare from "./components/Navbare";
import Users from "./pages/Users";

const App = () => {
  return (
    <>
      <Navbare />
      <div className="container mt-4">
        <Users></Users>
      </div>
    </>
  );
};

export default App;
