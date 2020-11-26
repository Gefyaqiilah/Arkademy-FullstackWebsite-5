<template>
  <div>
    <h1>Ini AddPin</h1>
    <router-link :to="{ name : 'Login'}"> ke login</router-link>
    <button class="btn btn-primary" v-on:click="toLogin">Ke login</button>
  </div>
</template>

<script>
export default {
  name: 'AddPin',
  methods: {
    toLogin () {
      this.$router.replace({ name: 'Login', params: { nama: 'gefy' } })
    }
  }
}
</script>

<style scoped>

</style>
