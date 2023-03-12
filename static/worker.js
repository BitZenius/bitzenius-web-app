onmessage = (payload) => {
  let e = payload.data
  // AVERAGE  = TOTAL AMOUNT USD / TOTAL QUANTITY (depends on the positions array);
  // data.c   = Current Price (from binance stream)
  let average = parseFloat(e.data.average);
  let percentage =
    average == 0 ? 0 : (parseFloat(e.stream.c) - average) / average;
  let pnl =
    parseFloat(e.data.amountUsd) * percentage;

  percentage = pnl / e.data.amountUsd;

  // Floating P&L
  e.data.floatingProfit = {};
  e.data.floatingProfit.value = pnl.toFixed(3);
  e.data.floatingProfit.percentage = (
    percentage * 100
  ).toFixed(3);

  // Realized P&L
  e.data.realizedProfit = {};
  e.data.realizedProfit.value =
    e.data.grid_profit.toFixed(3);
  e.data.realizedProfit.percentage =
    e.data.amountUsd > 0
      ? (
        (e.data.grid_profit /
          e.data.amountUsd) *
        100
      ).toFixed(3)
      : 0;

  // Total P&L
  pnl += e.data.grid_profit;
  percentage = pnl / e.data.amountUsd;
  e.data.profit.value = pnl.toFixed(3);

  /**
   * 1. Floating P&L  ()
   * 2. Realized P&L  ()
   * 3. Total P&L     ()
   */

  let convertPercentage = percentage * 100;
  e.data.profit.percentage =
    convertPercentage.toFixed(3);

  console.log("WORKER RESULT: ", e.data)
  postMessage(e.data);
}