import {useEffect, useState, useContext} from "react";
import axios from "axios";
import AccountNav from "./AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";
import { format } from 'date-fns'
import {UserContext} from "./UserContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TravelAdder({id, conferenceID}) {
    const [travelType, setTravelType] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState(new Date());
    const [tempDeparture, setTempDeparture] = useState(new Date());
    const [dateComparator, setDateComparator] = useState(new Date());
    const [saved, setSaved] = useState(true);
  useEffect(() => {
    //don't do anything if the ID isn't there
    console.log(id);
    if (!id) {
      console.log("do we get here");
      return;
    }
    //gets all the values for the place based on the axios request
    axios.get('/travels/'+id).then(response => {
       const {data} = response;
      setTravelType(data.travelType);
       setOrigin(data.origin);
       setDestination(data.destination);
       setTempDeparture(data.departureTime);
       setDepartureTime(data.departureTime);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const handleInputChange = (ev, setType) => {
    setType(ev.target.value);
    setSaved(false);
  }

  const handleDateChange = (date) => {
    setDateComparator(date);
    setTempDeparture(date);
    setDepartureTime(date);
    setSaved(false);
  }

  //activated when we submit the places form
  async function saveTravel(ev) {
    ev.preventDefault();
    const travelData = {
      conferenceID, travelType, origin, destination, departureTime
    };
    
    if (id) {
      // update
      /*The ... spread operator in this code snippet is 
        used to merge the id property with all properties of the placeData object into a single object*/
        console.log("gets called here");
        console.log(travelData);
        await axios.put('/travels', {
        id, ...travelData
      });
    } else {
      // new place
      console.log("gets called at POST");
      console.log(travelData);
      await axios.post('/travels', travelData);
    }
    setSaved(true);
  }

  async function deleteButton(ev) {
    ev.preventDefault();
    const response = await axios.delete('/travels/' + id);
    alert('This travel has been deleted. Reload to see your changes reflected');
    console.log("delete button response", response);
  }

  //after the form is submitted, we go to our places page --> features the places we own

  //
  return (
    <div>
      <form onSubmit={saveTravel}>
        {/*preInput goes before the form itself*/}
        {preInput('Travel type', 'Specify whether it is a flight, car ride, Uber, etc.')}
        {/*value is preset to the title or the placeholder, in case there is no title*/}
        {/*title variable changes when we edit the value in the input form*/}
        <input type="text" value={travelType} onChange={ev => handleInputChange(ev, setTravelType)} placeholder="travel type, for example: Uber"/>
        {preInput('Origin', 'Address of depature')}
        <input type="text" value={origin} onChange={ev => handleInputChange(ev, setOrigin)} placeholder="USF Magnolia Drive, Tampa, FL 33620"/>
        {preInput('Destination', 'Address of Destination')}
        <input type="text" value={destination} onChange={ev => handleInputChange(ev, setDestination)} placeholder="USF Magnolia Drive, Tampa, FL 33620"/>
        <div>
            <h3 className="mt-2 -mb-1">Start Date</h3>
            {preInput('Current departure time: ' + tempDeparture, 'Departure Time value will only be affected if you change the current value in the date picker and hit save')}
            <DatePicker selected={dateComparator} onChange={(date) => handleDateChange(date)} showTimeSelect />
        </div>
        {(!saved) && 
        <button className="primary my-4">Save</button>
        }
        </form>
        {(id) &&
        <button className="primary my-4" onClick={(ev) => deleteButton(ev)}>Delete</button>
        }
    </div>
  );
}