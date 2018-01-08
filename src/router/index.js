import Vue from 'vue'
import Router from 'vue-router'
//import Root from '@/components/root'
import SignUp from '@/components/signup'
import Login from '@/components/login'
import store from '../store/store'

import pickAccount from '@/components/steps/pick_account'
import saveKey from '@/components/steps/save_key'
import verifyMail from '@/components/steps/email_verification'
import verifyPhone from '@/components/steps/phone_verification'
import confirmPhone from '@/components/steps/confirm_phone'

import successEmail from '@/components/steps/success_email'
import successPhone from '@/components/steps/success_phone'

import signInCallback from '@/components/callbacks/signin'
import loginCallback from '@/components/callbacks/login'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',  name: 'signup', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/pick_account', name: 'pick_account', component: pickAccount, meta: {requiresSignIn: true , requiresMod: true} },
    { path: '/confirm_phone', name: 'confirm_phone', component: confirmPhone, meta: {requiresSignIn: true, requiresMod: true} },
    { path: '/verify_mail', name: 'verify_mail', component: verifyMail, meta: {requiresSignIn: true }},
    { path: '/verify_phone', name: 'verify_phone', component: verifyPhone, meta: {requiresSignIn: true }},
    { path: '/save_key', name: 'save_key', component: saveKey },
    { path: '/auth/callback', name: 'signin_callback', component: signInCallback },
    { path: '/callback/login', name: 'login_callback', loginCallback },
    { path: '/success/email', name: 'success_email', successEmail },
    { path: '/success/phone', name: 'success_phone', successPhone },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSignIn)) {
    if (!store.getters.currentUserObject.social_name && !store.getters.loggingIn) { next({path: '/'}) } 
    else { next() }
  } else { next() }
})

export default router
