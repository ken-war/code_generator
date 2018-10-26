<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>数据库表</span>
                    </div>
                    <div v-for="(item, index) in tableList" class="text item">
                        <el-button style="width: 100%;" @click="getColumns(item)">{{item}}</el-button>
                    </div>
                </el-card>
            </el-aside>
            <el-main>
                <el-form :inline="true">
                    <el-form-item
                            label="字段前缀">
                        <el-input v-model="generateConfig.columnPrefix"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="表前缀">
                        <el-input v-model="generateConfig.tablePrefix"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="pojo包">
                        <el-input v-model="generateConfig.pojoPackage"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="dao包">
                        <el-input v-model="generateConfig.daoPackage"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="updateGenerateConfig">更改</el-button>
                    </el-form-item>
                </el-form>
                <el-row type="flex">
                    <el-col>表名:{{table.tableName}}</el-col>
                    <el-col>pojo名:{{table.pojoName}}</el-col>
                    <el-col>dao名:{{table.daoName}}</el-col>
                    <el-col>mapper名:{{table.mapperName}}</el-col>
                </el-row>
                <el-table
                        :data="table.columns">
                    <el-table-column
                            label="字段名"
                            prop="name">
                    </el-table-column>

                    <el-table-column
                            label="字段类型"
                            prop="typeName">
                    </el-table-column>

                    <el-table-column
                            label="备注"
                            prop="remark">
                    </el-table-column>

                    <el-table-column
                            label="字段驼峰">
                        <template slot-scope="scope">
                            <span>{{ scope.row.camel }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="JAVA类型">
                        <template slot-scope="scope">
                            <span>{{ scope.row.javaType }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <pojo-template :generate-config="generateConfig" :table="table"></pojo-template>
                <dao-template :generate-config="generateConfig" :table="table"></dao-template>
                <mapper-template :generate-config="generateConfig" :table="table"></mapper-template>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    import  pojoTemplate from  "../code_template/pojo_template"
    import  daoTemplate from  "../code_template/dao_template"
    import  mapperTemplate from  "../code_template/mapper_template"



    const {ipcRenderer} = require('electron')

    export default {
        components:{
            pojoTemplate,
            daoTemplate,
            mapperTemplate
        },
        data() {
            return {
                generateConfig: {},
                tableList: [],
                table: {
                    columns: [],
                    tableName: '',
                    pojoName: '',
                    pojoCamelName:'',
                    daoName: '',
                    mapperName: '',
                },
                apiUrl: {
                    getAllTablesUrl: process.env.API_HOST + 'generator/get_all_tables',
                    getAllColumnsUrl: process.env.API_HOST + 'generator/get_all_columns',
                }
            }
        },
        created() {
            this.getGenerateConfig();
            ipcRenderer.on('getTableStructure', (event, data) => {
                let result = data;
                result.forEach(bean => {
                    bean.javaType = this.sqlType2javaType(bean.typeName);
                    bean.camel = this.columnName2camel(bean.name, this.generateConfig.columnPrefix);
                })
                this.table.columns = result;
            })
            this.getAllTables();
        },
        methods: {
            calulateJavaName() {
                let name = this.columnName2camel(this.table.tableName, this.generateConfig.tablePrefix);
                this.table.pojoCamelName = this.columnName2camel(this.table.tableName, this.generateConfig.tablePrefix);
                name = name.substring(0, 1).toUpperCase() + name.substr(1);
                this.table.pojoName = name;
                this.table.daoName = name + 'Mapper';
                this.table.mapperName = name + 'Mapper';
            },
            sqlType2javaType(sqlType) {
                return this.generateConfig.JavaType[sqlType];
            },
            columnName2camel(name, prefix) {
                if (prefix != undefined) {
                    if (name.indexOf(prefix) == 0) {
                        name = name.substr(prefix.length);
                    }
                }
                let camel = name.replace(/\_(\w)/g, (all, letter) => {
                    return letter.toUpperCase();
                });
                return camel;
            },
            getAllTables() {
                this.tableList = ipcRenderer.sendSync('getTableLists');
            },
            getColumns(tableName) {
                this.table.tableName = tableName;
                this.calulateJavaName();
                let result = ipcRenderer.sendSync('getTableStructure',tableName);
                result.forEach(bean => {
                    bean.javaType = this.sqlType2javaType(bean.typeName);
                    bean.camel = this.columnName2camel(bean.name, this.generateConfig.columnPrefix);
                })
                this.table.columns = result;
            },
            getGenerateConfig(){
                this.generateConfig = this.$db.read().get('generateConfig').value();
            },
            updateGenerateConfig(){
                this.$db.set('generateConfig', this.generateConfig).write();
                this.$message({
                    message: "更新成功",
                    type: "success"
                });
                this.calulateJavaName();
            },
        }
    }
    ;
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    .codeContent
        background-color : #fff;
        padding : 20px;
        .code
            font-size : 18px;
    #daoContent,#pojoContent,#mapperContent
        &:hover
            background:#3390ff;
            color:#fff;
</style>
