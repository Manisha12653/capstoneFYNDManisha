<template>
  <div class="admin-container">
    <div class="admin-content">
      <router-link class="button" to="/admin/products">Products</router-link>
      <router-link class="button" to="/admin/pages">Pages</router-link>
    </div>
    <div class="admin-view">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  margin-top: 200px;
  display: flex;
  margin-left: 5rem;
  margin-right: 5rem;
  border-radius: 16px;
  border: 0.5px solid rgb(221, 221, 221);
  padding: 15px;
}

.admin-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.admin-view {
  display: flex;
  margin-left: 10rem;
}

.button {
  text-decoration: none;
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
  /* --bs-btn-hover-border-color: #0a58ca; */
}
.button:hover {
  background-color: #fd7e14;
  border: 0.5px solid transparent;
  border-radius: 8px;
  color: wheat;
}
@media (max-width: 1000px) {
  .admin-container {
    border: none;
    flex-wrap: wrap;
  }

  .admin-view {
    flex-wrap: wrap;
    margin-top: 40px;
  }
}
</style>
