import { useState } from "react";
import { useHistory } from "react-router-dom";
import usePostFetch from "./usePostFetch";


const Create = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('admin');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    let error;


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
  // const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  // 
   const {user , error1 , isP} = usePostFetch('http://localhost:9103/interoperability/api/signup', details);
    setIsPending(isP);
    error = error1;
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