<template>
  <v-dialog v-model="dialog" max-width="350px" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="accent" fab v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title> Edit Meetup </v-card-title>
          </v-col>
        </v-row>

        <v-divider />

        <v-row>
          <v-col>
            <v-card-text>
              <v-text-field
                v-model="editedTitle"
                name="title"
                label="Title"
                id="title"
                required
              />
            </v-card-text>

            <v-textarea
              v-model="editedDescription"
              name="description"
              label="Description"
              id="description"
              required
            />
          </v-col>
        </v-row>

        <v-divider />

        <v-row>
          <v-col>
            <v-card-actions>
              <v-btn @click="dialog = false" class="blue--text darken-1" plain
                >Close</v-btn
              >
              <v-btn @click="onSaveChanges" class="blue--text darken-1" plain
                >Save</v-btn
              >
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedTitle.trim() && this.editedDescription.trim()) {
        this.dialog = false;
        this.$store.dispatch("updateMeetup", {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription,
        });
      }
    },
  },
};
</script>