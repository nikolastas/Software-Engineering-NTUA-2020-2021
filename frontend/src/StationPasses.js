import { useState } from "react";
import useFetch from "./useFetch";


const StationPasses = () => {
	const [datefrom, setDatefrom ] = useState('2019-01-01');
    const [dateto, setDateto ] = useState('2020-01-01');
    const [station, setStation] = useState('AO01');
	
	const {data , error, isPending} = useFetch(`https://localhost:9103/interoperability/api/Stations` );
	console.log(data);
	
	const {data:passdata, error:passerror, isPending:passisPending} = useFetch(`https://localhost:9103/interoperability/api/PassesPerStation/${station}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

	console.log(passdata);

	return ( 
		 <div>
			{data && 
			<form className ="form-inline" className="center">
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
				<h3>Station : { station }</h3>
				<h3>Total profit : { passdata.PassesList.reduce((prev, elem) => elem.PassCharge + prev, 0) } € </h3>
				<table>
					<tr>
						<th>PassIndex</th>
						<th>PassID</th>
						<th>PassTimeStamp</th>
						<th>VehicleID</th>
						<th>TagProvider</th>
						<th>PassType</th>
						<th>PassCharge</th>
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
			

			{/* <table>
			<tr>
				<th>Visiting Operator</th>
				<th>Number Of Passes</th>
				<th>PassesCost</th>
			</tr>
			{data.PPOList.map(elem => (
			<tr>
				<th>{ elem.VisitingOperator }</th>
				<th>{ elem.NumberOfPasses }</th>
				<th>{ elem.PassesCost }</th>
			</tr>
			))}
			</table> */}

		</div>
	 );
}
 
export default StationPasses;