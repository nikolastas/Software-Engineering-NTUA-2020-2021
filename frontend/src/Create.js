import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import {  useContext } from "react";


const Create = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('admin');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const [data,setData] = useState(null);
    const [error, setError] = useState(null);

    const {globalUsername, setGlobalUsername,
      globalLoginToken, setGlobalLoginToken} = useContext(LoginContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    const abortCont = new AbortController();
    
    setIsPending(true);

    let details = {
        'username': username,
        'password': password,
        'typeOfUser': type,
        'email' : email
    };
    console.log(details);
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    setTimeout(() => {
        fetch('https://localhost:9103/interoperability/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'withCredentials' : true
            },
            body: formBody,
            signal: abortCont.signal
        }
        ).then (response => response.json())
        .then((e) => {
          console.log(e.token);
          //global for the token
          console.log(setGlobalLoginToken);
          setGlobalUsername(username);
          setGlobalLoginToken(e.token);
          console.log(globalUsername, globalLoginToken);
          console.log('after');
          history.push('/');
        })
    }, 1000);
    
}

  return (
    <div className="create">
      <h2>Δημιουργία Χρήστη</h2>
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
        <label>Εγγράψου ως:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
        { !isPending && <button>Εγγραφή</button>}
        { isPending && <button disabled>Αναμονή...</button>}
        { error && <div>{ error }</div> }
      </form>
    </div>
  );
}
 
export default Create;