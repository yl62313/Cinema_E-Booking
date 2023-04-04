const {axiosInstance} = require(".");

export const AddPromotion = async (payload) => {
    try {
        const response = await axiosInstance.post("api/promotions/addPromotion", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}