import {
  child,
  get,
  getDatabase,
  push,
  ref as dbRef,
  update
} from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";


export default {
  actions: {
    createMeetup({ commit, getters }, payload) {
      const db = getDatabase();
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId:getters.user.id
      };
      const meetupListRef = dbRef(db, "meetups");
      let imgUrl = "";
      let key = "";
      let fileRef = "";

      push(meetupListRef, meetup)
      .then(data => {
        key = data.key;
        const filename = payload.img.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        const storage = getStorage();
        fileRef = storageRef(storage, `meetups/${key}${ext}`);
        return uploadBytes(fileRef, payload.img);
      })
      .then(async () => {
        imgUrl = await getDownloadURL(fileRef);
        return update(child(meetupListRef, key), { imgUrl: imgUrl });
      })
      .then(key => {
        commit("createMeetup", {
          ...meetup,
          id: key,
          imgUrl: imgUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
    },
    loadMeetups({ commit }) {
      commit("setLoading", true);
      const db = getDatabase();
      const meetupListRef = dbRef(db, "meetups");

      get(meetupListRef)
      .then(data => {
        const meetups = [];
        const obj = data.val();

        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            imgUrl: obj[key].imgUrl,
            description: obj[key].description,
            date: new Date(obj[key].date),
            creatorId: obj[key].creatorId
          })
        }

        commit("setMeetups", meetups);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        commit("setLoading", false);
      });
    },
    updateMeetup({ commit }, payload) {
      const db = getDatabase();
      commit("setLoading", true);
      const updateObj = {};

      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }

      update(dbRef(db, "meetups/" + payload.id), updateObj)
      .then(() => {
        commit("updateMeetup", payload);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        commit("setLoading", false);
      });
    }
  },
  getters: {
    featuredMeetups (state, getters) {
      return getters.meetups.slice(0, 5);
    },
    meetup (state) {
      return (id) => {
        return state.meetups.find(meetup => {
          return meetup.id === id;
        });
      }
    },
    meetups (state) {
      return state.meetups.sort((a, b) => {
        return a.date > b.date;
      });
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.meetups.push(payload);
    },
    setMeetups(state, payload) {
      state.meetups = payload;
    },
    updateMeetup(state, payload) {
      let meetup = state.meetups.find(meetup => {
        return meetup.id === payload.id;
      });

      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },
  state: {
    meetups: [
    ]
  },
};