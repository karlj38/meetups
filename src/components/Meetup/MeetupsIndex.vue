<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id" wrap>
      <v-col class="col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <v-card class="info">
          <v-container fluid>
            <v-row wrap>
              <v-col class="col-5 col-sm-4 col-md-3">
                <v-img :src="meetup.imgUrl" height="130px" />
              </v-col>

              <v-col class="col-7 col-sm-8 col-md-9">
                <v-card-title class="white--text" primary-title>
                  {{ meetup.title }}
                </v-card-title>

                <v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="transparent"
                    depressed
                    :to="`/meetups/${meetup.id}`"
                  >
                    <v-icon left>mdi-arrow-right</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.meetups;
    },
  },
};
</script>