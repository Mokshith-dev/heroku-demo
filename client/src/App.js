import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await axios.get("/api/movie");
        console.log(data.data);
        setData(data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <img src={data.poster} alt="poster" />
      <p>{data.title}</p>
      <p>{data.fullplot}</p>
    </div>
  );
}
