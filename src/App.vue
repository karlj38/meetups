<template>
  <v-app dark>
    <v-toolbar class="primary" dark dense>
      <v-app-bar-nav-icon @click="sideNav = true" class="hidden-sm-and-up" />
      <v-toolbar-title>
        <router-link v-slot="{ navigate }" custom to="/">
          <span
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
            style="cursor: pointer"
          >
            DevMeetups
          </span>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          color="transparent"
          depressed
        >
          <v-icon left>mdi-{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn
          v-if="userAuthenticated"
          @click="onLogout"
          color="transparent"
          depressed
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-navigation-drawer v-model="sideNav" temporary>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="userAuthenticated" @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content> Logout </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    sideNav: false,
  }),

  computed: {
    menuItems() {
      let output = [
        {
          icon: "account-plus",
          link: "/register",
          title: "Sign Up",
        },
        {
          icon: "lock-open",
          link: "/login",
          title: "Log In",
        },
      ];

      if (this.userAuthenticated) {
        output = [
          {
            icon: "account-supervisor",
            link: "/meetups",
            title: "Meetups",
          },
          {
            icon: "map-marker",
            link: "/meetups/new",
            title: "Organize",
          },
          {
            icon: "card-account-details",
            link: "/profile",
            title: "Profile",
          },
        ];
      }

      return output;
    },
    userAuthenticated() {
      return Boolean(this.$store.getters.user);
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>