<template>
    <div>
        <div class="main" v-title data-title="预备室"></div>
        <div class="mainContainer">
            <div class="readyRoom">
                <div class="top">
                    <van-row>
                        <van-col span="4" class="userIcon"><img src="./../../assets/images/boy.png" alt=""></van-col>
                        <van-col span="16">
                            <div>
                                <p v-if="student.person" class="playerMsg">
                                    {{student.person.name}}
                                    <a @click.prevent=" alertMsg()" v-if="student.person">({{student.grade.name}})</a>
                                </p>
                                <!-- 无报名信息  -->
                                <p v-else @click.prevent.stop="toPlayer()" class="nonePlayer">未添加参赛选手</p>
                            </div>
                        </van-col>
                        <van-col span="4" class="changeIcon"><span class="icon iconfont iconqiehuan"></span></van-col>
                    </van-row>
                </div>
                <div class="banner"><img  src="./../../assets/images/bn.png" alt=""></div>
                <div class="gameTitle">
                    <div class="before"></div>
                    赛事管理
                    <div class="after"></div>
                </div>
                <div class="emptyBox" v-if="gameSubjectList.length == 0">
                    <div class="empty">
                        <div class="emptyImg">
                            <img src="./../../assets/images/game_empty.png"/>
                        </div>
                        <h5>你好，你还未帮选手报名任何比赛</h5>
                        <p class="textNine">请前往发现页面，为选手选择一个比赛吧!</p>
                        <p class="textBlue">点击按钮，可直接到达...</p>
                        <button @click.prevent.stop="toFind()">前往发现</button>
                    </div>
                </div>
                <div class="readyTabs">
                    <div class="cover">
                        <div class="coverUrl">
                            <img src="./../../assets/images/noneFontCover.png"/>
                        </div>
                        <h5>希望之星英语口语风采大赛</h5>
                        <div class="coverBottom">
                            <p>参赛人数：20</p>
                            <p>当前环节：
                                <a>赛事结束</a>
                            </p>
                            <button class="enterBtn" @click.prevent="enterGame($event)">进入</button>
                        </div>
                    </div>
                    <div class="mainMsg" style="display: none">
                        <h5>希望之星英语口语风采大赛</h5>
                        <div class="returnBack" @click.prevent="backToCover($event)">
                            <span></span>
                            <img src="./../../assets/images/turnBackIcon.png">
                        </div>
                        <div class="progress">
                            <a class="active" @click.prevent="switchMatch(key,index,$event)"><span>海选</span></a>
                            <a @click.prevent="switchMatch(key,index,$event)"><span>海选海选海选</span></a>
                            <a @click.prevent="switchMatch(key,index,$event)"><span>海选</span></a>
                            <a @click.prevent="switchMatch(key,index,$event)"><span>海选</span></a>
                            <a @click.prevent="switchMatch(key,index,$event)"><span>海选</span></a>
                        </div>
                        <section>
                            <van-row gutter="4">
                                <van-col span="8">
                                    <a>
                                        <img src="./../../assets/images/xuzhi.png" @click.prevent.stop="toInstructions(key)">
                                        <p>测评须知</p>
                                        <span>比赛环节讲解</span>
                                    </a>
                                </van-col>
                                <van-col span="8">
                                    <a @click.prevent="toExerciseTaskList(match.identifier)">
                                        <img src="./../../assets/images/lianxi.png">
                                        <p>练习入口</p>
                                        <span>提前练习考试内容</span>
                                    </a>
                                </van-col>
                                <van-col span="8">
                                    <a @click.prevent="toMatchTaskList(match.identifier)">
                                        <img src="./../../assets/images/bisai.png">
                                        <p>测评入口</p>
                                        <span>测评入口</span>
                                    </a>
                                </van-col>
                            </van-row>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getUser, getPhone, getToken, setUser} from '../../js/user.js'
    // import { getQueryString } from '../../js/common.js'
    import { getUserInfo, getUserLogin} from '../../service/api.js'

    import { Row, Col } from 'vant';
    export default {
        name: "index",
        data(){
            return {
                gameSubjectList: ["1"],
                user: {},
                student: {},
                student_index: 0,
                students: [],
                isApplicant: false,
                showModal: false,
                isstudents:true // 控制比赛选手为多个时 显示选择选手图标
            }
        },
        components:{
            [Row.name]: Row,
            [Col.name]: Col
        },
        created(){
            // let corpId = getQueryString("corpId");
            //判断是否登录
            // this.verify(corpId);

            this.getUerInfo();
            let aa=getPhone();
            console.log(aa)
        },
        methods:{
            async getUerInfo(){
                let loginJson={
                    authType: "password",
                    phone: "15001396176",
                    password: "666666"
                };
                let data1=await getUserLogin(loginJson);
                this.student = data1;
                let phone=data1.data.phone
                let token=data1.data.token
                let userJson={
                    phone : phone,
                    token : token
                };
                let data=await getUserInfo(userJson);

            },
            verify(corpId) {
                loading();
                let _this = this;
                _this.user = getUser();
                if (_this.user) {
                    _this.verifyFirst();
                } else {
                    let token = getToken();
                    let phone = getPhone();
                    if (token && token.trim() != "" && phone && phone.trim() != "") {
                        api.user.get("phone=" + phone, "token=" + token).then(function (data) {
                            _this.user = data.data.data.user;
                            setUser(token, phone, _this.user);
                            if (!_this.user || !_this.user.person || _this.user.person.trim() == "") {
                                localStorage.clear();
                                sessionStorage.clear();
                                _this.dingTalkLogin(corpId);
                            } else {
                                _this.verifyFirst();
                            }
                        })
                    } else {
                        _this.dingTalkLogin(corpId);
                    }
                }
            },
            enterGame(event){
                let btn = event.currentTarget;
                let el = btn.parentNode.parentNode;
                el.style.opacity = 0;
                setTimeout(function () {
                    el.style.display = "none";
                    el.style.opacity = 1;
                    el.nextElementSibling.style.display = "block";
                }, 200)
            },
            backToCover(event){
                let btn = event.currentTarget;
                let el = btn.parentNode;
                el.style.opacity = 0;
                setTimeout(function () {
                    el.style.display = "none";
                    el.style.opacity = 1;
                    el.previousElementSibling.style.display = "block";
                }, 200)
            }
        }
    }
