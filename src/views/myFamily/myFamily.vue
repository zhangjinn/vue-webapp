<template>
    <div class="playerList pageContent" v-title data-title="我的家庭">
        <div class="containerInner">

            <switch-account></switch-account>
            <div class="personContent">
                <div class="addPersonBox">
                    <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText" @click.native="goToNewFamilyMembers"></add-person>
                </div>
                <div class="personList" v-if="personList.length">
                    <person-item v-for="personItem in personList" :personItem="personItem" :key="personItem" @click.native="goToEditFamilyMembers"></person-item>
                </div>
                <div class="personList" v-else>
                    <no-content :noContentShowText="noContentShowText"></no-content>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import switchAccount from '../../components/common/switchAccount';
    import addPerson from '../../components/common/addPerson';
    import personItem from '../../components/common/personItem';
    import noContent from '../../components/common/noContent';

    export default {
        name: "playerList",
        data(){
            return{
                noContentShowText:"暂无家庭成员", //暂无成员传参
                addPersonText:"新增家庭成员",//新增成员传参
                personList:[1,2,3,4]
                // personList:[]

            }
        },
        components:{
            [switchAccount.name]: switchAccount,
            [addPerson.name]: addPerson,
            [personItem.name]: personItem,
            [noContent.name]: noContent,
        },
        methods:{
            goToNewFamilyMembers(){
                this.$router.push({ path:'/newFamilyMembers'})
            },
            goToEditFamilyMembers(){
                this.$router.push({ path:'/editFamilyMembers'})
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
