import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [{
            path: 'index',
            name: 'Index',
            component: () => import('@/views/index/index'),
            meta: { title: '工作台', icon: 'el-icon-s-platform' }
        }]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/demo',
        children: [{
            path: 'demo',
            name: 'demo',
            component: () => import('@/views/bed-manage/demo'),
            meta: { title: 'demo', icon: 'el-icon-s-platform' }
        }]
    },
    {
        path: '/style-manage',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'StyleManage',
                component: () => import('@/views/style-manage/index'),
                meta: { title: '款式管理', icon: 'style' }
            }
        ]
    },

    {
        path: '/bed-manage',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'BedManage',
                component: () => import('@/views/bed-manage/index'),
                meta: { title: '裁床管理', icon: 'caichuang' }
            }
        ]
    },

    {
        path: '/production-count',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'ProductionCount',
                component: () => import('@/views/production-count/index'),
                meta: { title: '生产统计', icon: 'production' }
            }
        ]
    },

    {
        path: '/assign-count',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'AssignCount',
                component: () => import('@/views/assign-count/index'),
                meta: { title: '外发统计', icon: 'assign' }
            }
        ]
    },

    {
        path: '/salary',
        component: Layout,
        redirect: '/salary/mine-salary',
        name: 'Example',
        meta: { title: '薪资管理', icon: 'salary-manage' },
        children: [
            {
                path: 'mine-salary',
                name: 'MineSalary',
                component: () => import('@/views/mine-salary/index'),
                meta: { title: '我的薪资', icon: 'my-salary' }
            },
            {
                path: 'piece-salary',
                name: 'PieceSalary',
                component: () => import('@/views/piece-salary/index'),
                meta: { title: '计件薪资管理', icon: 'jj' }
            },
            {
                path: 'piece-salary-detail',
                name: 'PieceSalaryDetail',
                component: () => import('@/views/piece-salary-detail/index'),
                meta: { title: '计件薪资明细', icon: 'jjmx' }
            },
            {
                path: 'settle',
                name: 'Settle',
                component: () => import('@/views/settle/index'),
                meta: { title: '结算记录', icon: 'jsjl' }
            },
            {
                path: 'month',
                name: 'Month',
                component: () => import('@/views/month/index'),
                meta: { title: '按月统计薪资', icon: 'month' }
            }
            
        ]
    },

    {
        path: '/personnel',
        component: Layout,
        redirect: '/personnel/index',
        name: 'Personnel',
        meta: { title: '人事管理', icon: 'rsgl' },
        children: [
            {
                path: 'index',
                name: 'YG',
                component: () => import('@/views/personnel/index'),
                meta: { title: '员工管理', icon: 'yg' }
            },
            {
                path: 'examine',
                name: 'YG',
                component: () => import('@/views/personnel/examine'),
                meta: { title: '员工申请列表', icon: 'yg' }
            },
            {
                path: 'post',
                name: 'Post',
                component: () => import('@/views/personnel/post'),
                meta: { title: '岗位管理', icon: 'gw' }
            },
            {
                path: 'department',
                name: 'Department',
                component: () => import('@/views/personnel/department'),
                meta: { title: '部门管理', icon: 'department' }
            },
            {
                path: 'custom',
                name: 'Custom',
                component: () => import('@/views/personnel/custom'),
                meta: { title: '客户管理', icon: 'custom' }
            },
            {
                path: 'factory',
                name: 'Factory',
                component: () => import('@/views/personnel/factory'),
                meta: { title: '加工厂管理', icon: 'factory' }
            },
            
        ]
    },

    {
        path: '/template',
        component: Layout,
        redirect: '/template/index',
        name: 'Template',
        meta: { title: '模板设置', icon: 'setting' },
        children: [
            {
                path: 'index',
                name: 'YG',
                component: () => import('@/views/template/index'),
                meta: { title: '工序模板', icon: 'gx' }
            },
            {
                path: 'color',
                name: 'Color',
                component: () => import('@/views/template/color'),
                meta: { title: '颜色管理', icon: 'color' }
            },
            {
                path: 'size',
                name: 'Size',
                component: () => import('@/views/template/size'),
                meta: { title: '尺码管理', icon: 'size' }
            },
            {
                path: 'classify',
                name: 'Classify',
                component: () => import('@/views/template/classify'),
                meta: { title: '分类管理', icon: 'classify' }
            },
            {
                path: 'part',
                name: 'Part',
                component: () => import('@/views/template/part'),
                meta: { title: '部位管理', icon: 'part' }
            },
            {
                path: 'part-template',
                name: 'PartTemplate',
                component: () => import('@/views/template/part-template'),
                meta: { title: '部位模板管理', icon: 'part' }
            },
            {
                path: 'print',
                name: 'Print',
                component: () => import('@/views/template/print'),
                meta: { title: '打印模板', icon: 'el-icon-printer' }
            }
            
        ]
    },

    {
        path: '/personal-center',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'PersonalCenter',
                component: () => import('@/views/personal-center/index'),
                meta: { title: '个人中心', icon: 'el-icon-s-custom' }
            }
        ]
    },

    {
        path: '/inv-manage',
        component: Layout,
        redirect: '/inv-manage/index',
        name: 'InvManage',
        meta: { title: '库存管理', icon: 'kc' },
        children: [
            {
                path: 'index',
                name: 'CRKSJ',
                component: () => import('@/views/inv-manage/index'),
                meta: { title: '出入库数据', icon: 'crk' }
            },
            {
                path: 'store',
                name: 'Store',
                component: () => import('@/views/inv-manage/store'),
                meta: { title: '仓库管理', icon: 'store' }
            }
        ]
    },

    {
        path: '/finance-manage',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'PersonalCenter',
                component: () => import('@/views/finance-manage/index'),
                meta: { title: '财务管理', icon: 'finance' }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
