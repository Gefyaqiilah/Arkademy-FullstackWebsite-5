<template>
  <div class="container-fluid m-0 p-0">
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/module/landing-page/Header'
import Main from '@/components/module/landing-page/Main'
import Footer from '@/components/module/landing-page/Footer'

export default {
  name: 'LandingPage',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style scoped>
</style>
