<template>
    <div class="playerList pageContent" v-wechat-title="this.title">
        <div class="containerInner">
            <switch-account :userInfo="userInfo"></switch-account>
            <div class="personContent">
                <div class="addPersonBox">
                    <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText"
                                @click.native="goToNewFamilyMembers"></add-person>
                </div>
                <div class="personList" v-if="personList.length">
                    <person-item v-for="(personItem,index) in personList" :title="personItem.person.name"
                                 :content="personItem.person.phone" :key="index"
                                 @click.native="goToEditFamilyMembers"></person-item>
                </div>
                <div class="personList" v-else>
                    <no-content :noContentShowText="noContentShowText"></no-content>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import switchAccount from '../../../../components/common/switchAccount';
    import addPerson from '../../../../components/common/addPerson';
    import personItem from '../../../../components/common/personItem';
    import noContent from '../../../../components/common/noContent';
    import {getLoginInfo} from '../../../../js/user.js';
    import {getMembers} from '../../../../service/husky/api.js';

    export default {
        name: "playerList",
        data() {
            return {
                title: '我的家庭',
                userInfo: {},
                noContentShowText: "暂无家庭成员", //暂无成员传参
                addPersonText: "新增家庭成员",//新增成员传参
                personList: []
            }
        },
        components: {
            [switchAccount.name]: switchAccount,
            [addPerson.name]: addPerson,
            [personItem.name]: personItem,
            [noContent.name]: noContent,
        },
        created() {
            this.getUser();
        },
        methods: {
            async getFamily() {
                let param = {
                    person: this.userInfo.person
                };
                let members = await getMembers(param);
                members = members.data;

                let familyParam = {
                    family: members.family.identifier
                };
                let family = await getMembers(familyParam);
                this.personList = family.data;

            },
            getUser() {
                this.userInfo = getLoginInfo();
                this.getFamily();
            },
            goToNewFamilyMembers() {
                this.$router.push({path: '/newFamilyMembers'})
            },
            goToEditFamilyMembers() {
                this.$router.push({path: '/editFamilyMembers'})
            }
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
        }

    }
</style>
