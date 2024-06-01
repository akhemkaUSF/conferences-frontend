import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/Indexpage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import ConferencesPage from "./pages/ConferencesPage";
import ConferencesFormPage from "./pages/ConferencesFormPage";
import SignupsFormPage from "./pages/SignupsFormPage.jsx";
import AccountSignupsFormPage from "./pages/AccountSignupsFormPage.jsx";

import ConferencePage from "./pages/ConferencePage";
import SignupsPage from "./pages/SignupsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

axios.defaults.baseURL = "https://www.backend.usfmunon.top";
axios.defaults.withCredentials = true;

//self-explanatory

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/conferences" element={<ConferencesPage />} />
          <Route path="/account/conferences/new" element={<ConferencesFormPage />} />
          <Route path="/account/conferences/:id" element={<ConferencesFormPage />} />
          <Route path="/conference/:id" element={<ConferencePage />} />
          <Route path="/account/signups" element={<SignupsPage />} />
          <Route path="/account/signups/:id" element={<AccountSignupsFormPage />} />
          <Route path ="/account/newsignup/:conferenceID" element={<SignupsFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App