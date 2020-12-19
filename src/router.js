import Router from 'vue-router';
import Login from "./components/Login.vue";
import Trip from "./components/Trip.vue";
import Trips from "./components/Trips.vue";
import NewTrip from "./components/NewTrip.vue";




const routes = [
    {
        name: "login",
        path: "/login",
        component: Login
    },
    {
        name: "trips",
        path: "/trips",
        component: Trips
    },
    {
        name: "trip",
        path: "/trip/:id",
        component: Trip,
        children: [
            {
                name: "new-destination",
                path: "/trip/:id/new-destination",
                component: NewTrip
            }
        ]
    }
];

export default new Router({routes});
