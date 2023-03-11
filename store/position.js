import collectionPosition from '@/static/json/position.json';

export const state = () => ({
  activePositions: [],
  streaming:false,
});

export const mutations = {
  upsert(state, payload) {
    let index = payload.index;
    let data = payload.data;
    if (index >= 0) {
      state.activePositions[index] = data;        
    } else {
      state.activePositions.push(data);
    }
  },
  setStreaming(state, payload) {
    state.streaming = payload;
  }
}

export const getters = {
}

export const actions = {
  async fetchPosition({ commit, state }, config) {
    try {
      return collectionPosition;
    } catch (error) {
      return false;
    }
  },
}