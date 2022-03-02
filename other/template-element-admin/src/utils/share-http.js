/*!
 * sharegood-http v0.0.7
 */

import _ from 'lodash'
import axios from 'axios'
export { default as axios } from 'axios'
import qs from 'qs'

function _typeof(obj) {
    '@babel/helpers - typeof'

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
        }
    }

    return _typeof(obj)
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }

    return obj
}

function ownKeys(object, enumerableOnly) {
    let keys = Object.keys(object)

    if (Object.getOwnPropertySymbols) {
        let symbols = Object.getOwnPropertySymbols(object)
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        keys.push.apply(keys, symbols)
    }

    return keys
}

function _objectSpread2(target) {
    for (let i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {}

        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
            })
        }
    }

    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    let target = {}
    let sourceKeys = Object.keys(source)
    let key, i

    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
    }

    return target
}

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {}

    let target = _objectWithoutPropertiesLoose(source, excluded)

    let key, i

    if (Object.getOwnPropertySymbols) {
        let sourceSymbolKeys = Object.getOwnPropertySymbols(source)

        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
            target[key] = source[key]
        }
    }

    return target
}

let replace = String.prototype.replace
let percentTwenties = /%20/g

let Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
}

let formats = {
    default: Format.RFC3986,
    formatters: {
        RFC1738: function(value) {
            return replace.call(value, percentTwenties, '+')
        },
        RFC3986: function(value) {
            return String(value)
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
}

let has = Object.prototype.hasOwnProperty
let isArray = Array.isArray

let hexTable = (function() {
    let array = []
    for (let i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase())
    }

    return array
})()

let compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        let item = queue.pop()
        let obj = item.obj[item.prop]

        if (isArray(obj)) {
            let compacted = []

            for (let j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j])
                }
            }

            item.obj[item.prop] = compacted
        }
    }
}

let arrayToObject = function arrayToObject(source, options) {
    let obj = options && options.plainObjects ? Object.create(null) : {}
    for (let i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i]
        }
    }

    return obj
}

let merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source)
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true
            }
        } else {
            return [target, source]
        }

        return target
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source)
    }

    let mergeTarget = target
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options)
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
            if (has.call(target, i)) {
                let targetItem = target[i]
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options)
                } else {
                    target.push(item)
                }
            } else {
                target[i] = item
            }
        })
        return target
    }

    return Object.keys(source).reduce(function(acc, key) {
        let value = source[key]

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options)
        } else {
            acc[key] = value
        }
        return acc
    }, mergeTarget)
}

let assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key]
        return acc
    }, target)
}

let decode = function(str, decoder, charset) {
    let strWithoutPlus = str.replace(/\+/g, ' ')
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape)
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus)
    } catch (e) {
        return strWithoutPlus
    }
}

let encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str
    }

    let string = str
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str)
    } else if (typeof str !== 'string') {
        string = String(str)
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B'
        })
    }

    let out = ''
    for (let i = 0; i < string.length; ++i) {
        let c = string.charCodeAt(i)

        if (
            c === 0x2d || // -
            c === 0x2e || // .
            c === 0x5f || // _
            c === 0x7e || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5a) || // a-z
            (c >= 0x61 && c <= 0x7a) || // A-Z
            (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i)
            continue
        }

        if (c < 0x80) {
            out = out + hexTable[c]
            continue
        }

        if (c < 0x800) {
            out = out + (hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)])
            continue
        }

        if (c < 0xd800 || c >= 0xe000) {
            out = out + (hexTable[0xe0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3f)] + hexTable[0x80 | (c & 0x3f)])
            continue
        }

        i += 1
        c = 0x10000 + (((c & 0x3ff) << 10) | (string.charCodeAt(i) & 0x3ff))
        out +=
            hexTable[0xf0 | (c >> 18)] +
            hexTable[0x80 | ((c >> 12) & 0x3f)] +
            hexTable[0x80 | ((c >> 6) & 0x3f)] +
            hexTable[0x80 | (c & 0x3f)]
    }

    return out
}

let compact = function compact(value) {
    let queue = [{ obj: { o: value }, prop: 'o' }]
    let refs = []

    for (let i = 0; i < queue.length; ++i) {
        let item = queue[i]
        let obj = item.obj[item.prop]

        let keys = Object.keys(obj)
        for (let j = 0; j < keys.length; ++j) {
            let key = keys[j]
            let val = obj[key]
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key })
                refs.push(val)
            }
        }
    }

    compactQueue(queue)

    return value
}

let isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]'
}

let isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj))
}

let combine = function combine(a, b) {
    return [].concat(a, b)
}

let maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        let mapped = []
        for (let i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]))
        }
        return mapped
    }
    return fn(val)
}

let utils = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
}

let has$1 = Object.prototype.hasOwnProperty

let arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]'
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']'
    },
    repeat: function repeat(prefix) {
        return prefix
    }
}

let isArray$1 = Array.isArray
let push = Array.prototype.push
let pushToArray = function(arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray])
}

let toISO = Date.prototype.toISOString

let defaultFormat = formats['default']
let defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date)
    },
    skipNulls: false,
    strictNullHandling: false
}

let isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return (
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'boolean' ||
        typeof v === 'symbol' ||
        typeof v === 'bigint'
    )
}

let stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset
) {
    let obj = object
    if (typeof filter === 'function') {
        obj = filter(prefix, obj)
    } else if (obj instanceof Date) {
        obj = serializeDate(obj)
    } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        obj = utils.maybeMap(obj, function(value) {
            if (value instanceof Date) {
                return serializeDate(value)
            }
            return value
        })
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix
        }

        obj = ''
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            let keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format)
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))]
        }
        return [formatter(prefix) + '=' + formatter(String(obj))]
    }

    let values = []

    if (typeof obj === 'undefined') {
        return values
    }

    let objKeys
    if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }]
    } else if (isArray$1(filter)) {
        objKeys = filter
    } else {
        let keys = Object.keys(obj)
        objKeys = sort ? keys.sort(sort) : keys
    }

    for (let i = 0; i < objKeys.length; ++i) {
        let key = objKeys[i]
        let value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key]

        if (skipNulls && value === null) {
            continue
        }

        let keyPrefix = isArray$1(obj)
            ? typeof generateArrayPrefix === 'function'
                ? generateArrayPrefix(prefix, key)
                : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']')

        pushToArray(
            values,
            stringify(
                value,
                keyPrefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                format,
                formatter,
                encodeValuesOnly,
                charset
            )
        )
    }

    return values
}

let normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.')
    }

    let charset = opts.charset || defaults.charset
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined')
    }

    let format = formats['default']
    if (typeof opts.format !== 'undefined') {
        if (!has$1.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.')
        }
        format = opts.format
    }
    let formatter = formats.formatters[format]

    let filter = defaults.filter
    if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
        filter = opts.filter
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly:
            typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling:
            typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    }
}

let stringify_1 = function(object, opts) {
    let obj = object
    let options = normalizeStringifyOptions(opts)

    let objKeys
    let filter

    if (typeof options.filter === 'function') {
        filter = options.filter
        obj = filter('', obj)
    } else if (isArray$1(options.filter)) {
        filter = options.filter
        objKeys = filter
    }

    let keys = []

    if (typeof obj !== 'object' || obj === null) {
        return ''
    }

    let arrayFormat
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat'
    } else {
        arrayFormat = 'indices'
    }

    let generateArrayPrefix = arrayPrefixGenerators[arrayFormat]

    if (!objKeys) {
        objKeys = Object.keys(obj)
    }

    if (options.sort) {
        objKeys.sort(options.sort)
    }

    for (let i = 0; i < objKeys.length; ++i) {
        let key = objKeys[i]

        if (options.skipNulls && obj[key] === null) {
            continue
        }
        pushToArray(
            keys,
            stringify(
                obj[key],
                key,
                generateArrayPrefix,
                options.strictNullHandling,
                options.skipNulls,
                options.encode ? options.encoder : null,
                options.filter,
                options.sort,
                options.allowDots,
                options.serializeDate,
                options.format,
                options.formatter,
                options.encodeValuesOnly,
                options.charset
            )
        )
    }

    let joined = keys.join(options.delimiter)
    let prefix = options.addQueryPrefix === true ? '?' : ''

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&'
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&'
        }
    }

    return joined.length > 0 ? prefix + joined : ''
}

/**
 * @ignore
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */

let qsStringify = function qsStringify(data, options) {
    options = _objectSpread2(
        {
            arrayFormat: 'repeat'
        },
        options
    )
    return stringify_1(data, options)
}
/**
 * @ignore
 * 将对象转成 formData
 * @typedef {string | number | boolean | File | Blob} Val
 * @param {{[key: string]: Val | Val[]}} data
 * @param {'repeat' | 'brackets' | 'indices'} [arrayFormat]
 */

