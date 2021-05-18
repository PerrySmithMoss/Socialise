import React, { useState, useEffect } from "react";
import { setAccessKey } from "./auth/accessKey";
import { Routes } from "./Routes";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

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
    return (
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          m={1}
          p={1}
        >
          <Box p={1}>
            <CircularProgress size={125} />
          </Box>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
