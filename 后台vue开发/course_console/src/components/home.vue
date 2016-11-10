<template>
    <div id="welcome col-xs-10" style="border-bottom:3px solid #ccc;">
        <div class="row">
            <div class="col-xs-3">
                <a style="display:block;text-align:center;background:url(http://hdyxs.hundun.cn/Public/Admin3/images/fa-courses.png) no-repeat 27%;margin-top:70px;border-right:1px solid #ccc;" v-link="{path:'/worker/courselist'}" >课程总数59</a>
            </div>
            <div class="col-xs-3">
                <a style="display:block;text-align:center;background:url(http://hdyxs.hundun.cn/Public/Admin3/images/fa-courses.png) no-repeat 27%;margin-top:70px;border-right:1px solid #ccc;" v-link="{path:'/worker/videolist'}" >视频总数131</a>
            </div>
            <div class="col-xs-3">
                <a style="display:block;text-align:center;background:url(http://hdyxs.hundun.cn/Public/Admin3/images/fa-users.png) no-repeat 27%;margin-top:70px;" v-link="{path:'/worker/teacherlist'}" >老师人数109</a>
            </div>
        </div>
    </div>
    <div class="col-xs-12">
        <h3 style="margin:20px auto;background:#f3f3f3;text-align:center;">您的相关信息</h3>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">登录账号:</label>
            <div class="col-xs-10">
                <p class="form-control-static">xxx</p>
            </div>
        </div>
        </form>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">真实姓名:</label>
            <div class="col-xs-10">
                <p class="form-control-static">xxx</p>
            </div>
        </div>
        </form>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">工号:</label>
            <div class="col-xs-10">
                <p class="form-control-static">007</p>
            </div>
        </div>
        </form>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">手机:</label>
            <div class="col-xs-10">
                <p class="form-control-static">186572747274</p>
            </div>
        </div>
        </form>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">email:</label>
            <div class="col-xs-10">
                <p class="form-control-static">zhangyizhi@hundun.cn</p>
            </div>
        </div>
        </form>
        <form class="form-horizontal" role="form">
        <div class="form-group col-xs-9">
            <label class="col-xs-2 control-label">注册时间:</label>
            <div class="col-xs-10">
                <p class="form-control-static">xxx</p>
            </div>
        </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'Home'
        }
    }
}
</script>
<style>
#home {
    font-size: 22px;
}

#hello ul {
    list-style-type: none;
}

#welcome {
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -116px;
    background:#f3f3f3;
}

#welcome div a {
    text-align:center;
    display:block;
    color:#666;
    background-image:url('http://hdyxs.hundun.cn/Public/Admin3/images/fa-users.png') no-repeat;
}
</style>
