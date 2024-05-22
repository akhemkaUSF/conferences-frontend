import {Link, Navigate} from 'react-router-dom';
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {user, setUser} = useContext(UserContext);
  //function runs when we click on the login button

  useEffect(() => {
    console.log(user);
    if (user) {
      setRedirect(true);
    }
  }, []);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      //retrieves the user data that comes after logging in, using the email and password
      const {data} = await axios.post('/login', {email,password});
      //uses the setUser function (imported from UserContext) to set the data
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } 
    //if we run into any sort of error, nothing happens and we give an alert that the login has failed
    catch (e) {
      alert('Login failed');
    }
  }

  //we go to the index page if login is successful 
  if (redirect) {
    return <Navigate to={'/'} />
  }
    
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 //email is set to the value inside the email input box
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 //password is set to the value inside the password input box
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}