<template>
  <div>
    <div class="container signup bg-info">
      <h1 class="text-center text-white">Log in</h1>
      <hr />
      <form @submit="handleLogin">
        <div class="form-group m-3">
          <label for="">Email:</label>
          <input type="email" v-model="email" class="form-control inputField" />
          <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-group m-3">
          <label for="">Password:</label>
          <input
            type="password"
            v-model="password"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.password.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <button type="submit" class="button">Log In</button>
      </form>
      <hr />
      <div class="divider">
        <h5 aria-level="5">New to Groco?</h5>
      </div>
      <div class="btn1">
        <button type="submit" class="button" @click="handleSingUpRoute">
          Create your Groco account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(7) },
    };
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
      userId: (state) => state.auth.user.userId,
    }),
  },
  methods: {
    ...mapActions({
      userLoginn: "auth/userLogin",
      mergeCart: "cart/mergeCart",
      setShoppingCart: "cart/setShoppingCart",
    }),
    ...mapMutations({ setUserAndToken: "auth/setUserAndToken" }),
    async handleLogin(e) {
      e.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const loginUser = new FormData();
        loginUser.append("email", this.email);
        loginUser.append("password", this.password);
        const response = await this.userLoginn(loginUser);

        if (response.data.resStatus === "failed") {
          this.$toast.show(`${response.data.message}`);
        }
        if (response.data.resStatus === "success") {
          const data = {
            userId: response.data.user._id,
            username: response.data.user.fullName,
            userRole: response.data.user.role,
          };
          localStorage.setItem("userData", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("userLoggedIn", "true");

          this.setUserAndToken();
          await this.mergeCart();
          await this.setShoppingCart(this.userId);

          this.$router.push("/");
        }
      }
    },
    handleSingUpRoute() {
      this.$router.push("/signup");
    },
  },
};
</script>
<style scoped>
label {
  font-size: 25px;
}
.inputField {
  height: 45px;
}
.container {
  background-color: #fd7e14 !important;
  color: whitesmoke;
  margin-top: 200px;
  border-radius: 2rem;
  width: 40rem;
  height: 29.5rem;
}
.button {
  border-radius: 5px;
  border: #22160d;
  color: white;
  margin-left: 1rem;
  background-color: #2d190c2c !important;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.5rem;
}
.divider {
  text-align: center;
  margin-top: 1.5rem;
}
.btn1 {
  text-align: center;
}
.input-errors {
  color: red;
}
@media (max-width: 600px) {
  .container {
    width: 20rem;
    height: 30rem;
  }
}
</style>
