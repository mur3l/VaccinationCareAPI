<template>
  <div class="home">
    <img class="logo" alt="VaccinationCare logo" src="../assets/logo.jpg" />

    <HelloWorld msg="Welcome to VaccinationCare" />

    <section class="intro">
      <p>
        VaccinationCare võimaldab administraatoril lisada vaktsiinide kirjelduse,
        tähtpäeva ning BestBefore kuupäeva, mis hõlbustab sisestaja tööd. Mugav
        ja kaasaegne lahendus vaktsiinide haldamiseks.
      </p>
    </section>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 40px;
}
.logo {
  max-width: 220px;
  width: 100%;
  margin-bottom: 24px;
}
.intro {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6; /* veidi rohkem ruumi ridade vahel */
  color: #333;
  padding: 0 16px;
  margin-top: 20px;
  text-align: justify; /* Justifitseeritud tekst */
  text-justify: inter-word; /* Parem sõnade vaheline joondus */
  hyphens: auto; /* Poolitab sõnu rea lõpus (kui toetatud) */
}
</style>
