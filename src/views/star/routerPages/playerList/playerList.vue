<template>
    <div class="playerList pageContent" v-wechat-title="this.title">
        <div class="containerInner">
            <switch-account :user-info="userInfo"></switch-account>
            <div class="personContent">
                <div class="addPersonBox">
                    <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText"
                                @click.native="goToEditPlayer()"></add-person>
                </div>
                <div class="studentList" v-if="studentList.length>0">
                    <div class="personItem" v-for="(studentItem,index) in studentList" :key="index"
                         @click="goToEditPlayer(index)">
                        <div class="personItemInfo">
                            <p class="pItemInfoTitle">{{studentItem.person.name}}</p>
                            <p class="pItemInfoContent">{{studentItem.grade.name}}</p>
                        </div>
                        <div class="personItemIcon" @click.stop="goToGame(index)">
                            <span>参赛</span>
                        </div>
                    </div>
                </div>
                <div class="studentList" v-else>
                    <no-content :noContentShowText="noContentShowText"></no-content>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchAccount from '../../../../components/common/switchAccount';
    import AddPerson from '../../../../components/common/addPerson';
    import PersonItem from '../../../../components/common/personItem';
    import NoContent from '../../../../components/common/noContent';
    import {getLoginInfo, setStoreStudent, setIndex} from '../../../../js/user.js'
    import {getByUser} from '../../../../service/husky/api.js'
    import {setSession} from "../../../../js/common.js";

    export default {
        name: "playerList",
        data() {
            return {
                title: '选手',
                userInfo: {},
                noContentShowText: "暂无选手", //暂无成员传参
                addPersonText: "添加选手",//新增成员传参
                studentList: [],
            }
        },
        components: {
            [SwitchAccount.name]: SwitchAccount,
            [AddPerson.name]: AddPerson,
            [PersonItem.name]: PersonItem,
            [NoContent.name]: NoContent,
        },
        created() {
            this.getUser();
        },
        methods: {
            async getStudents() {
                let param = {
                    user: this.userInfo.person
                };
                let students = await getByUser(param);

                for (let i = 0; i < students.data.length; i++) {
                    if (students.data[i]) {
                        this.studentList.push(students.data[i])
                    }
                }
            },
            getUser() {
                this.userInfo = getLoginInfo();
                this.getStudents();
            },
            goToEditPlayer(index) {
                setSession('returnPage', '/enrollPage');
                if (index != undefined && index != null) {
                    this.$router.push({
                        path: '/editPlayer',
                        query: {student: this.studentList[index].identifier, type: 'star'}
                    })
                } else {
                    this.$router.push({path: '/editPlayer'})
                }

            },
            goToGame(index) {
                setStoreStudent(this.studentList[index]);
                setIndex(index);
                this.$router.push({path: '/taskInformation'})
            },
            backChange() {
                this.$router.push({
                    path: '/mine'
                })
            }

        },
        mounted() {
            // 如果支持 popstate 一般移动端都支持了
            if (window.history && window.history.pushState) {
                // 往历史记录里面添加一条新的当前页面的url
                history.pushState(null, null, document.URL);
                // 给 popstate 绑定一个方法 监听页面刷新
                window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
            }
        },
        destroyed() {
            window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin";

    .icon {
        font-size: 60px;
    }

    .containerInner {
        .personContent {
            margin-top: 24px;
            overflow: hidden;
            .border-radius(15px);

            .addPersonBox {
                color: @blue;
                background: @defaultBgColor;
            }

            .studentList {
                .personItem {
                    .icon {
                        font-size: 48px;
                    }

                    .fj();
                    align-items: center;
                    text-align: left;
                    padding: 26px 27px 26px 22px;
                    margin-top: 4px;
                    background: @defaultBgColor;

                    .personItemInfo {
                        .pItemInfoTitle {
                            color: @defaultColor;
                            font-size: 34px;
                            font-weight: bold;
                        }

                        .pItemInfoContent {
                            padding-top: 16px;
                        }
                    }

                    .personItemIcon {
                        color: @defaultColor;
                    }
                }
            }

        }

    }
</style>
