import axios from "axios";
import Vuex from "vuex";
import moment from "moment";

const endpoint = "http://127.0.0.1:8000/api"
export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: null,
            recommendations: {},
            trips: [],
            destinations: [],
            interests: [],
            user: {},
            access_token: null
        },
        mutations: {
            SET_TRIPS(state, data) {
                state.trips = data;
            },
            SET_DESTINATIONS(state, data) {
                state.destinations = data;
            },
            SET_INTERESTS(state, data) {
                state.interests = data;
            },
            SET_RECOMMENDATIONS(state, data) {
                state.recommendations = data;
            },
            CREATE_TRIP(state, value) {
                state.trips.push(value);
            },
            SET_TOKEN(state, token) {
                state.access_token = token;
            }
        },
        getters: {
            interests: (state) => {
                return state.interests;
            },
            token: (state) => {
                return state.access_token;
            },
            trips: (state) => {
                return state.trips
            },
            user: (state) => {
                return state.user;
            },
            destinations: (state) => {
                return state.destinations
            },
            recommendations: (state) => {
                return state.recommendations
            },
            getTrip: (state) => id => {
                return state.trips.filter(trip => {
                    return Number(trip.trip_id) === Number(id);
                });
            },
            getDestination: (state) => id => {
                return state.destinations.filter(dest => {
                    return Number(dest.destination_id) === Number(id);
                });
            }
        },
        actions: {
            logout: ({ commit }) => {
                commit('SET_TOKEN', null);
            },
            createInfo :({state}, {user}) => {
                const { access_token } = state;

                return axios.post(`${endpoint}/user/info/add`, user, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json",

                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            },
            createInterests: ({state}, {selected}) => {
                const { access_token } = state;

                return axios.post(`${endpoint}/user/interests`, {
                    interests: [
                        ...selected
                    ]
                }, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json",

                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            },
            async loadTrips({ commit, state }) {
                const { access_token } = state;
                await axios.get(`${endpoint}/trip`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    commit("SET_TRIPS", response.data);
                });
            },
            async loadRecommendations({ commit, state }, {destination_id}) {
                const { access_token } = state;
                return axios.get(`${endpoint}/recommend/destination_id=${destination_id}`, {
                    timeout: 60000,
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    commit("SET_RECOMMENDATIONS", response.data);
                });
            },
            async loadInterests({ commit, state }) {
                const { access_token } = state;
                await axios.get(`${endpoint}/interests`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    commit("SET_INTERESTS", response.data);
                });
            },
            loadDestination: async ({ state, commit }, { id }) => {
                const { access_token } = state;
                await axios.get(`${endpoint}/dest/pk=${Number(id)}`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                   
                    commit("SET_DESTINATIONS", [JSON.parse(response.data)]);
                });
            },
            loadDestinations: async ({ state, commit }, { tripId }) => {
                const { access_token } = state;
                await axios.get(`${endpoint}/dest/fk=${Number(tripId)}`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    console.log(response);
                    commit("SET_DESTINATIONS", response.data);
                });
            },
            createDestination: async ({ state }, { data, tripId }) => {
                const { access_token } = state;
                const { date_from, date_to } = data;

                data.date_from = moment(date_from).format("YYYY-MM-DD HH:mm:ss");
                data.date_to = moment(date_to).format("YYYY-MM-DD HH:mm:ss");
                await axios.post(`${endpoint}/dest`, {
                    ...data,
                    trip_id: tripId
                }, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            },
            auth: async ({ commit, state }) => {
                const token = await localStorage.getItem("trvl-token");
                console.log("token is ", token);
                commit("SET_TOKEN", token);
                return axios
                    .post("http://127.0.0.1:8000/auth/google/", {
                        access_token: token,
                    })
                    .then((resp) => {
                        state.user = resp.data.user;
                    });
            },
            setToken: async ({ commit }, { token }) => {
                commit("SET_TOKEN", token);
                localStorage.setItem("trvl-token", token);
                console.log(`SETTING TOKEN TO ${token}`);
                return true;
            },
            createTrip: async ({ state }, { data }) => {
                const { access_token } = state;

                await axios.post(`${endpoint}/trip`, {
                    ...data
                }, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });
            }
        },

    });
};