let toFormData = function toFormData(data) {
    let arrayFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'repeat'
    if (data instanceof FormData) return data
    let formData = new FormData()

    _.each(data, function(val, key) {
        if (val === undefined) return

        if (Array.isArray(val)) {
            val = val.filter(function(v) {
                return v !== undefined
            })
            val.forEach(function(v, i) {
                let k = key
                if (arrayFormat === 'brackets') k += '[]'
                else if (arrayFormat === 'indices') k += '['.concat(i, ']')
                formData.append(k, v === null ? '' : v)
            })
        } else {
            formData.append(key, val === null ? '' : val)
        }
    })

    return formData
}
/**
 * @ignore
 * 上传文件
 * @date 2021-02-05
 * @param {any} params={}
 * @param {any} config={}
 * @returns {any}
 */

let uploadFile = function uploadFile() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    let data = config.data || {}
    let formData = toFormData(data)
    let url = config.url
    return this.request(
        _objectSpread2(
            {
                method: 'post',
                url: url,
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data'
                }
            },
            config
        )
    )
}
/**
 * @ignore
 * 下载文件
 * @date 2021-02-05
 * @param {any} params={}
 * @param {any} config={}
 * @returns {any}
 */

let downloadFile = function downloadFile() {
    let _this = this

    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    config = _objectSpread2(
        {
            responseType: 'arraybuffer'
        },
        config
    )
    return this.request(config).then(function(response) {
        if (response.headers) {
            let filename = response.headers['x-suggested-filename']

            if (!filename) {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                let matches = filenameRegex.exec(response.headers['content-disposition'])

                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '')
                }
            }

            if (filename) {
                let url = window.URL.createObjectURL(new Blob([response.data]))
                let link = document.createElement('a')
                link.href = url
                link.setAttribute('target', '_blank')
                link.setAttribute('download', decodeURIComponent(filename))
                link.click()
                window.URL.revokeObjectURL(url)
                return Promise.resolve(response)
            } else {
                let payload = response.data || {}
                return Promise.reject(_this.$getResponseError(payload))
            }
        } else {
            return response
        }
    })
}

let bind = function bind(fn, thisArg) {
    return function wrap() {
        let args = new Array(arguments.length)
        for (let i = 0; i < args.length; i++) {
            args[i] = arguments[i]
        }
        return fn.apply(thisArg, args)
    }
}

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

let toString = Object.prototype.toString

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray$2(val) {
    return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
    return typeof val === 'undefined'
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer$1(val) {
    return (
        val !== null &&
        !isUndefined(val) &&
        val.constructor !== null &&
        !isUndefined(val.constructor) &&
        typeof val.constructor.isBuffer === 'function' &&
        val.constructor.isBuffer(val)
    )
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]'
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
    let result
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val)
    } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer
    }
    return result
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
    return typeof val === 'string'
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
    return typeof val === 'number'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && typeof val === 'object'
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
        return false
    }

    let prototype = Object.getPrototypeOf(val)
    return prototype === null || prototype === Object.prototype
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
    return toString.call(val) === '[object Date]'
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
    return toString.call(val) === '[object File]'
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
    return toString.call(val) === '[object Blob]'
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
    return toString.call(val) === '[object Function]'
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
    return isObject(val) && isFunction(val.pipe)
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '')
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
    if (
        typeof navigator !== 'undefined' &&
        (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
    ) {
        return false
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj]
    }

    if (isArray$2(obj)) {
        // Iterate over array values
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        // Iterate over object keys
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge$1(/* obj1, obj2, obj3, ... */) {
    let result = {}
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge$1(result[key], val)
        } else if (isPlainObject(val)) {
            result[key] = merge$1({}, val)
        } else if (isArray$2(val)) {
            result[key] = val.slice()
        } else {
            result[key] = val
        }
    }

    for (let i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    }
    return result
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg)
        } else {
            a[key] = val
        }
    })
    return a
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1)
    }
    return content
}

