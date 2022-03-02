require(['common/util', 'common/http', 'wechat/common/wxShare_main'], function(util, http, wxShare) {
    init()
    let flag = true

    function init() {
        wxShare._hideMenu()
        bind()
    }

    /**
     * 事件绑定
     */
    function bind() {
        util.bindEvents([
            {
                el: '.js-work-a',
                event: 'click',
                handler: function() {
                    $('.js-work').show()
                    $('.js-login').hide()
                    $('.js-unlogin').hide()
                    $('#work').addClass('active')
                    $('#message').removeClass('active')
                    document.getElementById('outerbox').style.height = 'calc(100% - 40px)'
                }
            },
            {
                el: '#message',
                event: 'click',
                handler: function() {
                    $('.js-work').hide()
                    let index = $('#index').val()
                    if (index == 1) {
                        $('.js-login').show()
                    } else {
                        $('.js-unlogin').show()
                    }
                    $('#message').addClass('active')
                    $('#work').removeClass('active ')
                    document.getElementById('outerbox').style.height = 'calc(100% - 80px)'
                }
            },
            {
                el: '.js_consult',
                event: 'click',
                handler: function() {
                    let openid = $('#openid').val()
                    http.httpRequest({
                        url:
                            window.location.protocol +
                            '//' +
                            window.location.host +
                            '/wechat/gsll/send_message?openid=' +
                            openid,
                        success: function() {
                            _closeWindow()
                        }
                    })
                }
            },
            {
                el: '.js-unlogin',
                event: 'click',
                handler: function() {
                    if (flag) {
                        let flagIndex = $('#flag').val()
                        let loginInfo = $('#loginInfo').val()
                        if (flagIndex == 'false') {
                            location.href =
                                'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=' +
                                window.__LBSP_WEB_INFO__.wechat_biz +
                                '&scene=110#wechat_redirect'
                        } else {
                            location.href =
                                window.__LBSP_WEB_INFO__.user_url +
                                '/wechat/user/to_user_login?info=' +
                                loginInfo +
                                '&returnFlag=gsll'
                        }
                    }
                }
            },
            {
                el: '.js_open',
                event: 'click',
                handler: function() {
                    if (flag) {
                        $('.js-open').removeClass('js_close')
                        $('.js-open').addClass('category js_open js-open')
                        $(this).removeClass()
                        $(this).addClass('category js_close js-open')
                        let id = $(this).data('id')
                        $('.js-close').hide()
                        $('.js-open').show()
                        $('.js-show').show()
                        $('.js-hide').hide()
                        $('#' + id).show()
                        $('#' + id + 'close').show()
                        $('#' + id + 'open').hide()
                    }
                }
            },
            {
                el: '.js_close',
                event: 'click',
                handler: function() {
                    if (flag) {
                        $(this).removeClass()
                        $(this).addClass('category js_open')
                        let id = $(this).data('id')
                        $('#' + id).hide()
                        $('#' + id + 'close').hide()
                        $('#' + id + 'open').show()
                    }
                }
            },
            {
                el: '.js-a',
                event: 'click',
                handler: function(e) {
                    if (flag) {
                        // e.stopImmediatePropagation();
                        window.location.href = $(this).data('url')
                    }
                }
            },
            {
                el: '#checkForm',
                event: 'click',
                handler: function() {
                    $('#checkForm').submit()
                }
            },
            {
                el: '.js-yr',
                event: 'click',
                handler: function() {
                    let subscribeFlag = $('#subscribeFlag').val()
                    if (subscribeFlag == 'false') {
                        let subsribeUrl = $('#subsribeUrl').val()
                        // 未关注，跳转到公众号关注页面
                        window.location.href = subsribeUrl
                    } else {
                        // 关注了
                        let openid = $('#openid').val()
                        http.httpRequest({
                            url:
                                window.location.protocol +
                                '//' +
                                window.location.host +
                                '/wechat/gsll/annual_report_send_message?openid=' +
                                openid,
                            success: function() {
                                _closeWindow()
                            }
                        })
                    }
                    // if (flag) {
                    //     $('.custom-mask').addClass('custom-mask--visible');
                    //     $('.custom-actionsheet').addClass('custom-actionsheet_toggle');
                    //     $('.custom-mask').show();
                    //     $('.custom-actionsheet').show();
                    // }
                }
            } /*, {
            el: '.custom-mask',
            event: 'click',
            handler: function () {
                $('.custom-mask').hide();
                $('.custom-actionsheet').hide();
                $('.custom-mask').removeClass('custom-mask--visible');
                $('.custom-actionsheet').removeClass('custom-actionsheet_toggle');
            }
        }*/
        ])
    }

    function _closeWindow() {
        if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
        } else {
            onBridgeReady()
        }
    }

    function onBridgeReady() {
        WeixinJSBridge.call('closeWindow')
    }

    //左右滑动事件
    /* $("body").on("touchstart",
         function (e) {
             // 判断默认行为是否可以被禁用
             if (e.cancelable) {
                 // 判断默认行为是否已经被禁用
                 if (!e.defaultPrevented) {
                     e.preventDefault();
                 }
             }
             startX = e.originalEvent.changedTouches[0].pageX,
                 startY = e.originalEvent.changedTouches[0].pageY;
         });
     $("body").on("touchend", function (e) {
         // 判断默认行为是否可以被禁用
         console.log(e)
         if (e.cancelable) {
             // 判断默认行为是否已经被禁用
             if (!e.defaultPrevented) {
                 e.preventDefault();
             }
         }
         moveEndX = e.originalEvent.changedTouches[0].pageX,
             moveEndY = e.originalEvent.changedTouches[0].pageY,
             X = moveEndX - startX;
         Y = moveEndY - startY;
         //左滑
         if (X > 100) {
             $('.js-work').hide();
             var index = $("#index").val();
             if (index == 1) {
                 $('.js-login').show();
             } else {
                 $('.js-unlogon').show();
             }
             $('#message').addClass("active");
             $('#work').removeClass("active");
             document.getElementById('outerbox').style.paddingBottom = "60px"
             flag = false;
         }
         //右滑
         else if (X < -100) {
             $('.js-work').show();
             $('.js-login').hide();
             $('.js-unlogon').hide();
             $('#work').addClass("active");
             $('#message').removeClass("active");
             document.getElementById('outerbox').style.paddingBottom = "2px"
             flag = false;
         }
         else if (Y > 300) {

         }
         else if (Y < -300) {

         }
         //单击
         else if (X == 0) {
             flag = true;
         }

     });*/
})
