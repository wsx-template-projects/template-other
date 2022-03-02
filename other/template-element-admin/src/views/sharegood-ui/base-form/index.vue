<template>
    <div class="sg-data-form-container">
        <el-form
            ref="form"
            :model="formData"
            class="sg-data-form"
            :class="`sg-form--label-${labelPosition}`"
            :rules="rules"
            @submit.native.prevent
            v-bind="$attrs"
        >
            <div class="sg-data-form-header">
                <slot name="header"></slot>
            </div>
            <template v-for="(row, index) in exRows">
                <el-row
                    :key="index"
                    :type="row.type"
                    :gutter="row.gutter"
                    :align="row.align"
                    :tag="row.tag"
                    class="sg-form-row"
                    :class="row.class"
                    :justify="row.justify"
                    v-if="!row.ifRender || row.ifRender(formData)"
                >
                    <slot :name="row.appendSlot"></slot>
                    <template v-for="(col, index) in row.columns">
                        <el-col
                            :key="col.name"
                            :span="getSpan(col)"
                            :offset="col.offset"
                            :push="col.push"
                            :pull="col.pull"
                            :xs="col.xs"
                            :sm="col.sm"
                            :md="col.md"
                            :lg="col.lg"
                            :xl="col.xl"
                            v-show="col._visible"
                            :class="col.className || col.class"
                            v-if="col._ifRender"
                        >
                            <!-- 内部提供的表单域 -->
                            <el-form-item
                                class="sg-form-item"
                                v-bind="col.itemAttrs"
                                v-if="getFieldType(col.tag, col.custom)"
                            >
                                <template slot="label" v-if="col.itemAttrs.showLabelTooltip && col.itemAttrs.label">
                                    <span style="position:relative">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="col.itemAttrs.label"
                                            placement="top-start"
                                        >
                                            <span>{{ col.itemAttrs.label }}</span>
                                        </el-tooltip>
                                    </span>
                                </template>
                                <template slot="label" v-if="col.itemAttrs.labelSlot">
                                    <slot :name="col.itemAttrs.labelSlot"></slot>
                                </template>
                                <component
                                    :key="col.name"
                                    :is="getFieldType(col.tag, col.custom)"
                                    v-model="formData[col.name]"
                                    v-bind="col.attrs"
                                    ref="formItem"
                                    @keyup.enter.native="handleSubmit(col, index)"
                                >
                                    <template v-if="col.attrs.inputSlots">
                                        <template v-for="slotItem in col.attrs.inputSlots">
                                            <template v-if="slotItem.slotType" :slot="slotItem.slotType">
                                                <slot :name="slotItem.slotName"></slot>
                                            </template>
                                        </template>
                                    </template>
                                    <template v-if="col.attrs.appendSlot">
                                        <template slot="appendSlot">
                                            <slot :name="col.attrs.appendSlot"></slot>
                                        </template>
                                    </template>
                                    <template v-if="col.attrs.prependSlot">
                                        <template slot="prependSlot">
                                            <slot :name="col.attrs.prependSlot"></slot>
                                        </template>
                                    </template>
                                    <template
                                        v-if="col.attrs.autocompleteSlot"
                                        slot="autocompleteSlot"
                                        slot-scope="{ item }"
                                    >
                                        <slot :name="col.attrs.autocompleteSlot" :item="item"></slot>
                                    </template>
                                </component>
                            </el-form-item>
                            <!-- 自定义表单域 -->
                            <template v-else-if="col.tag === 'slot'">
                                <el-form-item class="sg-form-item" v-bind="col.itemAttrs">
                                    <template slot="label" v-if="col.itemAttrs.showLabelTooltip && col.itemAttrs.label">
                                        <span style="position:relative">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="col.itemAttrs.label"
                                                placement="top-start"
                                            >
                                                <span>{{ col.itemAttrs.label }}</span>
                                            </el-tooltip>
                                        </span>
                                    </template>
                                    <slot :name="col.appendSlot || col.slotName"></slot>
                                </el-form-item>
                            </template>
                            <!-- 操作表单域 -->
                            <template v-else-if="col.tag == 'action'">
                                <div class="sg-data-form-action">
                                    <template v-for="(button, i) in col.buttons || []">
                                        <template v-if="button.isSubmit">
                                            <el-button
                                                :key="i"
                                                type="primary"
                                                @click="submit"
                                                native-type="submit"
                                                :icon="button.icon"
                                                v-bind="button"
                                                >{{ button.text || submitText }}
                                            </el-button>
                                        </template>
                                        <template v-else-if="button.isReset">
                                            <el-button
                                                :key="i"
                                                :type="button.type"
                                                :icon="button.icon"
                                                @click="reset"
                                                v-bind="button"
                                                >{{ button.text || resetText }}</el-button
                                            >
                                        </template>
                                        <template v-else-if="button.isMore">
                                            <el-button
                                                :key="i"
                                                :type="button.type"
                                                @click="toggleHiddens"
                                                :icon="button.icon"
                                                >{{
                                                    isFieldHidden
                                                        ? button.text || moreText
                                                        : button.hiddenText || hiddenText
                                                }}</el-button
                                            >
                                        </template>
                                    </template>
                                </div>
                            </template>
                            <!-- 整个表单项 -->
                            <template v-else-if="col.slotName">
                                <slot :name="col.slotName"></slot>
                            </template>
                        </el-col>
                    </template>
                </el-row>
            </template>
            <div class="sg-data-form-footer">
                <slot name="footer"></slot>
            </div>
        </el-form>
    </div>
