<template>
    <div>

    </div>
</template>

<script>
    import {
        setLoginInfo,
        getLoginInfo,
        getToken,
        getPhone,
        setStoreStudent,
        setIndex
    } from '../../../../js/user.js';
    import {getUserInfo, getUserLogin, getByUser, listByStudent} from '../../../../service/husky/api.js';
    import {setStore, clearStore, clearSession} from '../../../../js/common.js';
    import {Dialog} from 'vant';

    export default {
        name: 'login',
        data() {
            return {
                user: {},
                card: 'false',
            }
        },
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        created() {
            if (this.$route.query.card) {
                this.card = this.$route.query.card;
            }
            this.getUerInfo();
        },
        methods: {
            async verifyFirst() {
                let _this = this;
                //获取用户信息
                if (_this.card == 'true') {
                    this.$router.push({
                        path: '/curriculumDetail'
                    })
                } else {
                    let user = {
                        user: _this.user.person
                    }
                    let res = await getByUser(user);
                    let students = res.data;
                    if (students.length == 0) {
                        this.$router.push({
                            path: "/editPlayer", query: {type: 'evpi'}
                        })
                    } else {
                        let flag = false;
                        let num = 0;
                        for (let i = 0; i < students.length; i++) {
                            let data = {
                                student: students[i].person.identifier
                            }
                            let subject = await listByStudent(data);
                            let gameSubjectList = subject.data;
                            if (gameSubjectList.length > 0) {
                                num = i;
                                flag = true;
                                break;
                            }
                        }
                        if (flag == true) {
                            let student = students[num];
                            setStoreStudent(student);
                            setIndex(num);
                            this.$router.push({
                                path: '/index'
                            })
                        }
                        if (flag == false) {
                            let student = students[students.length - 1];
                            setStoreStudent(student);
                            setIndex(students.length - 1);
                            this.$router.push({
                                path: '/taskInformation'
                            })
                        }
                    }
                }
            },
            async getUerInfo() {
                this.user = getLoginInfo();
                let token = getToken();
                if (this.user && token) {
                    this.verifyFirst();
                } else {
                    let corpId = '';
                    let route = this.$route;
                    if (route.query.corpId) {
                        corpId = route.query.corpId
                    }
                    let token = getToken("token");
                    let phone = getPhone("phone");
                    if (token && token.trim() != "" && phone && phone.trim() != "") {
                        let userJson = {
                            phone: phone,
                            token: token
                        };
                        let data = await getUserInfo(userJson);
                        if (data.data && data.data.user) {
                            this.user = data.data.user;
                            setLoginInfo(this.user);
                        }
                        if (!this.user || !this.user.person || this.user.person.trim() == "") {
                            clearStore();
                            clearSession();
                            this.dingTalkLogin(corpId);
                        } else {
                            this.verifyFirst();
                        }
                    } else {
                        this.dingTalkLogin(corpId);
                    }
                }
            },
            dingTalkLogin(corpId) {
                let _this = this;
                dd.ready(function () {
                    dd.runtime.permission.requestAuthCode({
                        corpId: corpId, // _config.corpId 企业id
                        onSuccess: async function (info) {
                            let code = info.code; // 通过该免登授权码可以获取用户身份
                            let param = {
                                authCode: code,
                                authType: "dingtalk",
                                corpId: corpId,
                            }
                            let data = await getUserLogin(param);
                            let result = data.data;
                            setStore("phone", result.phone);
                            setStore("token", result.token);
                            setLoginInfo(result.user);
                            _this.user = result.user;
                            _this.verifyFirst();
                        },
                        onFail: function (error) {
                            Dialog.alert({
                                message: JSON.stringify(error)
                            })
                        }

                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
