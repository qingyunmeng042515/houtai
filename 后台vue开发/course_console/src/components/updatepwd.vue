<template>
	<div class="col-xs-12" style="background:#f3f3f3;margin-bottom:15px;">当前位置：修改密码</div>
	<form class="col-xs-9 form-horizontal" style="padding:20px 0;border:2px solid #ccc;">
		<div class="form-group">
            <label class="col-xs-2" style="font-weight:300;padding-top:5px;text-align:right;">原密码:</label>
            <div class="col-xs-6">
                <input type="password" name="oldPwd" id="oldPwd" /><span style="color:red;"> *</span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-2" style="font-weight:300;padding-top:5px;text-align:right;">新密码:</label>
            <div class="col-xs-6">
                <input type="password" name="newPwd" id="newPwd" /><span style="color:red;"> *</span>
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-2" style="font-weight:300;padding-top:5px;text-align:right;">确认新密码:</label>
            <div class="col-xs-6">
                <input type="password" name="rePwd" id="rePwd" /><span style="color:red;"> *</span>
            </div>
        </div>
        <div class="col-xs-12" style="padding-left:150px;">
        	<button type="button" class="btn btn-default" @click="submit" style="margin-right:13px;" >提交</button>
        	<button type="button" class="btn btn-default" @click="reset" >重置</button>
        </div>
	</form>
</template>