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
