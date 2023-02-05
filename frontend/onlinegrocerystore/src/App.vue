<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(["setPagesAction", "setCategoriesAction"]),
    ...mapActions({
      initializeCart: "cart/initalizeCart",
    }),
    ...mapMutations({ setUserAndToken: "auth/setUserAndToken" }),
  },
  created() {
    this.setPagesAction();
    this.setCategoriesAction();
    this.setUserAndToken();
    this.initializeCart();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
