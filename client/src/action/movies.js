const {axiosInstance} = require(".");

//add movie
export const AddMovie = async(payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie",payload);
        return response.data;
    }catch (error){
        return error.response;
    }
}