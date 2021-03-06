import { useState } from "react";
import useFetch from "./useFetch";


const StationPasses = () => {
	const [datefrom, setDatefrom ] = useState('2019-01-01');
    const [dateto, setDateto ] = useState('2020-01-01');
    const [station, setStation] = useState('AO01');
	
	const {data} = useFetch(`https://localhost:9103/interoperability/api/Stations` );
	console.log(data);
	
	const {data:passdata} = useFetch(`https://localhost:9103/interoperability/api/PassesPerStation/${station}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

	console.log(passdata);

	return ( 
		 <div className="StationPasses">
			{data && 
			<form className="selectors">
				<label>Station</label>
				<select
				value={station}
				onChange={(e) => setStation(e.target.value)}
				>	
					{
						data.map(elem => 
							<option value={elem.stationID}> {elem.stationID} </option>
						)
					}
				</select>
				<label>Ημερομηνία από</label>
				<input type="date" 
				required value = {datefrom} onChange={(e) => setDatefrom(e.target.value)}/>
					<label>Ημερομηνία εώς</label>
				<input type="date" 
				required value = {dateto} onChange={(e) => setDateto(e.target.value)}/>
			</form>}

			{passdata && 
			<div>
				<div className="headings">
				<h3>Station : { station }</h3>
				<h3>Total profit : { passdata.PassesList.reduce((prev, elem) => elem.PassCharge + prev, 0) } € </h3>
				</div>
				<table className="container">
					<tr>
						<th><h1>PassIndex</h1></th>
						<th><h1>PassID</h1></th>
						<th><h1>PassTimeStamp</h1></th>
						<th><h1>VehicleID</h1></th>
						<th><h1>TagProvider</h1></th>
						<th><h1>PassType</h1></th>
						<th><h1>PassCharge</h1></th>
					</tr>
					{passdata.PassesList.map(elem => (
					<tr>
						<th>{ elem.PassIndex }</th>
						<th>{ elem.PassID }</th>
						<th>{ elem.PassTimeStamp }</th>
						<th>{ elem.VehicleID}</th>
						<th>{ elem.TagProvider }</th>
						<th>{ elem.PassType }</th>
						<th>{ elem.PassCharge }</th>
					</tr>
					))}
				</table>



			</div>}
			

		</div>
	 );
}
 
export default StationPasses;