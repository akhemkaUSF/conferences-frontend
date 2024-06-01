import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";
import { format } from 'date-fns'
import {UserContext} from "../UserContext.jsx";

export default function AccountSignupsFormPage() {
  const {id} = useParams();
  const [conference, setConference] = useState(null);
  const [committeePreferences, setCommitteePreferences] = useState('');
  const [canDrive, setCanDrive] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    //don't do anything if the ID isn't there
    if (!id) {
      return;
    }
    //gets all the values for the place based on the axios request
    axios.get('/signups/'+id).then(response => {
       const {data} = response;
       setCommitteePreferences(data.committeePreferences);
       setCanDrive(data.canDrive);
       setPassengers(data.passengers);
       setAdditionalInfo(data.additionalInfo);
       setConference(data.conference);
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
  async function saveSignup(ev) {
    ev.preventDefault();
    const signupData = {
      canDrive, conference, passengers, additionalInfo, committeePreferences,
    };
    
    if (id) {
      // update
      /*The ... spread operator in this code snippet is 
        used to merge the id property with all properties of the placeData object into a single object*/
    await axios.put('/signups', {
        id, ...signupData
      });
      setRedirect(true);
    } 
  }

  //after the form is submitted, we go to our places page --> features the places we own
  if (redirect) {
    return <Navigate to={'/account/signups'} />
  }

  function canDriveResponse(boolobject=null) {
    if (boolobject) {
      return "true";
    }
    else {
      return "false";
    }
  }

  //
  return (
    <div>
      <AccountNav />
      <form onSubmit={saveSignup}>
        {/*preInput goes before the form itself*/}
        {preInput('Select your committee preferences', '')}
        <input type="text" value={committeePreferences} onChange={ev => setCommitteePreferences(ev.target.value)}/>
        {preInput('Can you drive to the conference?', 'Answer true or false. It is case sensitive so your response will default to false otherwise')}
        <input type="text" value={canDriveResponse(canDrive)} onChange={ev => setCanDrive(ev.target.value=="true")} placeholder ="answer 'true' or 'false'"/>
        {preInput('If you selected yes, how many passengers can you bring?', '')}
        <input type="number" value={passengers} onChange={ev => setPassengers(ev.target.value)}/>
        {preInput('Anything else we should know?', 'Let us know any questions or concerns you may have!')}
        <input type="text" value={additionalInfo} onChange={ev => setAdditionalInfo(ev.target.value)} placeholder="Questions, concerns, or otherwise go here!"/>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}