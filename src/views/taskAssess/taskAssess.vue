<template>
    <div>
        <div class="main" v-title data-title="测评"></div>
        <template v-if="isTask">
            <task-describe :task-data="task" v-if="taskFlag" v-on:begin="toPart()"></task-describe>
        </template>
        <template v-if="isPart">
            <part-page v-if="partFlag" :part-data="partData"></part-page>
        </template>
        <template v-if="isTopic">
            <topic v-if="topicFlag"></topic>
        </template>
    </div>
</template>
<script>
    import TaskDescribe from "@/views/TaskDescribe/TaskDescribe.vue";
    import PartPage from "@/views/PartPage/PartPage.vue";
    import Topic from "@/views/topic/topic.vue";
    import { getMatchTask, getMatchTaskPart } from "../../service/api.js";
    export default {
        data() {
            return {
                isTask: true,
                taskFlag: false,
                isPart: false,
                partFlag: false,
                isTopic: false,
                topicFlag: false,
                taskId: '',
                matchId: "",
                person: '',
                task: {},
                match: {},
                partIndex:0,
                answerIndex:0,
            }
        },
        components: {
            TaskDescribe,
            PartPage,
            Topic
        },
        created() {
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.getTask();
            this.getMatch();
        },
        methods: {
            async getTask() {
                let res = await getMatchTask({}, this.taskId);
                this.task = res.data;
                this.taskFlag = true;
            },
            async getMatch() {
                let data = {
                    matchTask: this.taskId,
                    person: this.person
                }
                let matchData = await getMatchTaskPart(data);
                this.matchData = matchData.data;
                this.setPart()
            },
            setPart(){
                this.partFlag = true;
            },
            setItem(){
                this.topicFlag = true;
            },
            toPart(){
                this.isTask = false;
                this.isPart = true;
            }
        }
    }
</script>
<style lang="less" scoped>

</style>