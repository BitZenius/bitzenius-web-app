<template>
  <div>
    <p style="text-align: justify">
      Automated bot works by scanning the entire market and taking positions
      based on your customized criteria. Here's what you need to know about our
      automated bot:
    </p>
    <ul class="mb-4">
      <li>
        The bot uses a hybrid method of Dollar-Cost Averaging (DCA) + Grid
        method. When the bot finds a pair that fits your criteria based on
        volume and trading indicator, it starts buying. After the bot takes the
        initial step, it takes profit based on the percentage you set. If the
        price goes down, it starts averaging down. Typically, our templates set
        the DCA for 4 levels, and the rest will be GRID. DCA means the bot
        averages down and takes profits based on the averaging position. The
        take-profit level is calculated as Average Position + (Average Position
        * Take Profit Percentage). Grid means the bot only takes profit/sells on
        that particular position. For instance, your XXX/USDT bot is at step 6
        (Grid). The price goes up and hits the take-profit level, so the bot
        only sells the amount that it bought on that step 6.
      </li>
      <li>
        Our bot can run 24/7 without any interruptions. Please ensure that you
        have enough balance on your exchange to keep the bot averaging down.
      </li>
      <li>
        You have complete control over the bot. You can force sell or stop the
        bot on each position anytime you want.
      </li>
      <li>
        When the bot is running, you can customize its setup as you wish. For
        example, you can change the minimum trading volume or add token
        exceptions.
      </li>
    </ul>
    <p style="text-align: justify">
      Experience the power of our automated bot, which utilizes a combination of
      DCA and Grid method to maximize your profits. Our bot runs 24/7, allowing
      you to sit back and watch your trading activities happen effortlessly.
      With full control in your hands, you can customize your bot's setup and
      force sell or stop it anytime you want. Ensure you have enough balance on
      your exchange and let our bot work its magic for you!
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>