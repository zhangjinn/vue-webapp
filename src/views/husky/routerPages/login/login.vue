<template>
    <div>

    </div>
</template>

<script>
    import {setLoginInfo, setUser, getToken, getPhone} from '../../../../js/user.js';
    import {getUserInfo, getUserLogin, getPerson} from '../../../../service/husky/api.js';
    import {getSession, getStringStore, setStore, clearStore, clearSession} from '../../../../js/common.js';
    import {Row, Col, Dialog, RadioGroup, Radio, Popup, Picker} from 'vant';

    export default {
        name: 'login',
        data() {
            return {
                user: {}
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Dialog.Component.name]: Dialog.Component,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Popup.name]: Popup,
            [Picker.name]: Picker
        },
        created() {
            this.getUerInfo();
        },
        methods: {
            async verifyFirst() {
                let _this = this;
                //获取用户信息
                let user_person_id = _this.user.person;
                let res = await getPerson(user_person_id);
                let person = res.data;
                if (person == null || person.location == undefined || person.location == null || person.location == "") {
                    this.$router.push({
                        path: '/completeInformation'
                    })
                } else {
                    this.$router.push({
                        path: '/index'
                    })
                }
            },
            async getUerInfo() {
                this.user = getSession("authUser");
                if (this.user) {
                    this.verifyFirst();
                    setLoginInfo(this.user);
                } else {
                    let corpId = '';
                    let route = this.$route;
                    if (route.query.corpId) {
                        setStore('corpId', route.query.corpId);
                        corpId = route.query.corpId
                    } else {
                        corpId = getStringStore('corpId')
                    }
                    let token = getToken();
                    let phone = getPhone();
                    if (token && token.trim() != "" && phone && phone.trim() != "") {
                        let userJson = {
                            phone: phone,
                            token: token
                        };
                        let data = await getUserInfo(userJson);
                        if (data.data && data.data.user) {
                            this.user = data.data.user;
                            setUser(this.user);
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
                            setUser(result.user);
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
