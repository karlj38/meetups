<template>
  <v-container>
    <v-row wrap>
      <v-col class="col-sm-6 text-sm-right text-center">
        <v-btn
          class="info"
          large
          to="/meetups"
          router
        >
          Expore Meetups
        </v-btn>
      </v-col>

      <v-col class="col-sm-6 text-sm-left text-center">
        <v-btn
          class="info"
          large
          to="/meetups/new"
          router
        >
          Create Meetup
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>