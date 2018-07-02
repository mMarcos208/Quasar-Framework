
export default [
  {
    path: '/menu',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/profile', component: () => import('pages/profile') },
      { path: '/local', component: () => import('pages/locale') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/404')
  },
  {
    path: '',
    component: () => import('pages/login')
  },
  {
    path: '/cadastro',
    component: () => import('pages/cadastro') }
]
