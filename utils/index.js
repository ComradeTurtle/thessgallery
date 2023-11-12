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

export const makeEdit = async (action) => {
    const vmodel = useState("imgEditCurr");
    const pos = useState("imgEditPos");
    const files = useState("files");

    switch (action) {
        case ('act'):

            if (Object.hasOwn(vmodel.value.line, 'composite')) vmodel.value.line = vmodel.value.line.composite;
            await fetch(`https://thg-api.comradeturtle.dev/v1/files/makeEdit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filename: files.value[pos.value].filename,
                    category: files.value[pos.value].category,
                    ...vmodel.value
                })
            });

            files.value = await fetch(`https://thg-api.comradeturtle.dev/v1/files/list?listall=true`).then((res) => res.json());
            makeEdit('next');
            break;
        case ('next'):
            pos.value === files.value.length-1 ? pos.value = 0 : pos.value++;
            vmodel.value = {
                vehicle: files.value[pos.value].vehicle,
                location: files.value[pos.value].location,
                date: files.value[pos.value].date,
                notes: files.value[pos.value].notes,
                isPublic: files.value[pos.value].isPublic === 1,
                isFeatured: files.value[pos.value].isFeatured === 1
            }
            break;
        case ('prev'):
            pos.value === 0 ? pos.value = files.value.length-1 : pos.value--;
            vmodel.value = {
                vehicle: files.value[pos.value].vehicle,
                location: files.value[pos.value].location,
                date: files.value[pos.value].date,
                notes: files.value[pos.value].notes,
                isPublic: files.value[pos.value].isPublic === 1,
                isFeatured: files.value[pos.value].isFeatured === 1
            }
            break;
    }
}

export const carouselHandle = (ref) => {
    console.log('crated');

    console.log(ref);
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