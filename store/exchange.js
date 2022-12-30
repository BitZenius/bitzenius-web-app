export const state = () => ({
    selectedExchange: null,
});

export const mutations = {
    setSelectedExchange(state, exchange) {
        console.log('exchange store', exchange)
        state.selectedExchange = exchange;
    }
}

export const getters = {
    getSelectedExchange: (state) => {
        console.log('exchange get', state.selectedExchange)
        return state.selectedExchange;
    }
}

export const actions = {
}