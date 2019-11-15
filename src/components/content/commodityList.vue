<template>
    <div class="commodityList">
        <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
            <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    loading-text="拼命加载中~"
                    finished-text="没有更多了内容了~"
                    :immediate-check="immediateCheck"
                    :offset="offset"
                    @load="onLoadList"
            >
                <van-row v-if="shopLists.length > 0" type="flex" justify="space-between" gutter="20"
                         style="margin-left: 0;margin-right: 0">
                    <van-col span="12" v-for="(list,index) in shopLists" :key="index" @click="goToOrder(index)">
                        <div class="list">
                            <div class="imgBox">
                                <img v-if="list.pictureUrl" :src="list.pictureUrl" alt="">
                                <img v-else src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
                            </div>
                            <p class="title">{{list.name}}</p>
                            <div class="price">
                                <span>￥</span>
                                <span>{{list.price}}</span>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>

    import {getShopList} from '../../service/husky/api.js';
    import {Dialog, Tabs, Tab, Area, Row, Col, Icon, Image, List, PullRefresh} from 'vant';

    export default {
        name: "commodityList",
        data() {
            return {
                flag_scroll: false,
                isDownLoading: false, // 是否处于下拉刷新
                isUpLoading: false, // 是否处于上拉加载状态
                upFinished: false, // 上拉加载完毕
                pageSize: 6, // 每页条数
                pageIndex: 1, // 页码
                shopLists: [], // 请求数据
                offset: 10, // 滚动条与底部距离小于 offset 时触发load事件
                immediateCheck: false,
            }
        },
        components: {
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Area.name]: Area,
            [Dialog.name]: Dialog,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [Image.name]: Image,
        },
        created() {
            this.getShopLists();
        },
        methods: {
            // 获取资源列表
            getShopLists() {
                const _self = this;
                let shopListParam = {
                    page: this.pageIndex,
                    limit: this.pageSize
                };
                getShopList(shopListParam).then(response => {
                    const listItem = response.data.page.list;
                    if (listItem == null || listItem.length == 0) {
                        // 加载结束
                        _self.upFinished = true;
                        return
                    }
                    if (listItem.length < this.pageSize) {
                        // 最后一页不足10条的情况
                        _self.upFinished = true;
                    }
                    // 处理数据
                    if (_self.pageIndex == 1) {
                        _self.shopLists = listItem;
                    } else {
                        _self.shopLists = [..._self.shopLists, ...listItem]
                    }

                }).catch(error => {
                    Dialog.alert({
                        message: '获取资源列表异常{' + error + '}',
                    });

                }).finally(() => {
                    _self.isDownLoading = false;
                    _self.isUpLoading = false;

                });
            },
            // 上拉加载请求方法
            onLoadList() {
                this.pageIndex++;
                this.getShopLists();
            },
            // 下拉刷新请求方法
            onDownRefresh() {
                this.pageIndex = 1;
                this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
                this.getShopLists() // 加载数据
            },
            goToOrder(index) {
                let orderCard = this.shopLists[index];
                let cardType = orderCard.materialType;
                let cardId = orderCard.id;
                if (cardType == 1) {
                    this.$router.push({
                        path: '/curriculumDetail',
                        query: {
                            'type': 'card',
                            'order': cardId,
                        }
                    })

                } else {
                    this.$router.push({
                        path: '/curriculumDetail',
                        query: {
                            'type': 'course',
                            'order': cardId,
                        }
                    })

                }
            },
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin.less";

    html, body {
        height: 100%;
    }

    .commodityList {
        .wh(100%, 100%);
        padding: 24px;
        font-size: 28px;
        color: @333;

        .van-pull-refresh {
            .wh(100%, 100%);
        }

        .van-row--flex {
            flex-wrap: wrap;
        }

        .van-col--12 {
            margin-bottom: 20px;
        }

        .list {
            background-color: @white;
            border-radius: 15px;
            box-shadow: 2px 2px 15px @ccc;

            .imgBox {
                width: 100%;
                height: 339px;
                border-radius: 15px 15px 0px 0px;
                overflow: hidden;
            }

            .price,
            .title {
                text-align: left;
                padding-left: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 43px;
            }

            .price {
                color: @red;
                padding-bottom: 19px;
            }

            .title {
                margin-top: 20px;
            }
        }

        .van-pull-refresh {
            overflow: auto;

            .van-row {
                margin-left: 0;
                margin-right: 0;
            }
        }
    }
</style>
