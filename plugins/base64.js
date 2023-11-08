function encodeb64(val) {
    if (process.client) {
        return window.btoa(unescape(encodeURIComponent(val)))
    } else {
        return Buffer.from(val, 'ascii').toString('base64')
    }
}

function decodeb64(val) {
    if (process.client) {
        return decodeURIComponent(escape(window.atob(val)))
    } else {
        return Buffer.from(val, 'base64').toString('ascii')
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            encodeb64,
            decodeb64
        }
    }
})