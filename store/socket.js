import io from "socket.io-client";

export const state = () => ({
    streamTicker: null,
    streamRealtimeUpdate:null
});

export const mutations = {
    setStreamTicker(state, payload) {
        state.streamTicker = payload
    },
    setRealtimeUpdate(state, payload) {
        state.streamRealtimeUpdate = payload
    }
}

export const getters = {

}

export const actions = {
    async setStreamTickerFunction({ commit, state }, config) {
        try {
            commit("setStreamTicker", new WebSocket(`wss://stream.bitzenius.com/stream/ticker`));
        } catch (error) {
            console.log('setStream', error)
            commit("setStreamTicker", null)
        }
    },
    async setStreamRealtimeUpdate({ commit, state }, config) {
        alert('setStreamRealtimeUpdate');
        console.log('setStreamRealtimeUpdate-config', config);
        
        try {
            let token = config.token;
            commit("setRealtimeUpdate", io(process.env.SERVER, {
                path: "/realtime-update",
                auth: { token },
            }));
        } catch (error) {
            console.log('setStreamRealtimeUpdate', error)
            commit("setRealtimeUpdate", null)
        }
    }
}