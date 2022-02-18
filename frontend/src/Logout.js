import { useHistory } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import {  useContext } from "react";


const Logout = () => {
	const history = useHistory();
	const {globalUsername, setGlobalUsername,
		globalLoginToken, setGlobalLoginToken} = useContext(LoginContext);

	let res = null;
	fetch('https://localhost:9103/interoperability/api/logout', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'withCredentials' : true
		},
		credentials: "include"
	}) .then(e => {
		console.log(e);
		//set logged in globalState to null
		setGlobalUsername(null);
		setGlobalLoginToken(null);
		history.push('/'); //remove this to redirect to homepage
	});
	return ( 
		<div>
			{res && <h1>Error </h1>}
		</div>
		
	 );
}
 
export default Logout;