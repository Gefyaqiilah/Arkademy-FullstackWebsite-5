<template>
  <div class="detail-profile">
    <div class="profile-information">
        <div class="profile-photo">
            <img src="/img/Rectangle 25-80x80.png" class="photo-profile" alt="">
            <p><img src="/img/edit-2.png" alt=""> Edit</p>
        </div>
        <div class="profile-name">
            <h1>Robert Chandler</h1>
            <p>+62 813-9387-7946</p>
        </div>
    </div>
    <div class="profile-menu">
        <div class="personal-information list-menu">
            <div class="list-menu-left">
                <p><router-link class="text-decoration" to="/home/personalinformation">Personal Information</router-link></p>
            </div>
            <div class="list-menu-right">
                <img src="/img/arrow-left.png" alt="">
            </div>
        </div>
        <div class="change-password list-menu">
            <div class="list-menu-left">
                <p>Change Password</p>
            </div>
            <div class="list-menu-right">
                <img src="/img/arrow-left.png" alt="">
            </div>
        </div>
        <div class="change-pin list-menu">
            <div class="list-menu-left">
                <p>Change PIN</p>
            </div>
            <div class="list-menu-right">
                <img src="/img/arrow-left.png" alt="">
            </div>
        </div>
        <div class="logout list-menu">
            <div class="list-menu-left">
                <p>Logout</p>
            </div>
            <div class="list-menu-right">
                <img src="/img/arrow-left.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>
.detail-profile {
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}
.profile-photo {
    margin: 50px 0 0 0;
}

.profile-name {
    margin: 20px 0 0 0;
}

.profile-name h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: #4D4B57;
}

.profile-name p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    text-align: center;
    color: #7A7886;
}

.profile-photo .photo-profile {
    display: block;
    margin: 0 auto;
}

.profile-photo p {
    margin: 10px 0 0 0;
    text-align: center;
}

.profile-menu {
    display: grid;
    gap: 20px 0;
}

.list-menu {
    width: 433px;
    height: max-content;
    margin: 0 auto;
    background: #E5E8ED;
    border-radius: 10px;

    display: grid;
    grid-template-columns: 5fr 0.5fr;
    grid-template-rows: max-content;
    grid-template-areas: 'list-menu-left list-menu-right';
}

.list-menu-left {
    padding: 10px 0;
    grid-area: list-menu-left;
    box-sizing: border-box;
}

.list-menu-left p {
    margin: 10px 20px;
    font-style: 700;
    font-weight: bold;
    font-size: 16px;
    line-height: 28px;
    color: #4D4B57;
}
.text-decoration {
    color: #4D4B57;
    text-decoration:none;
}
.list-menu-right {
    grid-area: list-menu-right;
}

.list-menu-right img {
    display: block;
    margin: 20px 0;
}
@media screen and (max-width:992px){
      .detail-profile {
        padding: 50px 0;
    }
}
@media (max-width:576px) {
    .list-menu {
        width: 250px;
    }

    .detail-profile .balance-amount {
        text-align: center;
    }

    .detail-profile .balance {
        text-align: center;
    }

    .detail-profile .telephone {
        text-align: center;
        margin: 0 auto 0 auto;
    }

    .detail-profile .transfer {
        margin: 0 auto 0 auto;
    }

    .detail-profile .topup {
        margin: 0 auto 50px auto;
    }

}
@media screen and (max-width:356px){
      .list-menu {
        width: 160px;
    }
    .list-menu-right{
      margin:auto 5px auto auto;
    }
}
</style>
