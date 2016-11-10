<template>
    <div id="toolbox"> 
        <div class="welcome">欢迎您登录, {{ account }}［{{ nick_name }}］</div>
        <div class="update-pwd" v-link="{name:'updatepwd'}"><span style="color:#eee">修改密码</span></div>
        <div class="exit" @click="exit()"><span class="icon-signout btn-icon"></span>退出</div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    ready: function() {
    },
    data() {
        return {
            account: 'octopus',
            nick_name:'wangxiaomeng'
        }
    },
    ready: function () {
        var that = this;
        Vue.http.get(Vue.http.options.root + '').then(
                function (response) {
                    if(response.data&&JSON.parse(response.data).success){
                        that.account = JSON.parse(response.data).userinfo.account;
                        that.nick_name = JSON.parse(response.data).userinfo.nick_name;
                        Vue.$xz.auth.user.account = JSON.parse(response.data).userinfo.account;
                        Vue.$xz.auth.user.userType = JSON.parse(response.data).userinfo.user_type
                        Vue.$xz.auth.user.id = JSON.parse(response.data).userinfo.id
                        Vue.$xz.auth.user.userInfo = JSON.parse(response.data).userinfo
                        Vue.$xz.auth.ready()    
                    }else{
                        that.account='';
                        that.nick_name='';
                        Cookies.set('xz-account', '');
                        Cookies.set('xz-userid','');
                        Cookies.set('xz-usertype','');
                    }
                }, function (response) {
                    that.account='';
                    that.nick_name='';
                    Cookies.set('xz-account', '');
                    Cookies.set('xz-userid','');
                    Cookies.set('xz-usertype','');
                }
        );
    },
    methods: {
        exit: function () {
            Vue.$xz.auth.exit(this)
        }
    }
}
</script>
<style scoped>
#toolbox {
    float: right;
    margin-top: 13px;
    color: white;
    height: 32px;
    line-height: 32px;
}

#toolbox > div {
    float: left;
    margin-right: 10px;
}

.settings {
    width: 62px;
    text-align: center;
    cursor: pointer;
    color: white;
}

.settings:hover {
    color: #A0D7F3;
}

.exit {
    width: 72px;
    text-align: center;
    border-radius: 16px;
    cursor: pointer;
    background-color: #1573AE;
}

.exit:hover {
    color: #A0D7F3;
}
</style>
