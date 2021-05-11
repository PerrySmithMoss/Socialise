import React, { useState, useEffect } from "react";
import { setAccessKey } from "./auth/accessKey";
import { Routes } from "./Routes";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      // console.log(accessToken);
      setAccessKey(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
