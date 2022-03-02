export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getListDataMixins() {
            const res = await this.httpReq()
            console.log('-res-', res)
            this.list = res.data
        },
        httpReq() {
            return new Promise((resolve, reject) => {
                const res = {
                    code: 200,
                    msg: '成功',
                    data: [
                        { name: 'html' },
                        { name: 'css' },
                        { name: 'javaScript' },
                        { name: 'vue' },
                        { name: 'react' }
                    ]
                }
                setTimeout(() => {
                    resolve(res)
                }, 500)
            })
        }
    }
}
