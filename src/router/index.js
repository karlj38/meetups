import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/components/AppHome'
import MeetupsIndex from '@/components/Meetup/MeetupsIndex'
import MeetupView from '@/components/Meetup/MeetupView'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import UserProfile from '@/components/User/UserProfile'
import LogIn from '@/components/User/LogIn'
import SignUp from '@/components/User/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/login',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: MeetupsIndex
  },
  {
    path: '/meetups/new',
    name: 'CreateMeetup',
    component: CreateMeetup
  },
  {
    path: '/meetups/:id',
    name: 'MeetupView',
    component: MeetupView,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router