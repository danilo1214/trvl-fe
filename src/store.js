import Vuex from "vuex";


export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: null,
            trips: [
                {
                    id: "0",
                    name: "Central Europe Tour",
                    duration: "10/12/2020 - 22/12/2020",
                    description: "A short trip across the central European cities.",
                    budget: 500,
                    cost: 400,
                    destinations: [
                        {
                            id: 0,
                            name: "Prague",
                            date: new Date("11-20-2020"),
                            n: 50.0755,
                            e: 14.4378
                        },
                        {
                            id: 1,
                            name: "Berlin",
                            date: new Date("11-24-2020"),
                            n: 52.5200,
                            e: 13.4050
                        }
                    ]
                }
            ]
        },
        mutations: {
            APP_LOGIN(state, value) {
                state.token = value;
            }
        },
        getters: {
            trips: (state) => {
                console.log(state);
                return state.trips
            },
            getTrip: (state) => id => {
                return state.trips.filter(trip=>{
                    console.log(trip.id, id, trip.id === id);
                    return trip.id === id;
                });
            }
        },
        actions: {
            logout: ({commit}) => {
              commit('APP_LOGIN', null);
            },
            login({commit}, {token}) {
                commit("APP_LOGIN", token);
                localStorage.setItem("trvl-token", token);
            }
        }
    });
};

