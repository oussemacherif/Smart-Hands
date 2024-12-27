import axios from 'axios';

import { port } from '../../port';

const api = axios.create({
  baseURL: port,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register_me = async (formData : any) => {
  try {
      const response = await axios.post(`${port}/api/register`, formData);
      return response.data;
  } catch (error) {
      console.error('Error in register (service) => ', error);
      throw error; 
  }
};

export const login_me = async (formData : any) => {
  try {
    // console.log("form",formData);
    
    const response = await axios.post(`${port}/api/login`, formData);
    // console.log("res",response.data);
    // console.log("login from services",response.data);
    
    return response.data;
  } catch (error) {
    console.log('error in login (service) => ', error);
  }
};

export const register_provider = async (formData : any) => {
  try {
    const response = await axios.post(`${port}/api/providerBf`,formData)

    return response.data;
  } catch (error){
    console.error(error)
  }
}

export const login_provider = async (formData : any) => {
  try {
    const response = await axios.post(`${port}/api/loginProvider`,formData)

    return response.data;
  } catch (error){
    console.error(error)
  }
}

export const getUserData = async (userId : Number, token : string) => {
  try {
    const response = await api.get(`api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (userId : Number, authToken : String, userData:any) => {
  try {
    const response = await axios.put(`${port}/api/users/${userId}`, userData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("respon in apicalls",response.data);
    

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateProviderData = async (providerId : Number, authToken : String, providerData :any) => {
  try {
    
    const response = await axios.put(`${port}/api/provider//${providerId}`, providerData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProvidersByServicesId =async (serviceId : Number, authToken : String) => {

  try {
    const response = await axios.get(`${port}/api/provider/type/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
      // console.log("service index",response.data);
      
    return response.data;
    
  } catch (error) {
    throw error;
  }
  
}

  export const updateUserPassword = async (userId : Number, authToken : String) =>{

    try {
      const response = await axios.get(`${port}/api/users/updatePassword/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
        console.log("updatePas in apiCall",response.data);
        
      return response.data;
      
    } catch (error) {
      throw error;
      }

  }

export default api;