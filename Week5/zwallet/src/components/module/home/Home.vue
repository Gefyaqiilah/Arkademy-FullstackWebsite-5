<template>
  <div class="home-grid">
    <BalanceDetail class="balance-detail"/>
    <BalanceGraphic class="balance-graphic"/>
    <TransactionHistory class="transaction-history"/>
  </div>
</template>

<script>
import BalanceDetail from '@/components/module/home/BalanceDetail'
import BalanceGraphic from '@/components/module/home/BalanceGraphic'
import TransactionHistory from '@/components/module/home/TransactionHistory'
export default {
  name: 'Home2',
  components: {
    BalanceDetail,
    BalanceGraphic,
    TransactionHistory
  }
}
</script>

<style scoped>
.home-grid{
  display:grid;
  grid-template-areas:
    "BalanceDetail BalanceDetail"
    "BalanceGraphic TransactionHistory"
  ;
}
.balance-detail{
  grid-area:BalanceDetail;
}
.balance-graphic{
  grid-area:BalanceGraphic;
}
.transaction-history{
  grid-area:TransactionHistory;
}
</style>
