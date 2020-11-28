<template>
<div class="search-receiver">
  <div class="search-receiver-title">
    <p>Search Receiver</p>
  </div>
  <div class="search-input">
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><img src="/img/search.png" alt=""></span>
          </div>
          <input type="text" v-model="search" class="form-control search-input-text shadow-none" placeholder="Search receiver here" aria-label="Username" aria-describedby="basic-addon1">
          </div>
      </div>
  <div class="list-receiver">
    <div v-for="listReceiver in userReceiver" :key="listReceiver.id" class="receiver">
        <div class="thumbnail-photo">
            <img src="/img/1-70x70.png" :alt="listReceiver.firstName + ' Foto'">
        </div>
        <div class="detail-username">
            <p class="username">{{listReceiver.firstName +' '+ listReceiver.lastName}}</p>
            <p class="telephone">{{listReceiver.phoneNumber}}</p>
        </div>
    </div>
  </div>
  <infinite-loading @infinite="infiniteHandler"></infinite-loading>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchReceiver',
  props: ['token'],
  data: () => {
    return {
      search: '',
      userReceiver: []
    }
  },
  methods: {
    searchReceiver () {
      // eslint-disable-next-line eqeqeq
      return axios.get(`${process.env.VUE_APP_SERVICE_API}/users?page=1&limit=4&order=asc`)
        .then(results => {
          this.userReceiver = results.data.result
        })
        .catch(error => {
          console.log(error)
        })
    },
    redirect () {
      if (!localStorage.getItem('accessToken')) {
        this.$router.replace('/auth/login')
      }
    },
    infiniteHandler ($state) {
      axios.get(`${process.env.VUE_APP_SERVICE_API}/users?page=`)
    }
  },
  mounted () {
    this.searchReceiver()
    this.redirect()
    console.log()
  }
}
</script>

<style scoped>
.search-receiver {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px max-content max-content;
    grid-template-areas:
        'search-receiver-title'
        'search-input'
        'list-receiver'
    ;
}

.search-receiver-title {
    grid-area: search-receiver-title;

    display: flex;
    align-items: center;
}

.search-receiver-title {
    margin: 0 30px 0 30px;
}

.search-receiver-title p {
    font-weight: 700;
    font-size: 18px;
    color: #3A3D42;
}

.search-input {
    margin: 0 30px 0 30px;
}

::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: rgba(169, 169, 169, 0.8) !important;
}

.search-input-text {
    height: 54px;
    border-radius: 12px;
    border: none !important;
    background: rgba(58, 61, 66, 0.1) !important;

}

.form-control:focus {
    outline: none !important;
}

.input-group-text {
    background: rgba(58, 61, 66, 0.1) !important;
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
    border: none !important;
}

.input-group-prepend {
    border: none !important;
    margin: 0;
}

.list-receiver {
    grid-area: list-receiver;
    margin: 30px 30px 0 30px;
}

.list-receiver {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content;
    gap: 10px 0;
}

.receiver {
    display: grid;
    grid-template-columns: 0.4fr 5fr;
    grid-template-rows: 110px;
    grid-template-areas: 'thumbnail-photo detail-username';

    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.receiver .thumbnail-photo {
    grid-area: thumbnail-photo;
    margin: auto 0 auto 15px;
}

.receiver .detail-username {
    grid-area: detail-username;
    margin: auto 0 auto 20px;
}

.receiver .detail-username .username {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #4D4B57;
}

.receiver .detail-username .telephone {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #7A7886;
}
</style>
