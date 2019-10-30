<template>
    <div class="playerList pageContent" v-title data-title="选手列表">
        <div class="containerInner">

            <switch-account :userInfo="userInfo"></switch-account>
            <div class="personContent">
                <div class="addPersonBox">
                    <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText" @click.native="goToEditPlayer()"></add-person>
                </div>
                <div class="studentList" v-if="studentList.length>0">
                    <person-item v-for="(studentItem,index) in studentList"  :title="studentItem.person.name" :content="studentItem.grade.name" :key="index" @click.native="goToEditPlayer(index)"></person-item>

                </div>
                <div class="studentList" v-else>
                    <no-content :noContentShowText="noContentShowText"></no-content>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SwitchAccount from '../../components/common/switchAccount';
    import AddPerson from '../../components/common/addPerson';
    import PersonItem from '../../components/common/personItem';
    import NoContent from '../../components/common/noContent';
    import { getLoginInfo } from '../../js/user.js'
    import { getByUser } from '../../service/api.js'
    export default {
        name: "playerList",
        data(){
            return{
                userInfo:{},
                noContentShowText:"暂无选手", //暂无成员传参
                addPersonText:"新增选手",//新增成员传参
                studentList:[],
            }
        },
        components:{
            [SwitchAccount.name]: SwitchAccount,
            [AddPerson.name]: AddPerson,
            [PersonItem.name]: PersonItem,
            [NoContent.name]: NoContent,
        },
        created(){
            this.getUser();
        },
        methods:{
            async getStudents(){
                let param={
                    user:this.userInfo.person
                };
                let students=await getByUser(param);
                for(let i=0;i<students.data.length;i++){
                    if(students.data[i]){
                        this.studentList.push(students.data[i])
                    }
                }

            },
            getUser(){
                this.userInfo= getLoginInfo();
                this.getStudents();
            },
            goToEditPlayer(index){
                if(index != undefined && index != null){
                    this.$router.push({ path:'/editPlayer',query:{student:this.studentList[index].identifier}})
                }else{
                    this.$router.push({ path:'/editPlayer'})
                }

            },

        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .icon{
        font-size: 60px;
    }

    .containerInner{
        .personContent{
            margin-top: 24px;
            overflow: hidden;
            .border-radius(15px);
            .addPersonBox{
                color: @blue;
                background: @defaultBgColor;
            }
        }

    }
</style>
