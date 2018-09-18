"use strict";
var paginator = {
    init: function (elementId, totalPages, paramKey, pageMaxCount = 5) {
        this.elementId = elementId;// 附近分页的控件id
        this.totalPages = totalPages;// 总页数
        this.pageMaxCount = pageMaxCount;// 每页最大页数【注意：最大页码必须是大于1的奇数3、5、7...】
        this.paramKey = paramKey;// url当前页码的key
    },
    show: function (currentPage) {
        if (this.totalPages <= 1) {
            return false;
        }
        currentPage = parseInt(currentPage);
        if (currentPage <= 0 || isNaN(currentPage)) {
            currentPage = 1;
        } else if (currentPage > this.totalPages) {
            currentPage = this.totalPages;
        }
        var startPage = currentPage; // 开始页码
        var endPage = this.totalPages; // 结束页码
        var preLock = false; // 上一页按钮锁定
        var nextLock = false; // 下一页按钮锁定
        var intervalNumber = parseInt(this.pageMaxCount / 2); // 当前页要居中，计算前后间隔的个数
        if (this.totalPages <= this.pageMaxCount) {
            // （未超过每页最大页码）全部页码展示
            startPage = 1;
            endPage = this.totalPages;
        } else { //超过每页最大页码
            if (this.totalPages < (currentPage + intervalNumber)) {
                //已经到最后间隔页码了，往后分页页码不能移动了

                endPage = this.totalPages;
                startPage = endPage - this.pageMaxCount + 1;
            } else if ((currentPage - intervalNumber) <= 0) {
                //已经到最前面的页码了，页码不能往前移动了

                startPage = 1;
                endPage = startPage + this.pageMaxCount - 1;
            } else {
                //中间，当前页居中，可移动
                startPage = currentPage - intervalNumber;
                endPage = startPage + this.pageMaxCount - 1;

            }
        }
        // 处理上一页、下一页 是否启用
        if (currentPage == 1) {
            //首页
            preLock = true;
            nextLock = false;
        } else if (this.totalPages == currentPage) {
            //最后一页
            preLock = false;
            nextLock = true;
        } else {
            preLock = false;
            nextLock = false;
        }

        // 组合html代码附加到控件
        var createHtml = '<ul class="pagination justify-content-center">';
        var url = window.location.href;
        var replaceVal = this.paramKey + "=" + paginator.getUrlParam(this.paramKey);
        if (!paginator.getUrlParam(this.paramKey)) {
            //添加参数
            var preNumber = currentPage <= 1 ? 1 : (currentPage - 1); //上一页页码
            url += (url.indexOf("?") == -1 ? "?" : "&") + this.paramKey + "=" + currentPage;
            replaceVal = this.paramKey + "=" + currentPage;
        }
        var preNumber = currentPage <= 1 ? 1 : (currentPage - 1); //上一页页码
        if (preLock) {
            createHtml += '<li class="page-item disabled">';
        } else {
            createHtml += '<li class="page-item">';
        }
        createHtml += '<a class="page-link" href="' +
            url.replace(replaceVal, (this.paramKey + "=" + preNumber)) + '">上一页</a></li>';
        //构建每项分页页码
        for (var index = startPage; index <= endPage; index++) {
            if (currentPage == index) {
                //标识选中当前页
                createHtml += '<li class="page-item active">';
            } else {
                createHtml += '<li class="page-item">';
            }
            createHtml += '<a class="page-link" href="' +
                url.replace(replaceVal, (this.paramKey + "=" + index)) + '">' + index + '</a></li>';
        }
        var nextNumber = currentPage >= this.totalPages ? this.totalPages : (currentPage + 1); //下一页页码
        if (nextLock) {
            createHtml += '<li class="page-item disabled">';
        } else {
            createHtml += '<li class="page-item">';
        }
        createHtml += '<a class="page-link" href="' +
            url.replace(replaceVal, (this.paramKey + "=" + nextNumber)) + '">下一页</a></li>';
        createHtml += '</ul>';
        jQuery("#" + this.elementId).html(createHtml);
    },
    getUrlParam: function (name) { //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
};


