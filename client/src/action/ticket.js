import { axiosInstance } from ".";

export const AddTicket = async (payload) => {
    try {
        
        
      const response = await axiosInstance.post('/api/checkout/ticket', payload);
      return response.data;
    
      
    } catch (error) {
      return error.response;
    }
};


//   export const AddTicket = async (payload,id) => {
//     try {
//       const response = await axiosInstance.post(`/api/checkout/${id}/ticket`,payload);
//       return response.data;
//     } catch (error) {
//       return error.response;
//     }
//   };
