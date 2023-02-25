import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/ping");
      if (response.ok) {
        const data = await response.json();
        setMessage(() => data.message);
      }
    })();
  }, []);
  return (
    <>
      <h1>{message}</h1>
    </>
  );
};

export default App;
