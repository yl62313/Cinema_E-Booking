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

export const CurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/current-user");
        return response.data;
    } catch (error) {
        return error;
    }
}

export const editProfile = async () => {
    try {
        const response = await axiosInstance.patch("/api/users/");
        return response.data;
    } catch (error) {
        return error.response;
    }
    
}

export const getUser = async () => {
    try {
        const response = await axiosInstance.patch("/api/users/userEmail");
        return response.data; 
    } catch (error) {
        return error.response;
    }
}

export const resetPassword = async () => {
    try {
        const response = await axiosInstance.post("/api/users/");
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