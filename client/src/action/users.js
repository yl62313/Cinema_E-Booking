const { axiosInstance } = require(".");

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const AuthUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/Auth", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};


export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}



export const BringProfileList = async(email) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-profile-by-email/${email}`);
        return response.data;
    } catch (error){
        return error.response;
    }
}


export const EditProfile = async (email, payload) => {
    try {
        const response = await axiosInstance.patch(`/api/users/editProfile/${email}`, payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
    
}

export const SendEmail = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/sendResetEmail", payload);
        return response.data; 
    } catch (error) {
        console.log(error.message);
        return error.response;
    }
}

export const SetPassword = async (email, payload) => {
    try {
        const response = await axiosInstance.patch(`/api/users/resetPassword/${email}`, payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const AdminLoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("api/users/adminLogin", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const BringUserList = async() => {
    try {
        const response = await axiosInstance.get("/api/users/bring-user");
        return response.data;
    } catch (error){
        return error.response;
    }
}

export const DeleteUser = async(payload)=> {
    try {
        const response = await axiosInstance.post("/api/users/delete-user", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
  }
  export const UpdateUser = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/update-user",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  export const CurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/current-user");
        return response.data;
    } catch (error) {
        return error;
    }
}

  export const BringUserById = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/get-user-by-id",payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
  }