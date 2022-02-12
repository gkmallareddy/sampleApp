import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/getJsonPersons"),
      fetch("http://localhost:3001/getXmlPersons"),
    ]).then(async ([res1, res2]) => {
      const data1 = await res1.json();
      const data2 = await res2.json();
      setPersons([...data1, ...data2].sort((a, b) => (a.id > b.id ? 1 : -1)));
    });
  }, []);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
