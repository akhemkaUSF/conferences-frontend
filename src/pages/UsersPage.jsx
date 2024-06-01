import AccountNav from "../AccountNav";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import BookingDates from "../BookingDates";
import {UserContext} from "../UserContext";

export default function SignupsPage() {
  const {user} = useContext(UserContext);
  const [users,setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    //returns all the bookings for the user in question
    axios.get('/users').then(response => {
      setUsers(response.data);
    });
    console.log(user);
    console.log(user.admin);
    if (!user.admin) {
        setRedirect(true);
    }
  }, []);

  async function saveAdmin(ev) {
    ev.preventDefault();
    await axios.put('/user', {
      admin
    });
  }

  if (redirect) {
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <div>
        {/*puts the Account Navigation header at the top*/}
      <div>
        {/*as long as the length of the bookings array is greater than 0, do the following*/}
        {users?.length > 0 && users.map(user => (
            //links to booking page using the id for the specific booking
            //${} is used to designate the parameter I guess
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{user.name}</h2>
              <h2 className="text-xl">{user.email}</h2>
              <div className="text-xl">
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <div className="flex gap-1">
                    <form onSubmit={saveAdmin}>
                        <div onChange={event => setAdmin("true"==event.target.value)}>
                            <input type="radio" value="true"/> Admin
                            <input type="radio" value="false"/> Not an Admin
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}