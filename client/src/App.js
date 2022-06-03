// App.js
import React, { useState, useEffect } from "react";
import List from "./List"
import "./App.css";


function App() {

  const initialList = [];
  const [list, setList] = React.useState(initialList);

  useEffect(() => {
    (async () => {
      fetch("/table")
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
    return <div>Loading Table of Meter Data</div>
  } else {
    return (
      <div>
        <h1>Block Pro </h1>
        <h2>My Saved Meter Data</h2>
        <List>{list}</List>
      </div>
    )
  }
};

export default App;