<template>
  <div class="EvaluationResult">
    <div class="main" v-title data-title="练习结果"></div>
    <div class="mainContainer">
      <van-tabs type="card" v-model="active">
        <van-tab title="成绩">
          <div class="grade">
            <h5>做题数量</h5>
            <div class="TagBox">
              <p class="scop">100</p>
              <p>
                <span class="Tag">1</span>
              </p>
              <div class="line"></div>
            </div>
            <div>
              <van-row>
                <van-col span="12">
                  <div class="correct">
                    <p>59</p>
                    <span>正确</span>
                    <div>
                      <img src="../../assets/images/Correct.png" alt="">
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="error">
                    <p>41</p>
                    <span>错误</span>
                    <div>
                      <img src="../../assets/images/error.png" alt="">
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <!--去查阅解析-->
            <div class="tolook">
              <span>查阅解析</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="排行">
          <div class="seniority">
            <div class="banner">
              <div>
                <img src="../../assets/images/Backgroundpicture.png" alt="">
                <h4>希望之星广州赛区</h4>
                <div class="person">
                  <img src="../../assets/images/2.png" alt="">
                  <span class="name">{{ person.name }}同学</span>
                  <span class="ranking">第 {{ person.ranking }} 名 </span>
                  <span class="num">{{ person.score }} 分</span>
                </div>
              </div>
            </div>

            <!--排行列表-->
            <div class="listBox">
              <div class="list" v-for="(item,index) in lists">
                <span class="num-box">
                  <img v-if="index==0" src="../../assets/images/first.png" class="number" alt="">
                  <img v-else-if="index==1" src="../../assets/images/Second.png" class="number" alt="">
                  <img v-else-if="index==2" src="../../assets/images/Third.png" class="number" alt="">
                  <span v-else class="number">{{ index +1 }}</span>
                </span>

                <img src="../../assets/images/2.png" class="tou" alt="">
                <span class="name">{{ item.name }}同学</span>
                <span class="score">{{ item.score }} &nbsp; 分</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { Row, Col,Tab,Tabs } from 'vant';

  import { getResult } from '../../service/api.js';

  export default {
    name: "EvaluationResult",
    data(){
      return {
        result: { // 练习结果
          finishNum: 0,// 正确的题数
          score: 0, // 分数
          errorNum: 0, // 错误的题数
          num: 0 // 做题数量
        },
        executeId: "",
        match:"",
        active:0,
        lists:[  // 排名列表数据
          {name:'小红邮1',imgSrc:'',score:300},
          {name:'小红邮2',imgSrc:'',score:320},
          {name:'小红邮3',imgSrc:'',score:300},
          {name:'小红邮4',imgSrc:'',score:250},
          {name:'小红邮5',imgSrc:'',score:150},
        ],
        person:{ // 当前选手
          name:'大红柚',
          imgSrc:'',
          score:'260',
          ranking:'四' // 名次
        }
      }
    },
    components:{
      [Row.name]:Row,
      [Col.name]:Col,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs
    },
    created() {
      this.GetResult()
    },
    methods: {
      GetResult() { // 获取练习结果
        // loading();
        let _this = this;
        // api.execute.getResult(this.executeId).then(function (data) {
        //   loading_close();
        //   console.log(data.data.data);
        //   _this.result = data.data.data;
        // })

        // this.executeId = getQueryString("execute");
        // this.match = getQueryString("match");

        getResult(this.executeId).then(function (res) {
          console.log('练习结果数据：',res)
        })

      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/mixin.less";
  
  .EvaluationResult{
    font-size: 32px;
    .van-tabs{
      height: 88px;
      line-height: 88px;
      margin: 0 auto;

      padding-top: 10px;
      .van-tabs__wrap{
        width: 200px;
        margin: 0 auto;
      }
      .van-tabs__nav--card{
        border: 1px solid #FF6600;
        border-radius: 5px;
      }
      .van-tabs__nav--card .van-tab{
        border-right: 1px solid transparent;
        color: #FF6600;
        font-size: 17px;
      }
      .van-tabs__nav--card .van-tab.van-tab--active{
        background-color: #FF6600;
        color: #fff;
      }
    }

    /*zgrade*/
    .grade{
      width: 390px;
      height: 436px;
      margin: 0 auto;
      margin-top: 40px;
      line-height: 34px;
      h5{
        padding-top: 39px;
      }
      .TagBox{
        padding-top: 50px;
        .line{
          margin-top: 12px;
         border: 1px solid #E8E8E8;
          margin-bottom: 12px;
        }
        p.scop{
          padding-bottom: 10px;
          color: #FB494D;
        }
        .Tag{
          display: inline-block;
          width: 40px;
          height: 40px;
          -webkit-border-radius: 40px;
          -moz-border-radius: 40px;
          border-radius: 40px;
          txet-align:center;
          line-height: 40px;
          color: #FFF;
          background: red;
          box-shadow: 2px 2px 2px #ccc;
          background: #FB494D;
        }
      }

     .correct{
       color: #04AEF2 ;
       p{
         height: 40px;
         height:40px;
       }
       span{
         display: block;
         height: 50px;
         line-height: 50px;
       }
       img{
         width: 70px;
         height: 60px;
       }

     }
     .error{
       color: #FB494D;
       p{
         height: 40px;
         height:40px;
       }
       span{
         display: block;
         height: 50px;
         line-height: 50px;
       }
       img{
         width: 70px;
         height: 60px;
       }
     }
    }
    .tolook {
      font-size: 34px;
      color:#fff;
      background-color: @defaultColor;
      width:220px;
      height:72px;
      line-height: 72px;
      margin: 0 auto;
      -webkit-border-radius: 72px;
      -moz-border-radius: 72px;
      border-radius: 72px;
      margin-top: 112px;
    }

    .seniority{
      padding-top: 12px;
      .banner{
        position: relative;
        height: 400px;
        img{
          height: 400px;
          width: 100%;
        }
        h4{
          font-size: 42px;
          color: #fff;
          margin-top: 250px;
        }
        .person{
          position: absolute;
          left: 0;
          right: 0;
          bottom: -24px;
          width: 600px;
          height: 120px;
          line-height: 120px;
          margin: auto;
          padding: 0 24px;
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
          background-color: #FFFFFF;
          font-size: 28px;
          color: #333;
          text-align: left;
          box-shadow: 2px 3px 2px #ccc;
          span,img{
            vertical-align: middle;
            display: inline-block;
          }
          img{
            width: 80px;
            height: 80px;
          }
          .name{
            margin-left: 20px;
          }
          .ranking{
            margin-left: 92px;
            color: #FF6600;
          }
          span.num{
            float: right;
            height: 120px;
            line-height: 125px;
          }

        }

      }

      .listBox{
        margin-top: 60px;
        text-align: left;
        font-size: 28px;
        padding: 10px 24px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        color: #333333;
        img,span{
          vertical-align: middle;
          display:inline-block;
        }
        .list{
          height: 120px;
          line-height: 120px;
          img.number{
            width: 43px;
            height: 43px;
          }
          .num-box{
            width: 70px;
            text-align: center;
          }
          img.tou{
            width: 80px;
            height: 80px;
            margin: 0 19px 0 0;
          }
          span.number{
            min-width: 33px;
          }
          span.name{

          }
          span.score{
            float: right;
          }
        }
      }
    }

  }

</style>