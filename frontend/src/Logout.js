import { useHistory } from "react-router-dom";


const Logout = () => {
	const history = useHistory();
	let res = null;
	fetch('http://localhost:9103/interoperability/api/logout', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}) .then(e => {
		console.log(e);
		// history.push('/');
	});
	return ( 
		<div>
			{res && <h1>Error </h1>}
		</div>
		
	 );
}
 
export default Logout;