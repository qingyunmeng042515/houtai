<template>
    <nav v-show="available">
        <div class="pagination" :class="{mini: mini}">
            <ul>
                <li>
                    <a v-if="mini" @click="reload"><span class="icon-refresh"></span></a>
                    <a v-else @click="reload"><span class="icon-refresh"></span> 刷新</a>
                </li>
                <li :class="{disabled: curPage == 1}" class="prev">
                    <a @click="goFirst">&lt;&lt;</a>
                </li>
                <li :class="{ disabled: curPage == 1}" class="prev"><a @click="prev">&lt;<span
                        v-if="!mini">上一页</span></a>
                </li>

                <li v-for="page in pageList" :class="{active: curPage == page}">
                    <a @click="switchPage(page)">{{ page }}</a>
                </li>

                <li :class="{ disabled: curPage == totalPage}" class="next"><a
                        @click="next"><span v-if="!mini">下一页</span>&gt;</a></li>
                <li :class="{disabled: curPage == totalPage}" class="next">
                    <a @click="goLast">&gt;&gt;</a>
                </li>
            </ul>
            <div v-if="!mini && totalPage >= 10">
                <input type="text"
                       class="page-num"
                       @keyup.enter="switchPage(inputPage)"
                       v-model="inputPage"
                       style="width: 40px"
                       v-number:int="{min:1, max: totalPage}"><a
                    class="page-confirm" @click="switchPage(inputPage)">跳转</a>
            </div>
            <div>
                <template v-if="mini">
                    {{ pager.count }}-{{ curPage }}/{{ totalPage }}
                </template>
                <template v-else>
                    <span>共{{ pager.count }}条 </span>
                    <span>第{{ curPage }}/{{ totalPage }}页</span>
                </template>
            </div>
        </div>
    </nav>
</template>
<style>
    .pagination{
        float: right;
        margin-right: 40px;
    }
    .pagination a {
        cursor: pointer;
        min-width: 32px;
        text-align: center;
    }
    .pagination ul li {
        float: left;
        list-style: none;
    }
    .pagination li a {
        margin-right: 5px;
    }

    .pagination.mini li a{
        margin-right: 0;
    }

    ul {
        padding-left: 0;
    }
</style>
<script>
    /**
     *  分页组件
     *
     *  接收属性
     *      pager , [对象类型],
     *          count, count为number类型且不为空
     *          baseUrl , 查询数据的url(不带有分页信息), 抛出事件时会和分页信息拼接成完整查询 url
     *          示例: <pagination :pager="{ count: 100, baseUrl: 'this.baseUrl' }"></pagination>
     *
     *  派发事件 page-change,
     *      参数:
     *          url: 按 [baseUrl + '?limit=&offset='] ( 如果 baseUrl 包含查询字符串, '?' 会适配成 '&' ) 格式拼接成完整查询 url, 如果 baseUrl 为空, 则url为查询字符串
     *          示例:
     *              <pagination @page-change="load"  :pager="{ count: 100, baseUrl: 'this.baseUrl' }"></pagination>
     *
     *              js:
     *              load: function(url){ ... }
     */

    export default{
        data(){
            return {
                offset: 0,
                limit: 10,
                inputPage: 0
            }
        },
        props: {
            pager: {
                validator(value){
                    // 数据结构
                    //{
                    //    count: Number
                    //    baseUrl: {
                    //      type: String,
                    //      default: ''
                    //    }
                    //}

                    /**
                     *
                     * @param obj 要检查的对象
                     * @param name 属性名称
                     * @param type 属性类型 参照 typeof value
                     * @param isRequire 是否为必填
                     * @param defaultValue 属性默认值
                     * @returns {boolean}
                     */
                    function check(obj, name, type, isRequire, defaultValue) {
                        var value = obj[name];

                        if (value === null || value === undefined) {
                            if (isRequire) {
                                console.error(`[Pagination] ${name} is required but ${value}`);
                                return false;
                            }
                            if (defaultValue !== undefined && defaultValue !== null) {
                                obj[name] = defaultValue;
                            }
                            return true
                        }
                        if (typeof value !== type) {
                            console.error(`[Pagination] ${name} type is '${type}' but '${typeof value}'`);
                            return false;
                        }
                        return true;
                    }

                    // 检查对象count 为 number 且不可为空, baseUrl string 类型 可以为空
                    return check(value, 'count', 'number', true)
                            && check(value, 'baseUrl', 'string', false, '')
                }
            },
            mini: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            totalPage(){
                return Math.max(1, Math.ceil(this.pager.count / this.limit));
            },
            curPage: {
                get(){
                    var page = this.offsetToPage(this.offset);
                    this.inputPage = page
                    return page;
                },
                set(value){
                    this.offset = this.pageToOffset(value);
                    this.inputPage = value
                }
            },
            available(){
                return !!this.pager;
            },
            url(){
                return (this.pager.baseUrl) + (this.pager.baseUrl.indexOf("?") === -1 ? "?" : "&" ) + "offset=" + this.offset + "&limit=" + this.limit;
            },
            /**
             *  页码列表
             */
            pageList(){
                var totalPage = this.totalPage,
                        curPage = this.curPage
                var ret = []
                var first = Math.max(1, curPage - 5),
                        last = Math.min(totalPage, first + 9)
                for (let i = first; i <= last; i++) {
                    ret.push(i);
                }
                return ret;
            }
        },
        methods: {
            offsetToPage(offset){
                return Math.ceil(offset / this.limit) + 1;
            },
            pageToOffset(page){
                return (page - 1) * this.limit;
            },
            /**
             * 切换页面, 抛出 page-change 事件
             * @param num
             * @returns {boolean}
             */
            switchPage(num){
                var newPage = Math.min(this.totalPage, Math.max(1, num))
                var newOffset = this.pageToOffset(newPage);
                if (this.offset == newOffset) {
                    return false;
                }
                this.offset = newOffset;
                this.reload()
                return true;
            },
            next () {
                if (!this.switchPage(this.curPage + 1)) {
                    toastr.warning("已经到页尾了");
                }
            },
            prev() {
                if (!this.switchPage(this.curPage - 1)) {
                    toastr.warning("已经是第一页了");
                }
            },
            goFirst(){
                if (!this.switchPage(1)) {
                    toastr.warning("已经是第一页了");
                }
            },
            goLast(){
                if (!this.switchPage(this.totalPage)) {
                    toastr.warning("已经到页尾了");
                }
            },
            reload(){
                this.$emit("page-change", this.url)
            },
            reset(){
                this.limit = 10
                this.offset = 0
            }
        }
    }
</script>