<template>
    <temolate-content template-name="pojo" :file-name="table.pojoName">
<pre class="code">
package {{generateConfig.javaPackage}}.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class {{table.pojoName}} {
</pre>
            <pre class="code" v-for="(item, index) in table.columns">
    /**{{item.remark}}*/
    private {{item.javaType}} {{item.camel}};
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
