<template>
  <div class="map-container" id="container" :v-loading="!loaded">
    <div id="mapContainer" class="map" >
     
    </div>
 <el-button
        class="shadow-lg"
        id="newDestinationButton"
        type="primary"
        circle
        small
        @click="addNew"
      >
        <span class="fas fa-plus"></span>
 </el-button>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import moment from "moment";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";

export default {
  name: "Trip",
  data() {
    return {
      center: [37, 7749, -122, 4194],
      loaded: false,
      map: null
    };
  },
  computed: {
    ...mapGetters(["getTrip", "destinations"]),
    id(){
      return this.$route.params.id;
    },
    trip() {
      const { id } = this;
      return this.getTrip(id)[0];
    }
  },
  methods: {
    ...mapActions(["loadDestinations"]),
    addNew(){
      const {id} = this;
      this.$router.replace({
        name: "new-destination",
        id
      })
    },
    async setupTile() {
      this.loaded = false;

      const { trip } = this;
      await this.loadDestinations({tripId: trip.trip_id});

      const mymap = L.map("mapContainer").setView([51.505, -0.09], 13);

      this.map = mymap;
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoiZGFuaWxvMTIxNCIsImEiOiJja2lqN3Z6djAwMDU2MnRtamZxZHg0eDJhIn0.qMiqt7L6kKWyJFOiTZz5MA",
        }
      ).addTo(mymap);
      const {destinations} = this;
      destinations.forEach((dest) => {
        const dateFrom = moment(dest.date_from).format("DD-MM-YYYY");
        const dateTo = moment(dest.date_to).format("DD-MM-YYYY");

        const marker = L.marker([dest.n, dest.e], {
          title: dest.name,
        }).addTo(mymap);
        marker
          .bindPopup(
            `<div class="card">
            <div class="card-body">
              <h5 class="card-title">${dest.name}</h5>
              <p class="card-text">From: ${dateFrom}</p>
              <p class="card-text">To: ${dateTo}</p>
              <p class="card-text">Budget: <span class="text-primary">$${dest.budget}</span></p>

              <a class="card-link" href="#/destination/${dest.destination_id}">Open</a>
          </div>
            </div>`
          )
          .openPopup();
      });
      this.loaded = true;
    },
    onEventClick(id) {
      console.log(id);
    },
  },
  mounted() {
    this.setupTile();
  },
  watch:{
    $route(route){
      console.log("new tile");
      if(route.name === "trip"){
        if(this.map) this.map.remove();
        this.setupTile();
      }
    }
  }
};
</script>

<style>

#newDestinationButton {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}
.map-container {
  padding: 0;
}
.map {
  height: 100vh;
  width: 100vw;

  max-height: 100%;
  max-width: 100%;
}

</style>