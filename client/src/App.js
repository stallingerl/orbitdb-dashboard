// App.js
import React, { useState, useEffect } from "react";

import Table  from "./Table";
import "./App.css";


function App() {

  const [meterData, setData] = useState(null);

  useEffect(() => {
    (async () => {
      fetch("/mfa")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          console.log("result ", json)
        })
        .catch(err => {
          console.log(err)
        })
    })();
  }, []);


  if (!meterData) {
    return <div className="App">Table is Loading ...</div>
  } else {
    return (
      <div>
        <Table
          data={meterData}
          col_labels={['Id', 'Timestamp', 'Energy', 'Pinned']} />
      </div>
    );
  }
}

export default App;