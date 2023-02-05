<template>
  <div class="float-right">
    <span v-if="itemCount > 0">
      {{ itemCount }} item(s) Rs {{ totalPrice }}
    </span>
    <span v-else> Your cart is empty. </span>
    <router-link v-if="itemCount > 0" to="/cart">
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
};
</script>

<style scoped>
.fa {
  color: orange;
}
</style>
