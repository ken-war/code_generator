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
                        label="数据库字符编码">
                        <el-input v-model="dbConfig.encoding"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库用户名">
                        <el-input v-model="dbConfig.userName"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库密码">
                        <el-input v-model="dbConfig.password"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数据库名">
                        <el-input v-model="dbConfig.databaseName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="testConnectDb">测试连接</el-button>
                        <el-button @click="updateDbConfig">更新配置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    const {ipcRenderer} = require('electron')

    export default {
        data() {
            return {
                dbConfig: {
                    host: '118.25.40.157',
                    port: '3306',
                    encoding: 'utf-8',
                    userName: 'ceshi',
                    password: 'ken@ceshimysql',
                    databaseName: 'roomservice',

                },
                apiUrl: {
                    getDbConfigUrl: process.env.API_HOST + 'generator/read_db_config',
                    updateDbConfigUrl: process.env.API_HOST + 'generator/save_db_config',
                    testConnectDbUrl: process.env.API_HOST + 'generator/test_connect_db',
                }
            }
        },
        created() {
            // this.getDbConfig();
            console.log(process.env);
            ipcRenderer.send('getTableLists', {
                mysql: {
                    host: '118.25.40.157',
                    port: '3306',
                    user: 'ceshi',
                    password: 'ken@ceshimysql',
                    // 数据库名字
                    database: 'roomservice',
                }
            })
            ipcRenderer.on('getTableLists', (event, arg) => {
                console.log(arg) // prints "pong"
            })
        },
        methods: {
            getDbConfig() {
                this.$axios.get(this.apiUrl.getDbConfigUrl, {
                    params: {}
                })
                    .then((response) => {
                        let res = response.data;
                        let status = res.status;
                        if (status === 0) {
                            this.dbConfig = res.data || {};
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$message({
                            message: "系统错误，请联系管理员",
                            type: "error"
                        });
                    });
            },
            updateDbConfig() {
                let params = new URLSearchParams();
                for (let key in this.dbConfig) {
                    params.append(key, this.dbConfig[key]);
                }
                this.$axios.post(this.apiUrl.updateDbConfigUrl, params).then((response) => {
                    console.log(response);
                    let res = response.data;
                    let status = res.status;
                    if (status === 0) {
                        this.$message({
                            message: "更新成功",
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$message({
                        message: "系统错误，请联系管理员",
                        type: "error"
                    });
                })
            },
            testConnectDb() {
                let params = new URLSearchParams();
                for (let key in this.dbConfig) {
                    params.append(key, this.dbConfig[key]);
                }
                let rows = [];
                let result={
                    "name": "张三",
                    "tel": "110",
                }
                rows = Object.keys(result).map((key)=>{
                    return {
                        "name": key,
                        "value": result[key]
                    }
                })
                console.log(rows);
                this.$axios.post(this.apiUrl.testConnectDbUrl, params).then((response) => {
                    console.log(response);
                    let res = response.data;
                    let status = res.status;
                    if (status === 0) {
                        this.$message({
                            message: "test ok",
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$message({
                        message: "系统错误，请联系管理员",
                        type: "error"
                    });
                })
            },

        }
    };
</script>

<style lang="stylus">
    .config
        font-size : 16px;
</style>
