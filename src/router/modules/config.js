/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'
const configRouter = {
  path: '/sys-config',
  component: Layout,
  redirect: '/config/list',
  name: 'Config',
  meta: {
    title: '配置管理',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/sys-config/list'),
      name: 'ConfigList',
      meta: { title: '配置列表' }
    },
    {
      path: 'add',
      component: () => import('@/views/sys-config/add'),
      name: 'ConfigAdd',
      meta: { title: '添加配置' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/sys-config/edit'),
      name: 'ConfigAdd',
      meta: { title: '编辑配置', noCache: true },
      hidden: true
    }
  ]
}
export default configRouter
