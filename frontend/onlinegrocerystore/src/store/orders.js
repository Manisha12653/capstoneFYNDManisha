import Axios from "axios";

const ordersUrl = `https://groco-be.onrender.com/orders`;

export default {
  namespaced: true,

  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
  },
  actions: {
    async storeOrderAction(context, order) {
      const jwt = JSON.parse(localStorage.getItem("token"));
      return (
        await Axios.post(ordersUrl, order, {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        })
      ).data.id;
    },
    async setOrdersAction(context, userId) {
      const orderHistory = (await Axios.get(`${ordersUrl}/${userId}`)).data;
      context.commit("setOrders", orderHistory);
    },
  },
};
