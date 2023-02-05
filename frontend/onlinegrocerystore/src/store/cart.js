import Axios from "axios";
const cartUrl = `https://groco-be.onrender.com/cart`;
export default {
  namespaced: true,
  state: {
    cart: [],
  },
  getters: {
    itemCount: (state) =>
      state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
        0
      ),
  },
  mutations: {
    addProduct(state, product) {
      const cartItem = state.cart.find((cartItem) => {
        return cartItem.product._id == product._id;
      });
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({ product: product, quantity: 1 });
      }
    },
    subtractProduct(state, id) {
      const cartItem = state.cart.find(
        (cartItem) => cartItem.product._id == id
      );
      if (cartItem.quantity == 1) {
        const index = state.cart.findIndex(
          (cartItem) => cartItem.product._id == id
        );
        if (index != -1) {
          state.cart.splice(index, 1);
        }
      } else {
        cartItem.quantity--;
      }
    },

    removeProduct(state, id) {
      const index = state.cart.findIndex(
        (cartItem) => cartItem.product._id == id
      );
      if (index != -1) {
        state.cart.splice(index, 1);
      }
    },
    setCartData(state, data) {
      state.cart = data;
    },
    handleAddShoppingProduct(state, product) {
      const cartItem = state.cart.find((cartItem) => {
        return cartItem.product._id == product.product._id;
      });
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({ product: product, quantity: 1 });
      }
    },
  },
  actions: {
    loadCartData(context) {
      const data = localStorage.getItem("cart");
      if (data) {
        context.commit("setCartData", JSON.parse(data));
      }
    },
    storeCartData(context) {
      localStorage.setItem("cart", JSON.stringify(context.state.cart));
    },
    initalizeCart(context) {
      context.dispatch("loadCartData");
    },
    async clearCartData(context) {
      localStorage.setItem("cart", "[]");
      context.commit("setCartData", []);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
      if (userLoggedIn) {
        await Axios.delete(`${cartUrl}/${userData.userId}`);
      }
    },

    async setShoppingCart(context, userId) {
      //call get products cart

      const cart = (await Axios.get(`${cartUrl}/${userId}`)).data;
      if (cart.success !== false) {
        context.commit("setCartData", cart);
        context.dispatch("storeCartData");
      }
    },

    async mergeCart() {
      //call get products cart
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userData = JSON.parse(localStorage.getItem("userData"));
      const jwt = JSON.parse(localStorage.getItem("token"));
      console.log(cart);
      if (cart) {
        // console.log("calling merge");
        await Axios.post(
          `${cartUrl}/merge/${userData.userId}`,
          { cart: cart },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
      }
    },

    async updateCart() {
      //call get products cart
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userData = JSON.parse(localStorage.getItem("userData"));
      const jwt = JSON.parse(localStorage.getItem("token"));
      if (cart.length != 0) {
        await Axios.put(
          `${cartUrl}/updateCart/${userData.userId}`,
          {
            cart: cart,
          },
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );
      } else {
        Axios.delete(`${cartUrl}/${userData.userId}`);
      }
    },
  },
};
