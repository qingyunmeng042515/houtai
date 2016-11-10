<template>
	<div class="col-xs-12 row">
  			<div style="margin:0 0 20px 10px;">
		        <ol class="breadcrumb">
		            <li><a v-link="{ name: 'teacherlist'}">老师列表</a></li>
		            <li class="active">详情</li>
		        </ol>
		        <h2 class="col-md-offset-1">详细信息</h2>
		    </div>
		    <div class="col-xs-12 container">
		    	 <form class="form-horizontal">
		    	 	<fieldset>
		    	 		<div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">老师姓名:</label>
				                <div class="col-xs-10">
				                    <input v-model="data.title" class="form-control" value="张三丰" />
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">老师头像:</label>
				                <div class="col-xs-10">
				                   	<div style="width:50%;height:200px;border:1px solid #ccc"></div>
				                    <input type="file" value="更换" style="float:left;">
				                    <input type="submit" value="上传" style="float:left;"> 
				                </div>
				            </div>
				        </div>  
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">老师职位:</label>
				                <div class="col-xs-10">
				                    <input type="text" value="40" class="form-control"  />
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">老师介绍:</label>
				                <div class="col-xs-10">
					                <textarea class="form-control" rows="8" col="20"></textarea>
				                </div>
				            </div>
				        </div>
		    	 	</fieldset>
		    	 	<div class="col-xs-12 row">
			            <div class="form-group">
			                <div class="col-sm-offset-6 col-sm-6">
			                    <button type="button" class="btn btn-success btn-lg">
			                        <span class="icon-ok-sign btn-icon"></span>保存
			                    </button>
			                </div>
			            </div>
			        </div>
		    	 </form>
		    </div>
  		</div>
</template>