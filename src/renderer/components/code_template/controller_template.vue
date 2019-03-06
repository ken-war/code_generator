<template>
    <div>
        <el-main>
            <el-form :inline="true">
                <el-form-item
                        label="controller包">
                    <el-input v-model="controllerDto.controllerPackage"></el-input>
                </el-form-item>
                <el-form-item
                        label="RequestMapping">
                    <el-input v-model="controllerDto.requestMappering"></el-input>
                </el-form-item>
                <el-form-item
                        label="controller模块介绍">
                    <el-input v-model="controllerDto.controllerIntroduce"></el-input>
                </el-form-item>
                <el-form-item
                        label="controller名称">
                    <el-input v-model="controllerDto.controllerName"></el-input>
                </el-form-item>
            </el-form>
        </el-main>
    <temolate-content template-name="controller" :file-name="controllerDto.controllerName">
<pre class="code">
package {{controllerDto.controllerPackage}};

import com.ken.base.common.comm.ServerResponse;
import {{generateConfig.javaPackage}}.dto.{{table.addPojoDtoName}};
import {{generateConfig.javaPackage}}.dto.{{table.updatePojoDtoName}};
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import {{generateConfig.javaPackage}}.service.{{generateConfig.serviceName}};
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RequestMapping("{{controllerDto.requestMappering}}")
@RestController
@Slf4j
@Validated
@Api(tags = "{{controllerDto.controllerIntroduce}}")

public class {{controllerDto.controllerName}} {

    @Autowired
    private {{generateConfig.serviceName}} {{autowiredServiceToLower}};

    @ApiOperation(value="添加")
    @PostMapping(value="add.do")
    public ServerResponse add(@Valid Add{{table.pojoName}}Dto add{{table.pojoName}}Dto){
        return {{autowiredServiceToLower}}.{{generateConfig.addMethod}}(add{{table.pojoName}}Dto);
    }

    @ApiOperation(value="删除")
    @PostMapping(value="delete.do")
    public ServerResponse delete(@NotNull Integer id,@NotNull Integer version){
        return {{autowiredServiceToLower}}.{{generateConfig.deleteMethod}}(id, version);
    }

    @ApiOperation(value="修改")
    @PostMapping(value="update.do")
    public ServerResponse update(@Valid Update{{table.pojoName}}Dto update{{table.pojoName}}Dto){
        return {{autowiredServiceToLower}}.{{generateConfig.updateMethod}}(update{{table.pojoName}}Dto);
    }

    @ApiOperation(value="查询")
    @GetMapping(value="select.do")
    public ServerResponse select(@NotNull Integer id){
        return {{autowiredServiceToLower}}.{{generateConfig.selectMethod}}(id);
    }
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
                controllerDto:{
                    controllerPackage: 'com.ken.mall.controller.backend',
                    requestMappering: '/manage/demo/',
                    controllerName: 'DemoController',
                    controllerIntroduce: '模板模块',
                    serviceName: 'DemoService'
                }
            }
        },
        created() {
        },
        methods: {
            updateController() {
            }
        },
        computed: {
            autowiredServiceToLower: function() {
                let serviceName = this.generateConfig.serviceName || 'demoService'
                return serviceName.substr(0,1).toString().toLowerCase()+serviceName.substr(1,serviceName.length);
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
