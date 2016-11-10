<template>
    <div id="menu-container">
        <div class="accordion" id="menu-pannel">
        <div v-for="(index,group) in menuConf" class="panel menu-group">
            <div class="menu-group-title {{ group.extclass }}" data-parent="#menu-pannel" data-target="#menu-sub{{ index }}" data-toggle="collapse" v-link="{path:group.href}">
                {{ group.label }}<span class="indicator" v-show="curGroup.indexOf(group.extclass) >= 0"></span>
            </div>
            
        </div>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    var LeftMenu = {
        getConf: function () {
            
                return [
                    {
                        name: '', label: '首页', href: '/worker/home', extclass:'menu-g-base', subset: [
                        
                    ]
                    },
                    {
                        name: '', label: '课程管理', href: '/worker/courselist', extclass:'menu-g-online', subset: [
                       
                    ]
                    },
                    {
                        name: '', label: '视频管理', href: '/worker/videolist', extclass:'menu-g-store', subset: [
                        
                    ]
                    },
                    {
                        name: '', label: '老师管理', href: '/worker/teacherlist', extclass:'menu-g-finance', subset: [
                        
                    ]
                    }
                 ]  
            
        }
    }

    export default {
        data() {
            return {
                msg: 'Home',
                menuConf: LeftMenu.getConf()
            }
        },
        computed: {
            path2GroupMap: function() {
                var m = this.menuConf
                var collector = {}
                for (var i = m.length - 1; i >= 0; i--) {
                    for (var j = m[i].subset.length - 1; j >= 0; j--) {
                        collector[ m[i].subset[j].href ] = m[i].extclass
                    }
                }
                return collector
            },
            curGroup: function() {
                var path = this.$route.path.replace('/worker', '')
                var pathFirstLevel = path.indexOf('/',1) > 0 ? path.substr(0, path.indexOf('/',1)) : path
                var group = this.path2GroupMap[pathFirstLevel];
                return group === undefined ? 'undefined' : group
            }
        }
    }
</script>
<style scoped>
    #menu-container {
        float: left;
        width: 230px;
        background-color: #198BC9;
    }

    #menu-pannel {
        padding: 15px 15px 5px 15px;
        overflow: auto;
        margin: 0 10px;
        background-color: #3B9CD1;
    }

    .menu-group {
        padding: 0;
        margin: 0;
        background-color: transparent;
    }

    .menu-group-title {
        color: #011e4a;
        margin: 0 0 8px 0;
        height: 32px;
        line-height: 32px;
        padding-left: 35px;
        border-radius: 17px;
        background-image: url(../../src/assets/img/ic_menu.png);
        background-repeat: no-repeat;
        background-color: #198BC9;
        background-position: 11px -24px;
        background-size: 20px 426px;
        cursor: pointer;
        font-size: 14px;
    }

    .indicator {
        float: right;
        width: 14px;
        height: 20px;
        margin: 10px 5px 0px 0px;
        background-repeat: no-repeat;
        background-size: 9px 13px;
        background-image: url(../../src/assets/img/ic_leftmenu_indicator.png);
    }

    .menu-sub {
        color: #011e4a;
        margin: 0 0 5px 15px;
        height: 30px;
        line-height: 30px;
        padding-left: 30px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 14px;
        background: url(../../src/assets/img/ic_menu_sub_tag_checked.png) #4AA4D5 no-repeat 15px 10px;
    }

    .menu-g-base{
        background-position: 11px -25px;
    }

    .menu-g-finance{
        background-position: 11px -225px;
    }

    .menu-g-store{
        background-position: 11px -92px;
    }

    .menu-g-supervisor {
        background-position: 11px -258px;
    }

    .menu-g-officer {
        background-position: 11px -159px;
    }

    .menu-g-review {
        background-position: 11px -59px;
    }

    .menu-g-customer{
        background-position: 11px -125px;
    }

    .menu-g-online{
        background-position: 11px -325px;
    }

    .menu-checked {
        color: black;
        background: url(../../src/assets/img/ic_menu_sub_tag_checked.png) #D8EBF6 no-repeat 15px 10px;
    }
</style>