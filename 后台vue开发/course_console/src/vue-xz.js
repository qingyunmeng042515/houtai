export default {
    install: function (Vue, opt) {
        Vue.$xz = {
            config: {
                host: '/admin',
            },
            options: function (opt) {
                for (var property in opt) {
                    this.config[property] = opt[property]
                }
                
                Vue.http.options.root = this.config['host']
            },
            auth: {
                user: {
                    account: '',
                    userType: '',
                    userInfo: null,
                    id: ''
                },
                isReady: false,
                readyCallback: [],
                
                ready(callback){
                    if (!callback) {
                        this.isReady = true;
                        this.readyCallback.forEach(c=>c())
                    } else {
                        if (this.isReady) {
                            callback()
                        } else {
                            this.readyCallback.push(callback);
                        }
                    }
                },
                getAuthInfo: function (callback) {
                    Vue.http.get('/admin/auth/userinfo.shtml').then(
                        function (response) {
                            Vue.$xz.auth.user.account = JSON.parse(response.data).userinfo.account;
                            Vue.$xz.auth.user.id = JSON.parse(response.data).userinfo.id;
                            Vue.$xz.auth.user.userType = JSON.parse(response.data).userinfo.user_type;
                            callback(Vue.$xz.auth.user);
                        },
                        function (response) {
                        }
                    )
                },
                isAvailable: function () {
                    var account = Vue.$xz.auth.user.account
                    if (account.length <= 0) {
                        account = Cookies.get('xz-account');
                        if (typeof(account) != 'undefined') {
                            Vue.$xz.auth.user.account = account
                        }
                    }
                    var userId = Vue.$xz.auth.user.id;
                    if (!userId) {
                        userId = Cookies.get('xz-userid');
                        Vue.$xz.auth.user.id = userId;
                    }
                    var userType = Vue.$xz.auth.user.userType;
                    if(!userType){
                        userType = Cookies.get('xz-usertype');
                        Vue.$xz.auth.user.userType = userType;
                    }
                    return Vue.$xz.auth.user.account.length > 0
                },
                getUserAccount: function () {
                    return Vue.$xz.auth.user.account
                },
                getUserId: function () {
                    return Vue.$xz.auth.user.id;
                },
                userInfoInflate: function (user) {
                    Vue.$xz.auth.user.account = user.account;
                    Vue.$xz.auth.user.id = user.id;
                    Vue.$xz.auth.user.userType = user.userType;
                    Cookies.set('xz-account', user.account);
                    Cookies.set('xz-userid', user.id);
                    Cookies.set('xz-usertype', user.userType);
                },
                exit: function (context) {
                    Vue.http.get('/admin/auth/logout.shtml').then(function (response) {
                        Vue.$xz.auth.user.account = ''
                        Cookies.set('xz-account', '');
                        Cookies.set('xz-userid','');
                        Cookies.set('xz-usertype','');
                        context.$route.router.go({name: 'login'})
                    }, function (response) {
                        $.toast("无法连接到服务器，请稍后重试", "warning").show();
                    });
                }
            }
        }
    }
}
