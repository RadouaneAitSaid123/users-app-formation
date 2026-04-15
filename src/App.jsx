import "./App.css";
import Navbare from "./components/navbar";
import Users from "./pages/users";

const App = () => {
  return (
    <>
      <Navbare />
      <div className="container mt-4">
        <Users />
      </div>
    </>
  );
};

export default App;
