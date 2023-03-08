export const state = () => ({
  selectedExchange: "Binance",
});

export const mutations = {
  setSelectedExchange(state, exchange) {
    state.selectedExchange = exchange;
  }
}

export const getters = {
  getSelectedExchange: (state) => {
    return state.selectedExchange;
  }
}

export const actions = {
}