let utils$1 = {
    isArray: isArray$2,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer$1,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge$1,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
}

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
let mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {}
    let config = {}

    let valueFromConfig2Keys = ['url', 'method', 'data']
    let mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params']
    let defaultToConfig2Keys = [
        'baseURL',
        'transformRequest',
        'transformResponse',
        'paramsSerializer',
        'timeout',
        'timeoutMessage',
        'withCredentials',
        'adapter',
        'responseType',
        'xsrfCookieName',
        'xsrfHeaderName',
        'onUploadProgress',
        'onDownloadProgress',
        'decompress',
        'maxContentLength',
        'maxBodyLength',
        'maxRedirects',
        'transport',
        'httpAgent',
        'httpsAgent',
        'cancelToken',
        'socketPath',
        'responseEncoding'
    ]
    let directMergeKeys = ['validateStatus']

    function getMergedValue(target, source) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
            return utils$1.merge(target, source)
        } else if (utils$1.isPlainObject(source)) {
            return utils$1.merge({}, source)
        } else if (utils$1.isArray(source)) {
            return source.slice()
        }
        return source
    }

    function mergeDeepProperties(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(config1[prop], config2[prop])
        } else if (!utils$1.isUndefined(config1[prop])) {
            config[prop] = getMergedValue(undefined, config1[prop])
        }
    }

    utils$1.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(undefined, config2[prop])
        }
    })

    utils$1.forEach(mergeDeepPropertiesKeys, mergeDeepProperties)

    utils$1.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(undefined, config2[prop])
        } else if (!utils$1.isUndefined(config1[prop])) {
            config[prop] = getMergedValue(undefined, config1[prop])
        }
    })

    utils$1.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
            config[prop] = getMergedValue(config1[prop], config2[prop])
        } else if (prop in config1) {
            config[prop] = getMergedValue(undefined, config1[prop])
        }
    })

    let axiosKeys = valueFromConfig2Keys
        .concat(mergeDeepPropertiesKeys)
        .concat(defaultToConfig2Keys)
        .concat(directMergeKeys)

    let otherKeys = Object.keys(config1)
        .concat(Object.keys(config2))
        .filter(function filterAxiosKeys(key) {
            return axiosKeys.indexOf(key) === -1
        })

    utils$1.forEach(otherKeys, mergeDeepProperties)

    return config
}

let merge$2 = function merge(defaults, config) {
    config = mergeConfig(defaults, config)

    if (config.method) {
        config.method = config.method.toLowerCase()
    } else if (defaults.method) {
        config.method = defaults.method.toLowerCase()
    } else {
        config.method = 'get'
    }

    return config
}

let fireBefore = function fireBefore(exHooks, config) {
    exHooks.forEach(function(_ref) {
        let onBefore = _ref.onBefore
        return onBefore && onBefore(config)
    })
}

let fireComplete = function fireComplete(exHooks, config, isResolve, resOrErr) {
    exHooks.forEach(function(_ref2) {
        let onComplete = _ref2.onComplete
        return onComplete && onComplete(config, isResolve, resOrErr)
    })
}

let complete = function complete(promise, exHooks, config) {
    promise
        .then(function(res) {
            return fireComplete(exHooks, config, true, res)
        })
        ['catch'](function(e) {
            return e
        })
    promise['catch'](function(err) {
        return fireComplete(exHooks, config, false, err)
    })
    return promise['catch'](function(err) {
        throw err
    })
}
/**
 * @ignore
 * 包装所有请求方法，实现相关钩子
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 * @param {AxiosInstance} instance 输入旧的实例
 * @returns {AxiosInstance} 输出新的实例
 */

function wrapAxios(instance) {
    let wrap = function wrap() {
        return wrap.request.apply(wrap, arguments)
    }

    _.each(instance, function(val, key) {
        wrap[key] = val
    })

    wrap.exHooks = []

    wrap.exHooks.add = function(obj) {
        let _this = this

        let _id = _.uniqueId(''.concat(Date.now()))

        this.push(
            _objectSpread2(
                _objectSpread2({}, obj),
                {},
                {
                    _id: _id
                }
            )
        )
        return function() {
            let index = _this.findIndex(function(o) {
                return o._id === _id
            })

            index > -1 && _this.splice(index, 1)
        }
    }

    wrap.request = function(config) {
        if (typeof config === 'string') {
            config = arguments[1] || {}
            config.url = arguments[0]
        } else {
            config = config || {}
        }

        config = merge$2(this.defaults, config)

        if (config.exNoHooks) {
            return instance.request.call(this, config)
        } else {
            fireBefore(this.exHooks, config)
            let promise = instance.request.call(this, config)
            return complete(promise, this.exHooks, config)
        }
    }

    let _loop = function _loop() {
        let method = _arr[_i]

        wrap[method] = function(url, config) {
            config = merge$2(
                this.defaults,
                _objectSpread2(
                    _objectSpread2({}, config),
                    {},
                    {
                        method: method,
                        url: url
                    }
                )
            )
            fireBefore(this.exHooks, config)
            let promise = instance[method].call(this, url, config)
            return complete(promise, this.exHooks, config)
        }
    }

    for (var _i = 0, _arr = ['delete', 'get', 'head', 'options']; _i < _arr.length; _i++) {
        _loop()
    }

    let _loop2 = function _loop2() {
        let method = _arr2[_i2]

        wrap[method] = function(url, data, config) {
            config = merge$2(
                this.defaults,
                _objectSpread2(
                    _objectSpread2({}, config),
                    {},
                    {
                        method: method,
                        url: url
                    }
                )
            )
            fireBefore(this.exHooks, config)
            let promise = instance[method].call(this, url, data, config)
            return complete(promise, this.exHooks, config)
        }
    }

    for (var _i2 = 0, _arr2 = ['post', 'put', 'patch']; _i2 < _arr2.length; _i2++) {
        _loop2()
    }

    return wrap
}

