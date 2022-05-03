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

    <v-row class="mt-0" wrap>
      <v-col>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.img"
          >
            <v-sheet color="transparent" height="100%">
              <v-row
                class="fill-height "
                align="end"
                justify="center"
              >
                <div class="title">
                  {{meetup.title}}
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p class="text-center">Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          id: "123",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
          title: "NY"
        },
        {
          id: "234",
          img: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
          title: "Paris"
        }
      ]
    }
  }
}
</script>

<style scoped>
  .title {
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 50px;
    color: #fff;
    font-size: 2em;
    padding: 20px;
    position: absolute;
  }
</style>