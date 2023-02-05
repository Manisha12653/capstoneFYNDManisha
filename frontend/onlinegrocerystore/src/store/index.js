import { createStore } from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrderModule from "./orders";
import AuthModule from "./auth";
//axios is used to make http request to differend server

const baseUrl = "https://groco-be.onrender.com";
const pageUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productUrl = `${baseUrl}/products`;
const productImagesUrl = `${baseUrl}/media/products/`;
//maintaining all states
export default createStore({
  state: {
    pages: [],
    categories: [],
    products: [],
    productImages: productImagesUrl,
    currentPage: 1,
    pageCount: 0,
    pageSize: 12,
    currentCategory: "all",
  },

  modules: {
    cart: CartModule,
    orders: OrderModule,
    auth: AuthModule,
  },

  mutations: {
    setPages(state, pages) {
      state.pages = pages;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setPageCount(state, count) {
      state.pageCount = Math.ceil(Number(count) / state.pageSize);
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setCurrentCategory(state, category) {
      state.currentCategory = category;
    },
  },

  actions: {
    async setPagesAction(context) {
      try {
        const res = await Axios.get(pageUrl);
        const pages = res.data;
        context.commit("setPages", pages);
      } catch (e) {
        console.log(e);
      }
    },
    async setCategoriesAction(context) {
      try {
        const res = await Axios.get(categoriesUrl);
        const categories = res.data;
        context.commit("setCategories", categories);
      } catch (e) {
        console.log(e);
      }
    },

    // get product on the basis of category
    async setProductsByCategoryAction(context, category) {
      try {
        let url;
        let productCountUrl;
        if (category != "all") {
          url = `${productUrl}/${category}`;
          productCountUrl = `${productUrl}/count/${category}`;
          console.log("url", url);
          console.log(" productCountUrl ", productCountUrl);
        } else {
          url = `${productUrl}`;
          productCountUrl = `${productUrl}/count/all`;
        }
        const products = (await Axios(url)).data;
        const productCount = (await Axios(productCountUrl)).data;
        console.log("products", products);
        context.commit("setProducts", products);
        context.commit("setPageCount", productCount);
      } catch (e) {
        console.log(e);
      }
    },
    //based on pagination get the product on the respective page
    async setProductsByCategoryPaginationAction(context, page) {
      try {
        let url;
        if (context.state.currentCategory != "all") {
          url = `${productUrl}/${context.state.currentCategory}?p=${page}`;
        } else {
          url = `${productUrl}?p=${page}`;
        }
        const products = (await Axios.get(url)).data;
        context.commit("setProducts", products);
      } catch (e) {
        console.log(e);
      }
    },
    async addPage(context, page) {
      await Axios.post(pageUrl, page);
      const pages = (await Axios.get(pageUrl)).data;
      context.commit("setPages", pages);
    },
    async editPage(context, page) {
      await Axios.put(`${pageUrl}/${page._id}`, page);
      const pages = (await Axios.get(pageUrl)).data;
      context.commit("setPages", pages);
    },
    async deletePage(context, id) {
      await Axios.delete(`${pageUrl}/${id}`);
      const pages = (await Axios.get(pageUrl)).data;
      context.commit("setPages", pages);
    },

    async editProduct(context, product) {
      await Axios.put(productUrl, product);
    },

    async addProduct(context, product) {
      await Axios.post(productUrl, product);
    },

    async deleteProduct(context, product) {
      await Axios.delete(`${productUrl}/${product._id}`, product);
      const url = `${productUrl}?p=${context.state.currentPage}`;
      const products = (await Axios(url)).data;
      context.commit("setProducts", products);
    },
  },

  //coming from page editor componet when use click on the add page from pages components

  getters: {
    pageById: (state) => (id) => {
      return state.pages.find((page) => page._id === id);
    },

    productById: (state) => (id) => {
      return state.products.find((product) => product._id === id);
    },
  },
});
