import { useState } from "react";
import useFetch from "./useFetch";
import DebtOp from "./DebtOp";
import StationPasses from "./StationPasses";
import BeetweenOps from "./BeetweenOps";

const Data = () => {
    const [selector, setSelector] = useState('0');

    return ( 
        <div>
            <form>
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

        </div>

    );
}
 
export default Data;