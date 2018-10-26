<template>
    <div class="config">
        <el-row type="flex">
            <el-col :span="12">
                <el-form>
                    <el-form-item
                        label="数据库域名">
                        <el-input v-model="dbConfig.host"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库端口">
                        <el-input v-model="dbConfig.port"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库用户名">
                        <el-input v-model="dbConfig.user"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库密码">
                        <el-input v-model="dbConfig.password"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库名">
                        <el-input v-model="dbConfig.database"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="updateDbConfig">更新数据库配置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                dbConfig: {}
            }
        },
        created() {

            this.getDbConfig();
        },
        methods: {
            getDbConfig() {
                this.dbConfig = this.$db.read().get('mysqlConfig').value();
            },
            updateDbConfig() {
                this.$db.set('mysqlConfig', this.dbConfig).write();
                this.$message({
                    message: "更新成功",
                    type: "success"
                });
            },
            testConnectDb() {},

        }
    };
</script>

<style lang="stylus">
    .config
        font-size : 16px;
</style>
