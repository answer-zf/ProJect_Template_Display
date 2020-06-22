$(function () {
    var page_width = $(window).width()
    var page_height = $(window).height()
    var page_one_banner_height = $(window).height() - 100
    var number_now_page = 0 // 当前所在页面值 - 1
    var flag_once_scroll = 0 // 防止过度滚动标记
    var flag_start_scroll = true // 开始滚动标记
    var length_element_page = $('.page').length

    // 首页重置
    $('.main').css({
        top: 0,
    })

    // 同步屏幕尺寸

    $('body,.main,.page,.zf_page4_bg')
        .css({ width: page_width })
        .css({ height: page_height })

    $('.zf-bannerbg')
        .css({ width: page_width })
        .css({ height: page_one_banner_height })

    // 指示器

    for (var i = 0; i < length_element_page; i++) {
        $('.pagination').append('<li></li>')
    }

    $('.pagination').find('li').eq(0).addClass('active')

    $('.pagination li').click(function () {
        number_now_page = $(this).index()
        $('.main')
            .stop()
            .animate({ top: -number_now_page * page_height }, 800)
        $('.pagination')
            .find('li')
            .eq(number_now_page)
            .addClass('active')
            .siblings()
            .removeClass('active')
    })

    // 点击回滚按钮

    $('#to_top').click(function () {
        $('.main').stop().animate({ top: 0 }, 1000)
        number_now_page = 0
        $('#to_top').removeClass('show')
        $('.pagination')
            .find('li')
            .eq(0)
            .addClass('active')
            .siblings()
            .removeClass('active')
        $('.pagination').addClass('hide')
    })

    // 向下滚动

    function scroll_down() {
        if (number_now_page < length_element_page - 1 && flag_start_scroll) {
            $('.pagination').removeClass('hide')
            //不在最后一页的时候

            number_now_page++
            flag_once_scroll++
            flag_start_scroll = false
            if (flag_once_scroll == 1) {
                //只有在滚轮滚动一次时才执行下面的。
                $('.main')
                    .stop()
                    .animate(
                        { top: -number_now_page * page_height },
                        800,
                        function () {
                            flag_start_scroll = true
                            flag_once_scroll = 0
                        }
                    )
            }
            $('#to_top').addClass('show')
        } else if (flag_start_scroll) {
            //在最后一页的时候

            flag_once_scroll++
            flag_start_scroll = false
            if (flag_once_scroll == 1) {
                //只有在滚轮滚动一次时才执行下面的。
                $('.main')
                    .stop()
                    .animate(
                        { top: -number_now_page * page_height - 300 },
                        800,
                        function () {
                            flag_start_scroll = true
                            flag_once_scroll = 0
                        }
                    )
            }
        }
    }

    // 向上滚动

    function scroll_up() {
        if (number_now_page > 0 && flag_start_scroll) {
            // 返回顶部按钮 第一页消失
            if (number_now_page == 1) {
                $('#to_top').removeClass('show')
                $('.pagination').addClass('hide')
            }

            //不在第一页的时候
            number_now_page--
            flag_once_scroll++
            flag_start_scroll = false
            if (flag_once_scroll == 1) {
                //只有在滚轮滚动一次时才执行下面的。
                $('.main')
                    .stop()
                    .animate(
                        { top: -number_now_page * page_height },
                        800,
                        function () {
                            flag_start_scroll = true
                            flag_once_scroll = 0
                        }
                    )
            }
        }
    }

    function scrollFunc(e) {
        e = e || window.event //给e赋值event对象
        if (e.wheelDelta) {
            //IE/Opera/Chrome 情况时执行
            if (e.wheelDelta <= -120) {
                //判断滚轮是否下滚
                scroll_down()
            } else if (e.wheelDelta >= 120) {
                //判断滚轮是否往上滚动
                scroll_up()
            }
        } else if (e.detail) {
            //火狐 情况时执行
            if (e.detail >= 3) {
                //滚轮往下滚动时
                scroll_down()
            } else if (e.detail <= -3) {
                //判断滚轮是否往上滚动
                scroll_up()
            }
        }
        $('.pagination')
            .find('li')
            .eq(number_now_page)
            .addClass('active')
            .siblings()
            .removeClass('active')
    }

    // 注册事件

    // 火狐浏览的事件绑定方式
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false)
    }
    // IE/Opera/Chrome...
    window.onmousewheel = document.onmousewheel = scrollFunc
})
