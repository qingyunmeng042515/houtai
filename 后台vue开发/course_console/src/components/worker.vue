<template>
    <worker>
        <div id="header">
            <div id="h-log">
                <img id="logo" v-link="'home'" src="http://hdyxs.hundun.cn/Public/Admin3/images/logo.png"/>
                
            </div>
            <top-toolbox></top-toolbox>
        </div>
        <div id="main">
            <left-menu></left-menu>
            <div id="m-right-container">
                <router-view></router-view>
            </div>
        </div>
        <div id="footer">footer</div>
        <div id="loading">
            <span class="icon-spinner icon-spin icon-2x"></span>
            <span class="label">加载中...</span>
        </div>
    </worker>
</template>
<script>
import LeftMenu from './leftmenu.vue'
import TopToolbox from './toptoolbox.vue'
import Vue from 'vue'

export default {
    ready: function () {
        $('html').addClass('body-img')
        $('body').addClass('body-img')
    },
    components: {
        LeftMenu,
        TopToolbox
    },
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: 'Hello Vue!',
        }
    },
    computed: {
        loading: function() {
            return Vue.$xz.sloading
        }
    }
}
</script>
<style>
html,
body {
    font-family: 'Microsoft YaHei', 微软雅黑, 'Microsoft JhengHei', 宋体, sans-serif;
    font-size: 14px;
    background-color: white;
}

.body-img {
    background: url("../../src/assets/img/bg_b.png") repeat-y fixed left top white;
}


/* header */

#header {
    height: 60px;
    background-color: #198BC9;
}

#h-log {
    float: left;
    width:230px;
    height:60px;
    text-align:center;
    background:#1BBAE4;
}
#h-log img{
    margin-top:12px;
}
span#logo-span{
    font-size: 40px;
    color:aliceblue;
}
#loading {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 145px;
    height: 56px;
    line-height: 56px;
    z-index: 1001;
    color: white;
    background-color: #000;
    border-radius: 10px;
    opacity: 0.7;
    display: none;
}

.icon-spinner {
    margin: 13px 0 0 15px;
    float: left;
}

#loading .label {
    margin: 18px 0 0 5px;
    float: left;
    font-size: 12pt;
}


/* middle */

#main {
    position: relative;
}

#m-right-container {
    padding: 10px;
    margin-left: 230px;
    background-color: white;
}


/* bottom */

#footer {
    padding-left: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: red;
    border-top: solid 1px #999;
    background-color: #FFFF99;
    display: none;
}


/* common */

.header-divider {
    height: 2px;
    background-color: #4AA4D5;
}

.breadcrumb {
    padding-left: 0;
    margin-bottom: 0;
}

.workplace {
    margin: 15px 0 0 0;
}

.workplace-toolbox {
    padding: 0px;
}

.btn-icon {
    margin: 0 6px 0 -5px;
}

.grid-actions > button {
    float: right;
    margin-right: 8px;
}
</style>