let CancelToken = axios.CancelToken,
    Cancel = axios.Cancel
let tokens = {}
/**
 * 请求前处理 config（尽可能在最先注册的拦截器中调用）
 * @param {import('axios').AxiosRequestConfig} config
 */

let setConfig = function setConfig(config) {
    let method = config.method,
        _config$baseURL = config.baseURL,
        baseURL = _config$baseURL === void 0 ? '' : _config$baseURL,
        url = config.url,
        exCancelName = config.exCancelName,
        cancelToken = config.cancelToken
    let path = url.replace(/\?.*$/, '')
    let name = ''
        .concat(method)
        .concat(baseURL)
        .concat(path)
    if (exCancelName === true)
        name = ''
            .concat(method)
            .concat(baseURL)
            .concat(path)
    else if (/^\//.test(exCancelName))
        name = ''
            .concat(method)
            .concat(baseURL)
            .concat(exCancelName)
    else if (typeof exCancelName === 'string' && exCancelName) name = exCancelName

    let token, _promise

    if (cancelToken instanceof CancelToken) {
        token = cancelToken
        _promise = cancelToken.promise
    } else {
        token = new CancelToken(_.noop)
    }

    token.promise = new Promise(function(resolve) {
        _promise &&
            _promise.then(resolve)['catch'](function(e) {
                return e
            })
        token._exCancel_resolvePromise = resolve
    })
    token._exCancel_id = _.uniqueId(''.concat(Date.now()))
    config._exCancel.id = token._exCancel_id
    config._exCancel.name = name
    config.cancelToken = token
    tokens[name] = tokens[name] || []
    tokens[name].push(token)
}
/**
 * @ignore
 * 钩子函数
 * @type {import('axios').AxiosInstance['exHooks'][0]}
 */

let hooks = Object.freeze({
    onBefore: function onBefore(config) {
        console.log('onBefore', config.url)
        config._exCancel = {} // 钩子与拦截器之间的通信对象

        if (config.exCancel) {
            let method = config.method,
                _config$baseURL2 = config.baseURL,
                baseURL = _config$baseURL2 === void 0 ? '' : _config$baseURL2,
                url = config.url,
                exCancel = config.exCancel
            let path = url.replace(/\?.*$/, '')
            let names = Array.isArray(exCancel) ? exCancel : [exCancel]
            names = _.union(names).map(function(name) {
                if (name === true)
                    return ''
                        .concat(method)
                        .concat(baseURL)
                        .concat(path)
                if (/^\//.test(name))
                    return ''
                        .concat(method)
                        .concat(baseURL)
                        .concat(name)
                if (typeof name === 'string') return name
            })
            names = names.filter(Boolean)
            cancel(names)
        }
    },
    onComplete: function onComplete(config) {
        let _config$_exCancel = config._exCancel,
            id = _config$_exCancel.id,
            name = _config$_exCancel.name
        let arr = tokens[name]

        if (id && arr) {
            let index = arr.findIndex(function(token) {
                return token._exCancel_id === id
            })

            if (index > -1) {
                arr.splice(index, 1)
                if (arr.length === 0) delete tokens[name]
            }
        }
    }
})
/**
 * @ignore
 * 取消未完成的请求
 * @param {string | string[]} name exCancelName 参数值对应的名称
 */

var cancel = function cancel(name) {
    let names = Array.isArray(name) ? name : [name]

    _.each(tokens, function(val, key) {
        if (names.includes(key)) {
            val.forEach(function(token) {
                if (token.reason) return
                token.reason = new Cancel('exCancel')

                token._exCancel_resolvePromise(token.reason)
            })
            delete tokens[key]
        }
    })
}

/**
 * @ignore
 * HTTP 请求错误信息集合
 */
let HttpError = {
    exCancel: '请求频率过快',
    default: '网络走神了,请稍后再试',
    cancel: '请求已取消',
    network: '网络异常或服务器连接失败',
    aborted: '请求被中止',
    timeout: '请求服务器响应超时，请求已经被中断',
    // 3xx: 重定向，需要进一步的操作以完成请求
    301: '请求的资源已被永久的移动到新URI',
    302: '请求的资源临时被移动，请重新发送请求',
    303: '请求的资源已被永久的移动到新URI，使用GET和POST请求查看',
    304: '所请求资源未变动，已使用本地缓存资源进行访问',
    305: '所请求的资源必须通过代理访问',
    306: '请求的资源已被移动',
    307: '请求的资源临时被移动，使用GET请求重定向',
    // 4xx: 客户端错误
    400: '客户端请求发生语法错误，服务器无法处理该请求',
    401: '被请求的页面需要进行身份验证',
    402: '未知客户端错误',
    403: '所请求页面的禁止访问',
    404: 'Not Found，所请求地址不存在',
    405: '请求中指定的方法被禁止使用',
    406: '服务器无法根据客户端请求的内容特性完成请求',
    407: '用户必须首先使用代理服务器进行验证并授权',
    408: '服务器等待客户端发送的请求已超时',
    409: '由于冲突，请求无法被完成',
    410: '指定请求的页面已经被移动或不存在',
    411: '服务器无法处理客户端发送的不带 Content-Length 的请求信息',
    412: '请求失败，请求中前提条件有错误',
    413: '由于所请求的实体的太大，服务器拒绝处理该请求',
    414: '请求的URI过长（URI通常为网址），服务器无法处理',
    415: '服务器无法处理请求附带的媒体格式',
    416: '客户端请求的范围 Range 无效',
    417: '服务器无法满足 Expect 的请求头信息',
    // 5xx: 服务器错误
    500: '服务器内部错误，无法完成请求',
    501: '服务器不支持所请求的功能，无法完成请求',
    502: '充当网关或代理的服务器，从远端服务器接收到了一个无效的请求',
    503: '由于超载或系统维护，服务器暂时的无法处理客户端的请求',
    504: '充当网关或代理的服务器，未及时从远端服务器获取请求',
    505: '服务器不支持请求中指明的HTTP协议版本'
}
/**
 * @ignore
 * 将新的提示错误描述信息覆盖旧的信息
 * @param {Object} options 新的错误信息配置，如{404:'页面未找到'}
 */

HttpError.merge = function(options) {
    Object.assign(HttpError, options)
}
/**
 * @ignore
 * 根据 HTTP 错误对象分析对应的错误详细内容
 * @param {{request,response:{status}}} error
 * @returns {string}
 */

HttpError.info = function(error) {
    let type = _typeof(error) // err.response.status

    switch (type) {
        case 'undefined': {
            return formatError(HttpError.network)
        }

        case 'object': {
            if (error.response && error.response.status && HttpError[error.response.status]) {
                return formatError(
                    '['.concat(error.response.status, '] ').concat(HttpError[error.response.status]),
                    'server',
                    error.response.status
                )
            } else if (error instanceof Error) {
                // 超时
                if (/^timeout of/i.test(error.message)) {
                    return formatError(HttpError.timeout, 'timeout')
                } else if (/^network/i.test(error.message)) {
                    return formatError(HttpError.network, 'network')
                } else {
                    return formatError(error.message)
                }
            } else if (/^cancel/i.test(error.toString())) {
                let name = error['message'] // 请求过快

                if ('exCancel' === name) {
                    return formatError(HttpError['exCancel'], 'exCancel')
                } else {
                    return formatError(HttpError.cancel, 'cancel')
                }
            }

            return formatError(HttpError['default'])
        }

        case 'string': {
            return formatError(error)
        }

        default: {
            return formatError(HttpError['default'])
        }
    }
}

function formatError(message) {
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error'
    let status = arguments.length > 2 ? arguments[2] : undefined
    return {
        message: message,
        name: name,
        status: status
    }
}

/**
 * @ignore
 * 全局请求扩展配置
 * 添加一个请求拦截器 （于transformRequest之前处理）
 */

let axiosConfig = {
    success: function success(config) {
        //   // 在请求开始前，对之前的请求做检查取消操作
        //   removePending(config);
        //   // 将当前请求添加到 pending 中
        //   addPending(config);
        let headers = config.headers
        let ContentType = headers['Content-Type'] || '' // 只有 ‘application/x-www-form-urlencoded’模式才需要对post的data做序列化

        if (config.data && ContentType.indexOf('application/x-www-form-urlencoded') > -1) {
            config.data = qs.stringify(config.data)
        }

        setConfig(config)
        return config
    },
    error: function error(_error) {
        return Promise.reject(_error)
    }
}
/**
 * @ignore
 * 全局请求响应处理
 * 添加一个返回拦截器 （于transformResponse之后处理）
 * 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
 */

let axiosResponse = {
    success: function success(response) {
        // 如果是流文件则直接返回
        if (response.config && response.config.responseType === 'blob') {
            return Promise.resolve(response)
        } // 数据结果根据`content-type`来操作json数据以及文件流

        if (response.config && response.config.responseType === 'arraybuffer') {
            let headers = response.headers || {}
            let contentType = headers['content-type'] || ''
            let isJSON = contentType.indexOf('application/json') > -1

            if (isJSON) {
                try {
                    // arraybuffer转化成json对象
                    let enc = new TextDecoder('utf-8')

                    let _payload = JSON.parse(enc.decode(new Uint8Array(response.data))) // const payload = JSON.parse(
                    //     Buffer.from(response.data).toString('utf8'),
                    // )

                    if (this.$isResponseSuccess(_payload)) {
                        return this.$getResponseSuccess(_payload)
                    } else {
                        return Promise.reject(this.$getResponseError(_payload))
                    }
                } catch (err) {
                    console.error('[下载失败]', err)
                    return Promise.reject({
                        message: '下载失败',
                        name: 'download',
                        data: err
                    })
                }
            } else {
                return response
            }
        }

        let payload = response.data || {}

        if (this.$isResponseSuccess(payload)) {
            let result = this.$getResponseSuccess(payload) // console.log('[业务正常]', result)

            return result
        } else {
            let _result = this.$getResponseError(payload) // console.log('[业务异常]', result)

            return Promise.reject(_result)
        }
    },
    error: function error(err) {
        let _this = this

        let config = err.config // If config does not exist or the retry option is not set, reject

        if (!config || !config.exRetry) {
            let result = HttpError.info(err)
            return Promise.reject(result)
        } // 请求不再经过hook

        config.exNoHooks = true // Set the variable for keeping track of the retry count

        config.__retryCount = config.__retryCount || 0
        config.retry = config.retry || 3
        config.retryDelay = config.retryDelay || 1000 // Check if we've maxed out the total number of retries

        if (config.__retryCount >= config.retry) {
            // Reject with the error
            let _result2 = HttpError.info(err)

            return Promise.reject(_result2)
        } // Increase the retry count

        config.__retryCount += 1 // console.log(
        //     `[开始第${config.__retryCount}次重试] 总共${config.retry}次`,
        // )
        // Create new promise to handle exponential backoff

        let backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve()
            }, config.retryDelay || 1)
        }) // Return the promise in which recalls axios to retry the request

        return backoff.then(function() {
            return _this.request(config)
        })
    }
}
/**
 * @ignore
 * @param {Parameters<axios['create']>[0]} requestConfig
 * @param {(instance: ReturnType<axios['create']>) => any} [callback]
 */

