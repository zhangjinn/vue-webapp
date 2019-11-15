<template>
    <div class="identityInfo">
        <div class="infoBox">
            <van-cell-group>
                <van-field
                        v-model="username"
                        required
                        clearable
                        label="用户姓名："
                        placeholder="请输入用户姓名"
                />

                <van-field
                        v-model="username"
                        required
                        clearable
                        label="联系电话："
                        placeholder="请选择"
                />
                <van-field
                        v-model="username"
                        required
                        clearable
                        label="所在地区："
                        placeholder="请选择"
                />
                <van-field
                        v-model="username"
                        required
                        clearable
                        label="详细地址："
                        placeholder="请输入详细地址"
                />
            </van-cell-group>
            <div class="saveBtn">
                <control-Btn btnActive="true" btnText="立即购买"></control-Btn>
            </div>
        </div>
    </div>
</template>

<script>
    import {Dialog, Area, Row, Col, Field, Icon} from 'vant';
    import controlBtn from "../../../../components/common/controlBtn";

    export default {
        name: "identityInfo",
        data() {
            return {
                username: ''
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Area.name]: Area,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            [Field.name]: Field,
            controlBtn: controlBtn
        },
        methods: {
            onSave() {
            },
            onDelete() {
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            }
        }

    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin.less";

    .identityInfo {
        padding: 24px 24px 24px 24px;
        font-size: 28px;

        .van-cell {
            margin-bottom: 20px;
        }

        .infoBox {
            .saveBtn {
                height: 88px;
                line-height: 88px;
                margin-top: 80px;
            }
        }

    }
</style>
