import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [conferences,setConferences] = useState([]);
  useEffect(() => {
    //populates conferences array with all the conferences in the database
    axios.get('/conferences').then(response => {
      setConferences(response.data);
    });
  }, []);
  return (
    //creates it as a grid 
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {/*for each value in the conferences array do the following*/}
      {conferences.length > 0 && conferences.map(place => (
        //{/*links to the individual conferences page using the id*/}
        <Link to={'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {/*displays the first photo in the conferences array of photos
            Question mark ensures that if photos does not exist or is null or undefined, the code does not throw an error 
            */}
            {conference.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={conference.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{conference.address}</h2>
          <h3 className="text-sm text-gray-500">{conference.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${conference.price}</span> per night
          </div>
          {/*the structure of the conference entry is such that wherever we click inside the box, it'll take us to the specific conference page*/}
        </Link>
      ))}
    </div>
  );
}