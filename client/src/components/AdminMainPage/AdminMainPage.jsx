import React from 'react';
import './AdminMainPage.css';

const AdminMainPage = () => {
    return(
        <div className="adminPage"> 
        <h1>Welcome, Admin!</h1>  
                <button>Schedule a new movie</button>
                <br></br>
                <button>Manage Movies/Showtimes/Promotions</button>
                <br></br>
                <button>Manage User Accounts</button>

        </div>
    )
}

export default AdminMainPage;