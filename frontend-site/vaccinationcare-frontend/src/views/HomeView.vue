<template>
  <div class="home">
    <img
      class="logo"
      alt="VaccinationCare logo"
      src="../assets/logo.jpg"
    />
    <HelloWorld msg="Welcome to VaccinationCare" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 40px;
}

.logo {
  max-width: 220px;
  width: 100%;
  height: auto;
  margin-bottom: 24px;
}
</style>
