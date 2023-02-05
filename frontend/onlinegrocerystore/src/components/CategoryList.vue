<template>
  <div class="col-3 category-container">
    <h3>Categories</h3>
    <ul class="nav flex-column mt-3">
      <li class="nav-item">
        <router-link class="nav-link category-item" to="/categories/all"
          >All</router-link
        >
      </li>
      <li class="nav-item" v-for="(c, i) in categories" :key="i">
        <router-link
          class="nav-link category-item"
          :to="'/categories/' + c.slug"
          >{{ c.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["categories"]),
  },
};
</script>

<style scoped>
.category-container {
  color: #fd7e14 !important;
}
.category-item {
  color: #130f40;
}
.category-item:hover {
  color: rgb(237, 161, 20);
}
</style>
>
