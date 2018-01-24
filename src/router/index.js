import Vue from 'vue'
import Router from 'vue-router'
//import Root from '@/components/root'
import SignUp from '@/components/signup'
import store from '../store/store'

import pickAccount from '@/components/steps/pick_account'
import saveKey from '@/components/steps/save_key'
import verifyMail from '@/components/steps/email_verification'
import verifyPhone from '@/components/steps/phone_verification'
import confirmPhone from '@/components/steps/confirm_phone'
import confirmEmail from '@/components/callbacks/confirm_email'

import successEmail from '@/components/steps/success_email'
import successPhone from '@/components/steps/success_phone'

import signInCallback from '@/components/callbacks/signin'
import loginCallback from '@/components/callbacks/login'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',  name: 'signup', component: SignUp },
    { path: '/pick_account', name: 'pick_account', component: pickAccount, meta: { requiresSignIn: true } },
    { path: '/verify_mail', name: 'verify_mail', component: verifyMail, meta: { requiresSignIn: true }},
    { path: '/verify_phone', name: 'verify_phone', component: verifyPhone, meta: { requiresSignIn: true }},
    { path: '/email/success', name: 'success_email', component: successEmail, meta: { requiresSignIn: true } },
    { path: '/confirm_phone', name: 'confirm_phone', component: confirmPhone, meta: { requiresSignIn: true } },
    { path: '/email/confirm/:token', name: 'confirm_email', component: confirmEmail, meta: { requiresSignIn: false } },
    { path: '/save_key', name: 'save_key', component: saveKey, meta: { requiresSignIn: true, requiresAccountName: true } },
    { path: '/phone/success', name: 'success_phone', component: successPhone, meta: { requiresSignIn: true } },
    { path: '/auth/callback', name: 'signin_callback', component: signInCallback },
    { path: '/callback/login', name: 'login_callback', component: loginCallback },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSignIn)) {
    let chosen_acc_name = true
    if(to.matched.some(record => record.meta.requiresAccountName)) {
      chosen_acc_name = store.getters.chosen_account_name != ''
    }
    if (!store.getters.currentUserObject.social_name && !store.getters.loggingIn && chosen_acc_name) { next({path: '/'}) } 
    else { next() }
  }
  else { next() }
})

export default router
