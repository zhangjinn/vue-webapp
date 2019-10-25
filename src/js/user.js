let getUser = function () {

    return JSON.parse(sessionStorage.getItem("authUser"))
};

let getPhone = function () {
    return localStorage.getItem("phone")
};

let getToken = function () {
    return localStorage.getItem("token")
};
let setUser = function (token, phone, user) {
    sessionStorage.setItem("authUser", JSON.stringify(user));
};

export {
    getUser,
    getPhone,
    getToken,
    setUser
}
