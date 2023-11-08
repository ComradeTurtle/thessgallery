export const uploadFile = async (state) => {
    const formData = new FormData();
    console.log(this);
    formData.append('file', state.select.target.files[0]);

    // const data = await fetch('http://localhost:10029/upload', {
    //     method: 'POST',
    //     body: formData
    // })

    // const pd = await data.json();
    // console.log(pd);
}

export const encodeb64 = (val) => {
    if (process.client) {
        return window.btoa(unescape(encodeURIComponent(val)))
    } else {
        return Buffer.from(val, 'ascii').toString('base64')
    }
}

export const decodeb64 = (val) => {
    if (process.client) {
        return decodeURIComponent(escape(window.atob(val)))
    } else {
        return Buffer.from(val, 'base64').toString('ascii')
    }
}