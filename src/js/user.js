import { setStore, getStore, removeStore, setSession, getSession, clearSession} from './common'
export const getUser = function () {
    return getStore("authUser")
};

export const getPhone = function () {
    return getStore("phone")
};

export const getToken = function () {
    return getStore("token")
};
export const setUser = function (user) {
    setSession("authUser",user);
};
export const setLoginInfo = function (user) {
    setStore("loginInfo",user);
};

export const getLoginInfo = function () {
   return getStore("loginInfo");
};

