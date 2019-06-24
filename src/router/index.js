import Vue from 'vue'
import Router from 'vue-router'

import login from '@/login/login'
import BasicInfo from '@/basicInfo/BasicInfo'
import InfoRelease from '@/InfoRelease/InfoRelease'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/BasicInfo',
      name: 'BasicInfo',
      component: BasicInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/InfoRelease',
      name: 'InfoRelease',
      component: InfoRelease,
      meta: {
        requireAuth: true
      }
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (sessionStorage.getItem('userName')) {
//       var a = sessionStorage.getItem('role')
//       console.log(a)
//       if (a === '0') {
//         if (to.path !== '/TeacherInfo') {
//           next()
//         } else {
//           next({
//             path: '/BasicInfo',
//             query: {redirect: to.fullPath}
//           })
//         }
//       } else {
//         if (to.path !== '/BasicInfo' && to.path !== '/ExamPlan' && to.path !== '/InfoRelease') {
//           next()
//         } else {
//           next({
//             path: '/TeacherInfo',
//             query: {redirect: to.fullPath}
//           })
//         }
//       }
//     } else {
//       next({
//         path: '/',
//         query: {redirect: to.fullPath}
//       })
//       alert('请先登录!')
//     }
//   } else {
//     next()
//   }
// })

export default router
// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })
