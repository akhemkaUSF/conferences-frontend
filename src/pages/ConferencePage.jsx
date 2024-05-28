import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";


export default function ConferencePage() {
  //sets the ID using the params passed in App.jsx  
  const {id} = useParams();
  const [conference,setConference] = useState(null);
  //don't do anything if id isn't present
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/conferences/${id}`).then(response => {
      setConference(response.data);
    });
  }, [id]);

  if (!conference) return '';



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{conference.name}</h1>
      {/*Links the address to a google maps link*/}
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          Start Date: {conference.startDate}<br />
          End Date: {conference.endDate}<br />
        </div>
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-pink-600 text-white py-2 px-6 rounded-full" to={'/account/signups/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new conference
          </Link>
        </div>
      </div>
    </div>
  );
}