import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <h1 className="text-6xl font-bold">BLAZE</h1>
      <Link to="/flights" className="text-5xl font-bold">
        FLIGHTS
      </Link>{" "}
      <br />
      <Link to="/hotels" className="text-5xl font-bold">
        HOTELS
      </Link>{" "}
      <br />
      <Link to="/account" className="text-5xl font-bold">
        ACCOUNT
      </Link>{" "}
      <br />
    </div>
  );
}
