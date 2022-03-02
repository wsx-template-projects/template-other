import XLSX from 'xlsx'

// 读取本地excel文件
export function readWorkbookFromLocalFile(a) {
    console.log('a :>> ', a)
    let files = a.target.files
    if (!files) return
    console.log('files :>> ', files)
    console.log('XLSX :>> ', XLSX)
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsBinaryString(files[0])
        reader.onload = function(e) {
            let data = e.target.result
            // console.log('data :>> ', data)
            const workData = XLSX.read(data, {
                type: 'binary'
            })
            console.log('000', workData) // 文件的内容
            const result = handleExcel(workData)
            console.log('result :>> ', result)
            resolve(result)
        }
    })
}

/**
 * 处理excel文件，获取里面的数据
 */
function handleExcel(workbook) {
    console.log('workbook :>> ', workbook)
    let titles = workbook.SheetNames
    console.log('titles :>> ', titles)
    let totalData = workbook.Sheets
    console.log('totalData :>> ', totalData)
    let excels = {}
    Object.entries(totalData).reduce((prev, curr) => {
        console.log('prev :>> ', prev)
        // console.log('curr :>> ', curr)
        excels[curr[0]] = XLSX.utils.sheet_to_json(workbook.Sheets[curr[0]])
        console.log('title :>> ', curr[0])
        console.log('data :>> ', JSON.parse(JSON.stringify(excels[curr[0]])))
        console.table('table:', excels[curr[0]])
    }, {})
    console.log('excels :>> ', excels)
    return {
        titles,
        excels
    }
}
