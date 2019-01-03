<template>
<div>
    <temolate-content template-name="service" :file-name="generateConfig.serviceName">
<pre class="code">
package {{generateConfig.javaPackage}}.service;

import com.ken.base.common.comm.ServerResponse;
import {{generateConfig.javaPackage}}.dto.{{table.addPojoDtoName}};
import {{generateConfig.javaPackage}}.dto.{{table.updatePojoDtoName}};

public interface {{generateConfig.serviceName}} {

    ServerResponse {{generateConfig.addMethod}}(Add{{table.pojoName}}Dto add{{table.pojoName}}Dto);

    ServerResponse {{generateConfig.deleteMethod}}(Integer id, Integer version);

    ServerResponse {{generateConfig.updateMethod}}(Update{{table.pojoName}}Dto update{{table.pojoName}}Dto);

    ServerResponse {{generateConfig.selectMethod}}(Integer id);
}

</pre>
    </temolate-content>
</div>
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
        data(){
            return{
            }
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
