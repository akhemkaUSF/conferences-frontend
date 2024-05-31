import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";
import { format } from 'date-fns'
import {UserContext} from "../UserContext.jsx";

export default function SignupsFormPage() {
  const {conferenceID} = useParams();
  const [conference, setConference] = useState(null);
  const [committeePreferences, setCommitteePreferences] = useState('');
  const [canDrive, setCanDrive] = useState(0);
  const [passengers, setPassengers] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //don't do anything if the ID isn't there
    console.log("is this triggered at all?");
    if (!conferenceID) {
      return;
    }
    //gets all the values for the place based on the axios request
    axios.get('/conferences/'+conferenceID).then(response => {
       setConference(response.data);
    });
  }, [conferenceID]);

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
      canDrive, passengers, additionalInfo, committeePreferences,
    };
    await axios.post('/signups', {
      conference, ...signupData
    });
    setRedirect(true);
    }

  //after the form is submitted, we go to our places page --> features the places we own
  if (redirect) {
    return <Navigate to={'/account/signups'} />
  }

  //
  return (
    <div>
      <AccountNav />
      <form onSubmit={saveSignup}>
        {/*preInput goes before the form itself*/}
        {preInput('Select your committee preferences', '')}
        <div onChange={event => setCommitteePreferences(event.target.value)}>
        <input type="radio" value="GA" /> General Assembly
        <input type="radio" value="Specialized"/> Specialized
        <input type="radio" value="Crisis"/> Crisis
      </div>
      {preInput('Can you drive to the conference?', '')}
        <div onChange={event => setCanDrive("true"==event.target.value)}>
        <input type="radio" value="true"/> Yes
        <input type="radio" value="false"/> No
      </div>
        {preInput('If you selected yes, how many passengers can you bring?', '')}
        <input type="number" value={passengers} onChange={ev => setPassengers(ev.target.value)}/>
        {preInput('Anything else we should know?', 'Let us know any questions or concerns you may have!')}
        <input type="text" value={additionalInfo} onChange={ev => setAdditionalInfo(ev.target.value)} placeholder="Questions, concerns, or otherwise go here!"/>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}