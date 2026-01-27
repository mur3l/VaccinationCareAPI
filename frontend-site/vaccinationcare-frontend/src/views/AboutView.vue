<template>
  <div class="about-page">
    <h1>About VaccinationCare</h1>

    <section class="intro">
      <p>
        VaccinationCare on loodud selleks, et lihtsustada vaktsiinide haldamist
        ja sisestamist. Rakendus võimaldab administraatoritel lisada vaktsiinide
        kirjeldused, määrata vaktsiinidele tähtpäevad ja BestBefore kuupäevad,
        mis aitavad tagada õigeaegse kasutamise. See lahendus on mugav,
        kaasaegne ning toetab sujuvat andmete haldamist.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-page {
  text-align: center;
  margin-top: 40px;
}

.intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  padding: 0 16px;
  margin-top: 20px;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}
</style>
