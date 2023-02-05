<template>
  <div class="aboutus-container">
    <categories />
    <div class="about-content">
      Groco (Innovative Retail Concepts Private Limited) is India’s largest
      online food and grocery store. With over 18,000 products and over a 1000
      brands in our catalogue you will find everything you are looking for.
      Right from fresh Fruits and Vegetables, Seasonings to Packaged products,
      Personal care products, – we have it all. Choose from a wide range of
      options in every category, exclusively handpicked to help you find the
      best quality available at the lowest prices. Select a time slot for
      delivery and your order will be delivered right to your doorstep, anywhere
      in Bangalore, Hyderabad, Mumbai, Pune, Chennai, Delhi, Noida, Mysore,
      Coimbatore, Vijayawada-Guntur, Kolkata, Ahmedabad-Gandhinagar,
      Lucknow-Kanpur, Gurgaon, Vadodara, Visakhapatnam, Surat, Nagpur, Patna,
      Indore and Chandigarh Tricity You can pay online using your debit / credit
      card or by cash / sodexo on delivery. We guarantee on time delivery, and
      the best quality!
    </div>

    <img :src="productImages + 'Shoppingcart.png'" class="product-image" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import categories from "./CategoryList.vue";
export default {
  components: {
    categories,
  },

  computed: {
    ...mapState(["productImages"]),
  },
};
</script>
<style scoped>
.category-item {
  margin-left: 50px;
}
.aboutus-container {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 200px;
  border-radius: 16px;
  border: 0.5px solid rgb(221, 221, 221);
  padding: 15px;
}
.product-image {
  height: 200px;
  width: 200px;
  object-fit: cover;
}

@media (max-width: 950px) {
  .aboutus-container {
    flex-wrap: wrap;
  }
}
</style>
