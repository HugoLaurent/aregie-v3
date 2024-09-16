import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null); // État pour stocker les données des recettes

  useEffect(() => {
    const fetchRecettes = async () => {
      const response = await fetch(
        "/api/recettes?regie=1&searchAdd=false&searchIn=false&date=13-11-2023&search=false&start=1&end=22&tickets=%7B%22type%22%3A%22recette%22%2C%22code%22%3A%5B0%5D%7D&colonne=date&ascending=false",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "4DSID": "BF0D6035CF98794D963E3EA0A7393CD3",
          },
        }
      );

      if (!response.ok) {
        // Check for status codes and handle specific errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response);
      const json = await response.json();

      console.log(json);
    };

    fetchRecettes();
  }, []);

  console.log(data); // Log des données dans la console
  console.log("coucou");

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}{" "}
      {/* Affiche les données des recettes si elles existent */}
    </div>
  );
}
// https://localhost:8443/ws/recettes?regie=1&searchAdd=false&searchIn=false&date=13-11-2023&search=false&start=1&end=22&tickets=%7B%22type%22%3A%22recette%22%2C%22code%22%3A%5B0%5D%7D&colonne=date&ascending=false
