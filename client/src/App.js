
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  try {

    React.useEffect(() => {
      fetch("http://localhost:3001/api", {
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div>
    );
  } catch (error) {
    console.log(error)
  }
}

export default App;