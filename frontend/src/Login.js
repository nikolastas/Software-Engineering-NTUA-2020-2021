import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Admin');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const {globalUsername, setGlobalUsername,
     globalLoginToken, setGlobalLoginToken} = useContext(LoginContext);


  const handleSubmit = (e) => {
    e.preventDefault();

    let details = {
      'username': username,
      'password': password
    };
    console.log(details);
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://localhost:9103/interoperability/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'withCredentials' : true
      },
      body: formBody,
    })
    .then (response => response.json())
    .then((e) => {
      console.log(e.token);
      //global for the token
      console.log(setGlobalLoginToken);
      setGlobalUsername(username);
      setGlobalLoginToken(e.token);
      console.log(globalUsername, globalLoginToken);
      console.log('after');
      setIsPending(false);
      history.push('/');
    })
    setIsPending(true);
    }

  return (
    <div className="create">
      <h2>Σύνδεση Χρήστη</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type="text" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Συνδέσου ως:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        { !isPending && <button>Σύνδεση</button>}
        { isPending && <button disabled>Αναμονή...</button>}
        <h1>Cookie : {document.cookie}</h1>
      </form>
    </div>
  );
}
 
export default Login;