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
export const gameSubject = (id) => { // 获取赛事
    const url = gameApiPrefix + "/game_subject/"+id;
    return http.get(url);
};
// 根据城市获取赛事
export const listByCity = (data) => {
    const url = gameApiPrefix + "/game_subject";
    return http.get(url,data);
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
// export const getArea = (id="") => {
//     const url = orgApiPrefix + "/area/" + id;
//     return http.get(url);
// };
export const getArea = (data) => {
    const url = orgApiPrefix + "/area/list";
    // const url = 'http://192.168.3.139:8080/husky-org-webapp/area/list';
    // const url = '/foo';
    return http.get(url,data);
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
//school
export const getSchool = (data) => {
    const url = gameApiPrefix + "/school";
    return http.get(url,data);
};
//student
export const getStudent = (id) => {
    const url = gameApiPrefix + "/student/"+id;
    return http.get(url);
};
export const getByUser = (data) => {
    const url = gameApiPrefix + "/student";
    return http.get(url,data);
};
export const postStudent = (data) => {
    const url = gameApiPrefix + "/student";
    return http.post(url,data);
};
export const putStudent = (data,id="") => {
    const url = gameApiPrefix + "/student/" + id;
    return http.put(url,data);
};
// school 获取学校
export const getSchools = (data) => {
    const url = gameApiPrefix + "/school" ;
    return http.get(url,data);
}
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
export const getAssociate = (data) => {
    const url = gameApiPrefix + "/associate";
    return http.get(url,data);

};
export const postAssociate = (data) => {
    const url = gameApiPrefix + "/associate";
    return http.post(url,data);
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
export const getMatchTask = (match="",type="",person="") => {
    const url = gameApiPrefix + "/match_task/" + match + "/" + type + "/" + person;
    return http.get(url);
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
export const getExecute = (data) => {
    let url = gameApiPrefix + "/execute/";
    return http.get(url,data);
};

export const postExecute = (data) => {
    let url = gameApiPrefix + "/execute/";
    return http.post(url,data);
};

export const getComment = (data,id="") => {
    const url = gameApiPrefix +"/execute/comment/" +id;
    return http.get(url,data);
};
export const getResult = (id="") => {
    const url = gameApiPrefix+"/execute/result/"+id;
    return http.get(url);
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
export const getPerson = (id="") => {
    let url = gameApiPrefix + "/person/" + id;
    return http.get(url);

};
export const putPerson = (data,id="") => {
    let url = gameApiPrefix + "/person/" + id;
    return http.put(url,data);

};
export const postPerson = (data) => {
    let url = gameApiPrefix + "/person";
    return http.post(url,data);
};
// 获取 Person
export const getPerson2 = (id) =>{
    let url = gameApiPrefix + "/person/" + id;
    return http.get(url);
}


//family
export const getFamily = (data) => {
    const url = gameApiPrefix + "/family";
    return http.post(url,data);
};
export const getMembers = (data) => {
    const url = gameApiPrefix + "/family/member";
    return http.get(url,data);
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
