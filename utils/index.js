export const makeEdit = async (action, v) => {
    const vmodel = useState("imgEditCurr");
    const pos = useState("imgEditPos");
    const files = useState("files");

    switch (action) {
        case ('set'):
            navigateTo('/admins/edit');
            pos.value = files.value.findIndex((vi) => vi.incid === v);
            vmodel.value = {
                vehicle: files.value[pos.value].vehicle,
                location: files.value[pos.value].location,
                line: files.value[pos.value].line ? files.value[pos.value].line.split(', ') : [],
                date: files.value[pos.value].date,
                notes: files.value[pos.value].description,
                category: files.value[pos.value].category,
                extraCategories: files.value[pos.value].extraCategories ? files.value[pos.value].extraCategories.split(',') : [],
                isPublic: files.value[pos.value].isPublic === 1,
                isFeatured: files.value[pos.value].isFeatured === 1
            }
            break;
        case ('act'):
            if (Array.isArray(vmodel.value.line)) {
                vmodel.value.line.forEach((vvl) => {
                    if (Object.hasOwn(vvl, 'composite')) vvl = vvl.composite;
                })

                vmodel.value.line = vmodel.value.line.join(', ');
            }
            else if (Object.hasOwn(vmodel.value.line, 'composite')) vmodel.value.line = vmodel.value.line.composite;

            vmodel.value.extraCategories = vmodel.value.extraCategories.join(',');

            await fetch(`${process.env.API_ROOT}/v1/files/makeEdit`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filename: files.value[pos.value].filename,
                    origCategory: files.value[pos.value].category,
                    incid: files.value[pos.value].incid,
                    ...vmodel.value
                })
            });

            files.value = await fetch(`${process.env.API_ROOT}/v1/files/list?listall=true`).then((res) => res.json());
            makeEdit('next');
            break;
        case ('next'):
            pos.value === files.value.length-1 ? pos.value = 0 : pos.value++;
            vmodel.value = {
                vehicle: files.value[pos.value].vehicle,
                location: files.value[pos.value].location,
                line: files.value[pos.value].line ? files.value[pos.value].line.split(', ') : [],
                date: files.value[pos.value].date,
                notes: files.value[pos.value].description,
                category: files.value[pos.value].category,
                extraCategories: files.value[pos.value].extraCategories ? files.value[pos.value].extraCategories.split(',') : [],
                isPublic: files.value[pos.value].isPublic === 1,
                isFeatured: files.value[pos.value].isFeatured === 1
            }
            break;
        case ('prev'):
            pos.value === 0 ? pos.value = files.value.length-1 : pos.value--;
            vmodel.value = {
                vehicle: files.value[pos.value].vehicle,
                location: files.value[pos.value].location,
                line: files.value[pos.value].line ? files.value[pos.value].line.split(', ') : [],
                date: files.value[pos.value].date,
                notes: files.value[pos.value].description,
                category: files.value[pos.value].category,
                extraCategories: files.value[pos.value].extraCategories ? files.value[pos.value].extraCategories.split(',') : [],
                isPublic: files.value[pos.value].isPublic === 1,
                isFeatured: files.value[pos.value].isFeatured === 1
            }
            break;
    }
}

