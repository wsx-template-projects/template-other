<!--
    动态组件 - demo
-->
<template>
    <!-- 应用中心-内容管理-内容发布 -->
    <div class="sg-page page-application-center-content-manage-content-publish">
        <section class="sg-card" v-loading="loading">
            <p class="content-publish-title">内容发布</p>
            <!-- 筛选表单 start -->
            <sg-base-form
                ref="formRef"
                :fields="baseForm.fields"
                v-model="baseForm.model"
                @submit="userSearch"
                @reset="resetForm"
                :span="8"
            >
                <template slot="contentTypeSlot">
                    <el-cascader
                        v-model="baseForm.model.$contentType"
                        :props="{
                            checkStrictly: true,
                            lazy: true,
                            lazyLoad: getContentTypes
                        }"
                        :show-all-levels="false"
                        clearable
                    ></el-cascader>
                </template>
            </sg-base-form>
            <!-- 筛选表单 end -->

            <!-- 数据表格 start -->
            <sg-data-view
                :page-action-layout="[]"
                :columns="tabelView.columns"
                :load="tabelView.load"
                :fit="true"
                ref="tableRef"
            >
                <div class="mb-20 sg-flexbox" slot="header">
                    <el-button type="primary" plain @click="dialogVisible = true">
                        <i class="iconfont icontianjia"></i>
                        内容发布申请
                    </el-button>
                </div>
                <template slot-scope="{ row }" slot="statusSlot">
                    <span
                        v-show="row.$articleState"
                        class="status-flag"
                        :style="{ backgroundColor: row.$articleStateColor }"
                    ></span>
                    {{ row.$articleState || '-' }}
                </template>
            </sg-data-view>
            <!-- 数据表格 end -->
        </section>
        <component :is="showDialogInfo.comp" v-bind="showDialogInfo.props" v-on="showDialogInfo.events"></component>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
            <span>请选择发布方式</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="noticeFn">通知公告</el-button>
                <el-button type="primary" @click="contentPublishApply">内容发布</el-button>
            </span>
        </el-dialog>
        <!-- <notice :is-show-visible="isShowVisible" @cancelOn="cancelOn" /> -->
    </div>
</template>

