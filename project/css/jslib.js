$(document).ready(function() {


/*-------汉堡包菜单组件start---------------------*/
  $(".burgerMenuIcon").click(function() {
        $(this).attr('class', 'burgerMenuIcon open');
   });
  $("#burgerPopMenu .redCloseX").click(function(event) {
      $("a.burgerMenuIcon").attr('class', 'burgerMenuIcon');
  });
/*--------汉堡包菜单组件over----------------------------*/


/*--------瀑布布局start-------初始化执行，resize执行-----------*/
//定义瀑布布局函数，外部传入参数： rowItemNum 一行的个数

Array.prototype.max = function () {          //原本Array里面是没有max函数的，如果要赵最大值必须自己写一个max方法
    var max = this[0];
    for (var i = 1; i < this.length; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
}
jQuery.fn.waterFlowSet=function(rowItemNum){
    var oneRowItemNum = rowItemNum;
    var heightArr = [];
    var waterflowContainerWidth = $(".waterflowContainer").width();
    console.log("container的宽度"+ waterflowContainerWidth);
    console.log("瀑布布局里有的item数量:"+$(".waterflowContainer .waterflowItem").length);
    $(".waterflowContainer .waterflowItem").each(function(index, el) {
        if(undefined  == heightArr[index%oneRowItemNum]){
            heightArr[index%oneRowItemNum] = 0;
            $(this).css('top', '0px');
            console.log("第:"+index+"个元素top:0px");
        }else{
            $(this).css('top', heightArr[index%oneRowItemNum]);
            console.log("第:"+index+"个元素top:"+heightArr[index%oneRowItemNum]+"px");
        }
        $(this).css('width', waterflowContainerWidth/oneRowItemNum);
        $(this).css('left', (index%oneRowItemNum)*waterflowContainerWidth/oneRowItemNum);
        heightArr[index%oneRowItemNum]+=$(this).height();
        console.log("第:"+index+"个元素的高度是"+$(this).height());
    });
    console.log("最高height为："+heightArr.max());
    $(".waterflowContainer").css('height', heightArr.max());        //撑开容器
}
//在window的load事件里面初始化布局，并且托管到
$(".waterflowContainer").waterFlowSet(3); //对外部组件使用瀑布布局，传入参数为4代表一行4个元素
$(window).resize(function() {
    console.log("触发了window resize事件");
    $(".waterFlowSet").waterFlowSet(3);
});

/*--------瀑布布局end------------------*/

/*--lazyload读取图片（当移动到附近时才加载图片） start--初始化执行，scroll执行--------------*/
jQuery.fn.lazyLoadFunc=function(attr){
    console.log($(document).scrollTop());
    $("img[lazyLoadSrc]").each(function(index, el) {            
        if(($(this).offset().top- $(document).scrollTop())<attr*($(window).height())){
            if($(this).attr("src")==undefined){
                $(this).attr('src',$(this).attr("lazyLoadSrc"));
                console.log("第"+index+"个lazyLoad图片开始加载");
            }
        }
    });
}
$("img[lazyLoadSrc]").lazyLoadFunc(1);
$(window).scroll(function(event) {
   $("img[lazyLoadSrc]").lazyLoadFunc(1);
});




/*--lazyload读取图片（当移动到附近时才加载图片） over----------------*/



});