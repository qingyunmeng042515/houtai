<template>
	<div class="col-xs-12 row">
  			<div style="margin:0 0 20px 10px;">
		        <ol class="breadcrumb">
		            <li><a v-link="{ name: 'courselist'}">课程列表</a></li>
		            <li class="active">详情</li>
		        </ol>
		        <h2 class="col-md-offset-1">详细信息</h2>
		    </div>
		    <div class="col-xs-12 container">
		    	 <form class="form-horizontal">
		    	 	<fieldset>
		    	 		<div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程标题:</label>
				                <div class="col-xs-10">
				                    <input v-model="data.title" class="form-control" value="创新革命" />
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程封面图:</label>
				                <div class="col-xs-10">
				                   	<div style="width:50%;height:200px;border:1px solid #ccc"></div>
				                    <input type="file" value="更换" style="float:left;">
				                    <input type="submit" value="上传" style="float:left;"> 
				                </div>
				            </div>
				        </div>  
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程价格:</label>
				                <div class="col-xs-10">
				               		<input type="radio" value="type" name="type" />铁杆会员
				               		<input type="radio" value="type" name="type"/>在线会员
				               		<input type="radio" value="type" name="type"/>普通会员
				                    <input type="number" value="40" class="form-control" style="margin-top:10px;" />
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程类型:</label>
				                <div class="col-xs-10">
					                <select class="col-xs-12" style="height:32px;">
					                    <option>请选择</option>
					                    <option>直播课</option>
					                    <option>回放课</option>
					                </select>
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程状态:</label>
				                <div class="col-xs-10">
				                	<input v-model="data.title" class="form-control" value="创新革命" />
					                <label><input name="status" type="checkbox" value="" />预告 </label> 
									<label><input name="status" type="checkbox" value="" />报名中 </label> 
									<label><input name="status" type="checkbox" value="" />即将直播</label> 
									<label><input name="status" type="checkbox" value="" />直播中</label> 
									<label><input name="status" type="checkbox" value="" />直播已结束</label> 
				                </div>
				            </div>
				        </div>    
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程介绍:</label>
				                <div class="col-xs-10">
				                    <textarea v-model="data.title" value="xxxxxxxxxxxxxxxxxxxx" class="form-control" rows="8" col="20"></textarea>
				                </div>
				            </div>
				        </div>  
				        <div class="col-xs-12 row">
				            <div class="form-group ">
				                <label class="col-xs-2 control-label one-col">上课时间:</label>
				                <div class="col-xs-10">
				                    <input type="text" value="" class="form-control input-date">
				                </div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group input-daterange">
				                <label class="col-xs-2 control-label one-col">展示时间:</label>
				                <div class="col-xs-10">
				                    <input type="text" value="" class="form-control input-date">
				                </div>
				            </div>
				        </div>
				         <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程视频:</label>
				                <div class="btn btn-primary" @click="showVideo()">添加视频</div>
				                <div class="btn btn-primary" v-link="{ name: 'videolist'}">查看课程下所有视频</div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <a style="border-radius:5px;border:1px solid #ccc;margin-left:100px;padding:5px;" v-link="{ name: 'teacherlist-form',params:{id:1}}">创新革命</a>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <label class="col-xs-2 control-label one-col">课程老师:</label>
				                <div class="btn btn-primary" id="add-teacher">添加老师</div>
				                <div class="btn btn-primary" v-link="{ name: 'teacherlist'}">查看课程下所有老师</div>
				            </div>
				        </div>
				        <div class="col-xs-12 row">
				            <div class="form-group">
				                <a style="border-radius:5px;border:1px solid #ccc;margin-left:100px;padding:5px;" v-link="{ name: 'teacherlist',params:{id:1}}">张三丰</a>
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
  		<div v-show="this.showVideo;" class="shadow" style="position:fixed;width:70%;height:100%;background:rgba(0,0,0,.6);display:none;">
  		<div id="teacherList" style="position:absolute;top:50px;left:100px;width:80%;height:500px;background:#fff;padding:20px 0;">
  		<div class="row">
			<div class="form-group col-xs-6">
				<label class="col-xs-4 control-label" style="padding-right:0;">老师名称:</label>
				<div class="col-xs-8">
					<input type="text" class="col-xs-6" style="width:150px;" name="id" id="product_id"/>
				</div>
			</div>
			<div class="form-group col-xs-6">
				<label class="col-xs-4 control-label" style="padding-right:0;">课程名称:</label>
				<div class="col-xs-8">
					<input type="text" class="col-xs-6" style="width:150px;" name="id" id="product_id"/>
				</div>
			</div>
		</div>	
  		<table class="table table-striped" style="table-layout:fixed;">
				<thead>
					<tr>
						<th width="20%">姓名</th>
						<th width="20%">职位</th>
						<th width="45%">介绍</th>
					</tr>
				</thead>
				<tbody style="overflow:auto;">
					<tr>
						<td>张三丰</td>
						<td>教授</td>
						<td>学习嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</td>
						<td>
							<a class="btn btn-primary" @click=add() >添加</a>
						</td>
					</tr>
					<tr style="background:#fff;">
						<td>刘思成</td>
						<td>副教授</td>
						<td>学习嘻嘻大房间欧莎嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</td>
						<td>
							<a class="btn btn-primary" @click=add() >添加</a>
						</td>
					</tr>
				</tbody>
			</table>
			<pagination v-ref:pagination :pager="pager" @page-change="load"></pagination>
		</div>	
		</div>
</template>
<script>

</script>