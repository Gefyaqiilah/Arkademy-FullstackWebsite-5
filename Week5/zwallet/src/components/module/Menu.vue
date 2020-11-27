<template>
<div class="menu">
  <div class="container">
      <div class="menu-grid">
          <div class="menu-dashboard">
              <div class="location"><img src="/img/icon-menu-ruler.png" alt=""></div>
              <div class=""><img src="/img/icon-menu-grid.png" alt=""></div>
              <div class="menu-name active">Dashboard</div>
          </div>
          <div class="menu-transfer">
              <div class=""></div>
              <div class=""><img src="/img/icon-menu-arrow-up.png" alt=""></div>
              <div class="menu-name">Transfer</div>
          </div>
          <div class="menu-topup">
              <div class=""></div>
              <div class=""><img src="/img/icon-menu-plus.png" alt=""></div>
              <div class="menu-name">Top Up</div>
          </div>
          <div class="menu-profile">
              <div class=""></div>
              <div class=""><img src="/img/icon-menu-profile.png" alt=""></div>
              <div class="menu-name">Profile</div>
          </div>
          <div  class="menu-logout">
              <div class=""></div>
              <div class=""><img src="/img/icon-menu-log-out.png" alt=""></div>
              <div class="menu-name">Logout</div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>
/* Menu */
.menu {
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}
.menu .location img {
    position: relative;
    right: 15px;
}

.menu-grid {
    display: flex;
    height:100%;
    flex-direction: column;
    /* align-items: flex-end; */
    grid-template-columns: 100%;
    grid-template-rows: repeat(5, 50px);
    ;
    /* justify-content: space-evenly; */
}
.menu-grid > div{
  margin:50px 0 0 0 ;
}
.menu-grid .menu-dashboard {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-transfer {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-topup {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-profile {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
}

.menu-grid .menu-logout {
    display: grid;
    grid-template-columns: 0.3fr 1fr 3fr;
   margin:auto 0 50px 0;
}

.menu .menu-name {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    color: rgba(58, 61, 66, 0.8);

}

.menu .menu-name.active {
    font-weight: 700;
    font-size: 18px;
    line-height: 31px;
    color: #6379F4;

}
</style>
