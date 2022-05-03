<template>
  <v-app dark>
    <v-toolbar
      class="primary"
      dark
      dense
    >
      <v-app-bar-nav-icon
        @click="sideNav = true"
        class="hidden-sm-and-up"
      />
      <v-toolbar-title>DevMeetups</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          color="transparent"
          depressed
        >
          <v-icon left>mdi-{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      v-model="sideNav"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title">
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    menuItems: [
      {
        icon: "account-supervisor",
        title: "Meetups"
      },
      {
        icon: "map-marker",
        title: "Organize"
      },
      {
        icon: "card-account-details",
        title: "Profile"
      },
      {
        icon: "account-plus",
        title: "Sign Up"
      },
      {
        icon: "lock-open",
        title: "Sign In"
      }
    ],
    sideNav: false,
  }),
};
</script>
