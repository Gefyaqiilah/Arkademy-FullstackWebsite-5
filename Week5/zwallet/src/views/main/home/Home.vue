<template>
<div>
    <header>
        <Navbar :token="getToken"/>
    </header>
    <main class="grid-main">
        <Menu class="menu" :token="getToken"/>
        <router-view class="pages" :token="sendToken"/>
    </main>
    <footer>
      <Footer/>
    </footer>
</div>
</template>
<script>
import Navbar from '@/components/module/Navbar'
import Menu from '@/components/module/Menu'
import Footer from '@/components/module/Footer'
import axios from 'axios'
import jwt from 'jsonwebtoken'
export default {
  name: 'Home',
  data () {
    return {
      token: localStorage.getItem('accessToken') || null,
      timer: ''
    }
  },
  components: {
    Navbar,
    Menu,
    Footer
  },
  methods: {
    sendProps () {
      if (this.$route.name === 'HomeComponent') {
        return {
          token: this.token
        }
      }
    },
    fetchToken () {
      return axios.post(`${process.env.VUE_APP_SERVICE_API}/users/token`, {
        token: localStorage.getItem('refreshToken')
      })
        .then(results => {
          console.log('masukkk')
          const accessToken = results.data.result.accessToken
          const decoded = jwt.verify(accessToken, process.env.VUE_APP_JWT_KEY)
          console.log(decoded)
          this.token = decoded
          localStorage.setItem('accessToken', JSON.stringify(decoded))
        })
        .catch(() => {
          alert('Looks like server in error')
        })
    }
  },
  mounted () {
    this.fetchToken()
    console.log(this.$router.name)
    this.timer = setInterval(this.fetchToken, 30000)
  },
  computed: {
    convert () {
      return JSON.parse(this.token)
    },
    // eslint-disable-next-line vue/return-in-computed-property
    sendToken () {
      if (this.$route.name === 'HomeComponent') { return { token: JSON.parse(this.token) } }
      if (this.$route.name === 'SearchReceiver') { return { token: 'ini search receiver' } }
    },
    getToken: {
      get: function () {
        return JSON.parse(this.token)
      },
      set: function () {
        this.token = JSON.parse(localStorage.getItem('accessToken'))
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
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
