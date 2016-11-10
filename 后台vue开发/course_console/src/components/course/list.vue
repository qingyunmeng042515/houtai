<template>
	<div class="col-xs-12">
		<div class="row">
			<div class="form-group col-xs-2">
				<label class="col-xs-6 control-label" style="padding-right:0;">课程名称:</label>
				<div class="col-xs-6">
					<input type="text" class="col-xs-6" style="width:100px;" name="id" id="product_id"/>
				</div>
			</div>
			<div class="form-group col-xs-3">
				<label class="col-xs-6 control-label" style="padding-right:0;">课程类型:</label>
				<select class="col-xs-6" >
					<option selected="selected">请选择</option>
					<option>直播</option>
					<option>回放</option>
				</select>
			</div>
			<div data-toggle="datepicker" class=" input-daterange form-group col-xs-5">
			    <label class="control-label col-xs-3" style="padding-right:0;">时间选择：</label>
			    <div class="controls col-xs-9">
			      <input type="text" class="input-medium input-date" style="width:100px;"><span>-</span>
			      <input type="text" class="input-medium input-date" style="width:100px;">
			    </div>
			</div>
		
			<div class="form-group col-xs-2">
				<input type="button" class="btn btn-success"  id="searchbtn" value="查询" />
				<input type="button" class="btn btn-success" id="savebtn" value="新增" v-link="{name:'courselist-form',params:{id:0}}" />
			</div>
		
			<table class="table table-striped" style="table-layout:fixed;">
				<thead>
					<tr>
						<th width="5%">序号</th>
						<th width="10%">标题</th>
						<th width="20%">封面图</th>
						<th width="10%">类型</th>
						<th width="10%">状态</th>
						<th width="10%">价格</th>
						<th width="15%">是否展示</th>
						<th width="15%">操作</th>
					</tr>
				</thead>
				<tbody style="overflow:auto;">
					<tr>
						<td>1</td>
						<td>创新革命</td>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201608/57bbc1f2647b5.jpg"" alt=""></td>
						<td>直播</td>
						<td>正在直播</td>
						<td>30</td>
						<td class="row"><span style="padding:0 5px;">已显示</span><span class="btn btn-default" style="padding:5px 10px;">隐藏</span></td>
						<td><a class="btn btn-default" v-link="{name:'courselist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=delete() >删除</a>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>创新革命</td>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201608/57bbc1f2647b5.jpg" alt=""></td>
						<td>直播</td>
						<td>正在直播</td>
						<td>40</td>
						<td class="row"><span style="padding:0 5px;">已隐藏</span><span class="btn btn-primary" style="padding:5px 10px;">显示</span></td>
						<td><a class="btn btn-default" v-link="{name:'courselist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=delete() >删除</a>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>创新革命</td>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201608/57bbc1f2647b5.jpg" alt=""></td>
						<td>直播</td>
						<td>正在直播</td>
						<td>30</td>
						<td class="row"><span style="padding:0 5px;">已显示</span><span class="btn btn-default" style="padding:5px 10px;">隐藏</span></td>
						<td><a class="btn btn-default" v-link="{name:'courselist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=deleteItem(item) >删除</a>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>创新革命</td>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201608/57bbc1f2647b5.jpg" alt=""></td>
						<td>直播</td>
						<td>正在直播</td>
						<td>30</td>
						<td class="row"><span style="padding:0 5px;">已显示</span><span class="btn btn-default" style="padding:5px 10px;">隐藏</span></td>
						<td><a class="btn btn-default" v-link="{name:'courselist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=deleteItem(item) >删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<pagination v-ref:pagination :pager="pager" @page-change="load"></pagination>
  		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Pagination from '../util/pagination.vue'
export default {
	data () {
		return{
			msg:'list',
			list:'',
			param:{},
			pager:{
                    count:0,
                    baseUrl:'/courselist'
                }	
		}
	},
	ready: function() {
		this.load(this.pager.baseUrl)
	},
	components: {
            'pagination': Pagination
    },
	methods: {
		load: function(url) {
			this.$http.post(url,this.param)
				.then((response) => {
					this.list=JSON.parse(response.data).resultSet;
					this.pager.count=JSON.parse(response.data).rowsCount;
				})
				.catch(function(response) {
					console.log(response)
				})
		},
        deleteItem: function (item) {
            var url = '';//删除url
            if(!conform("确认要删除吗？")) return;
            this.$http.post(url).then(function (response) {
                toastr.success("操作成功");
                this.load(this.pager.baseUrl);
            }, function (response) {
                toastr.error("操作失败");
            });
        },
        search: function () {
            this.param = {
                product_id: $("#product_id").val()
            }
            this.$refs.pagination.reset();
            this.$refs.pagination.reload();
        },
	}
}
</script>
<style>
	td{
		word-wrap: break-word;
		word-break: break-all;
	}
	label{
		text-align:right;
	}
</style>