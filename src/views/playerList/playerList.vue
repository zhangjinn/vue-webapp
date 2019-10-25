<template>
    <div class="playerList pageContent" v-title data-title="预备室">
        <div class="containerInner">

            <switch-account></switch-account>
            <div class="personContent">
                <div class="addPersonBox">
                    <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText" @click.native="goToNewPlayer"></add-person>
                </div>
                <div class="personList" v-if="personList.length">
                    <person-item v-for="personItem in personList" :personItem="personItem" :key="personItem" @click.native="goToEditPlayer"></person-item>

                </div>
                <div class="personList" v-else>
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

    export default {
        name: "playerList",
        data(){
            return{
                noContentShowText:"暂无选手", //暂无成员传参
                addPersonText:"新增选手",//新增成员传参
                personList:[1,2,3,4]
                // personList:[]

            }
        },
        components:{
            [SwitchAccount.name]: SwitchAccount,
            [AddPerson.name]: AddPerson,
            [PersonItem.name]: PersonItem,
            [NoContent.name]: NoContent,
        },
        methods:{
            goToEditPlayer(){
                this.$router.push({ path:'/editPlayer'})
            },
            goToNewPlayer(){
                this.$router.push({ path:'/newPlayer'})
            }
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
