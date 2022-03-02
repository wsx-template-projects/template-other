/**
 * el-dialog -- Attributes
 */
export const DIALOG_ATTRS = {
    visible: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: '800px',
    },
    title: {
        type: String,
        default: '标题',
    },
    fullscreen: {
        type: Boolean,
        default: false,
    },
    top: {
        type: String,
        default: '15vh',
    },
}

/**
 * el-dialog -- events
 */
export const DIALOG_EVENTS = {
    open: 'onOpen',
    opened: 'onOpened',
    close: 'onClose',
    closed: 'onClosed',
}
