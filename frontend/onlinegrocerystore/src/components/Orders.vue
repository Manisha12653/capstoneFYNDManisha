<template>
  <div class="container">
    <h2>My Orders</h2>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Address</th>
          <th>Order Content</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(o, i) in orders" :key="i">
          <td class="align-middle">{{ o.name }}</td>
          <td class="align-middle">{{ o.email }}</td>
          <td class="align-middle">{{ o.address }}</td>
          <td class="align-middle">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in JSON.parse(o.cart)"
                :key="index"
              >
                {{ item.product.name }}
                {{ item.product.price }}
                {{ "x " + item.quantity }}
              </li>
            </ul>
          </td>
          <td class="align-middle">{{ o.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
      userId: (state) => state.auth.user.userId,
    }),
  },
  methods: {
    ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
  },
  created() {
    this.setOrdersAction(this.userId);
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}
.container {
  background-color: #fd7e14 !important;
  color: whitesmoke;
  margin-top: 12rem;
  border-radius: 1rem;
  width: 40rem;
  height: 100%;
}

thead tr {
  color: whitesmoke;
}
table {
  margin-top: 3rem;
}

.align-middle {
  color: whitesmoke;
}
.list-group-item {
  color: whitesmoke;
  background-color: #fd7e14;
}
</style>
