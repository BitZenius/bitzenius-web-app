import collectionPosition from '@/static/json/position.json';

export const state = () => ({});

export const mutations = {}

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