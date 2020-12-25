<template>
  <div>{{destination.name}}</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "Destination",
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters(["getDestination"]),
        id(){
            return this.$route.params.id;
        },
        destination(){
            const {id} = this;
            return this.getDestination(id)[0];
        }
    }
}
</script>

<style>

</style>