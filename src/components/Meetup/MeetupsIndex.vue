<template>
  <v-container>
    <v-row wrap>
      <v-col class="col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <v-card class="info">
          <v-container fluid>
            <v-row wrap>
              <v-col class="col-5 col-sm-4 col-md-3">
                <v-img
                  height="130px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg"
                />
              </v-col>

              <v-col class="col-7 col-sm-8 col-md-9">
                <v-card-title
                  class="white--text"
                  primary-title
                >
                  My Meetup
                </v-card-title>

                <v-card-subtitle>17th July 2022</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="transparent"
                    depressed
                    to="/meetups/1"
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