export function setTestData(len = 2) {
    let data = {}
    let xData = [2013, 2014, 2015, 2016, 2017, 2018, 2019]
    let series = {}
    for (let i = 0; i < len; i++) {
        let temp = []
        for (let j = 0; j < xData.length; j++) {
            let d = Math.ceil(Math.random() * 100)
            temp.push(d)
        }
        series[i] = temp
    }
    console.log('-series-data-', series)
    data = {
        xData,
        series
    }

    return { data }
}
