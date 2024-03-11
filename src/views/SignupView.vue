<template>
  <div class="signup">
    <div class="container">
      <h1>SignUp</h1>
      <InputField id="email" type="email" label="Email" v-model="email" />
      <InputField id="phone" type="text" label="Phone" v-model="phone" />
      <InputField
        id="password"
        type="password"
        label="Password"
        v-model="password"
      />
      <InputField
        id="repeat-password"
        type="password"
        label="Password Again"
        v-model="repeatPassword"
      />
      <UIButton text="Next" @click="signup" />
      <p>Already have an account? <RouterLink to="/login">Login</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import UIButton from "../components/UIButton.vue";
import { RouterLink } from "vue-router";

import { useFirebaseAuth, useFirestore } from "vuefire";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const db = useFirestore();
const auth = useFirebaseAuth();
const router = useRouter();

const email = ref("");
const phone = ref("");
const password = ref("");
const repeatPassword = ref("");

const signup = async () => {
  if (password.value !== repeatPassword.value) {
    alert("Passwords do not match");
    return;
  }
  console.log("signing up");
  let user = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  ).catch((error) => {
    console.log(error);
  });

  if (user) {
    await setDoc(doc(db, "users", user.user.uid), {
      email: email.value,
      phone: phone.value,
    });

    console.log("user created");

    router.push("/create-profile");
  }
};

onMounted(async () => {
  let data = await getDoc(doc(db, "users", "anupamkris"));
  console.log(data.data());
});
</script>

<style lang="scss" scoped>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    max-width: 400px;

    p {
      margin-top: 10px;
    }
  }
}
</style>
