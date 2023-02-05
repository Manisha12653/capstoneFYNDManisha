import Axios from "axios";

const authUrl = `https://groco-be.onrender.com/auth/`;

export default {
  namespaced: true,

  state: {
    userLoggedIn: false,
    user: {
      userName: "",
      userRole: "",
      userId: "",
    },
    token: "",
  },
  mutations: {
    setUserAndToken(state) {
      const data = JSON.parse(localStorage.getItem("userData"));
      if (data) {
        state.user.userName = data.username;
        state.user.userRole = data.userRole;
        state.user.userId = data.userId;
      }
      const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
      if (userLoggedIn) {
        state.userLoggedIn = userLoggedIn;
      }
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        state.token = token;
      }
      // console.log(state.userLoggedIn);
    },
    clearUserData(state) {
      const user = {
        userName: "",
        userRole: "",
        userId: "",
      };
      localStorage.clear();
      state.user = user;

      state.userLoggedIn = false;
      state.token = "";
    },
  },
  actions: {
    // posting the order data from the form and store it into data base
    async storeUserSignUpInfo(context, userData) {
      try {
        console.log("called storeUserSignUpInfo ");
        const response = await Axios.post(`${authUrl}signup`, userData);
        const data = response.data.msg;
        return data;
      } catch (e) {
        console.log("error msg" + e);
      }
    },

    async userLogin(context, userData) {
      try {
        console.log("called userlogin ");
        const response = await Axios.post(`${authUrl}signin`, userData);
        console.log(response);
        return response;
      } catch (error) {
        return error.response;
      }
    },
  },
};
