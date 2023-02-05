<template>
  <div>
    <div class="container signup">
      <form>
        <div class="form-group m-3">
          <label for="" class="namelabel">Name:</label>
          <input
            type="text"
            v-model="order.name"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.order.name.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group m-3">
          <label for="">Email:</label>
          <input
            type="email"
            v-model="order.email"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.order.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group m-3">
          <label for="">Address:</label>
          <input
            type="text"
            v-model="order.address"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.order.address.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="col-12 text-center">
          <router-link class="btn button btn-back" to="/cart">Back</router-link>
          <button class="btn button" @click="submitOrder">Place Order</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      order: {
        name: "",
        email: "",
        address: "",
      },
    };
  },
  validations() {
    return {
      order: {
        name: { required },
        email: { required, email },
        address: { required },
      },
    };
  },

  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      userId: (state) => state.auth.user.userId,
    }),
    ...mapGetters({
      total: "cart/totalPrice",
    }),
  },

  methods: {
    ...mapActions({
      storeOrder: "orders/storeOrderAction",
      clearCartData: "cart/clearCartData",
    }),
    async submitOrder(e) {
      //Formdata is a contructor will return an object here its order
      //can append the form name as key  and value in it
      e.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const order = new FormData();
        order.append("userId", this.userId);
        order.append("name", this.order.name);
        order.append("email", this.order.email);
        order.append("address", this.order.address);
        order.append("cart", JSON.stringify(this.cart));
        order.append("total", this.total);

        await this.storeOrder(order);

        this.clearCartData();
        this.$router.push("/thanks");
      }
    },
  },
};
</script>
<style scoped>
label {
  font-size: 25px;
}
.inputField {
  height: 45px;
}
.container {
  background-color: #fd7e14 !important;
  color: whitesmoke;
  margin-top: 10rem;
  border-radius: 2rem;
  width: 40rem;
  height: 25rem;
}

.button {
  border-radius: 5px;
  border: #22160d;
  color: white;
  margin-left: 1rem;
  background-color: #2d190c2c !important;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
  /* --bs-btn-hover-border-color: #0a58ca; */
}
.namelabel {
  margin-top: 2rem;
}
.btn-back {
  background-color: rgba(128, 128, 128, 0.596) !important;
}
</style>
