<template>
  <v-container>
    <v-row wrap>
      <v-col class="col-sm-6 text-sm-right text-center">
        <v-btn class="info" large to="/meetups"> Expore Meetups </v-btn>
      </v-col>

      <v-col class="col-sm-6 text-sm-left text-center">
        <v-btn class="info" large to="/meetups/new"> Create Meetup </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-circular
          indeterminate
          color="primary--text"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else class="mt-0" wrap>
      <v-col>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imgUrl"
            :to="`/meetups/${meetup.id}`"
          >
            <v-sheet color="transparent" height="100%">
              <v-row class="fill-height" align="end" justify="center">
                <div class="title">
                  {{ meetup.title }}
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p class="text-center">Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
  },
};
</script>

<style scoped>
.title {
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 50px;
  color: #fff;
  font-size: 2em;
  padding: 20px;
  position: absolute;
}
</style>