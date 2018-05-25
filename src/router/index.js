import Vue from 'vue'
import Router from 'vue-router'
//import Root from '@/components/root'
import SignUp from '@/components/signup'
import store from '../store/store'

import pickAccount from '@/components/steps/account/pick_account'
import saveKey from '@/components/steps/account/save_key'

import verifyInvite from '@/components/steps/invite/invite_verification'

import confirmApproval from '@/components/steps/approval/confirm_approval'

import verifyMail from '@/components/steps/email/email_verification'
import successEmail from '@/components/steps/email/success_email'
import confirmEmail from '@/components/steps/email/confirm_email'

import confirmPhone from '@/components/steps/phone/confirm_phone'
import verifyPhone from '@/components/steps/phone/phone_verification'
import successPhone from '@/components/steps/phone/success_phone'

import signInCallback from '@/components/callbacks/signin'
import loginCallback from '@/components/callbacks/login'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',  name: 'signup', component: SignUp },
    { path: '/pick_account', name: 'pick_account', component: pickAccount, meta: { requiresSignIn: true } },
    { path: '/verify_invite', name: 'verify_invite', component: verifyInvite, meta: { requiresSignIn: true }},
    { path: '/verify_mail', name: 'verify_mail', component: verifyMail, meta: { requiresSignIn: true }},
    { path: '/verify_phone', name: 'verify_phone', component: verifyPhone, meta: { requiresSignIn: true }},
    { path: '/email/success', name: 'success_email', component: successEmail, meta: { requiresSignIn: true } },
    { path: '/confirm_phone', name: 'confirm_phone', component: confirmPhone, meta: { requiresSignIn: true } },
    { path: '/email/confirm/:token', name: 'confirm_email', component: confirmEmail, meta: { requiresSignIn: false } },
    { path: '/approval/confirm/:token', name: 'confirm_approval', component: confirmApproval, meta: { requiresSignIn: false } },
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
    if (!store.getters.currentUserObject.social_name && chosen_acc_name) { next({path: '/'}) } 
    else { next() }
  }
  else { next() }
})

export default router
