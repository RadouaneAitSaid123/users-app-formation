import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import Navbar from "./components/Navbar";
import UserDetails from "./pages/User";
import NotFoundPage from "./pages/NotFound";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";

const Home = () => "Home Page";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users">
              <Route index element={<Users />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path=":id" element={<UserDetails />} />
            </Route>

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
