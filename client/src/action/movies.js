const {axiosInstance} = require(".");

//add movie
export const AddMovie = async(payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/movielist",payload);
        return response.data;
    }catch (error){
        return error.response;
    }
}

//update movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get all movie
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const GetMovieId = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}
