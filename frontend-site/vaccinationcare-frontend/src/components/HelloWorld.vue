<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.hello {
  text-align: center;
  margin-bottom: 20px;
}
h1 {
  font-size: 2rem;
  color: #0d6efd;
}
</style>