</script>

<style lang="less" scoped>
    .readyRoom{
        margin: 40px 24px;
    }
    .top{
        height: 100px;
        font-size: 30px;
        .userIcon img{
            float: left;
            width:100px;
            height:100px;
        }
        .playerMsg{
            padding-top: 10px;
            text-align: left;
        }
        .nonePlayer{
            padding-top: 30px;
            text-align: left;
        }
        .changeIcon{
            padding-top: 20px;
            text-align: right;
            .icon{
                font-size: 56px;
                color: #04AEF2;
            }
        }
    }
    .banner{
        margin-top: 65px;
        img{
            width:100%;
            border-radius:10px;
        }
    }
    .gameTitle{
        position: relative;
        padding-top: 20px;
        height:100px;
        text-align: center;
        font-size: 32px;
        color: #ff6600;
        .before{
            position: absolute;
            top: 42px;
            left: 200px;
            width: 70px;
            height: 2px;
            background: #ff6600;
            &:after{
                position: absolute;
                right: 0;
                top: -3px;
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #ff6600;
                border-radius: 50%;
            }
        }
        .after{
            position: absolute;
            top: 42px;
            right: 200px;
            width: 70px;
            height: 2px;
            background: #ff6600;
            &:before{
                position: absolute;
                left: 0;
                top: -3px;
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #ff6600;
                border-radius: 50%;
            }
        }
    }
    .emptyBox{
        padding-bottom: 36px;
        box-shadow: 0 12px 20px 0px #ddd;
        .empty{
            text-align: center;
            padding: 20px;
            .emptyImg{
                width: 60%;
                margin: 0 auto;
                img{
                    margin-right: 0;
                    width: 100%;
                }
            }
            h5{
                margin-top: 30px;
                font-size: 30px;
                color: #666;
            }
            p{
                margin-top: 20px;
                font-size: 24px;
            }
            .textNine{
                color: #999;
            }
            .textBlue{
                color: #04AEF2;
            }
            button{
                margin-top: 30px;
                width: 180px;
                height: 48px;
                font-size: 28px;
                color: #fff;
                background: #ff6600;
                border-radius: 24px;
            }
        }
    }
    .readyTabs{
        width: 100%;
        box-sizing: border-box;
        margin: auto 0;
        padding-bottom: 24px;
        position: relative;
        .cover{
            padding: 20px;
            opacity: 1;
            transition: opacity 0.2s linear;
            box-shadow: 0 12px 20px 0px #ddd;
            border-radius: 15px;
            .coverUrl{
                height: 320px;
                margin-bottom: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            h5{
                color: #333;
                font-size: 34px;
                text-align: left;
                font-weight: 700;
            }
            .coverBottom{
                position: relative;
                p{
                    color: #999;
                    font-size: 24px;
                    text-align: left;
                    &:first-child{
                        line-height: 52px;
                    }
                    a {
                        font-size: 24px;
                        color: #999;
                    }
                }
                .enterBtn{
                    position: absolute;
                    right: 0;
                    top: 30px;
                    width: 160px;
                    height: 48px;
                    background: #ff6600;
                    color: #fff;
                    font-size: 28px;
                    border-radius: 24px;
                }
            }

        }
        .mainMsg{
            padding: 20px;
            opacity: 1;
            transition: opacity 0.2s linear;
            box-shadow: 0 12px 20px 0px #ddd;
            border-radius: 15px;
            h5{
                font-size: 34px;
                color: #333;
                font-weight: 700;
                text-align: left;
            }
            .returnBack{
                position: absolute;
                top: 20px;
                right: 20px;
                width: 44px;
                height: 40px;
                font-size: 32px;
                color: #ff6600;
            }
            .progress {
                height: 50px;
                overflow-x: auto;
                white-space: nowrap;
                margin-top:20px;
                text-align: left;
                a {
                    padding: 0 33px;
                    box-sizing: border-box;
                    text-align: center;
                    height: 48px;
                    display: inline-block;
                    text-decoration: none;
                    font-size: 28px;
                    border-radius: 24px;
                    background: #f4e7de;
                    line-height: 48px;
                    color: #999;
                    margin: auto 24px 0 0;
                    &.active {
                        background: #ff6600;
                        color: #fff;
                        transition: 1s all;
                    }
                }
            }
            section{
                padding-top: 20px;
                .van-col{
                    height: 167px;
                }
                a{
                    display: inline-block;
                    overflow: hidden;
                    position: relative;
                    img{
                        width: 215px;
                        height: 333px;
                    }
                    p{
                        line-height: 1.8;
                        position: absolute;
                        bottom: 50px;
                        left: 0;
                        font-size: 34px;
                        color: #fff;
                        text-indent: 16px;
                        text-align: left;
                    }
                    span{
                        line-height: 2;
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        font-size: 22px;
                        color: #fff;
                        text-indent: 16px;
                        width: 100%;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
