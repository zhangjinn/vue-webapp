import http from './http.js'

let gameApiPrefix = "http://husky.etmcn.com/game/api";
let examApiPrefix = "http://husky.etmcn.com/exam/api";
let userApiPrefix = "http://husky.etmcn.com/security/api";
let orgApiPrefix = "http://husky.etmcn.com/";


//game
export const getFoodTypes = (id="") => {
    const url = gameApiPrefix + "/game/" + id;
    return http.get(url);
};
export const getLocation = (id="") => {
    const url = gameApiPrefix + "/game/area/"+id;
    return http.get(url);
};
//gameSubject
export const gameSubject = (id="") => {
    const url = gameApiPrefix + "/game_subject/" + id;
    return http.get(url);
};
export const getNullDetail = (id="") => {
    const url = gameApiPrefix + "/game_subject/nullDetail/" + id;
    return http.get(url);
};
export const listByStudent = (data) => {
    const url = gameApiPrefix + "/game_subject";
    return http.get(url,data);
};
//grade
export const getGrade = (data) => {
    const url = gameApiPrefix + "/grade";
    return http.get(url,data);
};
// area
export const getProvinceAndCity = (data) => {
    const url = gameApiPrefix + "/area/provinceAndCity";
    return http.get(url,data);
};
export const getParent = (data) => {
    const url = gameApiPrefix + "/area/parent";
    return http.get(url,data);
};
export const getDistrict = (data) => {
    const url = orgApiPrefix + "/area/district";
    return http.get(url,data);
};
export const getArea = (id="") => {
    const url = orgApiPrefix + "/area/" + id;
    return http.get(url);
};
//match
export const getMatch = (data) => {
    const url = gameApiPrefix + "/match";
    return http.get(url,data);
};
//matchTree
export const getMatchTree = (student="") => {
    const url = gameApiPrefix + "/match_tree_node/student/" + student;
    return http.get(url);
};
//student
export const getByUser = (data) => {
    const url = gameApiPrefix + "/student";
    return http.get(url,data);
};
export const getByUserPost = (data) => {
    const url = gameApiPrefix + "/student";
    return http.post(url,data);
};
export const getByUserPut = (data,id="") => {
    const url = gameApiPrefix + "/student/" + id;
    return http.put(url,data);
};
//player
export const getPlayer = (data) => {
    const url = gameApiPrefix + "/player";
    return http.get(url,data);
};
//applicant
export const applicantPost = (data) => {
    const url = gameApiPrefix + '/applicant';
    return http.post(url,data);
};
export const getNum = (data) => {
    const url = gameApiPrefix + '/applicant/num';
    return http.get(url,data);
};
export const getIsApplicant = (data) => {
    const url = gameApiPrefix + "/applicant";
    return http.get(url,data);
};
//associate
export const getAssociate = (data,type='get') => {
    const url = gameApiPrefix + '/applicant';
    if(type == 'get'){
        return http.get(url,data);
    }else{
        return http.post(url,data);
    }

};
//dingTalk
export const getDingTalk = (data,authCode="") => {
    const url = gameApiPrefix + "/user/login/" + authCode;
    return http.post(url,data);
};
//task
export const getTask = (data,id="") => {
    const url = gameApiPrefix + "/task/" + id;
    return http.get(url,data);
};
//matchTask
export const getMatchTask = (data,match="",type="",person="") => {
    const url = gameApiPrefix + "/match_task/" + match + "/" + type + "/" + person;
    return http.get(url,data);
};
//matchTaskItem
export const getMatchTaskItem = (data,matchTask="",begin="",size="") => {
    const url = gameApiPrefix + "/match_task_item/" + matchTask + "/" + begin + "/" + size;
    return http.get(url,data);
};
//matchTaskPart
export const getMatchTaskPart = (data) => {
    const url = gameApiPrefix +"/match_task_part";
    return http.get(url,data);
};
//execute
export const getExecute = (data,type='get',id="") => {
    let url = gameApiPrefix + "/execute/" + id;
    if(type == 'get'){
        return http.get(url,data);
    }else{
        return http.post(url,data);
    }
};
export const getComment = (data,id="") => {
    const url = gameApiPrefix +"/execute/comment/" +id;
    return http.get(url,data);
};
export const getResult = (data,id="") => {
    const url = gameApiPrefix+"/execute/result/"+id;
    return http.get(url,data);
};
//examPaper
export const getExamPaper = (data,id="") => {
    const url = examApiPrefix + "/examPaper/" + id;
    return http.get(url,data);
};
//credentialsStub
export const getCredentialsStub = (data,token="") => {
    const url = userApiPrefix + "/credentials_stub/" + token;
    return http.put(url,data);
};
//examPaperItem
export const getExamPaperItemCount = (data) => {
    const url = examApiPrefix + "/examPaperItem/count";
    return http.get(url,data);
};
export const getExamPaperItemList = (data,task="",begin="",size="") => {
    const url = examApiPrefix + "/examPaperItem/" + task + "/" + begin + "/" + size;
    return http.get(url,data);
};
//answerSheet
export const getAnswerSheet = (data,type='get') => {
    const url = examApiPrefix + "/answerSheet";
    if(type == 'get'){
        return http.get(url,data);
    }else{
        return http.post(url,data);
    }
};
//answerSheetItem
export const getAnswerSheetItem = (data,answerSheet="") => {
    const url = examApiPrefix + "/answerSheetItem/" + answerSheet;
    return http.get(url,data);
};
//group
export const getGroup = (data) => {
    const url = gameApiPrefix +"/group";
    return http.get(url,data);
};
//ori
export const getOri = (data,id="") => {
    const url = gameApiPrefix + "/task/ori/" + id;
    return http.get(url,data);
};
//user
export const getUserCaptcha = (data) => {
    const url = userApiPrefix + "/auth/captcha";
    return http.get(url,data);
};
//用户名密码登录
export const getUserLogin = (data) => {
    const url = userApiPrefix + "/auth/login";
    return http.post(url, data);
};
//获取用户信息
export const getUserInfo = (data) => {
    const url = userApiPrefix + "/auth/user";
    return http.get(url,data);
};
export const getUserPut = (data,id="") => {
    const url = userApiPrefix + "/user/" + id;
    return http.put(url,data);
};
export const getUserLogout = (data) => {
    const url = userApiPrefix + "/auth/logout";
    return http.delete(url,data);
};
export const getUserVerificationCaptcha = (data) => {
    const url = userApiPrefix + "/auth/verificationCaptcha";
    return http.post(url,data);
};
//person
export const getPerson = (data,type='get',id="") => {
    let url = gameApiPrefix + "/person/" + id;
    if(type == 'get'){
        return http.get(url,data);
    }else if(type == 'post'){
        return http.post(url,data);
    }else{
        return http.put(url,data);
    }
};
//family
export const getFamily = (data) => {
    const url = gameApiPrefix + "/family";
    return http.post(url,data);
};
export const familyMember = (data,type='get',id="") => {
    let url = gameApiPrefix + "/family/member/" + id;
    if(type == 'get'){
        return http.get(url,data);
    }else if(type == 'post'){
        return http.post(url,data);
    }else{
        return http.put(url,data);
    }
};
