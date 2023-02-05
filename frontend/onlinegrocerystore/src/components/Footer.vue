<template>
  <div class="footer-container">
    <div class="footer">
      <img :src="productImages + 'fastdelivery.png'" class="image" />
      <div class="description">Superfast Delivery</div>
      <div class="footer-content">
        Get your order delivered to your doorstep at the earliest from dark
        stores near you.
      </div>
    </div>
    <div class="footer">
      <img :src="productImages + 'products.jpg'" class="image" />
      <div class="description">Best Prices & Offers</div>
      <div class="footer-content">
        Best price destination with offers directly from the manufacturers.
      </div>
    </div>
    <div class="footer">
      <img :src="productImages + 'shoppingcartfooter.png'" class="image" />
      <div class="description">Wide Assortment</div>
      <div class="footer-content">
        Choose products across food, personal care & other categories
      </div>
    </div>
  </div>

  <div class="footer-end">
    <h2 class="fontsize">GROCO – online grocery store</h2>
    <p>
      Did you ever imagine that the freshest of fruits and vegetables items
      could be handpicked and delivered to your home, all at the click of a
      button? . From household cleaning products to beauty and makeup, Groco has
      everything you need for your daily needs. Groco is convenience personified
      We’ve taken away all the stress associated with shopping for daily
      essentials, and you can now order all your household products and even buy
      groceries online without travelling long distances or standing in
      serpentine queues. Add to this the convenience of finding all your
      requirements at one single source, along with great savings, and you will
      realize that groco- India’s largest online supermarket, has revolutionized
      the way India shops for groceries. Online grocery shopping has never been
      easier. <br />Need things fresh?<br />
      Whether it’s fruits and vegetable, we have this covered as well! Get
      freshfruits and vegetable online at your convenience. Hassle-free Home
      Delivery options We deliver to 25 cities across India and maintain
      excellent delivery times, ensuring that all your products from groceries
      to snacks branded foods reach you in time.
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["productImages"]),
  },
};
</script>

<style scoped>
.image {
  object-fit: cover;
  background: rgb(236, 255, 236);
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 24px;
  display: flex;

  justify-content: center;

  align-items: center;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 0.5px solid rgb(221, 221, 221);
  padding: 15px;

  justify-content: center;
}

.description {
  font-size: 14px;
  text-align: center;
  color: rgb(0, 0, 0);
  margin-bottom: 8px;
  font-weight: 600;
}

.footer-content {
  font-size: 14px;
  text-align: center;
  color: rgb(102, 102, 102);

  margin-bottom: 8px;
  font-weight: 400;
}

.footer-container {
  display: grid;
  gap: 40px;
  padding-top: 40px;
  margin: 100px 20px;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
}

.footer-end {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 0.5px solid rgb(221, 221, 221);
  padding: 20px 40px;
  color: rgb(102, 102, 102);
  /* text-align: center; */
  margin: 100px 20px;
}
@media (max-width: 1000px) {
  .footer-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    padding-top: 0px;
  }
}
</style>
