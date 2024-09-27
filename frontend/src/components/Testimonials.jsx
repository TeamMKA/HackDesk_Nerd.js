import { FaArrowRight,FaArrowLeft } from "react-icons/fa";

import './Testimonials.css'
import img from "/vite.svg"
const Testimonials = () => {
  return (
    <div className="test">
      <div className="left">
        <h1>Testimonials</h1>
      </div>
      <div className="right">
        <div className="card">
          <p>“I have been using Wefo for a while now and I can say that it is a great platform to work with. I have been able to get a lot of clients from here and I am really happy with the service.”</p>
          <div className="user">
            <img src={img}/>
            <div className="user-info">
              <h2>John Doe</h2>
              <p>Web Developer,Snifny</p>
            </div>
          </div>
          <div className="move">
           <button> <FaArrowLeft/></button>
           <button> <FaArrowRight/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials