<template>
  <div>
    <p style="text-align: justify">
      This bot uses a hybrid method of Dollar-Cost Averaging (DCA) + Grid
      method. When the bot finds a pair that you choose giving a signal based on
      trading indicator that you set, it starts buying. After the bot takes the
      initial step, it takes profit based on the percentage you set. If the
      price goes down, it starts averaging down. Typically, our templates set
      the DCA for 4 levels, and the rest will be GRID (you can customize this).
    </p>

    <p style="text-align: justify">
      DCA means the bot averages down and takes profits based on the averaging
      position. The take-profit level is calculated as Average Position +
      (Average Position * Take Profit Percentage).
    </p>
    <p style="text-align: justify">
      Grid means the bot only takes profit/sells on that particular position.
      For instance, your XXX/USDT bot is at step 7 (Grid). The price goes up and
      hits the take-profit level, so the bot only sells the amount that it
      bought on that step 7.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>