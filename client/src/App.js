// App.js
import React, { useState, useEffect } from "react";
import List from "./List"
import "./App.css";


function App() {

  const initialList = [];
  const [list, setList] = React.useState(initialList);

  useEffect(() => {
    (async () => {
      fetch("/mfa")
        .then((res) => res.json())
        .then((json) => {
          setList(json);
          console.log("result ", json)
        })
        .catch(err => {
          console.log(err)
        })
    })();
  }, []);

  if (list.length === 0) {
    return <div>Loading List of Meter Data</div>
  } else {
    return (
      <div>
        <h1>My saved Meter Data</h1>
        <List>{list}</List>
      </div>
    )
  }
};

export default App;