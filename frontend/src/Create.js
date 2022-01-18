import { useState } from "react";
import { useHistory } from "react-router-dom";



const Create = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('admin');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const [data,setData] = useState(null);
    const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = {};
    // user.username = username;
    // user.password = password;
    // user.typeofuser = type;
    // user.email = email;
    // console.log(user);
    // fetch('http://localhost:9103/interoperability/api/signup', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user)
    // }).then((e) => {
    //     console.log(e);
    //   setIsPending(false);
    //   history.push('/');
    // })
    // setIsPending(true);

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
        fetch('http://localhost:9103/interoperability/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
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