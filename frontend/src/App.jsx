import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Account from "./pages/Account";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Header />
      <Routes>
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}
