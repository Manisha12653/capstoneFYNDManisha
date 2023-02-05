<template>
  <div class="products-home-container">
    <Home />
    <div class="row">
      <div class="category-item col-2">
        <CategoryList />
      </div>
      <div class="col-9">
        <div class="product-container">
          <div class="product-cart" v-for="(p, i) in products" :key="i">
            <div>
              <img :src="productImages + p.image" class="product-image" />
            </div>
            <div class="product-description">
              <div>{{ p.description }} ({{ p.unit }})</div>
              <div class="product-action">
                <div>Rs. {{ p.price }}</div>
                <div>
                  <button class="button" @click="handleAddProduct(p)">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9 product-pagination">
          <ProductPagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CategoryList from "./CategoryList.vue";
import ProductPagination from "./ProductPagination.vue";
import Home from "./Home.vue";

export default {
  components: {
    CategoryList,
    ProductPagination,
    Home,
  },
  computed: {
    ...mapState(["products", "productImages"]),
  },
  methods: {
    ...mapMutations(["setCurrentCategory", "setCurrentPage"]),
    ...mapActions(["setProductsByCategoryAction"]),
    ...mapMutations({
      addProduct: "cart/addProduct",
    }),
    ...mapActions({
      storeCartData: "cart/storeCartData",
    }),
    async handleAddProduct(product) {
      this.addProduct(product);
      this.storeCartData();
    },
  },
  created() {
    console.log("creat");
    this.setCurrentPage(1);
    const cat = this.$route.params.category;
    this.setProductsByCategoryAction(cat);
    this.setCurrentCategory(cat);
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurrentPage(1);
    const cat = to.params.category;
    this.setProductsByCategoryAction(cat);
    this.setCurrentCategory(cat);
    next();
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  border-radius: 5px;
  border: 0.5px solid #fd7e14;
  background-color: #ffd58086;
  color: #fd7d148a;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding: 8px 25px;
}
.button:hover {
  background-color: #fd7e14;
  border: 0.5px solid transparent;
  border-radius: 8px;
  color: wheat;
}

.products-home-container {
  margin-top: 80px;
}
.product-image {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.product-cart {
  margin: 5px;
  background-color: rgba(181, 147, 85, 0);
  padding: 15px;
  border-radius: 16px;
  border: 0.5px solid rgb(221, 221, 221);
  margin: 35px;
  margin-top: 0;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.product-description {
  font-weight: 600;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}
.product-action {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.category-item {
  margin-left: 50px;
}
.product-pagination {
  display: flex;
  justify-content: center;
}

.row {
  margin-right: 0px;
  margin-top: 100px;
}
</style>
