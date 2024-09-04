import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default App;
