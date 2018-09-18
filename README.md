# 介绍

本项目为Bootstrap分页插件。

支持版本：Bootstrap 4.0+

# 使用

Step1 添加静态文件

```javascript
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="js/jquery.slim.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-paginator.js"></script>
```

Step 2 增加调用代码

```javascript
<div id="pageDiv">
</div>
<script>
    paginator.init("pageDiv", 10, "pindex");
    paginator.show(paginator.getUrlParam("pindex"));
</script>
```

# 效果展示

静态图片：![](http://icdn.apigo.cn/blog/bs-pageing-1.png)

动态图片：![](http://icdn.apigo.cn/blog/bs-pageing-2.gif)

