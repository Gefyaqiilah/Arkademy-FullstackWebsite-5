<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 wrapper-auth">

      </div>
      <div class="col-6">
        <button class="btn btn-primary">cekcek</button>
        <NewButton/>
      </div>
    </div>
  </div>
</template>

<script>
import NewButton from '@/components/base/NewButton'
export default {
  name: 'Auth',
  components: {
    NewButton
  },
  created () {
    console.log('ini waktu dibuat')
  },
  mounted () {
    console.log('ini mount')
  },
  beforeCreate () {
    console.log('ini waktu beforecreate')
  }

}
</script>

<style scoped>
.wrapper-auth{
  background-image: url('/img/background.png');
  background-repeat: no-repeat;
  height:100vh;
}
</style>
