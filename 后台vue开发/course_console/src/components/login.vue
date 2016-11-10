<template>
    <form id="login" class="form-horizontal">
    <div class="col-xs-4" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
        <div class="col-xs-12" style="height:150px;background-color:rgb(6,63,168);border-radius:10px 10px 0 0;">
            <img style="margin-top:57px;" src="http://hdyxs.hundun.cn/Public/Admin3/images/logo.png"/>
        </div>
        <div class="col-xs-12" style="background:#fff;padding-bottom:10px;border-radius:0 0 10px 10px;">
            <div class="control-group">
                <div class="controls input-group input-group-lg login-input-box-account">
                  <span class="input-group-addon login-label" id="basic-addon1">账 号</span>
                  <input v-model="form_account"  type="text" class="form-control" id="input-account" name="account" 
                  required
                  data-validation-regex-regex="[0-9a-zA-Z]*" 
                   data-validation-regex-message="只能输入字母和数字">
                </div>
            </div>
            <div class="control-group">
                <div class="controls input-group input-group-lg login-input-box-pwd">
                  <span class="input-group-addon login-label" id="basic-addon2">密 码</span>
                  <input v-model="form_pwd" type="password" class="form-control" id="input-pwd" name="password"
                   required
                   data-validation-regex-regex="[0-9a-zA-Z]*" 
                   data-validation-regex-message="只能输入字母和数字">
                </div>
            </div>
            
           <div class="col-xs-12">
                <button type="button" class="btn btn-lg btn-success" @click="login" >登 录</button>
                <div class="status" v-show="isHold">
                    <span class="icon-spinner isuccessn icon-2x"></span>
                </div>
            </div>
        </div>
        </div>
    </form>
</template>
<script>
import Vue from 'vue'
import md5 from '../assets/js/md5.js'
    export default {
        ready: function() {
        	    	console.log(this);
            $('html').removeClass('body-img')
            $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); 
            //this.changeVcodeImg();
        },
        data() {
            return {
                form_account: '',
                form_pwd: '',
                isHold: false
            }
        },
        methods: {
            login: function() {
                 //校验
                // $('form').validate();
                if(!$('form').valid()){
                    return false;
                }
                
                if($("input,select,textarea").not("[type=submit]").jqBootstrapValidation("hasErrors")) {
                    toastr.error('请检查数据');
                    return false;
                }
                
                var data = {
                    account: this.form_account,
                    password: md5(this.form_pwd),
                }


                this.isHold = true
                this.$route.router.go('/worker/home');
            }
            
        }
    }
</script>
<style scoped>
#login {
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    background-color: #198BC9;
}
#login-log {
    
}
#login-log > img {
    width: 50px;
    height: 115px;
}
#login-panel {
    position: absolute;
    height: 260px;
    width: 280px;
    top: 50%;
    left: 50%;
    margin-left: -140px;
    margin-top: -185px;
}
 .login-label {
    font-weight: bold;
 }
.login-input-box-account {
    margin-top: 10px;
}
.login-input-box-pwd {
    margin-top: 15px;
    margin-bottom: 13px;
}
.btn-login {
    width: 100px;
    height: 35px;
    font-weight: bold;
    border-radius: 17px;
}
.status {
    display: inline-block;
    width: 30px;
    height: 30px;
}
</style>