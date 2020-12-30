$(function () {
    getUserInfo()
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res.data);
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户名称
    var uname = user.nickname || user.username
    // 2.设置文本
    $('#welcome').html(`欢迎  ${uname}`)
    // 3.渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase()).show()
    }
}

var layer = layui.layer
$('#btnLogout').on('click', function (e) {

    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index)
    })
    e.preventDefault()
})