<script>
import { STATUS_CONTENT, STATUS_MAP } from '../services/services.js'
// import notice from './dialog/contentPublishApplyDialog/components/notice'
export default {
    name: 'ApplicationCenterContentManageContentPublish',
    props: {},
    components: {},
    data() {
        return {
            dialogVisible: false,
            isShowVisible: false,
            loading: false,
            showDialogInfo: {},
            baseForm: {
                model: {},
                fields: [
                    {
                        tag: 'input',
                        name: 'articleTitle',
                        itemAttrs: {
                            label: '标题：'
                        },
                        attrs: {
                            placeholder: '请输入标题'
                        }
                    },
                    {
                        tag: 'select',
                        name: 'articleState',
                        itemAttrs: {
                            label: '状态：'
                        },
                        attrs: {
                            placeholder: '请选择状态',
                            options: () =>
                                Object.keys(STATUS_MAP).reduce(
                                    (acc, item) => {
                                        acc.push({
                                            value: item,
                                            label: STATUS_MAP[item].name
                                        })
                                        return acc
                                    },
                                    [{ value: '', label: '全部' }]
                                )
                        }
                    },
                    // {
                    //     tag: 'input',
                    //     name: 'applyDept',
                    //     itemAttrs: {
                    //         label: '申请部门：',
                    //     },
                    //     attrs: {
                    //         placeholder: '请输入申请部门',
                    //     },
                    // },
                    {
                        tag: 'slot',
                        slotName: 'contentTypeSlot',
                        name: '$contentType',
                        label: '内容类型：'
                    },
                    {
                        tag: 'date',
                        name: '$pubDate',
                        label: '发布日期：',
                        attrs: {
                            value: [],
                            type: 'daterange',
                            unlinkPanels: true,
                            valueFormat: 'yyyy-MM-dd',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间'
                        }
                    },
                    {
                        span: 24,
                        tag: 'action',
                        buttons: [
                            {
                                isSubmit: true,
                                type: 'primary',
                                text: '查询'
                            },
                            {
                                isReset: true,
                                text: '重置'
                            }
                        ]
                    }
                ]
            },
            tabelView: {
                load: this.getTableData,
                columns: [
                    {
                        label: '序号',
                        type: 'index'
                    },
                    {
                        label: '标题',
                        prop: 'articleTitle',
                        align: 'left',
                        width: 270,
                        tooltip: true
                    },
                    {
                        label: '状态',
                        prop: 'articleState',
                        slotName: 'statusSlot',
                        align: 'left',
                        width: 90
                    },
                    {
                        label: '内容大类',
                        prop: 'articleTypeName'
                        // width: 90,
                    },
                    {
                        label: '内容小类',
                        prop: 'articleDetailTypeName'
                        // width: 90,
                    },
                    {
                        label: '发布时间',
                        prop: 'issueTime',
                        width: 160
                    },
                    {
                        label: '申请人',
                        prop: 'applyUser'
                        // width: 160,
                    },
                    {
                        label: '申请部门',
                        prop: 'applyDept'
                        // width: 160,
                    },
                    {
                        label: '申请时间',
                        prop: 'applyTime',
                        width: 160
                    },
                    {
                        label: '浏览量',
                        prop: 'readNum'
                    },
                    // {
                    //     label: '浏览企业数',
                    //     prop: 'entReadNum',
                    // },
                    {
                        label: '操作',
                        prop: 'action',
                        width: 120,
                        fixed: 'right',
                        render: (h, { row }) => {
                            const tableBtns = [
                                {
                                    methods: 'withdrawOpera',
                                    name: '撤回',
                                    status: [STATUS_CONTENT.WAIT_AUDIT]
                                },
                                {
                                    methods: 'unshelveOpera',
                                    name: '下架',
                                    status: [STATUS_CONTENT.PUBLISHED]
                                },
                                {
                                    methods: 'reapplyOpera',
                                    name: '重新申请',
                                    status: [STATUS_CONTENT.UNSHELVED, STATUS_CONTENT.RETURNED]
                                },
                                {
                                    methods: 'submitAuditOpera',
                                    name: '提交审核',
                                    status: [STATUS_CONTENT.DRAFT]
                                },
                                {
                                    methods: 'immediatePublishOpera',
                                    name: '立即发布',
                                    status: [STATUS_CONTENT.WAIT_PUBLISH]
                                },
                                {
                                    methods: 'gotoDetail',
                                    name: '详情'
                                }
                            ]
                            const showBtns = tableBtns.filter(
                                item => !item.status || item.status.includes(row.articleState)
                            )
                            return showBtns.map(item => {
                                return h(
                                    'el-button',
                                    {
                                        props: { type: 'text' },
                                        on: {
                                            click: () => {
                                                this[item.methods](row)
                                            }
                                        }
                                    },
                                    item.name
                                )
                            })
                        }
                    }
                ]
            }
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        cancelOn() {
            this.isShowVisible = false
        },
        // 获取内容类型数据
        async getContentTypes(node, resolve) {
            console.log('getContentTypes', node)
            if (node.level === 0) {
                const params = {
                    searchFieldCode: 'CONT_ARTICLE_TYPE', // 业务查询域编码【必填】
                    searchField: '' // 业务查询域
                }
                const resp = await this.$http.post('/busicommon/busisearchdic/getBusiSearchConditions', params)
                const contentTypeOptions = resp.map(item => ({
                    label: item.busiName,
                    value: item.busiCode,
                    leaf: false
                }))
                resolve(contentTypeOptions)
            } else {
                const code_map = {
                    CAT_01: 'CONT_ARTICLE_DETAIL_TYPE_01',
                    CAT_02: 'CONT_ARTICLE_DETAIL_TYPE_02'
                }
                const params = {
                    searchFieldCode: code_map[node.value], // 业务查询域编码【必填】
                    searchField: '' // 业务查询域
                }
                const resp = await this.$http.post('/busicommon/busisearchdic/getBusiSearchConditions', params)
                const contentTypeOptions = resp.map(item => ({
                    label: item.busiName,
                    value: item.busiCode,
                    leaf: true
                }))
                resolve(contentTypeOptions)
            }
        },
        // 获取表格数据
        async getTableData({ pageSize, pageNum }) {
            const params = {
                pageNum,
                length: pageSize,
                ...this.baseForm.model
            }
            const { data: result, recordsTotal: total } = await this.$api.dispatch(
                '/cont/articleIssueRecord/readArticleIssueRecordList',
                params
            )
            result.forEach(item => {
                item.$articleState = STATUS_MAP[item.articleState]?.name
                item.$articleStateColor = STATUS_MAP[item.articleState]?.color
            })
            return Promise.resolve({ result, total })
        },
        // 重置筛选表单
        resetForm() {
            this.$refs['tableRef'].onLoad({ page: 1 })
        },
        // 查询操作
        userSearch() {
            this.$refs['tableRef'].onLoad({ page: 1 })
        },
        // 通知发布
        async noticeFn() {
            this.dialogVisible = false
            // this.isShowVisible = true
            this.showDialogInfo = {
                comp: () => import('./dialog/notificationDialog/index.vue'),
                props: {
                    title: '通知公告发布'
                },
                events: {
                    callback: success => {
                        this.showDialogInfo = {}
                        if (success) {
                            this.$refs['tableRef'].onLoad({ page: 1 })
                        }
                    }
                }
            }
        },
        // 内容发布申请操作
        async contentPublishApply() {
            this.dialogVisible = false
            this.showDialogInfo = {
                comp: () => import('./dialog/contentPublishApplyDialog/index.vue'),
                props: {
                    title: '内容发布'
                },
                events: {
                    callback: success => {
                        this.showDialogInfo = {}
                        if (success) {
                            this.$refs['tableRef'].onLoad({ page: 1 })
                        }
                    }
                }
            }
        },
        // 撤回操作
        async withdrawOpera(row) {
            await this.$confirm('是否确定撤回？', '撤回')
            this.loading = true
            const params = { articleCode: row.articleCode }
            await this.$http
                .post('/cont/articleIssueRecord/articleRecall', params)
                .finally(() => (this.loading = false))
            this.$refs['tableRef'].onLoad({ page: 1 })
            this.$message.success('操作成功！')
        },
        // 下架操作
        async unshelveOpera(row) {
            await this.$confirm('下架后企业将不再可查看此内容，是否确定下架？', '下架')
            this.loading = true
            const params = { articleCode: row.articleCode }
            await this.$http
                .post('/cont/articleIssueRecord/articleUndercarriage', params)
                .finally(() => (this.loading = false))
            this.$refs['tableRef'].onLoad({ page: 1 })
            this.$message.success('操作成功！')
        },
        // 重新申请操作
        async reapplyOpera(row) {
            // '进入内容发布页面，自动加载所选记录的信息，保存或提交审核后将重新生成一条记录，不变原纪录信息'
            this.showDialogInfo = {
                comp: () => import('./dialog/contentPublishApplyDialog'),
                props: {
                    title: '内容发布',
                    recreate: true,
                    articleCode: row.articleCode,
                    articleTypeCode: row.articleTypeCode
                },
                events: {
                    callback: success => {
                        this.showDialogInfo = {}
                        if (success) {
                            this.$refs['tableRef'].onLoad({ page: 1 })
                        }
                    }
                }
            }
        },
        // 提交审核
        async submitAuditOpera(row) {
            console.log('-row-', row)
            // '进入内容修改页面，修改完成后点击下方的提交审核操作，状态变更为“待审核”'
            this.showDialogInfo = {
                comp: () => import('./dialog/contentPublishApplyDialog'),
                props: {
                    title: '内容发布',
                    articleCode: row.articleCode,
                    articleTypeCode: row.articleTypeCode
                },
                events: {
                    callback: success => {
                        this.showDialogInfo = {}
                        if (success) {
                            this.$refs['tableRef'].onLoad({ page: 1 })
                        }
                    }
                }
            }
        },
        // 立即发布
        async immediatePublishOpera(row) {
            await this.$confirm('发布后企业将可查看到此内容，是否确定发布？', '立即发布')
            this.loading = true
            const params = { articleCode: row.articleCode }
            await this.$http.post('/cont/articleIssueRecord/articleIssue', params).finally(() => (this.loading = false))
            this.$message.success('操作成功！')
            this.$refs['tableRef'].onLoad({ page: 1 })
        },
        // 跳转到详情页
        async gotoDetail(row) {
            console.log(row)
            switch (row.articleTypeCode) {
                case 'CAT_01': // 政策文件
                    this.$router.push({
                        path: '/policy-document',
                        query: {
                            articleCode: row.articleCode,
                            flowId: row.flowId
                        }
                    })
                    break
                case 'CAT_02': // 在线学习
                    this.$router.push({
                        path: '/online-learning',
                        query: {
                            articleCode: row.articleCode,
                            flowId: row.flowId
                        }
                    })
                    break
                // case 'CAT_03': // 公告公示
                //     this.$router.push({
                //         path: '/public-announcement',
                //         query: {
                //             articleCode: row.articleCode,
                //             flowId: row.flowId,
                //         },
                //     })
                //     break
                default:
                    console.log('没有该类型的详情，999')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.page-application-center-content-manage-content-publish {
    background-color: #fff;
    .content-publish-title {
        padding: 4px 0 14px 0;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        line-height: 18px;
        font-weight: bold;
    }
    .status-flag {
        margin-right: 10px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
}
</style>
