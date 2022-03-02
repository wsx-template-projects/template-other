/**
 * 一维数组转化成二维数组
 * @param {array} list 目标数组
 * @param {number} num 数组元素个数
 * @return {array} [[1,2],[10,99]]
 */
export function arrayTransform(list, num) {
    let result = []
    let len = Math.ceil(list.length / num)
    for (let i = 0; i < len; i++) {
        let curr = list.slice(i * num, (i + 1) * num)
        result.push(curr)
    }
    return result
}
