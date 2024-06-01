import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import ConferencesPage from "./ConferencesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  //go to login if our user doesn't exist and the page has already loaded
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  //instead of setting redirect to a boolean, it sets redirect to a string, and sends our website there
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
       {!user.admin && (
            <div className="text-center">
            <Link className="inline-flex gap-1 bg-pink-600 text-white py-2 px-6 rounded-full" to={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              Admin Page
            </Link>
          </div>
        )}
      {subpage === 'conferences' && (
        <ConferencesPage />
      )}
    </div>
  );
}