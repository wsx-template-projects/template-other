// import axios from 'axios'

// let isRefresh = false

// let requestWait = []

// // const instance = axios.create({
// //     baseURL: '/api',
// //     timeout: 300000,
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'X-Token': getLocalToken(), // headers塞token
// //     },
// // })

// let instance = new Promise((resolve, reject) => {
//     mgop({
//         api, // 必须
//         host: 'https://mapi.zjzwfw.gov.cn/',
//         dataType: 'JSON',
//         header: {
//             isTestUrl: '1',
//             token: getToken(),
//         },
//         type: methods,
//         data: param,
//         appKey: 'i14o82dv+2001943753+kynmtf', // 必须
//         onSuccess: data => {
//             resolve(data)
//         },
//         onFail: err => {
//             console.log(err, '999999999999999')
//             reject(err)
//         },
//     })
// })

// function common({ api, methods = 'GET', param }) {
//     return new Promise((resolve, reject) => {
//         if (api !== refresh_url) {
//             /**
//              * 限制队列长度
//              */
//             if (refreshTokenQueue.length > 1) {
//                 refreshTokenQueue.pop()
//             }
//             refreshTokenQueue.unshift(Date.now())
//             const nowQueueTime = refreshTokenQueue[0]
//             const preQueueTime = refreshTokenQueue[1]

//             console.log('5555555555')
//             if (nowQueueTime - preQueueTime > refreshTokenLimitTime) {
//                 console.log('888888888')
//                 console.log('需要刷新', nowQueueTime)

//                 refreshTokenQueue.splice(0)
//                 console.log('111111111111111')

//                 refreshToken().then(res => {
//                     console.log(res, 'refreshToken987654321')

//                     isRefresh = true

//                     store.commit('app/setToken', res)

//                     requestWait.forEach(cb => cb(token))

//                     requestWait = []

//                     resolve(res)
//                 })
//             }
//         }
//         if (!isRefresh) {
//             mgop({
//                 api, // 必须
//                 host: 'https://mapi.zjzwfw.gov.cn/',
//                 dataType: 'JSON',
//                 header: {
//                     isTestUrl: '1',
//                     token: getToken(),
//                 },
//                 type: methods,
//                 data: param,
//                 appKey: 'i14o82dv+2001943753+kynmtf', // 必须
//                 onSuccess: data => {
//                     resolve(data)
//                 },
//                 onFail: err => {
//                     console.log(err, '999999999999999')
//                     reject(err)
//                 },
//             })
//         } else {
//             mgop({
//                 api, // 必须
//                 host: 'https://mapi.zjzwfw.gov.cn/',
//                 dataType: 'JSON',
//                 header: {
//                     isTestUrl: '1',
//                     token: getToken(),
//                 },
//                 type: methods,
//                 data: param,
//                 appKey: 'i14o82dv+2001943753+kynmtf', // 必须
//                 onSuccess: data => {
//                     resolve(data)
//                 },
//                 onFail: err => {
//                     console.log(err, '999999999999999')
//                     reject(err)
//                 },
//             })
//         }
//         if (api !== refresh_url) {
//             /**
//              * 限制队列长度
//              */
//             console.log('222222222222')
//             if (refreshTokenQueue.length > 1) {
//                 console.log('333333333333')
//                 refreshTokenQueue.pop()
//             }

//             refreshTokenQueue.unshift(Date.now())
//             console.log('444444444444')

//             const nowQueueTime = refreshTokenQueue[0]
//             const preQueueTime = refreshTokenQueue[1]

//             console.log('5555555555')
//             if (nowQueueTime - preQueueTime > refreshTokenLimitTime) {
//                 console.log('888888888')
//                 console.log('需要刷新', nowQueueTime)

//                 refreshTokenQueue.splice(0)
//                 console.log('111111111111111')

//                 return refreshToken().then(res => {
//                     console.log(res, 'refreshToken987654321')
//                     store.commit('app/setToken', res)

//                     requestWait.forEach(cb => cb(token))

//                     requestWait = []

//                     return mgop({
//                         api, // 必须
//                         host: 'https://mapi.zjzwfw.gov.cn/',
//                         dataType: 'JSON',
//                         header: {
//                             isTestUrl: '1',
//                             token: getToken(),
//                         },
//                         type: methods,
//                         data: param,
//                         appKey: 'i14o82dv+2001943753+kynmtf', // 必须
//                         onSuccess: data => {
//                             resolve(data)
//                         },
//                         onFail: err => {
//                             console.log(err, '999999999999999')
//                             reject(err)
//                         },
//                     })
//                 })
//             }
//         }
//     })
// }
