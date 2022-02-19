// 获取品牌管理数据模块
import request from '@/utils/request'

// 获取品牌列表      /admin/product/baseTrademark/{page}/{limit}     get    参数：page, limit
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: `get` })

// 获取添加品牌    /admin/product/baseTrademark/save    post     参数：logoUrl，tmNam
// 新增不用传id，服务器会返回
// 修改品牌   /admin/product/baseTrademark/update    put     参数：id,logoUrl,tmNam
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}

// 删除品牌  /admin/product/baseTrademark/remove/{id}   delete
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })