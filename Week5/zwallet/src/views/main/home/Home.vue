<template>
<div>
    <header>
        <Navbar/>
    </header>
    <main class="grid-main">
        <Menu class="menu"/>
        <router-view class="pages"/>
    </main>
    <footer>
      <Footer/>
    </footer>
  <ModalPin/>
</div>
</template>
<script>
import Navbar from '@/components/module/Navbar'
import Menu from '@/components/module/Menu'
import Footer from '@/components/module/Footer'
import ModalPin from '@/components/module/transfer/ModalPin'
export default {
  name: 'Transfer',
  components: {
    Navbar,
    Menu,
    Footer,
    ModalPin
  }
}
</script>

<style scoped>
main{
  width:100%;
  padding: 50px 150px 50px 150px;
  background-color: rgb(250, 252, 255);
}
.grid-main {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: max-content max-content;
    grid-template-areas:
        'menu pages'
        'menu pages';
    gap: 20px 20px;
}
.menu{
  grid-area: menu;
}
.pages{
  grid-area:pages;
}

</style>
