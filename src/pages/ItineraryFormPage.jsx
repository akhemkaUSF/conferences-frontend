import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import TravelAdder from "../TravelAdder.jsx";
import AdminNav from "../AdminNav.jsx";

export default function ItineraryFormPage() {
    const {conferenceId} = useParams();
    console.log(conferenceId);
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
    <TravelAdder id={null} conferenceID={conferenceId}/>
    {travels?.length > 0 && travels.map(travel => (
        <div className="py-3 pr-3 grow">
            <TravelAdder id={travel._id} conferenceID={conferenceId}/>
        </div>
    ))}
  </div>
</div> 
);
}