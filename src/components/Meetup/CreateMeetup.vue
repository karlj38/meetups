<template>
  <v-container>
    <v-row>
      <v-col class="offset-sm-3 col-sm-6">
        <h1 class="secondary--text">Create a new Meetup</h1>
      </v-col>
    </v-row>

    <v-form @submit.prevent="onCreateMeetup">
      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-text-field
            v-model="title"
            name="title"
            label="Title"
            id="title"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-text-field
            v-model="location"
            name="location"
            label="Location"
            id="location"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-text-field
            v-model="img"
            name="img"
            label="Image URL"
            id="img"
            required
          />
        </v-col>
        <v-col class="offset-sm-3 col-sm-6">
          <v-img
            :src="img"
            height="150px"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-textarea
            v-model="description"
            name="description"
            label="Description"
            id="description"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-btn
            :disabled="!formValid"
            color="primary"
            type="submit"
          >
            Create Meeting
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        location: "",
        img: "",
        description: ""
      }
    },
    computed: {
      formValid() {
        return (this.title && this.location && this.img && this.description);
      }
    },
    methods: {
      onCreateMeetup() {
        if (!this.formValid) {
          return
        }

        const meetupData = {
          title: this.title,
          location: this.location,
          img: this.img,
          description: this.description,
          date: new Date()
        };

        this.$store.dispatch("createMeetup", meetupData);

        this.$router.push("/meetups");
      }
    }
  }
</script>