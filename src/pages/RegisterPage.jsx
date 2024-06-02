import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  //all the variables start out blank
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [admin] = useState(false);


    //triggered when we press the register button
    async function registerUser(ev) {
      //allows us to handle form submission through javascript
        ev.preventDefault();
        console.log(axios.get('/test'));
        try {
          const response = await axios.post('/register', {
              name, 
              email, 
              phoneNumber,
              password,
              admin,
          });
          alert(response.data);
        } 
      catch(error) {
            console.log(error.config);
            alert('Registration Failed. Please make sure all fields have been filled out');
        };
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text"
                   placeholder="John Doe"
                   value={name}
                   onChange={ev => setName(ev.target.value)} />
            <input type="email"
                   placeholder="your@email.com"
                   value={email}
                   onChange={ev => setEmail(ev.target.value)} />
            <input type="text"
                   placeholder="111-111-1111"
                   value={phoneNumber}
                   onChange={ev => setPhoneNumber(ev.target.value)} />
            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)} />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
);
}