export const login = async () => {
    const username = useState("user_username");
    const password = useState("user_password");
    const loginButtonText = useState("login_button_text");
    const loginButtonIcon = useState("login_button_icon");

    if (username.value === "" || !username.value || password.value === "" || !password.value) {
        loginButtonIcon.value = 'mdi:exclamation-thick';
        loginButtonText.value = 'Συμπληρώστε όλα τα στοιχεία!';

        setTimeout(() => {
            loginButtonIcon.value = 'mdi:key';
            loginButtonText.value = 'Συνέχεια';
        }, 2000);

        return;
    }

    loginButtonIcon.value = 'svg-spinners:ring-resize';
    loginButtonText.value = 'Δημιουργία συνεδρίας..';

    fetch(`${process.env.API_ROOT}/v1/account/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username.value, password: password.value })
    }).then(async (res) => {
        if (!res.ok) {
            loginButtonIcon.value = 'mdi:exclamation-thick';

            if (res.status === 401) {
                loginButtonText.value = "Λανθασμένα στοιχεία σύνδεσης!";
                // teleact({action: "USER_LOGIN_FAIL", data: {acc: username.value, error: 'invalid credentials'}})
            }
            else if (res.status === 429 || res.status === 420) {
                loginButtonText.value = "Πολλές αποτυχημένες προσπάθειες. Προσπαθήστε αργότερα.";
                // teleact({action: "USER_LOGIN_FAIL", data: {acc: username.value, error: 'ratelimit'}})
            }
            else {
                loginButtonText.value = "Αποτυχία σύνδεσης. Παρακαλώ επικοινωνήστε με διαχειριστή.";
                // teleact({action: "USER_LOGIN_FAIL", data: {acc: username.value, error: res.status}})
            }

            setTimeout(() => {
                loginButtonIcon.value = "mdi:key";
                loginButtonText.value = "Συνέχεια";
            }, 3000);

            return;
        }
        res.json().then((data) => {
            loginButtonIcon.value = 'mdi:check-bold';
            loginButtonText.value = 'Επιτυχής ταυτοποίηση.';

            username.value = null;
            password.value = null;

            useState("user").value = data.data;
            localStorage.setItem('accPreferences', JSON.stringify(data.data));

            setTimeout(() => navigateTo("/"), 500);
        })
    })
}

export const extractBucket = (v) => {
    return v.split('.dev/')[1].split('/')[0];
}

export const createUrl = (v) => {
    let str = "";

    const l = v.split('.');

    for (let i = 0; i < l.length - 1; i++) {
        i === l.length - 2 ? str += `${l[i]}` : str += `${l[i]}.`;
    }

    return `${str}-opti80.webp`;
}
export const turnstile = (response, type = 'login') => {
    fetch(`${process.env.API_ROOT}/v1/turnstile/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            captchaResponse: response
        })
    }).then(async (res) => {
        if (res.ok) {
            useState("turnstile_verify").value = true;

            if (type === 'login') await login();
            if (type === 'register') await register();
        }
    })
}
export const getUser = () => {
    return new Promise((resolve) => {
        const session = sessionStorage.getItem("sessionObj");
        if (session && session !== "undefined") useState("user").value = JSON.parse(sessionStorage.getItem("sessionObj"));

        fetch(`${process.env.API_ROOT}/v1/account/get`, {
            credentials: "include",
        })
            .then(async (res) => {
                if (!res.ok) return;

                const result = await res.json();
                if (result.status === "error") return;

                sessionStorage.setItem("sessionObj", JSON.stringify({ data: result.data }));
                useState("user").value = result.data;

                resolve();
            })
    });
};

export const clearSession = (navigate) => {
    fetch(`${process.env.API_ROOT}/v1/account/logout`, {
        method: "POST",
        credentials: "include",
    })
        .then(async (res) => {
            // teleact({action: "USER_LOGOUT_SUCCESS", data: { acc: useState("user").value.email }});

            if (!res.ok) {
                // teleact({action: "USER_LOGOUT_FAIL", data: { acc: useState("user").value.email, error: res.status }});
                return;
            }

            const data = await res.json();
            if (data.status !== "success") return;

            sessionStorage.removeItem("sessionObj");
            useState("user").value = null;

            navigate();
        })
};

export const handleAdminShow = (f, category) => {
    const files = useState("files");

    const file = files.value.filter((fi) => fi.filename === f.filename && fi.category === category);
}

export const resolveRange = (str) => {
    const res = [];
    str.replaceAll(' ', '').split(',').forEach((r) => {
        if (r.includes('-')) {
            for (let v = parseInt(r.split('-') [0]); v <= parseInt(r.split('-') [1]); v++) {
                res.push(v.toString());
            }
        } else res.push(r.toString());
    })
    return res;
}

export const handleSelection = async () => {
    return new Promise((resolve, reject) => {
        const files = useState("files");
        const fileDisplay = useState("fileDisplay");
        const vehicleSelected = useState("vehicleSelected");

        vehicleSelected.value !== '' ? fileDisplay.value = files.value.filter((f) => resolveRange(vehicleSelected.value).includes(f.vehicle)) : fileDisplay.value = files.value;
        resolve();
    })
}

