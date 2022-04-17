/*
 * @Author: luo_h603
 * @Date: 2022-02-15 15:26:27
 * @LastEditTime: 2022-03-24 00:37:30
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
// 获取品牌管理数据模块
import request from '@/utils/request'
import { reqTrademarkList } from './spu'

// 获取品牌列表      /admin/product/baseTrademark/{page}/{limit}     get    参数：page, limit
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: `get` })

// export function reqTrademarkList(params) {
//     return request({
//         url: '/admin/product/baseTrademark',
//         method: "get",
//         params
//     })
// }



// 获取添加品牌    /admin/product/baseTrademark/save    post     参数：logoUrl，tmNam
// 新增不用传id，服务器会返回
// 修改品牌   /admin/product/baseTrademark/update    put     参数：id,logoUrl,tmNam
// export const reqAddOrUpdateTradeMark = (tradeMark) => {
//     if (tradeMark.id) {
//         // 修改
//         return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
//     } else {
//         // 新增
//         return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
//     }
// }


export function reqAddOrUpdateTradeMark(tradeMark) {
    if (tradeMark.id) {
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    } else {
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}




// 删除品牌  /admin/product/baseTrademark/remove/{id}   delete
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })