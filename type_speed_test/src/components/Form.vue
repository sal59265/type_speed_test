<template>
  <div>
    <form v-on:submit.prevent="handleSubmit">
      <input
      @input="handleFormChange($event)"
      placeholder="name"
      :value="name"
      name="name"
      type="name"
      />
      <input
      @input="handleFormChange($event)"
      placeholder="password"
      :value="password"
      name="password"
      type="password"
      />
      <input
      @input="handleFormChange($event)"
      placeholder="email"
      :value="email"
      name="email"
      type="email"
      />
          </form>
      <button :disabled="!name || !password">Submit</button>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    form: Boolean,
    name: String,
    password: String
  },
  methods: {
    handleFormChange(e) {
      this.$emit('handleFormChange', e.target.name, e.target.value)
    },
    handleSubmit(e) {
      e.preventDefault()
      this.$emit('handleSubmit')
    }
  }

}
</script>
<style scoped>
  input {
    margin-bottom: 0.45rem;
  color: rgb(61, 79, 88);
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.7px;
  line-height: 1.3;
  }
</style>
