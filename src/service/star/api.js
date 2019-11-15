import http from './../http.js'

let gameApiPrefix = "http://husky.etmcn.com/game/api";
let examApiPrefix = "http://husky.etmcn.com/exam/api";
let userApiPrefix = "http://husky.etmcn.com/security/api";
let orgApiPrefix = "http://husky.etmcn.com/";

//根据年级获取组别
export const getGroup = (data) => {
    const url = gameApiPrefix + "/group";
    return http.get(url, data);
};
//判断用户是否已经激活卡片
export const userActivated = (userId) => {
    const url = userApiPrefix + "/user_card/" + userId;
    return http.get(url);
};
//激活卡片
export const cardActivate = (data) => {
    const url = userApiPrefix + "/user_card/activation";
    return http.post(url, data);
};
export const getGameArea = (id) => {
    const url = gameApiPrefix + "/hold/" + id;
    return http.get(url);
};