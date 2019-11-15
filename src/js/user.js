import {setStore, getStore, removeStore, setSession} from './common'

export const getUser = function () {
    return getStore("authUser")
};

export const getPhone = function () {
    return window.localStorage.getItem("phone");
};

export const getToken = function () {
    return window.localStorage.getItem("token");
};
export const getIndex = function () {
    return window.localStorage.getItem("student_index");
};
export const setIndex = function (index) {
    return window.localStorage.setItem("student_index", index);
};
export const setFirstTime = function (value) {
    return window.localStorage.setItem("first_time", value);
};
export const getFirstTime = function () {
    return window.localStorage.getItem("first_time");
};
export const removeFirstTime = function () {
    return window.localStorage.removeItem("first_time");
};
export const setStoreStudent = function (student) {
    return setStore("student", student);
};
export const getStoreStudent = function () {
    return JSON.parse(window.localStorage.getItem("student"));
};
export const removeStoreStudent = function () {
    removeStore("student");
};
export const setUser = function (user) {
    setSession("authUser", user);
};
export const setLoginInfo = function (user) {
    setStore("loginInfo", user);
};

export const getLoginInfo = function () {
    return getStore("loginInfo");
};


export const setStudentIndex = function (studentIndex) {
    return setStore("studentIndex", studentIndex);
};
export const getStudentIndex = function () {
    return getStore("studentIndex");
};
export const removeStudentIndex = function () {
    removeStore("studentIndex");
};
