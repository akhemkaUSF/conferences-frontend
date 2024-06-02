import {Link, Navigate} from 'react-router-dom';
import {useContext, useState, useEffect} from "react";
import axios from "axios";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function handlePasswordSubmit(ev) {
    ev.preventDefault();
    try {
      //retrieves the user data that comes after logging in, using the email and password
      const response = await axios.put('/change', {oldPassword, newPassword});
      if (response.data=="not ok") {
        alert("Your old password is incorrect");
      }
      else {
        alert("You have changed your password");
        setRedirect(true);}
    } 
    //if we run into any sort of error, nothing happens and we give an alert that the login has failed
    catch (e) {
      alert('There is no account associated with this email');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
    
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Reset</h1>
        <form className="max-w-md mx-auto" onSubmit={handlePasswordSubmit}>
          <input type="password"
                 placeholder="old password"
                 value={oldPassword}
                 //email is set to the value inside the email input box
                 onChange={ev => setOldPassword(ev.target.value)} />
          <input type="password"
                 placeholder="new password"
                 value={newPassword}
                 //email is set to the value inside the email input box
                 onChange={ev => setNewPassword(ev.target.value)} />
          <button className="primary">Change Password</button>
        </form>
      </div>
    </div>
  );
}