</template>

<script>
import _ from 'lodash'
import BaseInput from '../base-input/src/index.vue'
import BaseSelect from '../base-select/src/index.vue'
import BaseDate from '../base-date/src/index.vue'
import BaseTime from '../base-time/src/index.vue'
import BaseCheckbox from '../base-checkbox/src/index.vue'
import BaseRadio from '../base-radio/src/index.vue'
import BaseCascader from '../base-cascader/src/index.vue'
import BaseUploader from '../base-uploader/src/index.vue'
import BaseAutoComplete from '../base-autocomplete/src/index.vue'
import BaseText from '../base-text/src/index.vue'
import BaseRange from '../base-range/src/index.vue'

const types = {
    text: 'BaseText',
    input: 'BaseInput',
    select: 'BaseSelect',
    date: 'BaseDate',
    time: 'BaseTime',
    checkbox: 'BaseCheckbox',
    radio: 'BaseRadio',
    cascader: 'BaseCascader',
    uploader: 'BaseUploader',
    autocomplete: 'BaseAutoComplete',
    range: 'BaseRange'
}

export default {
    name: 'SgBaseForm',
    components: {
        BaseText,
        BaseInput,
        BaseSelect,
        BaseDate,
        BaseTime,
        BaseCheckbox,
        BaseRadio,
        BaseCascader,
        BaseUploader,
        BaseAutoComplete,
        BaseRange
    },
    props: {
        formItemRef: {
            type: Object,
            default() {
                return {}
            }
        },
        // 布局模式
        type: {
            type: String,
            default: 'flex'
        },
        // 宽度
        span: {
            type: [Number, String],
            default: 8
        },
        // 水平位置
        justify: {
            type: [String],
            default: ''
        },
        // 间距
        gutter: {
            type: [Number, String],
            default: 0
        },
        // 表单数据
        fields: {
            type: Array,
            default() {
                return []
            }
        },
        // 验证规则
        rules: {
            type: Object,
            default() {
                return {}
            }
        },
        // label宽度
        labelWidth: {
            type: [Number, String],
            default: '120px'
        },
        // 提交文案
        onSubmitText: {
            type: String,
            default: '提交'
        },
        // 重置文案
        resetText: {
            type: String,
            default: '重置'
        },
        // 展开文案
        moreText: {
            type: String,
            default: '展开条件'
        },
        // 收起文案
        hiddenText: {
            type: String,
            default: '收起条件'
        },
        // label位置
        labelPosition: {
            type: String,
            default: 'right'
        },
        value: {
            type: Object,
            default() {
                return {}
            }
        },
        // 自动布局
        autoLayout: {
            type: Boolean,
            default: true
        },
        // 多少列（autoLayout为false生效）
        columnCount: {
            type: [Number, String],
            default: 3
        },
        // 内容区宽度（autoLayout为false生效）
        contentWidth: {
            type: [Number, String],
            default: '250px'
        },
        // label的左留白（autoLayout为false生效）
        labelPaddingLeft: {
            type: [Number, String],
            default: '50px'
        }
    },
    data() {
        return {
            //exRows: [],
            isFieldHidden: true,
            rows: [],
            hiddens: [],
            types: types,
            originModel: {}, // 原始数据
            formData: this.value // 表单数据
        }
    },
    computed: {
        exRows() {
            //console.log('[exRows change]')

            const rows = this.rows.map(row => this.computeFormItem(row, this.formData))

            return rows
        }
        // exAttrs() {
        //     return this.$attrs
        // },
    },
    watch: {
        value: {
            handler(val) {
                this.formData = val
            }
        },
        rows: {
            handler(val, oldVal) {
                //console.log('------rows change----')
                // this.rows.forEach(row => {
                //     const columns = row.columns || []
                //     columns.forEach(column => {
                //         const name = column.name
                //         const value = column.attrs.value
                //             ? column.attrs.value
                //             : ''
                //         if (!name) return //跳过没有key的属性(插槽)
                //         this.$set(this.formData, name, value)
                //     })
                // })
                // this.originModel = JSON.parse(JSON.stringify(this.formData))
                // console.log('this.originModel', this.originModel)
            },
            deep: true,
            immediate: true
        },
        formData: {
            handler(val) {
                // console.log('-------watch formData', JSON.stringify(val))
                // if (val && Object.keys(val).length) {
                //     Object.keys(val).forEach(key => {
                //         if (
                //             Array.isArray(val[key]) &&
                //             val[key][0] === undefined
                //         ) {
                //             console.log(
                //                 val[key],
                //                 val[key].filter(item => item),
                //             )
                //             //val[key].splice(0, 1)
                //         }
                //     })
                // }
                this.$emit('input', val)
            },
            deep: true
        }
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        // 格式化数据并初始化一些默认数据
        init(fields) {
            const rows = this.computeRows(fields || this.fields)
            const singleRowData = rows.length === 1
            let colLableMaxLens = []
            if (!this.autoLayout) {
                const columnCount = singleRowData ? this.columnCount : rows?.[0].length
                // 列label最大长度
                colLableMaxLens = new Array(columnCount).fill(0)
                rows.forEach(row => {
                    const columns = row.columns || []
                    columns.forEach((column, colIndex) => {
                        let index = colIndex
                        if (singleRowData) {
                            index = colIndex % this.columnCount
                        }
                        colLableMaxLens[index] = Math.max(colLableMaxLens[index] || 0, column.label?.length || 0)
                    })
                    return row
                })
            }
            this.rows = rows.map(row => {
                const columns = row.columns || []
                columns.forEach((column, colIndex) => {
                    let { visible } = column

                    visible = visible === false ? false : true
                    this.$set(column, 'visible', visible)
                    this.$set(column, '_visible', visible)
                    column.attrs = column.attrs || {}
                    // todo 按不同类型匹配合适的初始值 [] ''
                    if (typeof column.attrs.value !== 'number') {
                        column.attrs.value = column.attrs.value || ''
                    }

                    column.itemAttrs = column.itemAttrs || {}
                    if (!this.autoLayout) {
                        if (column.tag !== 'action') {
                            column.span = -1
                        }
                        let index = colIndex
                        if (singleRowData) {
                            index = colIndex % this.columnCount
                        }
                        column.itemAttrs.labelWidth = `calc(${
                            index === 0 ? '10px' : this.labelPaddingLeft
                        } + ${colLableMaxLens[index] || 0}em)`
                    }
                    // 隐藏域
                    if (!visible) {
                        this.hiddens.push(column)
                    }
                })
                return row
            })
            if (!this.autoLayout) {
                this.$nextTick(() => {
                    if (this.contentWidth) {
                        const itemContentDoms = this.$el.querySelectorAll('.el-form-item__content')
                        Array.from(itemContentDoms).forEach(itemDom => {
                            itemDom.style.width = this.contentWidth
                        })
                    }
                    if (singleRowData) {
                        const itemDoms = this.$el.querySelectorAll('.sg-form-row .el-col--1')
                        let containerMinWidth = 0
                        Array.from(itemDoms).some((item, index) => {
                            if (index >= this.columnCount) {
                                return true
                            }
                            containerMinWidth += item.offsetWidth
                        })
                        const containerDom = this.$el.querySelector('.sg-form-row')
                        containerDom.style.width = `${containerMinWidth}px`
                        containerDom.style.margin = `0 auto`
                    }
                })
            }
            //console.log('this.rows', JSON.stringify(this.rows))
        },
        // true: 隐藏表单收起了 false: 隐藏表单展开了
        isHidden() {
            return this.isFieldHidden
        },
        // 展开或收取隐藏表单
        toggleHiddens() {
            this.isFieldHidden = !this.isFieldHidden
            console.log('[toggleHiddens]', this.hiddens)
            this.hiddens.forEach(item => {
                item._visible = !item._visible
            })
        },
        computeFormItem(row, formData) {
            const { columns = [], ...rest } = row
            const item = {
                ...rest
            }
            item.columns = columns.map(column => {
                const { tag, name, label, visible, span, ifRender, custom, ...rest } = column
                const exColumn = {
                    tag,
                    name,
                    visible,
                    span,
                    custom,
                    ...rest
                }

                exColumn.itemAttrs = {
                    label,
                    prop: name,
                    labelWidth: this.labelWidth,
                    ...column.itemAttrs
                }

                exColumn.attrs = {
                    name,
                    ...column.attrs
                }
                // ifRender 重新渲染时如果有初始值则赋初始值
                if (
                    typeof formData[name] === 'undefined' &&
                    column.attrs.value !== undefined &&
                    this.getFieldType(tag, custom)
                ) {
                    this.$set(formData, name, column.attrs.value)
                }
                if (column.getAttrs) {
                    const result = column.getAttrs(formData)

                    exColumn.attrs = Object.assign(exColumn.attrs, result)
                }

                exColumn._visible = column._visible
                exColumn._ifRender = ifRender ? ifRender(formData) : true
                if (!exColumn._ifRender) {
                    // 直接删除属性无法监听对象不变化 所以先改变值
                    formData[name] = null
                    delete formData[name]
                }

                return exColumn
            })
            //console.log('computeFormItem', item)
            return item
        },
        // 重新整理rows
        computeRows(val = []) {
            const fields = _.cloneDeep(val)
            const hasColumns = fields.some(item => {
                const { columns } = item
                if (columns) {
                    return true
                } else {
                    return false
                }
            })
            let result = []
            if (hasColumns) {
                result = [...fields]
            } else {
                result = [
                    {
                        type: this.type,
                        gutter: this.gutter,
                        justify: this.justify,
                        columns: [...fields]
                    }
                ]
            }
            return result
        },
        //如果是最后一个input默认触发提交  或者 配置了字段 isTriggerSubmit
        handleSubmit(col, index) {
            console.log('[enter:isTriggerSubmit]', col.attrs.isTriggerSubmit)
            if (col.attrs.isTriggerSubmit) {
                this.$emit('submit')
            }
        },
        // 计算宽度
        getSpan(col) {
            const span = col.span || this.span
            let count = 0
            this.rows.forEach(row => {
                const columns = row.columns || []
                columns.forEach(column => {
                    const { _visible, tag } = column
                    if (_visible && tag !== 'action') {
                        count++
                    }
                })
            })
            if (typeof span === 'function') {
                return span(count)
            } else {
                return span
            }
        },
        // 获取表单字段tag对应组件
        getFieldType(type, custom) {
            const types = this.types

            if (types[type]) {
                return types[type]
            } else {
                if (custom) {
                    return type
                } else {
                    return null
                }
            }
        },
        // 获取子组件ref
        getRefField(name) {
            const result = this.$refs['formItem'].filter(item => item.name === name)[0]

            return result
        },
        // 获取原始配置数据
        getFieldProps(name) {
            const rows = this.rows
            let target = null
            rows.some(row => {
                const columns = row.columns || []
                const result = columns.some(item => {
                    if (item.name === name) {
                        target = item
                        return true
                    } else {
                        return false
                    }
                })
                if (result) {
                    return true
                } else {
                    return false
                }
            })
            if (target) {
                return target
            } else {
                throw `[error]: 未找到name=${name}的数据项`
            }
        },

        submit() {
            console.log('[submit]', JSON.stringify(this.formData))
            this.$emit('submit', this.formData)
        },
        // 校验整个表单
        validate(cb) {
            this.$refs['form'].validate((valid, result) => {
                cb && cb(valid, result)
            })
        },
        // 对部分表单字段进行校验
        validateField(prop, cb) {
            this.$refs['form'].validateField(prop, cb)
        },
        // 清除校验信息
        clearValidate(props) {
            this.$refs['form'].clearValidate(props)
        },
        // 重置数据
        reset() {
            console.log('[reset]')
            this.$refs['form'].resetFields()
            this.$emit('reset')
        }
    }
}
</script>
