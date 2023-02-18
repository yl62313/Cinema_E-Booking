import React from 'react';
import { useState } from 'react';

import './EditProfilePage.css';

const AdminMainPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [promotionState, setPromotionState] = useState(false);
 

   const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
      };

      const handleLastNameChange = (event) => {
        setLastName(event.target.value);
      };

      const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        setPasswordsMatch(event.target.value === confirmPassword);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
      };
    
      const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
      };

      const handlePromotionStateChange = (event) => {
        setPromotionState(true);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        handleFirstNameChange(event);
        //  send the updated profile information to your backend server
        // using an API call, for example.
      };

      const [streetAddress, setStreetAddress] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zipCode, setZipCode] = useState("");

      const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
      };

      const handleCityChange = (event) => {
        setCity(event.target.value);
      };

      const handleStateChange = (event) => {
        setState(event.target.value);
      };
    
      const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
      };


    return(
    <div>
        <h1>Edit Profile</h1>
        <div className="editProfile"> 
            <form className="personalInformation" onSubmit={handleSubmit}> 
                    <label>
                         <h4>Name:</h4>
                        {firstName || 'First'} {lastName || 'Last'}
                        </label>
                         <input type="text"
                            placeholder="First Name" 
                            /*value={firstName} 
                            /*onChange={handleFirstNameChange}*/ />
                        <input type="text" 
                            placeholder="Last Name" 
                            /* value={lastName} 
                            onChange={handleLastNameChange} *//>
                        <label>
                        <h4>Phone Number:</h4>
                         {phoneNumber || '123-456-7890'} 
                        <input type="tel" 
                            placeholder="New Phone Number" 
                            /*value={phoneNumber} 
                            onChange={handlePhoneNumberChange}*//>
                         </label>
                    
                <label>
                    <h4>Subcribed for Promotions:</h4>
                    <input type="checkbox"/>
                </label>

                <label>
                    <h4>Password:</h4>
                    </label>
                    <input type="text" 
                    placeholder="Current Password" 
                    />
                    <input type="text" 
                    placeholder="New Password"
                   /* value={password} 
                    onChange={handlePasswordChange} */
                    />
                    <input type="text" 
                    placeholder="Confirm New Password" 
                    /*value={confirmPassword} 
                    onChange={handleConfirmPasswordChange}*//>

                    <br></br>

                    <button type="submit">Update</button>
            </form>  

            <form className="addressContainer"> 
            <label>
                <h4>Street Address:</h4>
                {streetAddress || '123 Home Address'}
            </label>
            <input type="text"
                placeholder="Update Street Address"
                /*value={streetAddress} 
                onChange={handleStreetAddressChange}*//>
            <label>
                <h4>City:</h4>
                {city || 'Athens'}
            </label>
            <input type="text" 
                placeholder="Update City"
                /*value={city} 
                onChange={handleCityChange}*/
            />
            
          <label>
            <h4>State:</h4>
            {state || 'Georgia'}
            </label>
            <input type="text" 
            placeholder='Update state'
            /*value={state} 
            onChange={handleStateChange}*//>
        
          <label>
                <h4>Zip:(XXXXX)</h4>
                {zipCode || '12345'}
            </label>
            <input type="text" 
            placeholder="Update Zip"
           /* value={zipCode} 
            onChange={handleZipCodeChange}*//>
            <br></br>
            <button type="submit">Update</button>
            </form>  

        </div>
        </div>
    )
}

export default AdminMainPage;