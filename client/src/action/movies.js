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

//bring all movie list
export const BringMovieList = async() => {
    try {
        const response = await axiosInstance.get("/api/movies/bring-movie");
        return response.data;
    } catch (error){
        return error.response;
    }
}

export const EditMovie = async(payload)=> {
    try{
        const response = await axiosInstance.post("/api/movies/edit-movie", payload);
        return response.data;
    }catch(error){
        return error.response;
    }
}

export const DeleteMovie = async(payload)=> {
    try {
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const BringMovieById = async(id)=>{
    try {
        const response = await axiosInstance.get(`api/movies/bring-movie-byid/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}