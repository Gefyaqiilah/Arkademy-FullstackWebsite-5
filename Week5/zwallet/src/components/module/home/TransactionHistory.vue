<template>
<div class="transaction-history">
  <div class="container ">
  <div class="transaction-history-grid">
      <div class="title">
          <p>Transaction History</p>
          <a href="#">See all</a>
      </div>
      <div class="history">
          <div class="transaction col-md-12">
              <img src="/img/1.png" alt="">
              <div class="detail-name">
                  <p class="name">Samuel Suhi</p>
                  <p class="status">Transfer</p>
              </div>
              <p class="amount green">+Rp50.000</p>
          </div>
          <div class="transaction col-md-12">
              <img src="/img/logo.png" alt="">
              <div class="detail-name">
                  <p class="name">Netflix</p>
                  <p class="status">Subscription</p>
              </div>
              <p class="amount red">-Rp149.000</p>
          </div>
          <div class="transaction col-md-12">
              <img src="/img/2.png" alt="">
              <div class="detail-name">
                  <p class="name">Christine Mar..</p>
                  <p class="status">Transfer</p>
              </div>
              <p class="amount green">+Rp150.000</p>
          </div>
          <div class="transaction col-md-12">
              <img src="/img/logo-adobe.png" alt="">
              <div class="detail-name">
                  <p class="name">Adobe Inc.</p>
                  <p class="status">Subscription</p>
              </div>
              <p class="amount red">-Rp249.000</p>
          </div>
      </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'TransactionHistory'
}
</script>

<style scoped>
.transaction-history {
  grid-area: transaction-history;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
}
.transaction-history-grid {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 70px 100%;
    grid-template-areas: 'title''history';
}
.title {
    grid-area: title;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: 'transaction seeall';
}

.title p {
    grid-area: transaction;
    margin: 25px 0 0 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3A3D42;
}

.title a {
    grid-area: seeall;
    margin: 25px 0 0 100px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #6379F4;
    text-decoration: none;
}

.history {
    grid-area: history;
}
.transaction {
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-template-rows: 100px;
    gap: 10px 0px;
    grid-template-areas: 'foto detail-name amount';
    /* margin-top: 20px; */
}

.transaction img {
    grid-area: foto;
}

.transaction .detail-name {
    grid-area: detail-name;
    margin: 0 0 0 10px;
}

.transaction .detail-name p {
    margin: 0 0;
}

.transaction .detail-name p.name {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #4D4B57;
}

.transaction .detail-name p.status {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #4D4B57;
}

.transaction p.amount {
    grid-area: amount;
    margin: 0 0 0 20px;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
}

.transaction p.amount.green {
    color: #1EC15F;
}

.transaction p.amount.red {
    color: #FF5B37;
}
</style>
