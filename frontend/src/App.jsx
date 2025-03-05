import { useEffect, useState } from "react";

import "./App.css";

function App() {
  async function test() {
    const response = await fetch("http://localhost:8080/test");
    const result = await response.json();
    console.log(result);
  }

  useEffect(() => {
    test();
  }, []);

  return <>Hello World</>;
}

export default App;
