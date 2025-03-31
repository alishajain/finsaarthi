import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AddClient from "./Components/AddClient";
import Clients from "./Components/Clients";
import AddDeal from "./Components/AddDeal";
import Deals from "./Components/Deals";
import AddPayment from "./Components/AddPayment";
import Payments from "./Components/Payments";
import Records from "./Components/Records";
import DealDetails from "./Components/DealDetails";
import Home from "./Pages/Home";

const App = () => {
   return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
 
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/clients" element={<Clients />} />

          <Route path="/add-deal" element={<AddDeal />} />
          <Route path="/deals" element={<Deals />} />

          <Route path="/add-payment" element={<AddPayment />} />
          <Route path="/payments" element={<Payments />} />

          <Route path="/records" element={<Records />} />
          <Route path="/deal-details" element={<DealDetails />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
