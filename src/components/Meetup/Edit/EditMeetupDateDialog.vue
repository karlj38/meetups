<template>
  <v-dialog v-model="dialog" max-width="600px" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-4" v-on="on"> Edit Date</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title> Edit Date</v-card-title>
          </v-col>
        </v-row>

        <v-divider class="mb-8" />

        <v-row>
          <v-col class="offset-sm-3 col-sm-6">
            <v-date-picker v-model="editedDate" />
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
      editedDate: new Date(this.meetup.date).toISOString().substr(0, 10),
    };
  },

  methods: {
    onSaveChanges() {
      if (this.editedDate.trim()) {
        this.dialog = false;
        let newDate = new Date(this.editedDate);

        this.$store.dispatch("updateMeetup", {
          id: this.meetup.id,
          date: newDate,
        });
      }
    },
  },
};
</script>