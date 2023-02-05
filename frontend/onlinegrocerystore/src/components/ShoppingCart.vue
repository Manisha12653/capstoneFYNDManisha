<template>
  <div class="category-Container">
    <div class="row mt-2">
      <div class="category-item col-2">
        <CategoryList />
      </div>

      <div class="col-9">
        <h2 class="display-4">Your cart</h2>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="itemCount == 0">
              <td colspan="5" class="text-center">Your cart is empty.</td>
            </tr>
            <tr v-else v-for="(c, i) in cart" :key="i">
              <td>{{ c.product.name }}</td>
              <td>{{ c.quantity }}</td>
              <td>
                <button
                  class="btn small btn-primary mx-1"
                  @click="handleAddProduct(c)"
                >
                  +
                </button>
                <button
                  class="btn small btn-warning mx-1"
                  @click="handleSubtractProduct(c.product._id)"
                >
                  -
                </button>
                <button
                  class="btn small btn-danger mx-1"
                  @click="handleRemoveProduct(c.product._id)"
                >
                  remove
                </button>
              </td>
              <td>{{ c.product.price }}</td>
              <td>{{ c.product.price * c.quantity }}</td>
            </tr>
          </tbody>
          <tfoot v-if="itemCount > 0">
            <tr>
              <td colspan="5" class="text-right">
                <h4>Total: {{ totalPrice }}</h4>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <button
                  class="btn btn-danger float-left"
                  @click="handleClearCart()"
                >
                  Clear Cart
                </button>
                <button
                  class="btn btn-danger float-right"
                  @click="handleCheckout()"
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),

    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
  methods: {
    ...mapMutations({
      addProduct: "cart/handleAddShoppingProduct",
      subtractProduct: "cart/subtractProduct",
      removeProduct: "cart/removeProduct",
    }),

    ...mapActions({
      clearCartData: "cart/clearCartData",
      storeCartData: "cart/storeCartData",
    }),

    async handleAddProduct(product) {
      this.addProduct(product);
      this.storeCartData();
    },
    handleSubtractProduct(id) {
      this.subtractProduct(id);
      this.storeCartData();
    },
    async handleRemoveProduct(id) {
      this.removeProduct(id);
      this.storeCartData();
    },
    async handleClearCart() {
      await this.clearCartData();
    },
    handleCheckout() {
      if (!this.userLoggedIn) {
        this.$router.push("/login");
      } else {
        this.$router.push("/checkout");
      }
    },
  },
};
</script>
<style scoped>
.category-Container {
  margin-top: 150px;
}
.category-item {
  margin-left: 50px;
}

.btn-danger {
  margin-left: 2rem;
}
@media (max-width: 650px) {
  .btn {
    padding: 10px;
    font-size: 14px;
  }
  .btn-danger {
    margin-top: 1rem;
  }
}
</style>
