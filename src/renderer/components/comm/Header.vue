<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-button type="text" @click="dialogFormVisible = true" style="padding-left: 14px">修改密码</el-button>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="apiDto" :rules="rules" ref="checkPasswordId">
                <el-form-item label="请输入旧密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input v-model="apiDto.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input v-model="apiDto.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="请确认新密码" :label-width="formLabelWidth"  prop="checkPass">
                    <el-input v-model="apiDto.affirmNewPassword" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        data() {
            var checkOldPassword = (rule, value, callback) => {
                if(!value) {
                    return callback(new Error('旧密码不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                let regex = /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[a-zA-Z0-9]{6,15}).*$/;
                if (!regex.test(value)) {
                    callback(new Error('新密码必须包含大小写字母、数字，6-15位内'));
                } else {
                    callback();
                }
            };
            return {
                apiUrl: {
                },
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2,
                dialogFormVisible: false,
                apiDto: {
                    oldPassword:'',
                    newPassword:'',
                    affirmNewPassword:'',
                    version: ''
                },
                formLabelWidth: '110px',
                rules: {
                    oldPassword: [
                        {  required: true,validator: checkOldPassword, trigger: 'blur' },
                    ],
                    newPassword: [
                        {  required: true, validator: validatePass, trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    bus.$emit('closeWebsocket','');
                    localStorage.removeItem('ms_username');
                    localStorage.removeItem('agent_id');
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
