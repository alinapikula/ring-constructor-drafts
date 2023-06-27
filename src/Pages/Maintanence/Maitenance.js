import "./Maitenance.scss"
import truck from "../../assets/logos/crane-truck.png"
import { Link } from "react-router-dom";


const Maitenance = () => {

return (
    <div className="mait" >
        
        <div className="mait__container">
            <h3 className="mait__title">Sorry, this page is currently under constuction...</h3>
            <img className="mait__img" src={truck}/>
            <Link to={"/"}><button className="mait__btn">BACK TO MAIN</button></Link>
          
        </div>
        
    </div>
);
}

export default Maitenance;