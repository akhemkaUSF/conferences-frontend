import {Link, Navigate} from 'react-router-dom';
import {useContext, useState, useEffect} from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function handleResetSubmit(ev) {
    ev.preventDefault();
    try {
      //retrieves the user data that comes after logging in, using the email and password
      const response = await axios.post('/reset', {email});
      console.log(response);
      alert('Check your email for the link to reset your password');
      setRedirect(true);
    } 
    //if we run into any sort of error, nothing happens and we give an alert that the login has failed
    catch (e) {
      alert('There is no account associated with this email');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />
  }
    
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Reset</h1>
        <form className="max-w-md mx-auto" onSubmit={handleResetSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 //email is set to the value inside the email input box
                 onChange={ev => setEmail(ev.target.value)} />
          <button className="primary">Reset</button>
        </form>
      </div>
    </div>
  );
}