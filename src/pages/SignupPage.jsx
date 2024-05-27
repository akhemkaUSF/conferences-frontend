import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function SignupPage() {
    //":id" is appended to the end of the url in App.jsx, so that's intended as a param
    //we set id to that parameter
  const {id} = useParams();
  //initialize the variables
  const [signup,setSignup] = useState(null);
  //this is triggered once id is set in line 11 
  useEffect(() => {
    if (id) {
      axios.get('/signups').then(response => {
        //The object with a matching _id is returned and assigned to foundBooking
        const foundSignup = response.data.find(({_id}) => _id === id);
        if (foundSignup) {
          setSignup(foundSignup)
        }
      });
    }
  }, [id]);

  if (!signup) {
    return '';
  }

  function processBoolean(type=null) {
    if (type) {
      return "Yes";
    }
    else {
      return "No";
    }
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{signup.conference.title}</h1>
      <AddressLink className="my-2 block">{signup.conference.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
      <div>
          <h2 className="text-2xl mb-4">Your signup information:</h2>
            {/*Pass the booking to the bookingDates feature*/}
          <ConferenceDates signup={signup} />
        </div>
        <div>
          <h3 className ="text-2xl mb-4">Delegate Fee</h3>
          <div className="text-1xl">${signup.conference.delegateFee}</div> 
        </div>
        <div>
          <h3 className ="text-2xl mb-4">Delegate Fee Paid</h3>
          <div className="text-1xl">${processBoolean(signup.conference.delegateFeePaid)}</div> 
        </div>
        {conference.hotelFee!=0 && (
        <><div>
            <h3 className="text-2xl mb-4">Hotel Fee</h3>
            <div className="text-1xl">${signup.conference.hotelCost}</div>
          </div>
          <div>
              <h3 className="text-2xl mb-4">Hotel Fee Paid</h3>
              <div className="text-1xl">${signup.conference.hotelFeePaid}</div>
            </div></>
        )}

        {signup.conference.transporationFee!=0 && (
        <><div>
            <h3 className="text-2xl mb-4">Transportation Fee</h3>
            <div className="text-1xl">${signup.conference.transportationFee}</div>
          </div>
          <div>
              <h3 className="text-2xl mb-4">Transportation Fee Paid</h3>
              <div className="text-1xl">${signup.conference.transportationFeePaid}</div>
            </div></>
        )}
      </div>
    </div>
  );
}