import { useState } from "react";
import { useHistory } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Admin');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();



  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };

    fetch('http://localhost:9103/interoperability/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
      body: JSON.stringify(user)
    }).then((e) => {
      console.log(e);
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
      </form>
    </div>
  );
}
 
export default Login;