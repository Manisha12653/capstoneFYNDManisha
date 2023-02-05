<template>
  <section class="home">
    <div class="content">
      <h3>Fresh and <span>Organic</span> products for you</h3>
      <a href="#" class="btn">Shop Now</a>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.btn {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.2rem 0.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid orange;
  color: orange;
  cursor: pointer;
  background: none;
}

.btn:hover {
  background: orange;
  color: #fff;
}
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(../assets/banner-bg.webp) no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 7rem;
  padding-left: 5rem;
  margin-top: 3rem;
  height: 300px;
}

.home .content {
  text-align: center;
}

.home .content h3 {
  color: #130f40;
  font-size: 3rem;
}

.home .content h3 span {
  color: #fd7e14;
}

@media (max-width: 1000px) {
  .home {
    background-size: contain;
    /* max-width: 100%; */
  }
}

@media (max-width: 620px) {
  .home .content h3 {
    color: #130f40;
    font-size: 1.5rem;
  }
}
</style>
