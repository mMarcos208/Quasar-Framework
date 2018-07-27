
export default [
  {
    path: '/menu',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/profile', component: () => import('pages/profile') },
      { path: '/local', component: () => import('pages/locale') },
      { path: '/site', component: () => import('pages/site') },
      { path: '/favorite', component: () => import('pages/favorite') },
      { path: '/cart', component: () => import('pages/cart') },
      { path: '/ofertas', component: () => import('pages/ofertas') },
      { path: '/gMaps', component: () => import('pages/mapsGeolocalizacao') },
      { path: '/cadastro', component: () => import('pages/cadastro') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/404')
  },
  {
    path: '/',
    component: () => import('pages/login')
  },
  {
    path: '/cadastro',
    component: () => import('pages/cadastro') }
]
