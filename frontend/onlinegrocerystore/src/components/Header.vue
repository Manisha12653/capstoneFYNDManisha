<template>
  <div class="header">
    <div class="left-header">
      <div>
        <router-link class="navbar-brand" to="/"
          ><i class="fas fa-shopping-basket"></i> Groco</router-link
        >
      </div>
      <div class="nav-item active" v-for="(p, i) in pages" :key="i">
        <router-link class="nav-link" v-if="p.slug != ''" :to="'/' + p.slug">{{
          p.name
        }}</router-link>
      </div>
    </div>

    <div class="right-header">
      <!-- <ul class="navbar-nav mr-auto"> -->

      <div class="nav-item active" v-if="userRole === 'admin'">
        <router-link class="nav-link" to="/admin">Admin</router-link>
      </div>

      <div class="nav-item active navmargin" v-if="!userLoggedIn">
        <router-link class="nav-link" to="/login">Login</router-link>
      </div>

      <div class="nav-item active" v-if="!userLoggedIn">
        <router-link class="nav-link" to="/signup">SignUp</router-link>
      </div>

      <div class="nav-item active account" v-if="userLoggedIn">
        <a href="#" class="nav-link" @click="checkStatus">Account</a>

        <div class="sub-menu-1" v-if="activestatus">
          <ul>
            <li class="nav-listitem">My Account</li>

            <li class="nav-listitem">({{ userName }})</li>

            <li class="nav-listitem">
              <router-link class="nav-link1" to="/orders" @click="checkStatus"
                >Purchase History</router-link
              >
            </li>

            <li class="nav-listitem">
              <router-link class="nav-link1" to="/" @click="handleLogOut"
                >LogOut</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="nav-item nav-link">
        <CartSummary />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CartSummary from "./CartSummary.vue";

export default {
  components: {
    CartSummary,
  },
  data() {
    return {
      activestatus: false,
    };
  },

  computed: {
    ...mapState(["pages", "productImages"]),
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
      userName: (state) => state.auth.user.userName,
      userRole: (state) => state.auth.user.userRole,
    }),
  },
  methods: {
    ...mapActions({
      clearCartData: "cart/clearCartData",
      updateCart: "cart/updateCart",
    }),
    ...mapMutations({ clearUserData: "auth/clearUserData" }),
    checkStatus(e) {
      e.preventDefault();
      this.activestatus = !this.activestatus;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.activestatus = false;
      }
    },
    async handleLogOut() {
      await this.updateCart();
      this.clearUserData();
      this.clearCartData();
    },
  },

  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  width: 98.6vw;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  background: #fff;
  box-shadow: #fff;
}
.left-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
}

.right-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22vw;
}
.nav-link {
  color: #130f40;
  font-weight: 500;
}

.nav-link:hover {
  color: #fd7e14;
}

.nav-link1 {
  color: white;
  text-decoration: none;
}
.navcolor {
  --bs-bg-opacity: 1;
  color: #000;
  background-color: #fd7e14 !important;
}
.logout {
  margin-left: 31rem;
}
.username {
  color: whitesmoke;
}
.sub-menu-1 {
  display: block;
  position: absolute;
  margin-top: 15px;
  margin-left: -15px;
  height: 12rem;
  color: whitesmoke;
  background-color: #fd7e14;
  list-style: none;

  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.nav-listitem {
  list-style: none;
  width: 170px;
  padding: 2px;
  border-radius: 0;
  text-align: left;
}
.nav-listitem:nth-child(2) {
  border-bottom: 0.5px dotted #170d06;
}
.nav-listitem:last-child {
  border-bottom: none;
  padding-top: 0;
}

.btn {
  color: #fd7e14;
  border-radius: 16px;
  border: 0.5px solid #fd7e14;
}

.navbar-brand {
  font-weight: 600;
  font-size: 30px;
  color: #130f40;
}
.navbar-brand:hover {
  color: #fd7e14;
}

.fa-shopping-basket {
  color: #fd7e14;
}

@media (max-width: 500px) {
  .left-header {
    width: 43vw;
  }

  .right-header {
    width: 55vw;
  }
}
@media (min-width: 500px) and (max-width: 950px) {
  .left-header {
    width: 40vw;
  }

  .right-header {
    width: 53vw;
  }
}

@media (min-width: 950px) and (max-width: 1200px) {
  .left-header {
    width: 27vw;
  }

  .right-header {
    width: 31vw;
  }
}
</style>
