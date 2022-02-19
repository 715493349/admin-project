import request from '@/utils/request'

// 获取一级分类模块      GET /admin/product/get/category1/{id}   
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'GET' })

// 获取二级分类模块      GET /admin/product/get/category2/{id}
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'GET' })

// 获取三级分类模块      GET /admin/product/get/category3/{id}
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'GET' })

// 后台平台属性接口      GET   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'GET' })

// 添加属性接口          POST   /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'POST', data })