let createAxios = function createAxios(requestConfig, callback) {
    let _requestConfig$isResp = requestConfig.isResponseSuccess,
        isResponseSuccess =
            _requestConfig$isResp === void 0
                ? function() {
                      return true
                  }
                : _requestConfig$isResp,
        _requestConfig$getRes = requestConfig.getResponseError,
        getResponseError =
            _requestConfig$getRes === void 0
                ? function(res) {
                      return res
                  }
                : _requestConfig$getRes,
        _requestConfig$getRes2 = requestConfig.getResponseSuccess,
        getResponseSuccess =
            _requestConfig$getRes2 === void 0
                ? function(res) {
                      return res
                  }
                : _requestConfig$getRes2,
        rest = _objectWithoutProperties(requestConfig, ['isResponseSuccess', 'getResponseError', 'getResponseSuccess'])

    let defaults = {
        /* 默认配置 */
        // paramsSerializer: params => qsStringify(params),
    }

    let _axios = axios.create(mergeConfig(defaults, rest))

    let instance = wrapAxios(_axios)
    instance.$uploadFile = uploadFile
    instance.$downloadFile = downloadFile
    instance.$isResponseSuccess = isResponseSuccess
    instance.$getResponseError = getResponseError
    instance.$getResponseSuccess = getResponseSuccess
    instance.exHooks.add(hooks)
    instance.interceptors.request.use(axiosConfig.success, axiosConfig.error)
    instance.interceptors.response.use(
        function(config) {
            return axiosResponse.success.call(instance, config)
        },
        function(error) {
            return axiosResponse.error.call(instance, error)
        }
    )
    callback && callback(instance)
    return instance
}

