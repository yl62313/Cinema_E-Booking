const {axiosInstance} = require(".");

//add promotion
export const AddPromotion = async(payload) => {
    try {
        const response = await axiosInstance.post("/api/promotions/addPromotion",payload);
        console.log(response.data);
        return response.data;
    }catch (error){
        console.log(error.response);
        return error.response;
    }
}

//bring all promotion list
export const BringPromotionList = async() => {
    try {
        const response = await axiosInstance.get("/api/promotions/bring-promotion");
        return response.data;
    } catch (error){
        return error.response;
    }
}

export const EditPromotion = async(payload)=> {
    try{
        const response = await axiosInstance.post("/api/promotions/edit-promotion", payload);
        return response.data;
    }catch(error){
        return error.response;
    }
}

export const DeletePromotion = async(payload)=> {
    try {
        const response = await axiosInstance.post("/api/promotions/delete-promotion", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const BringPromotion = async()=>{
    try {
        const response = await axiosInstance.get("/api/promotions/bring-promotion");
        return response.data;
    } catch (error) {
        return error.response;
    }
}










