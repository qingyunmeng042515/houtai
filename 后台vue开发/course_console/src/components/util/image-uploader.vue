<template>
    <div class="uploader-warpper">
        <template v-if="!customView">
            <template v-if="multiple">
                暂未实现
            </template>
            <template v-else>
                <div v-if="url" class="image">
                    <span @click.stop="deleteUrl" class="delete-image">x</span>
                    <img :src="url" id="uploader" :width="width" :height="height" style="max-height: 300px;">
                </div>
                <div v-else class="image">
                    <img id="uploader" :width="width" :height="height" src="../../assets/img/add-photo.png"
                         alt="">
                </div>

                <div class="alert alert-info msg">
                    <ul>
                        <li v-if="checkWidth && checkHeight">图片尺寸为<b>{{ checkWidth }}x{{ checkHeight }}</b></li>
                        <li v-if="fileSize">图片文件大小不超过 <b>{{ fileSize }}</b></li>
                    </ul>
                </div>
                <div class="alert alert-danger msg" v-if="errorMsg">
                    <ul>
                        <li>{{ errorMsg }}</li>
                    </ul>
                </div>
            </template>
        </template>
        <template v-else>
            <span id="uploader">
                <slot></slot>
            </span>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    /**
     * 图片上传和展示组件
     * 支持单张,多张图片上传, 图片文件大小校验, 图片宽高尺寸校验, 自定义视图
     *
     * props
     *      见 props 具体说明
     *
     * 事件
     *      before-upload: 上传之前
     *      url-add: (仅多选模式) 图片增加 参数: urls , newUrl
     *      url-change: (仅单选模式) 图片 url 变更 参数: newUrl
     *      upload-complete: 所有图片上传完成
     *      error: 上传或校验失败 参数: code 错误码, msg 错误信息
     *
     * 方法
     *      deleteUrl (仅单选模式) 删除当前图片 url  参数: showConfirm 是否弹出确认框, 默认为 true
     *
     *
     * 示例:
     *      多选, 自定义视图
     *                  <uploader multiple
     *                      custom-view
     *                      :urls.sync="urls"
     *                      @error="uploadError">
     *                          <button type="button" class="btn btn-success">
     *                              批量添加图片(多选)
     *                          </button>
     *                  </uploader>
     *                  <img v-for="url in urls" :src="url">
     *
     *
     *      单选, 默认视图
     *                  <uploader :height="100" :url.sync="data.url"></uploader>
     *
     *
     */
    export default{
        data(){
            return {
                uploader: null,
                /** 用于内部显示 */
                errorMsg: null,
                oldUrl: null
            }
        },
        props: {
            /** 是否使用多选模式 */
            multiple: {
                type: Boolean,
                default: false
            },
            /** 单张图片url, 支持双向绑定 */
            url: String,
            /** 是否使用自定义界面(slot 方式) */
            customView: {
                type: Boolean,
                default: false
            },
            /** 错误消息 */
            message: String,
            /** 多选模式图片 url 列表, 支持双向绑定 */
            urls: {
                type: Array,
                default: []
            },
            /** 图片显示宽度 */
            width: [Number, String],
            /** 图片显示高度 */
            height: [Number, String],
            /** 图片尺寸验证宽度 */
            checkWidth: Number,
            /** 图片尺寸验证高度 */
            checkHeight: Number,
            /** 图片文件大小 */
            fileSize: {
                type: String,
                default: '400k'
            }
        },
        ready: function () {
            window.uploader = this;
            this.initUploader();
            this.$watch('url', (newValue, oldValue)=> {
                this.$nextTick(()=> {
                    this.initUploader()
                })
            })
        },
        methods: {
            /**
             * private
             */
            initUploader(){
                this.errorMsg = null;
                if (this.uploader) {
                    this.uploader.destroy();
                }
                this.uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'uploader', // you can pass an id...
                    url: 'http://localhost/admin/upload.shtml',
                    file_data_name: '',
                    multi_selection: this.multiple,
                    filters: {
                        max_file_size: this.fileSize,
                        mime_types: [
                            {title: "Image files", extensions: "jpg,gif,png"}
                        ]
                    },
                    multipart_params: {  //上传时的附加参数，以键/值对的形式传入
                        urltemp_old: this.oldUrl
                    }
                });

                this.uploader.init();
                this.uploader.bind('FileUploaded', this.onFileUploaded)
                this.uploader.bind('FilesAdded', this.FilesAdded)
                this.uploader.bind('UploadComplete', this.onUploadComplete)
                this.uploader.bind('Error', this.onError)
            },
            /**
             * private
             * @param up
             * @param files
             * @constructor
             */
            FilesAdded (up, files){
                this.oldUrl = this.url;
                if (!this.multiple) {
                    this.uploader.setOption('multipart_params', {urltemp_old: this.oldUrl})
                }
                this.errorMsg = null;
                this.$emit("before-upload")
                this.uploader.start()
            },
            /**
             * private
             * @param up
             * @param file
             * @param response
             */
            onFileUploaded: function (up, file, response) {
                var response_json = JSON.parse(response.response);
                if (!response_json.success) {
                    console.log("File uploading failed, server returns none 200 code:");
                    console.log(response_json);
                } else {
                    if (this.multiple) {
                        this.urls.push(response_json.data.url)
                        this.$emit("url-add", this.urls, response_json.data.url)
                    } else {
                        this.url = response_json.data.url;
                        this.$emit("url-change", this.url)
                    }
                }
            },
            /**
             * private
             * @param up
             * @param err
             */
            onError: function (up, err) {
                this.message = err.message
                this.code = err.code
                if (this.code == -600) {
                    err.message = this.errorMsg = '图片文件过大, 请上传小于' + this.fileSize + "的文件"
                } else {
                    this.errorMsg = err.code + ":" + err.message
                }
                this.$emit('error', err.code, err.message)
            },
            /**
             * private
             */
            onUploadComplete(){
                this.$emit("upload-complete", this.url)
            },
            /**
             * 删除图片
             */
            deleteUrl(showConfirm = true){
                if (showConfirm && !confirm("确认删除?")) return;
                if (this.multiple) {
                    this.urls = []
                } else {
                    this.url = null
                }
            },
        }
    }
</script>

<style scoped>

    .delete-image {
        transition: .3s all;
        background: #ff0000;
        color: #ffffff;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, .4);
        text-align: center;
        padding: 3px;
        width: 25px;
        height: 25px;
        position: absolute;
        top: -10px;
        left: -10px;
        border-radius: 50%;
        z-index: 3;
        cursor: pointer;
    }

    .msg {
        clear: both;
        margin-top: 5px;
    }

    .delete-image:hover {
        background: #ff5555;
        box-shadow: 2px 2px 7px rgba(0, 0, 0, .5);
    }

    .image {
        position: relative;
        float: left;
        margin-right: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
    }
</style>