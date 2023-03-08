export const strict = false
export const state = () => ({
  selectedBot: null,
});

export const mutations = {
  setSelectedBot(state, bot) {
    console.log('bot store', bot)
    state.selectedBot = bot;
  }
}

export const getters = {
  getSelectedBot: (state) => {
    console.log('bot get', state.selectedBot)
    return state.selectedBot;
  }
}

export const actions = {
}