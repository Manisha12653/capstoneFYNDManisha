<template>
  <div>
    <div class="container signup bg-info">
      <h1 class="text-center text-white">Sign up</h1>
      <hr />
      <form @submit="handleSignUp">
        <div class="form-group m-3">
          <label for="">FirstName:</label>
          <input
            type="text"
            v-model="firstname"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.firstname.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="form-group m-3">
          <label for="">LastName:</label>
          <input
            type="text"
            v-model="lastname"
            class="form-control inputField"
          />
          <div
            class="input-errors"
            v-for="error of v$.lastname.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
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
        <button type="submit" class="button">Sign up</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useVuelidate(),
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      firstname: { required },
      lastname: { required },
      email: { required, email },
      password: { required, minLength: minLength(7) },
    };
  },
  methods: {
    ...mapActions({ storeUserSignUpInfoo: "auth/storeUserSignUpInfo" }),
    async handleSignUp(e) {
      e.preventDefault();
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const signUpUser = new FormData();

        signUpUser.append("firstname", this.firstname);
        signUpUser.append("lastname", this.lastname);
        signUpUser.append("email", this.email);
        signUpUser.append("password", this.password);
        console.log(signUpUser);
        const response = await this.storeUserSignUpInfoo(signUpUser);
        console.log(response);
        if (response === "user already exits") {
          this.$toast.show(`${response}`);
        }
        if (response === "Registered Successfully ...") {
          this.$toast.show(`${response}`);
        }

        this.$router.push("/login");
      }
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
  height: 38rem;
}

.button {
  border-radius: 5px;
  border: #22160d;
  color: white;
  margin-left: 1rem;
  background-color: #2d190c2c !important;
  padding-left: 1rem;
  padding-right: 1rem;
  /* --bs-btn-hover-border-color: #0a58ca; */
}
.input-errors {
  color: red;
}
@media (max-width: 600px) {
  .container {
    width: 22rem;
    height: 32rem;
  }
}
</style>
