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
            if (Array.isArray(vmodel.value.line)) {
                vmodel.value.line.forEach((vvl) => {
                    if (Object.hasOwn(vvl, 'composite')) vvl = vvl.composite;
                })

                vmodel.value.line = vmodel.value.line.join(', ');
            }
            else if (Object.hasOwn(vmodel.value.line, 'composite')) vmodel.value.line = vmodel.value.line.composite;


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
                line: files.value[pos.value].line ? files.value[pos.value].line.split(', ') : [],
                date: files.value[pos.value].date,
                notes: files.value[pos.value].description,
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

    fetch(`http://localhost:12700/v1/account/login`, {
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

export const turnstile = (response, type = 'login') => {
    fetch(`http://localhost:12700/v1/turnstile/verify`, {
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

        fetch(`http://localhost:12700/v1/account/get`, {
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
    fetch(`http://localhost:12700/v1/account/logout`, {
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