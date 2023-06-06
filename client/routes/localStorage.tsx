import React from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export default function LocalStorage() {
  const [name, setName] = useLocalStorage("name", "Yo Momma");
  const [age, setAge] = useLocalStorage("age", 42);

  return (
    <div style={{ display: "grid", justifyContent: "center", alignItems: "center", marginLeft: "3em"}}>
          <div>
          <label htmlFor="name"><h2>Name</h2></label>
          <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} />
      </div><div>
              <label htmlFor="age"><h2>Age</h2></label>
              <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <br />
          <button onClick={() => window.location.reload()}>Refresh</button><p>
              To make sure useLocalStorage works as expected, change the values and
              refresh the page.
          </p><p>They should persist.</p>
    </div>
  );
}
