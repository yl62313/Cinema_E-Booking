import { axiosInstance } from ".";


export const CheckOutTickets = async (payload) => {
    try {
      
      const response = await axiosInstance.post(
        "/api/checkout/checkout-show",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  export const GetTickets = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/checkout/get-tickets/${userId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };



