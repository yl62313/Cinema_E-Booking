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
export const BringMovieById = async (id) => {
  try {
      const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
      return response.data;
  } catch (error) {
      return error.response;
  }
}

export const AddShow = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/shows/add-show",payload);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  

  export const GetAllShows = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/shows/get-all-shows",payload);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  export const DeleteShow = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/shows/delete-show", payload);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  
  export const BringShowById = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/shows/get-show-by-id",payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
  }