import axios from 'axios'
import Qs from 'qs'

function deleteReq(url, params) {
    return new Promise((resolve, reject) => {
        const data = { ...params }
        axios
            .delete({
                url: url,
                header: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                data: Qs.stringify(data)
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export default {
    deleteReq
}
