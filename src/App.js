import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/header/Header";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NoMatch from "./components/NoMatch/NoMatch";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LogIn from "./components/LogIn/LogIn";
import Shipment from "./components/Shipment/Shipment";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipment"
          element={
            <PrivateRoute>
              <Shipment />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/product/:productKey" element={<ProductDetails />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
