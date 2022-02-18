import { useState, useContext } from "react";
import useFetch from "./useFetch";
import DebtOp from "./DebtOp";
import StationPasses from "./StationPasses";
import BeetweenOps from "./BeetweenOps";
import { LoginContext } from "./Context/LoginContext";
const Data = () => {
    const [selector, setSelector] = useState('0');
    const {globalUsername, setGlobalUsername,
        globalLoginToken, setGlobalLoginToken} = useContext(LoginContext);
    return ( 
        <div className="Data">
        {!globalUsername && <p>Πρέπει να συνδεθείς για να δεις αυτή τη σελίδα</p>}
        {globalUsername &&  <div>
                <form className="globaldataForm">
                <select
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                >
                    <option value='0'>Διελεύσεις μεταξύ Operators</option>
                    <option value='1'>Διελεύσεις από σταθμούς</option>
                    <option value='2'>Κέρδη Operator</option>
                </select>
                </form>
            {selector === '0' &&
            <div>
                <BeetweenOps />
            </div>}
            {/* Casse == 2 */}
            { selector ==='2' &&
            <div>
                <DebtOp />
            </div>}
            { selector ==='1' &&
                <StationPasses />
            }

            </div>}
        </div>
    );
}
 
export default Data;