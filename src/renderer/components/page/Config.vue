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
                    <el-button @click="addType">增加字段类型映射</el-button>
                    <el-form-item :inline = true v-for="(item,index) in mysqlType2JavaType" :key="index"
                                  label="类型映射">
                        <el-col :span="9"><el-input v-model="item.mysqlType"></el-input></el-col>
                        <el-col :span="9"><el-input  v-model="item.javaType"></el-input></el-col>
                        <el-col :span="2"><el-button @click="removeType(index)">删除</el-button></el-col>
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
                dbConfig: {},
                mysqlType2JavaType:[
                    {
                        mysqlType: 'int',
                        javaType: 'Integer'
                    },
                    {
                        mysqlType: 'varchar',
                        javaType: 'String'
                    },
                    {
                        mysqlType: 'datetime',
                        javaType: 'Date'
                    },
                    {
                        mysqlType: 'bigint',
                        javaType: 'Integer'
                    },
                    {
                        mysqlType: 'text',
                        javaType: 'String'
                    },
                    {
                        mysqlType: 'char',
                        javaType: 'String'
                    },
                    {
                        mysqlType: 'decimal',
                        javaType: 'BigDecimal'
                    }
                ]
            }
        },
        created() {

            this.getDbConfig();
        },
        methods: {
            addType(){
                this.mysqlType2JavaType.push({
                    mysqlType: '',
                    javaType: ''
                });
                console.log(this.mysqlType2JavaType.length);
            },
            removeType(index){
                console.log(index);
                this.mysqlType2JavaType.splice(index,1);
            },
            getDbConfig() {
                this.dbConfig = this.$db.read().get('mysqlConfig').value();
                this.mysqlType2JavaType = this.$db.read().get('generateConfig.JavaType').value() || this.mysqlType2JavaType;
            },
            updateDbConfig() {
                this.$db.set('generateConfig.JavaType',this.mysqlType2JavaType).write();
                this.$db.set('mysqlConfig', this.dbConfig).write();
                this.$message({
                    message: "更新成功",
                    type: "success"
                });
                console.log(this.generateConfig = this.$db.read().get('generateConfig').value());
            },
            testConnectDb() {},

        }
    };
</script>

<style lang="stylus">
    .config
        font-size : 16px;
</style>
