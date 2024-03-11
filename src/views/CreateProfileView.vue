<template>
  <div class="create-profile">
    <div class="container">
      <h1>Create Profile</h1>
      <InputField id="name" type="text" label="Name" v-model="name" />
      <InputField id="age" type="number" label="Age" v-model="age" />
      <InputField
        id="religion"
        type="text"
        label="Religion"
        v-model="religion"
      />
      <SelectField
        id="gender"
        label="Gender"
        v-model="gender"
        iconname="people-outline"
        :options="['male', 'female', 'other']"
      />
      <InputField id="caste" type="text" label="Caste" v-model="caste" />
      <InputField id="city" type="text" label="City" v-model="city" />
      <InputField id="state" type="text" label="State" v-model="state" />
      <UIButton text="Finish" @click="createProfile" />
    </div>
  </div>
</template>

<script async setup>
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore, getCurrentUser } from "vuefire";
import { useRouter } from "vue-router";

const db = useFirestore();
const router = useRouter();

const name = ref("");
const age = ref("");
const gender = ref("");
const religion = ref("");
const caste = ref("");
const city = ref("");
const state = ref("");
const currentUser = await getCurrentUser();

const createProfile = async () => {
  await updateDoc(doc(db, "users", currentUser.uid), {
    name: name.value,
    age: age.value,
    religion: religion.value,
    caste: caste.value,
    city: city.value,
    state: state.value,
  });
  console.log("updated");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.create-profile {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    max-width: 400px;
  }
}
</style>
