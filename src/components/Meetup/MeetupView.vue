<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="primary--text">{{ meetup.title }}</v-card-title>

          <v-img :src="meetup.imgUrl" height="400px" />

          <v-card-subtitle class="info--text">
            {{ meetup.date | date }} - {{ meetup.location }}
          </v-card-subtitle>

          <v-card-text>
            {{ meetup.desc }}
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
    meetup() {
      return this.$store.getters.meetup(this.id);
    },
  },
};
</script>