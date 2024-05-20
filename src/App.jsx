import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from "react-router-dom";

import IndexPage from "./pages/Indexpage"
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "https://www.usfmunon.top/";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
    <Routes>
      <Route path ="/" element={<Layout />}>     
        <Route index element={<IndexPage></IndexPage>} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path ="/register" element={<RegisterPage />}/>
        <Route path = "/account" element={<AccountPage />}/>
        <Route path = "/account/:subpage?" element ={<AccountPage />}/>
        <Route path = "/account/:subpage/:action" element ={<AccountPage />}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