export const makeCategoryEdit = async (action, v) => {
    const categories = useState("categories");
    const localCategories = useState("localCategories");
    const vmodel = useState("categoryEditCurr");
    switch (action) {
        case ('select'):
            const category = categories.value.find((c) => c.name === v);
            vmodel.value = {
                name: category.name,
                order: category.order,
                description: category.description,
                isVisible: category.isVisible === 1,
                incid: category.incid
            };
            break;
        case ('add'):
            await fetch(`${process.env.API_ROOT}/v1/category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...vmodel.value
                })
            });
            categories.value = await fetch(`${process.env.API_ROOT}/v1/category/list`).then((res) => res.json());
            categories.value.sort((a, b) => a.order - b.order);

            localCategories.value = categories.value;
            vmodel.value = {
                name: null,
                description: null,
                isVisible: false,
                order: null,
                incid: -1
            };
            break;
        case ('edit'):
            localCategories.value.sort((a, b) => a.order - b.order);
            const localInx = localCategories.value.findIndex((c) => c.incid === vmodel.value.incid);
            localCategories.value[localInx] = vmodel.value;
            await fetch(`${process.env.API_ROOT}/v1/category/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(localCategories.value)
            })
            categories.value = await fetch(`${process.env.API_ROOT}/v1/category/list`).then((res) => res.json());
            categories.value.sort((a, b) => a.order - b.order);

            localCategories.value = categories.value;
            vmodel.value = {
                name: null,
                description: null,
                isVisible: false,
                order: null,
                incid: -1
            };
            break;
        case ('toggleDisplay'):
            await fetch(`${process.env.API_ROOT}/v1/category/edit?mode=toggleDisplay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({category: v})
            })
            categories.value = await fetch(`${process.env.API_ROOT}/v1/category/list`).then((res) => res.json());
            categories.value.sort((a, b) => a.order - b.order);

            localCategories.value = categories.value;
            vmodel.value = {
                name: null,
                description: null,
                isVisible: false,
                order: null,
                incid: -1
            };
            break;
        case ('delete'):
            await fetch(`${process.env.API_ROOT}/v1/category/delete`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(v)
            })
            categories.value = await fetch(`${process.env.API_ROOT}/v1/category/list`).then((res) => res.json());
            categories.value.sort((a, b) => a.order - b.order);

            localCategories.value = categories.value;
            vmodel.value = {
                name: null,
                description: null,
                isVisible: false,
                order: null,
                incid: -1
            };
            break;
    }
}

export const s3Import = async () => {
    return new Promise(async(resolve, reject) => {
        const data = await fetch(`${process.env.API_ROOT}/v1/files/imports3`, {
            method: 'POST',
            credentials: 'include'
        }).then((res) => res.json()).catch(() => resolve(0));

        if (data.status === 'success') resolve(1);
        else resolve(0);
    })
}

export const refreshFiles = async () => {
    return new Promise(async (resolve, reject) => {
        const files = useState("files");
        files.value = await fetch(`${process.env.API_ROOT}/v1/files/list?listall=true`).then((res) => res.json());
        resolve();
    })
}

export const teleauth = async () => {
    return new Promise(async (resolve, _reject) => {
        const teleses = useState("teleses");

        fetch(`${process.env.TELEMETRY_ROOT}/v1/hello`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: process.env.TELEMETRY_PROJECT
            })
        }).then(async (res) => {
            const r1 = await res.json();
            teleses.value = r1.sid;
            resolve();
        }).catch(() => resolve());
    })
}

export const teleact = async (payload) => {
    return new Promise((resolve, _reject) => {
        const teleses = useState("teleses");

        fetch(`${process.env.TELEMETRY_ROOT}/v1/act`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'si': teleses.value
            },
            body: JSON.stringify({
                project: process.env.TELEMETRY_PROJECT,
                payload: payload
            })
        }).then((res) => {
            if (res.ok) resolve();
            else if (res.status === 403) {
                teleauth().then(() => {
                    teleact(payload);
                    resolve();
                });
            }
        }).catch(() => resolve());
    })
}