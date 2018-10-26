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
                <div>
                    <p>POJO：</p>
                    <el-button @click="copy('pojoContent')">复制</el-button>
                    <div @click="copy('pojoContent')" id="pojoContent" class="codeContent">
<pre class="code">
package {{generateConfig.pojoPackage}};

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import java.util.Date;

@Data
@Slf4j
public class {{table.pojoName}} {
</pre>
                        <pre class="code" v-for="(item, index) in table.columns">
    private {{item.javaType}} {{item.camel}};
</pre>
                        <pre class="code">
}
</pre>
                    </div>
                </div>
                <div>
                    <p>DAO：</p>
                    <el-button @click="copy('daoContent')">复制</el-button>
                    <el-popover
                            placement="top"
                            width="40"
                            trigger="hover"
                            content="点击复制">
                        <div slot="reference" @click="copy('daoContent')" id="daoContent" class="codeContent">
<pre class="code">package {{generateConfig.daoPackage}};

import {{generateConfig.pojoPackage}}.{{table.pojoName}};
public interface {{table.pojoName}}Mapper {
    int deleteByPrimaryKey(@Param("id") Integer id,@Param("version") Integer version);
    int logicDelete(@Param("id") Integer id,@Param("version") Integer version);
    int insertSelective({{table.pojoName}} {{table.pojoCamelName}});
    {{table.pojoName}} selectByPrimaryKey(Integer id);
    int updateByPrimaryKeySelective({{table.pojoName}} {{table.pojoCamelName}});
}
</pre>
                        </div>
                    </el-popover>

                </div>
                <div>
                    <p>Mapper：</p>
                    <div @click="copy('mapperContent')" id="mapperContent" class="codeContent">
<pre class="code">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot; &gt;
&lt;mapper namespace=&quot;{{generateConfig.daoPackage}}.{{table.pojoName}}Mapper&quot;&gt;
    &lt;sql id=&quot;Base_Column_List&quot;&gt;
</pre>
                        <pre class="code" v-for="(item, index) in table.columns">
<pre v-if="index < table.columns.length-1">
    {{item.name}} {{item.camel}},
</pre>
<pre v-if="index === table.columns.length-1">
    {{item.name}} {{item.camel}}
</pre>
</pre>
                        <pre class="code">
    &lt;/sql&gt;
</pre>
                        <pre class="code">
    &lt;select id=&quot;selectByPrimaryKey&quot; resultType=&quot;{{generateConfig.pojoPackage}}.{{table.pojoName}}&quot; parameterType=&quot;java.lang.Integer&quot;&gt;
        select
        &lt;include refid=&quot;Base_Column_List&quot;/&gt;
        from {{table.tableName}}
        where id = #{id}
    &lt;/select&gt;
</pre>
                        <pre class="code">
    &lt;delete id=&quot;deleteByPrimaryKey&quot; parameterType=&quot;java.lang.Integer&quot;&gt;
        delete from {{table.tableName}}
        where id = #{id}
    &lt;/delete&gt;
</pre>
                        <pre class="code">
    &lt;update id=&quot;logicDelete&quot; parameterType=&quot;java.lang.Integer&quot;&gt;
        update {{table.tableName}}
        set flag = 1
        where id = #{id} and version = #{version}
    &lt;/delete&gt;
</pre>
                        <pre class="code">
    &lt;insert id=&quot;insertSelective&quot; parameterType=&quot;{{generateConfig.pojoPackage}}.{{table.pojoName}}&quot;&gt;
        insert into {{table.tableName}}
        &lt;trim prefix=&quot;(&quot; suffix=&quot;)&quot; suffixOverrides=&quot;,&quot;&gt;
</pre>
                        <pre v-for="(item, index) in table.columns">
<pre class="code" v-if="isTimeColumn(item.name)">
            {{item.name}},
</pre>
<pre class="code" v-else>
             &lt;if test=&quot;{{item.camel}} != null&quot;&gt;
                {{item.name}},
            &lt;/if&gt;
</pre>
</pre>
                        <pre  class="code">
        &lt;/trim&gt;
        &lt;trim prefix=&quot;values (&quot; suffix=&quot;)&quot; suffixOverrides=&quot;,&quot;&gt;
</pre>
                        <pre  v-for="(item, index) in table.columns">
<pre class="code" v-if="isTimeColumn(item.name)">
            now(),
</pre>
<pre class="code" v-else>
            &lt;if test=&quot;{{item.camel}} != null&quot;&gt;
            #{ {{item.camel}} },
            &lt;/if&gt;
</pre>
</pre>
                        <pre  class="code">
        &lt;/trim&gt;
    &lt;/insert&gt;
</pre>
                        <pre class="code">
    &lt;update id=&quot;updateByPrimaryKeySelective&quot; parameterType=&quot;{{generateConfig.pojoPackage}}.{{table.pojoName}}&quot;&gt;
        update {{table.tableName}}
        &lt;set&gt;
</pre>
                        <pre v-for="(item, index) in table.columns">
<pre class="code" v-if="item.name=='create_time'"></pre>
<pre class="code" v-else-if="item.name=='create_by'"></pre>
<pre class="code" v-else-if="item.name == 'update_time'">
            update_time = now(),
</pre>
<pre class="code" v-else-if="item.name == 'version'">
            version = version+1,
</pre>
<pre class="code" v-else>
            &lt;if test=&quot;{{item.camel}} != null&quot;&gt;
                {{item.name}} = #{ {{item.camel}} },
            &lt;/if&gt;
</pre></pre>
                        <pre class="code">
        &lt;/set&gt;
        where id = #{id} and version=#{version}
    &lt;/update&gt;
</pre>
                        <pre class="code">
&lt;/mapper>
</pre>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    const {ipcRenderer} = require('electron')

    export default {
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
            ipcRenderer.on('getTableLists', (event, data) => {
                this.tableList = data
            })
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
            isTimeColumn(name){
              return name == 'create_time' || name == 'update_time';
            },
            copy(id){
                let htmlContent = document.getElementById(id).children;
                let textContent = '';
                textContent = this.getInnerText(document.getElementById(id), 'code');
                console.log(textContent);

                this.$copyText(textContent).then((e) =>{
                    this.$message({
                        message: "已复制到剪切板",
                        type: "success"
                    });
                }, (e)=> {
                    this.$message({
                        message: "Can not copy",
                        type: "error"
                    });
                })
                return;
            },
            getInnerText(dom,className) {
                let text = '';
                if (dom == undefined){
                    return text;
                }
                if (className==undefined || dom.className == className){
                    return dom.innerText;
                }
                let childrens = dom.children;
                if(childrens!=undefined && childrens.length>0){
                    for(let i=0; i<childrens.length; i++){
                        if (childrens[i].className !=className){
                            text += this.getInnerText(childrens[i],className);
                        }else {
                            text += childrens[i].innerText;
                            if (childrens[i].nodeName == 'P'){
                                text += '\n';
                            }
                        }
                    }
                }
                return text;
            },
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
                ipcRenderer.send('getTableLists');
            },
            getColumns(tableName) {
                this.table.tableName = tableName;
                this.calulateJavaName();
                ipcRenderer.send('getTableStructure',tableName);
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
