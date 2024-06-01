import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Navigate, useParams} from "react-router-dom";

export default function ConferenceSignupsPage() {
  const {conferenceID} = useParams();
  const [signups,setSignups] = useState([]);

  useEffect(() => {
    //returns all the bookings for the user in question
    axios.get('/conference-signups/' + conferenceID).then(response => {
      setSignups(response.data);
    });
    for (const signup of signups) {
      console.log(signup.user.name);
    }
  }, [conferenceID]);

  return (
    <div>
        {/*puts the Account Navigation header at the top*/}
      <AccountNav />
      <div>
        {/*as long as the length of the bookings array is greater than 0, do the following*/}
        {signups?.length > 0 && signups.map(signup => (
            //links to booking page using the id for the specific booking
            //${} is used to designate the parameter I guess
          <Link to={`/account/signups/${signup._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{signup.user.name}</h2>
              <div className="text-xl">
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="text-2xl">
                    Delegate Fee: ${signup.user.name}
                    Hotel Fee: ${signup.user.email}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}