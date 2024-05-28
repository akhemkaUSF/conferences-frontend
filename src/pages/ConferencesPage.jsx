import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
export default function ConferencesPage() {
  const [conferences,setConferences] = useState([]);
  useEffect(() => {
    axios.get('/conferences').then(({data}) => {
      setConferences(conferences);
    });
  }, []);
  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-pink-600 text-white py-2 px-6 rounded-full" to={'/account/conferences/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new conference
          </Link>
        </div>
        <div className="mt-4">
            {/* shows each place using the conferences.map function*/}
          {conferences.length > 0 && conferences.map(conference => (
            <Link to={'/account/conferences/'+conference._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="grow-0 shrink">
                <h2 className="text-xl">{conference.name}</h2>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}