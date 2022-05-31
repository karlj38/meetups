<template>
  <v-container>
    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-circular
          indeterminate
          color="primary--text"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-card>
          <v-card-title class="primary--text">
            {{ meetup.title }}
            <template v-if="userIsCreator">
              <v-spacer />

              <app-edit-meetup-details-dialog :meetup="meetup" />
            </template>
          </v-card-title>

          <v-img :src="meetup.imgUrl" height="400px" />

          <v-card-subtitle class="info--text">
            {{ meetup.date | date }} - {{ meetup.location }}
          </v-card-subtitle>

          <template v-if="userIsCreator">
            <app-edit-meetup-date-dialog :meetup="meetup" />

            <app-edit-meetup-time-dialog :meetup="meetup" />
          </template>

          <v-card-text>
            {{ meetup.description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetup() {
      return this.$store.getters.meetup(this.id);
    },
    userAuthenticated() {
      return Boolean(this.$store.getters.user);
    },
    userIsCreator() {
      return this.userAuthenticated &&
        this.$store.getters.user.id === this.meetup.creatorId
        ? true
        : false;
    },
  },
};
</script>