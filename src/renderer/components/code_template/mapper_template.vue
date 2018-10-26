<template>
    <temolate-content template-name="mapper">
<pre class="code">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot; &gt;
&lt;mapper namespace=&quot;{{generateConfig.daoPackage}}.{{table.daoName}}&quot;&gt;
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
    </temolate-content>
</template>

<script type="text/ecmascript-6">
    import temolateContent from "./template_content"

    export default {
        components: {
            temolateContent: temolateContent
        },
        props: {
            generateConfig: Object,
            table: Object
        },
        methods: {
            isTimeColumn(name){
                return name == 'create_time' || name == 'update_time';
            },
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    .codeContent
        background-color: #fff;
        padding: 20px;
        .code
            font-size: 18px;

    #daoContent, #pojoContent, #mapperContent
        &:hover
            background: #3390ff;
            color: #fff;
</style>
