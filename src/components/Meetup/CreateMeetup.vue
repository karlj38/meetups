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
          <v-file-input
            v-model="img"
            accept="image/*"
            id="img"
            label="Image"
            name="img"
            required
          />
        </v-col>

        <v-col class="offset-sm-3 col-sm-6">
          <v-img :src="imgUrl" height="150px" />
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
          <v-date-picker v-model="date" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-time-picker v-model="time" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="offset-sm-3 col-sm-6">
          <v-btn :disabled="!formValid" color="primary" type="submit">
            Create Meeting
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    now: {
      default: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      ).toISOString(),
      type: String,
    },
  },
  data() {
    return {
      title: "",
      location: "",
      img: null,
      description: "",
      date: this.now.substr(0, 10),
      time: this.now.substr(11, 5),
    };
  },
  computed: {
    formValid() {
      return this.title && this.location && this.img && this.description;
    },
    imgUrl() {
      return this.img ? URL.createObjectURL(this.img) : "";
    },
    submittableDateTime() {
      const date = new Date(this.date);
      date.setHours(this.time.substr(0, 2));
      date.setMinutes(this.time.substr(3, 2));
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formValid) {
        return;
      }

      const meetupData = {
        title: this.title,
        location: this.location,
        img: this.img,
        description: this.description,
        date: this.submittableDateTime,
      };

      this.$store.dispatch("createMeetup", meetupData);

      this.$router.push("/meetups");
    },
  },
};
</script>