<template>
  <div class="login">
    <div class="container">
      <h1>Login</h1>
      <InputField id="email" type="email" label="Email" v-model="email" />
      <InputField
        id="password"
        type="password"
        label="Password"
        v-model="password"
      />
      <UIButton text="Login" @click="login" />
      <p>Don't have an account? <RouterLink to="/signup">SignUp</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const auth = useFirebaseAuth();

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  console.log("logging in");
  await signInWithEmailAndPassword(auth, email.value, password.value).catch(
    (error) => {
      console.log(error);
    }
  );
  console.log("logged in");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-top: 10px;
    }
  }
}
</style>
