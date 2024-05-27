import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";

export default function ConferencesFormPage() {
  const {id} = useParams();
  const [name,setName] = useState('');
  const [city,setCity] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [delegateFee,setDelegateFee] = useState(0);
  const [delegationFee, setDelegationFee] = useState(0);
  const [hotelCost, setHotelCost] = useState(0);
  const [transportationCost, setTransportationCost] = useState(0);
  const [delegateFeeRefund, setDelegateFeeRefund] = useState('');
  const [hotelRefund, setHotelRefund] = useState('');
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    //don't do anything if the ID isn't there
    if (!id) {
      return;
    }
    //gets all the values for the place based on the axios request
    axios.get('/conferences/'+id).then(response => {
       const {data} = response;
       setName(data.name);
       setCity(data.city);
       setStartDate(data.startDate);
       setEndDate(data.endDate);
       setDelegateFee(data.delegateFee);
       setDelegationFee(data.delegationFee);       
       setHotelCost(data.hotelCost);
       setTransportationCost(data.transportationCost);
       setDelegateFeeRefund(data.delegateFeeRefund);
       setHotelRefund(data.hotelRefund);
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

  //activated when we submit the places form
  async function saveConference(ev) {
    ev.preventDefault();
    const conferenceData = {
      name, city, delegateFee, delegationFee, hotelCost, transportationCost, startDate, endDate, delegateFeeRefund, hotelRefund,
    };
    
    if (id) {
      // update
      /*The ... spread operator in this code snippet is 
        used to merge the id property with all properties of the placeData object into a single object*/
      await axios.put('/conferences', {
        id, ...conferenceData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/conferences', conferenceData);
      setRedirect(true);
    }

  }

  //after the form is submitted, we go to our places page --> features the places we own
  if (redirect) {
    return <Navigate to={'/account/conferences'} />
  }

  //
  return (
    <div>
      <AccountNav />
      <form onSubmit={saveConference}>
        {/*preInput goes before the form itself*/}
        {preInput('Name', 'Name of the Conference')}
        {/*value is preset to the title or the placeholder, in case there is no title*/}
        {/*title variable changes when we edit the value in the input form*/}
        <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="name, for example: NOLEMUN"/>
        {preInput('City', 'City where the conference is taking place --> dont include the state')}
        <input type="text" value={city} onChange={ev => setCity(ev.target.value)}placeholder="city"/>
        {preInput('Add start and end dates')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-2">
          <div>
            <h3 className="mt-2 -mb-1">Start Date</h3>
            <input type="date"
                   value={startDate}
                   onChange={ev => setStartDate(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">End date</h3>
            <input type="date"
                   value={endDate}
                   onChange={ev => setEndDate(ev.target.value)}
            />
          </div>
        </div>
        {preInput('Input the expected costs')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Delegate Fee</h3>
            <input type="number" value={delegateFee}
                  onChange={ev => setDelegateFee(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Delegation Fee</h3>
            <input type="number" value={delegationFee}
                  onChange={ev => setDelegationFee(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Hotel Cost</h3>
            <input type="number" value={hotelCost}
                  onChange={ev => setHotelCost(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Transportation Cost</h3>
            <input type="number" value={transportationCost}
                  onChange={ev => setTransportationCost(ev.target.value)}/>
          </div>
        </div>
        {preInput('Input the expected refund deadlines')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-2">
          <div>
            <h3 className="mt-2 -mb-1">Delegate Fee Refund</h3>
            <input type="date" value={delegateFeeRefund}
                  onChange={ev => setDelegateFeeRefund(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Hotel Fee Refund</h3>
            <input type="date" value={hotelRefund}
                  onChange={ev => setHotelRefund(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}