<template>
    <temolate-content template-name="serviceImpl" :file-name="serviceNameToImp">
<pre class="code">
package {{generateConfig.javaPackage}}.service.impl;

import {{generateConfig.javaPackage}}.comm.RequestHolder;
import {{generateConfig.javaPackage}}.dto.{{table.addPojoDtoName}};
import {{generateConfig.javaPackage}}.dto.{{table.updatePojoDtoName}};
import {{generateConfig.javaPackage}}.dao.{{table.daoName}};
import {{generateConfig.javaPackage}}.pojo.{{table.pojoName}};
import com.ken.base.common.comm.ServerResponse;
import lombok.extern.slf4j.Slf4j;
import {{generateConfig.javaPackage}}.service.{{generateConfig.serviceName}};
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value="{{autowiredServiceToLower}}")
@Slf4j
public class {{generateConfig.serviceName}}Impl implements {{generateConfig.serviceName}} {

    @Autowired
    private {{table.daoName}} {{daoNameToLower}};

    @Override
    public ServerResponse {{generateConfig.addMethod}}(Add{{table.pojoName}}Dto add{{table.pojoName}}Dto) {
        String createBy = RequestHolder.getCurrentCrmUser().getTrueName();
        {{table.pojoName}} {{pojoNameToLower}} = {{table.pojoName}}.builder()
                .createBy(createBy)
                .build();
        int count = {{daoNameToLower}}.insertSelective({{pojoNameToLower}});
        if(count > 0){
            return ServerResponse.createBySuccess();
        }
        log.error("新增失败,参数add{{table.pojoName}}Dto={}",add{{table.pojoName}}Dto.toString());
        return ServerResponse.createByErrorMessage("新增失败");
    }

    @Override
    public ServerResponse {{generateConfig.deleteMethod}}(Integer id, Integer version){
        int count = {{daoNameToLower}}.logicDelete(id, version);
        if(count > 0){
            return ServerResponse.createBySuccess();
        }
        log.error("删除失败,参数id={},version={}",id,version);
        return ServerResponse.createByErrorMessage("删除失败");
    }

    @Override
    public ServerResponse {{generateConfig.updateMethod}}(Update{{table.pojoName}}Dto update{{table.pojoName}}Dto){
        String updateBy = RequestHolder.getCurrentCrmUser().getTrueName();
        {{table.pojoName}} {{pojoNameToLower}} = {{table.pojoName}}.builder()
                .id(update{{table.pojoName}}Dto.getId())
                .version(update{{table.pojoName}}Dto.getVersion())
                .build();
        int count = {{daoNameToLower}}.updateByPrimaryKeySelective({{pojoNameToLower}});
        if(count >0){
            return ServerResponse.createBySuccess();
        }
        log.error("更新失败,参数update{{table.pojoName}}Dto={}",update{{table.pojoName}}Dto.toString());
        return ServerResponse.createByErrorMessage("更新失败");
    }

    @Override
    public ServerResponse {{generateConfig.selectMethod}}(Integer id){
        {{table.pojoName}} {{pojoNameToLower}} ={{daoNameToLower}}.selectByPrimaryKey(id);
        if({{pojoNameToLower}} == null){
            return ServerResponse.createByErrorMessage("参数错误");
        }
        return ServerResponse.createBySuccess({{pojoNameToLower}});
    }
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
        },
        computed: {
            autowiredServiceToLower: function() {
                let serviceName = this.generateConfig.serviceName || 'demoService'
                return serviceName.substr(0,1).toString().toLowerCase()+serviceName.substr(1,serviceName.length);
            },
            daoNameToLower: function() {
                return this.table.daoName.substr(0,1).toString().toLowerCase()+this.table.daoName.substr(1,this.table.daoName.length);
            },
            pojoNameToLower: function() {
                return this.table.pojoName.substr(0,1).toString().toLowerCase()+this.table.pojoName.substr(1,this.table.pojoName.length);
            },
            serviceNameToImp: function () {
                return this.generateConfig.serviceName+"Impl"
            }
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
