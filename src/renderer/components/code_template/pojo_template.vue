<template>
    <temolate-content template-name="pojo" :file-name="table.pojoName">
<pre class="code">
package {{generateConfig.javaPackage}}.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class {{table.pojoName}} {
</pre>
            <pre class="code" v-for="(item, index) in table.columns">
    /**{{item.remark}} {{item.length||''}}*/
    private {{item.javaType}} {{item.camel}};
</pre>
<pre class="code" v-for="(item, index) in table.columns">
<pre v-if="item.javaType == 'String'">
    public void set{{item.camel.slice(0, 1).toUpperCase() + item.camel.slice(1) }}({{item.javaType}} {{item.camel}}){
        if(StringUtils.isNotBlank({{item.camel}}) && {{item.camel}}.length()>{{item.length}}){
            this.{{item.camel}} = {{item.camel}}.substring(0, {{item.length}});
            log.error("{{item.camel}}超长截断，长度：{}，内容：{}",{{item.length}},{{item.camel}});
        }else{
            this.{{item.camel}} = {{item.camel}};
        }
    }
</pre>
</pre>

            <pre class="code">
}
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
        created(){
            console.log("this.table",this.table);
        },
        methods: {
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
