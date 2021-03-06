import { useState } from "react";
import useFetch from "./useFetch";
import PassesAnalysisList from "./PassesAnalysis";

const BeetweenOps = () => {
	const [datefrom, setDatefrom ] = useState('2019-01-01');
    const [dateto, setDateto ] = useState('2020-01-01');
    const [op1, setOp1] = useState('aodos');
    const [op2, setOp2] = useState('egnatia');
   

    const {data, error} = useFetch(`https://localhost:9103/interoperability/api/PassesAnalysis/${op1}/${op2}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

    console.log(data, datefrom ,dateto);
    const {data:costdata , error:costerror} = useFetch(`https://localhost:9103/interoperability/api/PassesCost/${op1}/${op2}/${datefrom.replaceAll('-','')}/${dateto.replaceAll('-','')}`);

    console.log(costdata);
    console.log(costerror);
	console.log('data = ', data, 'error = ', error);
	
	return (
		<div className="BeetweenOps">
			<div className="selectors">
				<form>
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
			</div>
			<div className="headings">
				<h3>Passes between {op1}-{op2}</h3>
				{ costdata && <p>Number of passes: { costdata.NumberOfPasses }</p>}
				<br />
				<h3>Cost of Passes between {op1}-{op2}</h3>
				{ costdata && <p>Total Cost : { costdata.PassesCost } € </p>}
				<br />
			</div>
				{ data && <PassesAnalysisList data={ data } /> }
			
		</div>
	);
}
 
export default BeetweenOps;