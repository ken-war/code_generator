<template>
    <div class="wrapper">
        <el-container style="height: 100%">
            <el-header height="auto">
                <v-head></v-head>
            </el-header>
            <el-container style="height: 100%">
                <el-aside width="auto" class="aside-wrapper">
                    <div class="aside-content">
                        <v-sidebar></v-sidebar>
                    </div>
                </el-aside>
                <el-container>
                    <el-header height="auto">
                        <v-tags></v-tags>
                    </el-header>
                    <el-main class="content-box">
                        <transition name="move" mode="out-in">
                            <div class="content">
                                <keep-alive :include="tagsSet">
                                    <router-view></router-view>
                                </keep-alive>
                            </div>
                        </transition>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                collapse: false,
                tagsList: [],
            }
        },
        computed: {
            tagsSet() {
                return this.tagsList.filter((element, index, array) => {
                    return array.indexOf(element) === index;
                });
            }
        },
        components: {
            vHead, vSidebar, vTags
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            bus.$on('tags', msg => {
                console.log('bus-tags');
                console.log(msg);
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
                console.log(this.tagsList);
            })
        },
        methods: {}
    }
</script>
<style>
    .el-header {
        padding: 0
    }
</style>
