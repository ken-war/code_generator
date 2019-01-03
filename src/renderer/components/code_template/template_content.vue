<template>
    <div>
        <p>{{templateName}}：{{fileName}}</p>
        <el-button @click="copy('content')">复制</el-button>
        <div @click="copy('content')" class="codeContent" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "template_content",
    props: {
        templateName: String,
        fileName: String
    },
    methods: {
        copy(id){
            let textContent = '';
            textContent = this.getInnerText(this.$refs[id], 'code');
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
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    .codeContent
        background-color : #fff;
        padding : 20px;
        &:hover
            background:#3390ff;
            color:#fff;
        .code
            font-size : 18px;
</style>
