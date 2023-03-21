import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import checkicon from "../../../samplePicture/404-tick.png"

function RegisterConfirm() {

      const navigate = useNavigate();
      
    
      return (
        <div className="flex justify-center h-screen items-center bg-primary">
          <div className="card p-3 w-400">
            <div className="flex justify-center">
            <img src={checkicon} alt="" className="icon"/>
            </div>
            <br/>
            <h1 className="text-xl mb-1">That's all, thank you!</h1>
            <br/>
            <div className="flex justify-center">
            <Button title="exit"
            onClick={()=> navigate('/')}/>
            </div>
          </div>

        </div>
      );
    }
    
export default RegisterConfirm