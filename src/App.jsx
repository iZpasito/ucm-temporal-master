import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agendar from "./components/paginas/PagAgendar";
import AdmAgendar from "./components/paginas/AdmAgendar";
import Login from "./components/paginas/login";
import PageError from "./components/paginas/page-error";
import AdmInformes from "./components/paginas/AdmInformes";
import { createContext, useEffect, useState } from "react";


export const LoginContext = createContext({});

function App() {
    const [loggedIn, setLoggedIn] = useState(
        sessionStorage.access ? true : false
    );

    function getUser(){
        return sessionStorage.getItem('rol');
    }

  useEffect(() => {
    function refreshTokens() {
        if (sessionStorage.refresh) {
            const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/login/user/refresh-token/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: sessionStorage.getItem('refresh'),
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log('xd',data.access)
                    sessionStorage.access = data.access;
                    sessionStorage.refresh = data.refresh;
                    setLoggedIn(true);
                });
        }
    }

    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 1);
}, []);

function changeLoggedIn(value) {
    setLoggedIn(value);
    
    if (value === false) {
        localStorage.clear();
    }

}

  return (
    
  <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
  <BrowserRouter>
          <Routes>
            {getUser() === "USUARIO" && (
                <>
                <Route path="/user/mis-reservas" element={<Agendar />} />
                <Route path="/user/agendar" element={<Agendar />} />
                </>
            )}
            {getUser() === "ADMIN" && (
                <>
                <Route path="/adm/agendar" element={<AdmAgendar/>} />
                <Route path="/adm/informes" element={<AdmInformes/>} />
                </>
            )}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/404" element={<PageError  />} />
              <Route path="*" element={<PageError />} />
          </Routes>
  </BrowserRouter>
</LoginContext.Provider>
);
}

export default App;
