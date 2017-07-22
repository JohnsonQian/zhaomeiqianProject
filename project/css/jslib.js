$(document).ready(function() {

/*-------顶部导航菜单start---------------------*/
$(window).scroll(function(event) {
  if ($(document).scrollTop()>20) {
    $(".topMenu").css('background-color', 'rgba(247,247,247,0.9)');
  }else{
    $(".topMenu").css('background-color', 'rgba(247,247,247,0)');
  } 
});

/*--------顶部导航菜单over----------------------------*/






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

/*--------等比缩放组件start------------*/
jQuery.fn.setResposityImg=function(attr){
    $(".resposityImgContainer").each(function(index, el) {
       if($(el).find('.resposityImg').width()>$(el).width()){
            $(el).find('.resposityImg').css({
                height: 'auto',
                width: '100%'
            });
       }
    });
}
 $(".resposityImgContainer").setResposityImg("");
/*-----等比缩放组件over---------------*/

/*-----拖拽幻灯图片组件start---------------*/
jQuery.fn.initGalary=function(initIndex){
    $(".galaryWindow").each(function(index, el) {
        $(el).find('.galaryItem').each(function(index, el) {
            if($(el).width()>$('.galaryWindow').width()){
                $(el).css({
                   height: 'auto',
                    width: '100%'
                });
            }
        });
       

$(el).find('.galaryItem').attr('show', '0').css({
            position: 'absolute',
            top: $(this).height()
        });

       $(el).find('.galaryItem').eq(initIndex).attr('show', '1').css({
        top: ($('.galaryWindow').height()-$(el).find('.galaryItem').eq(initIndex).height())/2,
            position: 'absolute',
            left: ($(this).width()- $(el).find('.galaryItem').eq(initIndex).width())/2
        });

       
       
        $(el).find('.galaryItem[show=1]').next('.galaryItem').css({
            position: 'absolute',
            top: ($('.galaryWindow').height()-$(el).find('.galaryItem[show=1]').next('.galaryItem').height())/2,
            left: $(this).width()
        });
        $(el).find('.galaryItem[show=1]').prev('.galaryItem').css({
            position: 'absolute',
            top: ($('.galaryWindow').height()-$(el).find('.galaryItem[show=1]').prev('.galaryItem').height())/2,
            left:-$(el).find('.galaryItem[show=1]').prev('.galaryItem').width()
        });

       });

};  //初始化函数定义结束




var showIndex = 0;
$(".galaryWindow").initGalary(showIndex);
 var status = 0;
    var mousedownX = 0;
    var clickpointInPicX = 0;
   $(".galaryWindow .galaryItem").mousedown(function(mouseDownEvent) {
    $(".galaryWindow .galaryItem").css('transition', 'none');
    mouseDownEvent.preventDefault();
    status = 1;
    console.log("galary鼠标按下事件，pageX = "+mouseDownEvent.pageX);
       mousedownX = mouseDownEvent.pageX;
       clickpointInPicX = mousedownX - $(this).offset().left;
       
   });
   $('.galaryWindow').mousemove(function(mouseMoveEvent) {
    if(status==1){
        console.log("galary鼠标移动事件，pageX = "+mouseMoveEvent.pageX);
           $('.galaryWindow .galaryItem[show=1]').css('left', mouseMoveEvent.pageX-$('.galaryWindow').offset().left - clickpointInPicX); 
           $('.galaryWindow .galaryItem[show=1]').next('.galaryItem').css('left', mouseMoveEvent.pageX-$('.galaryWindow').offset().left - clickpointInPicX+$('.galaryWindow .galaryItem[show=1]').width()+($('.galaryWindow').width()- $('.galaryItem[show=1]').width())/2);
            $('.galaryWindow .galaryItem[show=1]').prev('.galaryItem').css('left', mouseMoveEvent.pageX-$('.galaryWindow').offset().left - clickpointInPicX-($('.galaryWindow').width()- $('.galaryItem[show=1]').width())/2-$('.galaryWindow .galaryItem[show=1]').prev('.galaryItem').width());
    }});

     $('.galaryWindow').mouseup(function(mouseUpEvent) {
        console.log("galary鼠标放开事件");
        if($('.galaryWindow .galaryItem[show=1]').position().left+$('.galaryWindow .galaryItem[show=1]').width()<$('.galaryWindow').width()/2){
            console.log('左移动成功');
            if (showIndex<$('.galaryWindow .galaryItem').length-1) {
                showIndex = showIndex+1;
            };
            $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
            $(".galaryWindow").initGalary(showIndex);
        }else if($('.galaryWindow .galaryItem[show=1]').position().left>$('.galaryWindow').width()/2){
            console.log('右移动成功');
            if(showIndex>0){
                showIndex = showIndex-1;
            }
            $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
            $(".galaryWindow").initGalary(showIndex);
        }else{
             console.log('复位');
             $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
            $(".galaryWindow").initGalary(showIndex);
        }
           status=0;
           mousedownX = 0;
           clickpointInPicX = 0;
    });
       $('.galaryWindow').mouseleave(function(mouseLeaveEvent) {
           if(status == 1){
            console.log("galary鼠标移出galary容器");
            if($('.galaryWindow .galaryItem[show=1]').position().left+$('.galaryWindow .galaryItem[show=1]').width()<$('.galaryWindow').width()/2){
            console.log('左移动成功');
            if (showIndex<$('.galaryWindow .galaryItem').length-1) {
                showIndex = showIndex+1;
            };
            $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
            $(".galaryWindow").initGalary(showIndex);




        }else if($('.galaryWindow .galaryItem[show=1]').position().left>$('.galaryWindow').width()/2){
            console.log('右移动成功');
            if(showIndex>0){
                showIndex = showIndex-1;
            }
            $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
            $(".galaryWindow").initGalary(showIndex);


        }else{
             console.log('复位');
             $('.galaryWindow .galaryItem').css({
                transition: 'left 1s',
            });
             $(".galaryWindow").initGalary(showIndex);
        }

            status = 0;
            mousedownX=0;
            clickpointInPicX = 0;
           }

       }); 
/*-----拖拽幻灯图片组件over---------------*/








});