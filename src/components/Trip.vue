<template>
  <div class="map-container" id="container" :v-loading="!loaded">
    <div id="mapContainer" class="map" >
     
    </div>
 <button
 id="newTripButton"
        type="button"
        class="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#new-trip"
      >
        ➕
      </button>
    <new-trip />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import moment from "moment";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";
import NewTrip from "./NewTrip.vue";

export default {
  components: { NewTrip },
  name: "Trip",
  data() {
    return {
      center: [37, 7749, -122, 4194],
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(["getTrip"]),
    trip() {
      const { id } = this.$route.params;
      return this.getTrip(id)[0];
    },
    destinations() {
      return this.trip.destinations;
    },
  },
  methods: {
    setupTile() {
      this.loaded = false;

      const { trip } = this;

      const mymap = L.map("mapContainer").setView([51.505, -0.09], 13);

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

      trip.destinations.forEach((dest) => {
        const dateFrom = moment(dest.dateFrom).format("DD-MM-YYYY");
        const dateTo = moment(dest.dateTo).format("DD-MM-YYYY");

        const marker = L.marker([dest.n, dest.e], {
          title: dest.name,
        }).addTo(mymap);
        marker
          .bindPopup(
            `<div class="card">
            <img src="${dest.img}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${dest.name}</h5>
              <p class="card-text">From: ${dateFrom}</p>
              <p class="card-text">To: ${dateTo}</p>
              <p class="card-text">Budget: <span class="text-primary">$${dest.budget}</span></p>

              <a class="card-link" href="#/destination/${dest.id}">Open</a>
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
};
</script>

<style>

#newTripButton {
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