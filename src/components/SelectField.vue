<template>
  <div class="select-field">
    <div class="field">
      <label :for="id"><ion-icon :name="iconname"></ion-icon></label>
      <select :id="id" :name="id" v-model="modelValue">
        <option value="" disabled selected>Select {{ label }}</option>
        <option v-for="option in options" :value="option">
          {{ option.toUpperCase()[0] + option.slice(1) }}
        </option>
      </select>
    </div>
    <p :class="{ 'error-active': errorMessage.length }">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
const modelValue = defineModel();

const props = defineProps({
  id: String,
  label: String,
  options: Array,
  iconname: String,
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.select-field {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;

  .field {
    display: flex;
  }

  label {
    height: 40px;
    width: auto;

    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: #f1f1f1;
    color: #1e1e1f;
    border: 1px solid #d4d4d4;

    font-size: 14px;

    border-radius: 5px 0 0 5px;

    min-width: 50px;
  }

  select {
    height: 40px;
    width: 100%;

    background: #eeeeee;
    color: #1e1e1f;

    border: 1px solid #d4d4d4;
    border-radius: 0 5px 5px 0;
    border-left: none;

    padding: 0 5px;
    font-size: 14px;
    outline: none;
  }

  p {
    color: red;
    margin-top: 5px;
  }
}
</style>
