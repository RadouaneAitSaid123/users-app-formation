import { BrowserRouter, Route, Routes } from "react-router";

import "./App.css";
import Navbare from "./components/navbar";
import Users from "./pages/users";
import UserDetails from "./pages/user";
import NotFoundPage from "./pages/not-found";
import AddUser from "./pages/add-user";

const Home = () => "Home Page";

const App = () => {
  return (
    <>
      <Navbare />
      <div style={{ margin: 4 }}>
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
