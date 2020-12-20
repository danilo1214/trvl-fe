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
                            dateFrom: new Date("11-20-2020"),
                            dateTo: new Date("11-24-2020"),
                            img: "https://www.planetware.com/wpimages/2019/06/czech-republic-prague-itineraries-for-travelers-one-day-itinerary-old-town-square.jpg",
                            n: 50.0755,
                            budget: 50,
                            e: 14.4378
                        },
                        {
                            id: 1,
                            name: "Berlin",
                            budget: 60,
                            img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg",
                            dateFrom: new Date("11-24-2020"),
                            dateTo: new Date("11-27-2020"),
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
            },
            CREATE_TRIP(state, value){
                state.trips.push(value);
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
            createDestination: ({state}, {data, id}) => {
                const trip = state.trips.filter(trip=>{
                    console.log(trip.id, id, trip.id === id);
                    return trip.id === id;
                })[0];
                

                trip.destinations.push(data);
            },
            createTrip: ({commit, state}, {data}) => {
                const id = state.trips.length;
    
                commit("CREATE_TRIP", {...data, id, destinations: []});
            }
        },
        
    });
};

