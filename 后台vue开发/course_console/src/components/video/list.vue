<template>
	<div class="col-xs-12">
		<div class="row">
			<div class="form-group col-xs-3">
				<label class="col-xs-4 control-label" style="padding-right:0;">视频名称:</label>
				<div class="col-xs-8">
					<input type="text" class="col-xs-6" style="width:150px;" name="id" id="product_id"/>
				</div>
			</div>
		
			<div class="form-group col-xs-3">
				<label class="col-xs-4 control-label" style="padding-right:0;">课程名称:</label>
				<div class="col-xs-8">
					<input type="text" class="col-xs-6" style="width:150px;" name="id" id="product_id"/>
				</div>
			</div>
		
			<div class="form-group col-xs-3">
				<input type="button" class="btn btn-success"  id="searchbtn" value="查询" />
				<input type="button" class="btn btn-success" id="savebtn" value="新增" v-link="{name:'teacherlist-form',params:{id:0}}" />
			</div>
		
			<table class="table table-striped" style="table-layout:fixed;">
				<thead>
					<tr>
						<th width="20%">封面图</th>
						<th width="12%">名称</th>
						<th width="12%">所属课程</th>
						<th width="35%">介绍</th>
						<th width="20%">操作</th>
					</tr>
				</thead>
				<tbody style="overflow:auto;">
					<tr>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201607/578de345b394d.jpg" alt=""></td>
						<td>创新革命</td>
						<td>创新革命</td>
						<td>学习嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</td>
						<td><a class="btn btn-default" v-link="{name:'videolist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=delete() >删除</a>
						</td>
					</tr>
					<tr>
						<td><img style="width:120px;height:90px;" src="http://hdyxs.hundun.cn/Public/Upload/activity/201607/578de345b394d.jpg" alt=""></td>
						<td>顶复式创新</td>
						<td>顶复式创新</td>
						<td>学习嘻嘻大房间欧莎嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</td>
						<td><a class="btn btn-default" v-link="{name:'videolist-form',params:{id:1}}" >编辑</a>
							<a class="btn btn-danger" @click=delete() >删除</a>
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
                    baseUrl:'/videolist'
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
</style>