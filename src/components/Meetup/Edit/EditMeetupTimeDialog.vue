<template>
  <v-dialog v-model="dialog" max-width="600px" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on"> Edit Time</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title> Edit Time</v-card-title>
          </v-col>
        </v-row>

        <v-divider class="mb-8" />

        <v-row>
          <v-col class="offset-sm-3 col-sm-6">
            <v-time-picker v-model="editedTime" class="mb-8" />
          </v-col>
        </v-row>

        <v-divider />

        <v-row>
          <v-col>
            <v-card-actions>
              <v-btn @click="dialog = false" class="blue--text darken-1" plain>
                Close
              </v-btn>
              <v-btn @click="onSaveChanges" class="blue--text darken-1" plain>
                Save
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTime: new Date(
        this.meetup.date - this.meetup.date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(11, 5),
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedTime.trim()) {
        this.dialog = false;
        let newTime = new Date(this.meetup.date);
        newTime.setHours(this.editedTime.substr(0, 2));
        newTime.setMinutes(this.editedTime.substr(3, 2));

        this.$store.dispatch("updateMeetup", {
          id: this.meetup.id,
          date: newTime,
        });
      }
    },
  },
};
</script>