import request from '@/utils/request'

// 获取spu列表数据        GET   /admin/product/{page}/{limit}   参数：page  limit  category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取spu信息           GET    /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取品牌信息          GET    /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取spu图片           GET    /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取品牌全部销售属性   GET    /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 修改spu/添加spu，携带参数大致一样，区别：携带参数是否有id
export const reqAddOrUpdateSpu = (spuInfo) => {
        // 携带参数有id---修改spu
        if (spuInfo.id) {
            return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
        } else {
            // 携带参数无id---修改spu
            return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
        }
    }
    // 淡定