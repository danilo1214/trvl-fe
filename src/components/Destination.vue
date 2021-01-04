<template>
  <div class="container" v-loading="!loaded">
    <template v-if="loaded">
      <div class="mt-5 d-flex">
        <div
          class="card m-5 shadow-lg col p-0"
          style="max-width: 348px; min-width: 348px; max-height: 700px"
        >
          <img :src="destination.image" alt="..." />
          <div class="card-body">
            <h5 class="card-title capitalize">
              Your trip in {{ destination.name }}, {{ destination.country }}
            </h5>
            <p class="card-text">Date From: {{ destination.date_from }}</p>

            <p class="card-text">Date To: {{ destination.date_to }}</p>

            <p class="card-text">Budget: ${{ destination.budget }}</p>
          </div>
          <div class="card-body bg-primary text-white">
            <h5 class="card-title capitalize">Temperature</h5>
            <p class="card-text">
              Current temperature:
              {{ Math.round(destination.temperature, 0) }}°C
            </p>
            <p class="card-text">
              Description: {{ destination.weather_description }}
            </p>
          </div>
        </div>

        <div class="row justify-content-around col">
          <div
            v-for="recommendation in recommendationsList"
            class="card col-4 shadow m-5 p-0"
            style="max-width: 450px"
            :key="recommendation.Title"
          >
            <div class="card-header">
              <h5 class="card-title capitalize">
                {{ recommendation.Title }}
              </h5>
            </div>
            <div class="card-body">
              <p class="card-text">Time: {{ recommendation.Time }}</p>

              <p class="card-text">Location: {{ recommendation.Location }}</p>

              <p class="card-text text-truncate">
                Description: {{ recommendation.Description }}
              </p>

              <button
                type="button"
                class="btn btn-primary"
                @click="setRecommendation(recommendation)"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                More...
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{reccomendationText}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Destination",
  data() {
    return {
      loaded: false,
      reccomendationText: "",
      title: ""
    };
  },
  computed: {
    ...mapGetters(["getDestination"]),
    id() {
      return this.$route.params.id;
    },
    
    destination() {
      const { id } = this;
      return this.getDestination(id)[0];
    },
    recommendationsList() {
      return [{
        "Title": "Co-Working On It",
        "Time": "Mon Jan 04 2021 at 12:00 pm to Mon May 31 2021 at 02:00 pm",
        "Location": "Online",
        "Description": "Currently scheduled EVERY Monday from 12-2pm EST starting in 2021!\n\nAbout this Event\n\nTo meet the current needs of our artistic community, MTF introduces “Co-working On It.” Every Monday from 12:00-2:00pm, artists will be able to access a digital co-working space in which they can devote consistent time to their current artistic project. Sessions will commence with an articulation of goals and will end with a celebration of tangible progress. This regular event provides structure for all makers to hold themselves accountable within their personal creative practice by tapping into the community’s collective focus. We hope you’ll join us at this all-access series as we continue to push musical theatre towards collective liberation.\nBy registering for this recurring event, you will receive a weekly zoom link (please check your spam folder if you have not received a zoom invite 24 hours prior!). This is a drop-in event, so please join our co-working sessions whenever works for you!"
    }, 
    {
        "Title": "2021 New Year Kids Celebration",
        "Time": "Thu Dec 31 2020 at 9:00 pm to Jan 5 2021 08:00 am\n(Central European Standard Time)",
        "Location": "Online",
        "Description": "Celebrate New Years Day with us virtually this year! Come join the festivities with your kids on December 31. ???\n\nPrepare some tasty treats,\nHear a New Year story,\nCreate some nifty crafts,\nToast 2021 Kirkland style!\n\n\n?????? ???? ???????? ??? ??? ????? ?? ?????!\n\nApple cider and ginger ale\n\nPretzel rods, chocolate chips, sprinkles\n\nBalloon, paper towel tube, confetti, decorations (crayons, markers, stickers etc.)\n\nJar, ribbon, construction paper, paper and pen\n\n\nJoin us right here at the event page for FREE and join the festivities starting at noon on December 31."
    },
    {
        "Title": "The Jonathon and Nathan Show: EP 1",
        "Time": "Tue Jan 5 2021 at 11:30 pm to Jan 6 2021 12:30 am\n(Central European Standard Time)",
        "Location": "Online",
        "Description": "Join The Camera Shop of Muskegon for EP 1 of a brand new regular LIVE show where we will discuss camera news, featured products, and more!\n\nAbout this Event\n\nJoin Photographers Jonathon and Nathan as they talk about how they got started in photography, what their favorite camera gear of 2020 was, and what to look forward to with The Camera Shop of Muskegon's brand new camera and photography news show hosted by the guys at The Shop!\n\nAs with every show, there will also be an open Q&A for anyone interested in asking questions or having their photos critiqued, time permitting of course!"
    },
    {
        "Title": "How To Break Down Any Problem",
        "Time": "Sat Jan 2 2021 at 6:00 pm to Dec 4 2021 7:00 pm\n(Central European Standard Time)",
        "Location": "Online",
        "Description": "Learn how to break down ANY problem in this free monthly class for Moms!\n\nAbout this Event\n\nTell me all the things. Tantrums, no sleep, busy schedules, messy house, kids fighting—you name it!\nJoin me on Zoom ever 1st Saturday of the month at 10am MST to learn how to break down ANY problem. I’ll teach the main coaching tool I use with all of my clients and then coach on your real life problems.\nEmail your problem to me at\nCoaching can be done anonymously or I’ll invite you to be coached live if you’d like. Just share your preference in the email.\nSee you then!"
    }
    ];
    },
  },
  methods: {
    ...mapActions(["loadDestination"]),
    setRecommendation(r){
      this.reccomendationText = r.Description;
      this.title = r.Title;

    },
    async load() {
      const { id } = this;
      this.loaded = false;
      await this.loadDestination({ id });
      //await this.loadRecommendations({ destination_id: id });
      console.log("hiiii");
      this.loaded = true;
    },
  },
  created() {
    this.load();
  },
  watch: {
    $route() {
      this.load();
    },
  },
};
</script>

<style>
</style>