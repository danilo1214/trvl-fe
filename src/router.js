import Router from 'vue-router';
import Login from "./components/Login.vue";
import Trip from "./components/Trip.vue";
import Trips from "./components/Trips.vue";
import NewDestination from "./components/NewDestination.vue";
import Destination from "./components/Destination.vue";
import NewTrip from "./components/NewTrip.vue";
import Interests from "./components/Interests.vue";
import UserInfoForm from "./components/UserInfoForm.vue";




const routes = [
    {
        name: "login",
        path: "/login",
        component: Login
    },
    {
        name: "interests",
        path: "/interests",
        component: Interests
    },
    {
        name: "user-info",
        path: "/user-info",
        component: UserInfoForm
    },
    {
        name: "destination",
        path: "/destination/:id",
        component: Destination
    },
    {
        name: "trips",
        path: "/trips",
        component: Trips,
        children: [
            {
                name: "new-trip",
                path: "/trips/new",
                component: NewTrip
            }
        ]
    },
    {
        name: "trip",
        path: "/trip/:id",
        component: Trip,
        children: [
            {
                name: "new-destination",
                path: "/trip/:id/new-destination",
                component: NewDestination
            }
        ]
    }
];

export default new Router({routes});
