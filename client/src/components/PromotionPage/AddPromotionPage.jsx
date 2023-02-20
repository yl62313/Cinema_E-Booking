import React, { useState } from "react";
import './AddPromotionPage.css'

const AddPromotionPage = () => {
    const [data, setData] = useState({
        promoName: "",
        promoCode: "",
        discountPercentage: "",
        expirationDate: ""
    });

    const [promotions, setPromotions] = useState([]);

    const handleData = event => {
        event.preventDefault();

        const name = event.target.getAttribute("name");
        const value = event.target.value;

        const newData = { ...data };
        newData[name] = value;

        setData(newData);
    };

    const addRow = event => {
        event.preventDefault();

        const newPromotion = {
            promoName: data.promoName,
            promoCode: data.promoCode,
            discountPercentage: data.discountPercentage,
            expirationDate: data.expirationDate,
        }

        const newPromotions = [...promotions, newPromotion];
        setPromotions(newPromotions);
        console.log(newPromotion.discountPercentage)
    };

    return (
        <div className="promotionPage">
            <h1>Promotions</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <table className="currentPromos">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Discount Percentage</th>
                        <th>Expiration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map(promotion => (
                        <tr>
                            <td>{promotion.promoName}</td>
                            <td>{promotion.promoCode}</td>
                            <td>{promotion.discountPercentage}</td>
                            <td>{promotion.expirationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
            <h2>Add new Promotion</h2>
            <form onSubmit={addRow} className="form">
                <div className="textField">
                    <label>Promotion Name</label>
                    <input
                        name="promoName"
                        type="text"
                        onChange={handleData}
                    />
                </div>
                <div className="textField">
                    <label>Promotion Code</label>
                    <input
                        name="promoCode"
                        type="text"
                        onChange={handleData}
                    />
                </div>
                <div className="textField">
                    <label>Discount Percentage</label>
                    <input
                        name="discountPercentage"
                        type="text"
                        onChange={handleData}
                    />
                </div>
                <div className="textField">
                    <label>Expiration Date</label>
                    <input
                        name="expirationDate"
                        type="date"
                        onChange={handleData}
                    />
                </div>
                <input type="submit" value="Apply" className="button"></input>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button className="button">Home</button>
        </div>
    )
}

export default AddPromotionPage;