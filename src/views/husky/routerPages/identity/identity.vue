<template>
    <div class="identity">
        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户姓名："
                    placeholder="请输入用户姓名"

            />
            <van-field
                    v-model="phone"
                    required
                    clearable
                    label="联系电话："
                    placeholder="请输入联系电话"

            />
            <van-field
                    v-model="areaText"
                    required
                    clearable
                    label="所在地区："
                    placeholder="请选择"
                    @focus="showAreaPopup"

            />
            <van-field
                    v-model="address"
                    required
                    clearable
                    label="详细地址："
                    placeholder="请输入详细地址"

            />
        </van-cell-group>


        <van-popup v-model="showArea" position="bottom">
            <van-area
                    :area-list="areaList"
                    @cancel="showArea = false"
                    position="bottom"
                    @confirm="confirm"/>
        </van-popup>

        <div class="save" @click="save">
            <controlBtn btnActive="true" btnText="立即购买"></controlBtn>
        </div>
    </div>
</template>

<script>
    import {Row, Col, Grid, GridItem, Field, Cell, CellGroup, Popup, Area} from 'vant';
    import {getArea} from '../../../../service/husky/api.js';
    import controlBtn from "../../../../components/common/controlBtn";

    export default {
        name: "identity",
        data() {
            return {
                username: '',
                phone: '',
                address: '',
                showArea: false,
                areaList: {
                    city_list: {},
                    province_list: {},
                    county_list: {},
                    codeIds: {}
                }, // 地区数据
                areaId: '',
                areaText: ''
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Popup.name]: Popup,
            [Area.name]: Area,
            controlBtn
        },
        created() {
            this.getProvince()
        },
        methods: {
            //获取所有省市区
            getProvince() {
                var _this = this;
                getArea({}).then(function (res) {

                    // areaList province_list city_list county_list
                    _this.areaList.city_list = res.cityList;
                    _this.areaList.province_list = res.provinceList;
                    _this.areaList.county_list = res.countyList;
                    _this.areaList.codeIds = res.codeId;

                })

            },
            showAreaPopup() {
                this.showArea = true;
            },
            confirm(v) {
                let code = v[v.length - 1].code;
                this.codeId = this.searchCodeId(code, this.areaList.codeIds);
                this.areaText = '';
                for (let i = 0; i < v.length; i++) {
                    this.areaText += v[i].name + '-'
                }
                this.areaText = this.areaText.substring(0, this.areaText.length - 1);
                this.showArea = false;
            },
            // 根据城市编号 搜索城市的 codeId
            searchCodeId(code, codeIds) {
                let codeId = '';
                for (var key in codeIds) {
                    if (code == key) {
                        codeId = codeIds[key];
                        break;
                    }
                }
                return codeId;
            },
            save(){
                alert('保存数据');
                this.$router.push({path:'/confirmOrder'})
            }
        }
    }
</script>

<style lang="less">
    .identity {
        padding: 24px;
        font-size: 28px;

        .save {
            margin-top: 100px;
        }

        .van-cell {
            height: 50px;
            margin-bottom: 10px;
            background-color: transparent;
        }
    }
</style>

