import { ReactComponent as Spin } from '../images/spinner-solid.svg';
import "./spinner.css"
function Spinner() {
    return(
        <div style={{width:'30px'}} className='spin'>
            <Spin fill='#4A78E6'/>
        </div>
    )
}


export default Spinner