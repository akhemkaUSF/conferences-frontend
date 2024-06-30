import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import TravelAdder from "../TravelAdder.jsx";
import AdminNav from "../AdminNav.jsx";

export default function ItineraryFormPage() {
    const {conferenceID} = useParams();
    console.log("console.log test of conferenceID")
    console.log(conferenceID);
    const [travels, setTravels] = useState([]);
  useEffect(() => {
    axios.get('/travels/').then(response => {
       const {data} = response;
       setTravels(data);
    });
  }, []);
  
  return (
    <div>
    <AdminNav/>
  <div>
    <TravelAdder id={null} conferenceID={conferenceID}/>
    {travels?.length > 0 && travels.map(travel => (
        <div className="py-3 pr-3 grow">
            <TravelAdder id={travel._id} conferenceID={conferenceID}/>
        </div>
    ))}
  </div>
</div> 
);
}