// 遍历递归处理数据 obj 元数据   map 映射 {status:{newKey:'$status'}}
function deepMapHandler() {
    let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    let map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    // 判断原目标是数组还是对象，进行初始化赋值
    let newObj = obj.constructor === Array ? [] : {}
    responseMapHandler(obj, map) // 循环原目标

    for (let key in obj) {
        // 判断当前值是否存在
        if (obj.hasOwnProperty(key)) {
            // 判断是否当前要拷贝的是否是对象
            if (obj[key] && _typeof(obj[key]) === 'object') {
                // 是对象，再次调用deepClone递归
                newObj[key] = deepMapHandler(obj[key], map)
            } else {
                // 数组，直接赋值就好
                newObj[key] = obj[key]
            }
        }
    }

    return newObj
}

function responseMapHandler() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    let map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    Object.keys(map).forEach(function(key) {
        let target = map[key]
        let value = data[key]

        if (data.hasOwnProperty(key)) {
            if (typeof target === 'string') {
                data[target] = value
            } else if (_typeof(target) === 'object') {
                let _target$newKey = target.newKey,
                    newKey = _target$newKey === void 0 ? '$'.concat(key) : _target$newKey,
                    handler = target.handler,
                    replace = target.replace,
                    dict = target.dict

                try {
                    let newValue = value // 字典枚举查询

                    if (dict) {
                        let _dict = {}

                        if (typeof dict === 'function') {
                            _dict = dict()
                        }

                        let options = _dict.options || []
                        options.forEach(function(item) {
                            if (item.value == value) {
                                newValue = item.label
                            }
                        })
                    }

                    if (handler) {
                        newValue = handler(value, data)
                    }

                    data[newKey] = newValue

                    if (replace) {
                        delete data[key]
                    }
                } catch (err) {}
            } else if (typeof target === 'function') {
                data[key] = target(value, data)
            }
        }
    })
}

