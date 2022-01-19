import { useState } from "react";
import useFetch from "./useFetch";



const DebtOp = () => {
	const [datefrom, setDatefrom ] = useState('2019-01-01');
    const [dateto, setDateto ] = useState('2020-01-01');
    const [op1, setOp1] = useState('aodos');
	
	const {data , error, isPending} = useFetch(`http://localhost:9103/interoperability/api/ChargesBy/${op1}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);
	
	return ( 
		<div>
			<form className ="form-inline" className="center">
				<label>Operator</label>
				<select
				value={op1}
				onChange={(e) => setOp1(e.target.value)}
				>
					<option value="aodos">aodos</option>
					<option value="egnatia">egnatia</option>
					<option value="gefyra">gefyra</option>
					<option value="kentriki_odos">kentriki_odos</option>
					<option value="moreas">moreas</option>
					<option value="nea_odos">nea_odos</option>
					<option value="olympia_odos">olympia_odos</option>
				</select>
				<label>Ημερομηνία από</label>
				<input type="date" 
				required value = {datefrom} onChange={(e) => setDatefrom(e.target.value)}/>
					<label>Ημερομηνία εώς</label>
				<input type="date" 
				required value = {dateto} onChange={(e) => setDateto(e.target.value)}/>
			</form>

			{data && <div className="DebtOpList">
			<h3>Total Profit from All Passes : {data.PPOList.reduce((prev, elem) => elem.PassesCost + prev, 0)}</h3>

			<table>
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
			</table>
			</div>}
		</div>
	 );
}
 
export default DebtOp;