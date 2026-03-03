import SearchFlightsForm from "../components/SearchForm";
import { useState } from "react";

export default function Flights() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [] = useState();

  return (
    <div>
      <SearchFlightsForm />
    </div>
  );
}