function createAPI(http) {
    let interceptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
    let apis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
    let interceptorsMAP = {}
    interceptors.map(function(item) {
        let name = item.name,
            method = item.method,
            url = item.url
        name = name || url
        let key = name + method

        if (interceptorsMAP[key]) {
            console.error(
                '[createAPI error]: \u51FA\u73B0\u91CD\u590D\u62E6\u622A\u5668 '.concat(name, ' ').concat(method),
                item
            )
        } else {
            interceptorsMAP[key] = 1
        }
    })
    let API = new Proxy(apis, {
        get: function get(target, name) {
            let methods = ['get', 'post', 'put', 'delete', 'patch']

            if (methods.indexOf(name) > -1) {
                return function() {
                    let method = name
                    let url = arguments.length <= 0 ? undefined : arguments[0]
                    let params = arguments.length <= 1 ? undefined : arguments[1]
                    let config = arguments.length <= 2 ? undefined : arguments[2]
                    let interceptor = interceptors.filter(function(item) {
                        return item.name === url && item.method === method
                    })[0]
                    interceptor = interceptor || {
                        onBefore: function onBefore() {},
                        onSuccess: function onSuccess() {},
                        config: {}
                    } // console.log(arg, url, method, interceptor)

                    let callback = function callback() {
                        let uri = interceptor.url || url
                        let description = interceptor.description || ''
                        interceptor.onBefore(params)
                        return http
                            .request(
                                _objectSpread2(
                                    _objectSpread2(
                                        {
                                            method: method,
                                            url: uri,
                                            body: params,
                                            description: description
                                        },
                                        interceptor.config
                                    ),
                                    config
                                )
                            )
                            .then(function(res) {
                                let _res$data = res.data,
                                    data = _res$data === void 0 ? {} : _res$data
                                let responseMap = interceptor.responseMap

                                if (responseMap) {
                                    deepMapHandler(data, responseMap)
                                }

                                let result = interceptor.onSuccess(res)

                                if (result) {
                                    return result
                                } else {
                                    return res
                                }
                            })
                    }

                    return callback()
                }
            } else if (typeof target[name] === 'function') {
                return function() {
                    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
                        arg[_key] = arguments[_key]
                    }

                    return target[name].apply(null, arg)
                }
            } else {
                let names = name.split('_')
                let method = names.splice(0, 1)[0]
                let uri = names
                    .map(function(name) {
                        if (name.indexOf('$') > -1) {
                            name = name.replace('$', '')
                            return '{'.concat(name, '}')
                        } else {
                            return '/' + name
                        }
                    })
                    .join('')
                console.log('uri', uri) // 'get' | 'delete' | 'post' | 'put' | 'patch'

                if (methods.indexOf(method) > -1) {
                    return function() {
                        let callback = function callback(params, config) {
                            return http.request(
                                _objectSpread2(
                                    {
                                        method: method,
                                        url: uri,
                                        body: params
                                    },
                                    config
                                )
                            )
                        }

                        for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            arg[_key2] = arguments[_key2]
                        }

                        return callback.apply(apis, arg)
                    }
                } else {
                    return function() {
                        return Promise.reject({
                            message: '['.concat(name, '] \u51FD\u6570\u4E0D\u5B58\u5728')
                        })
                    }
                }
            }
        }
    })
    return API
}

/* axios 中文文档：http://www.axios-js.com/zh-cn/docs/ */
let isCancel = axios.isCancel

export { createAxios, cancel, isCancel, createAPI, toFormData, qsStringify }
