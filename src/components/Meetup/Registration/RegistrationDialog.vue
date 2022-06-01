<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" class="mx-4" v-on="on">
        {{ userRegistered ? "Unregister" : "Register" }}
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-card-title>
          {{ userRegistered ? "Unregister" : "Register" }} for Meetup
        </v-card-title>

        <v-divider />

        <v-card-text>You can always change your decision later.</v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn @click="dialog = false" class="primary--text darken-1" plain>
            Cancel
          </v-btn>

          <v-btn
            @click="onConfirm"
            :color="userRegistered ? 'red' : 'green'"
            class="darken-1"
            plain
          >
            {{ userRegistered ? "Unregister" : "Register" }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    userRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return this.meetupId === meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onConfirm() {
      let action = this.userRegistered ? "un" : "";
      action += "registerUserForMeetup";
      this.$store.dispatch(action, this.meetupId);
    },
  },
};
</script>