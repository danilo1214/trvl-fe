import axios from "axios";
import Vuex from "vuex";

const endpoint = "http://127.0.0.1:8000/api"
export default (Vue) => {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            token: null,
            trips: [],
            user: {},
            access_token: null
        },
        mutations: {
            SET_TRIPS(state, data){
                state.trips = data;
            },
            APP_LOGIN(state, value) {
                state.token = value;
            },
            CREATE_TRIP(state, value){
                state.trips.push(value);
            },
            SET_TOKEN(state, token){
                state.access_token = token;
            }
        },
        getters: {
            token: (state) => {
                return state.access_token;
            },
            trips: (state) => {
                console.log(state);
                return state.trips
            },
            getTrip: (state) => id => {
                return state.trips.filter(trip=>{
                    console.log(trip.id, id, trip.id === id);
                    return Number(trip.id) === Number(id);
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
            },
            async loadTrips({commit, state}) {
                const {access_token} = state;
                await axios.get(`${endpoint}/trip`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response=>{
                    console.log(response);
                    commit("SET_TRIPS", response.data);
                });
            },
            createDestination: ({state}, {data, id}) => {
                const trip = state.trips.filter(trip=>{
                    console.log(trip.id, id, trip.id === id);
                    return trip.id === id;
                })[0];
                

                trip.destinations.push(data);
            },
            auth: async ({commit,state}) => {
                const token = await localStorage.getItem("trvl-token");
                commit("SET_TOKEN",token);
                return axios
                .post("http://127.0.0.1:8000/auth/google/", {
                  access_token: token,
                })
                .then((resp) => {
                  state.user = resp.data.user;
                });
            },
            setToken: async ({commit}, {token}) => {
                commit("SET_TOKEN", token);
                localStorage.setItem("trvl-token", token);
            },
            createTrip: async ({state}, {data}) => {
                const {access_token} = state;

                await axios.post(`${endpoint}/trip`, {
                    ...data,
                    user_id: 4
                }, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(response=>{
                    console.log(response);
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        
    });
};

