import http from '../http'

const areaData = {
    provinceList: [],
    cityList: [],
    countyList: []
}

// const apiUrl = {
//     dev: 'http://223.4.72.147',
//     test: 'http://223.4.72.147',
//     prod: 'http://59.202.38.96',
// }

/**
 * 获取地区数据
 */
const getAddressData = async () => {
    console.log('-env-', process.env.VUE_APP_ENV)
    // const params = {
    //     uniCode: 1,
    //     secretkey: 'HsdCA9Y6e2215OIjaosdja3j9asd9fosLxwzV',
    // }
    // const domain =
    //     process.env.VUE_APP_ENV !== 'dev' ? apiUrl[process.env.VUE_APP_ENV] : ''
    const res = await http.post(`/cont/articleIssueRecord/getRegionCodeData`)
    console.log('-res-', res)
    let { provinceList, countyList, cityList } = res
    areaData.provinceList = setEveryAreaData(provinceList)
    areaData.cityList = setEveryAreaData(cityList)
    areaData.countyList = setEveryAreaData(countyList)
    // console.log('provinceList:', areaData.provinceList)
    // console.log('cityList:', areaData.cityList)
    // console.log('countyList:', areaData.countyList)
    console.log('areaData:', areaData)
    return areaData
}

const setEveryAreaData = data => {
    const list = Object.entries(data).map(item => ({
        value: item[0],
        label: item[1]
    }))
    return list
}

/**
 * 获取省市数据
 * @param {boolean} isCity 是否显示市，默认为true
 * @param {boolean} isCounty 是否显示区/县，默认为true
 */
const getAreaData = (isCity = true, isCounty = true) => {
    return setProvinceData(areaData.provinceList, isCity, isCounty)
}

/**
 * 设置省数据
 * @param {array} list 省数据
 * @param {boolean} isCity 是否显示市，默认为true
 * @param {boolean} isCounty 是否显示区/县，默认为true
 */
const setProvinceData = (list, isCity = true, isCounty = true) => {
    let result = []
    list.map((item, index) => {
        // console.log('-province-', item, item.value)
        if (isCity) {
            result.push({ children: [], ...item })
            result[index].children = setCityData(areaData.cityList, item.value, isCounty)
        } else {
            result.push({ ...item })
        }
        // console.log('-result-p-', result)
    })
    return result
}
/**
 * 设置市数据
 * @param {array} list 市数据
 * @param {string} pId 父级id(省份id)
 * @param {boolean} isCounty 是否显示区/县，默认为true
 */
const setCityData = (list, pId, isCounty = true) => {
    let result = []
    list.map((item, index) => {
        if (pId.slice(0, 2) == item.value.slice(0, 2)) {
            if (isCounty) {
                result.push({ children: [], ...item })
                result[result.length - 1].children = setCountyData(areaData.countyList, item.value)
            } else {
                result.push({ ...item })
            }
        }
    })
    return result
}

/**
 * 设置区/县数据
 * @param {array} list 区/县数据
 * @param {string} pId 父级id(市级id)
 */
const setCountyData = (list, pId) => {
    let result = []
    list.map((item, index) => {
        if (pId.slice(0, 4) == item.value.slice(0, 4)) {
            result.push({ ...item })
        }
    })
    return result
}

export default {
    /**
     * 异步获取省市区数据
     */
    getAddressData,
    /**
     * 获取转化后的省市区数据
     */
    getAreaData
}
