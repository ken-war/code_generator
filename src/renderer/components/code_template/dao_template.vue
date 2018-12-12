<template>
    <temolate-content template-name="dao">
<pre class="code">package {{generateConfig.daoPackage}};

import {{generateConfig.pojoPackage}}.{{table.pojoName}};
import org.apache.ibatis.annotations.Param;

public interface {{table.daoName}} {
    int deleteByPrimaryKey(@Param("id") Integer id,@Param("version") Integer version);

    int logicDelete(@Param("id") Integer id,@Param("version") Integer version);

    int insertSelective({{table.pojoName}} {{table.pojoCamelName}});

    {{table.pojoName}} selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective({{table.pojoName}} {{table.pojoCamelName}});
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
