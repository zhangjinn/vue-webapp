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
                    <person-item v-for="(studentItem,index) in studentList" :title="studentItem.person.name"
                                 :content="studentItem.grade.name" :key="index"
                                 @click.native="goToEditPlayer(index)"></person-item>
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
    import {getLoginInfo} from '../../../../js/user.js'
    import {getByUser} from '../../../../service/husky/api.js'

    export default {
        name: "playerList",
        data() {
            return {
                title: '选手',
                userInfo: {},
                noContentShowText: "暂无选手", //暂无成员传参
                addPersonText: "新增选手",//新增成员传参
                studentList: [],
                // pageType:'',
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
                if (index != undefined && index != null) {
                    this.$router.push({path: '/editPlayer', query: {student: this.studentList[index].identifier}})
                } else {
                    this.$router.push({path: '/editPlayer'})
                }
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
