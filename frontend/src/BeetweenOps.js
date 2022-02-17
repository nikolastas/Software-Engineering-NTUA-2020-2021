import { useState } from "react";
import useFetch from "./useFetch";
import PassesAnalysisList from "./PassesAnalysis";

const BeetweenOps = () => {
	const [datefrom, setDatefrom ] = useState('2019-01-01');
    const [dateto, setDateto ] = useState('2020-01-01');
    const [op1, setOp1] = useState('aodos');
    const [op2, setOp2] = useState('egnatia');
   

    const {data , error, isPending} = useFetch(`https://127.0.0.1:9103/interoperability/api/PassesAnalysis/${op1}/${op2}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

    console.log(data, datefrom ,dateto);
    const {data:costdata , error:costerror, isPending:costisPending} = useFetch(`https://127.0.0.1:9103/interoperability/api/PassesCost/${op1}/${op2}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

    console.log(costdata);
    console.log(costerror);

	
	return (
		<div>
			<form className ="form-inline" className="center">
				<label>Operator from</label>
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
				<label>Operator to</label>
				<select
				value={op2}
				onChange={(e) => setOp2(e.target.value)}
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
			<div>
				<h3>Passes between {op1}-{op2}</h3>
				{ costdata && <p>number of passes: { costdata.NumberOfPasses }</p>}
				<br />
				<h3>Cost of Passes between {op1}-{op2}</h3>
				{ costdata && <p>number of passes: { costdata.PassesCost } € </p>}
				<br />
				{ data && <PassesAnalysisList data={ data } /> }
			</div>
		</div>
	);
}
 
export default BeetweenOps;