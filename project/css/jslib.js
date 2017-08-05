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

/*--------等比缩放组件start  onload函数------------*/
jQuery.fn.setResposityImg=function(attr){
    $(".resposityImgContainer").each(function(index, el) {
       if($(el).find('.resposityImg').width()>$(el).width()){
            $(el).find('.resposityImg').css({
                height: 'auto',
                width: '100%'
            });
             $(el).find('.resposityImg').css({
                "margin-top": ($(el).height()-$(el).find('.resposityImg').height())/2
            }); //之所以不与前面合并在一起是因为要等布局完成才能获得height
       }
    });
}

 window.onload = function() {  //一定要在onload函数中执行，否则无法获取图片真实宽度

       $(".resposityImgContainer").setResposityImg("");

}
/*-----等比缩放组件over---------------*/

/*-----拖拽幻灯图片组件start---------------*/
//定义初始化函数,initIndex为显示的img的index
jQuery.fn.initGalary=function(initIndex,lazyLoadNo){
    console.log("---initIndex------"+initIndex);
     console.log("----lazyLoadNo---"+lazyLoadNo);
    if(undefined != lazyLoadNo && lazyLoadNo>0){
        for (var i = 0; i <= lazyLoadNo; i++) {
            if(initIndex-i>=0){
               if(undefined == $(this).find('.galaryItem').eq(initIndex-i).attr('src')){
                    $(this).find('.galaryItem').eq(initIndex-i).attr('src',$(this).find('.galaryItem').eq(initIndex-i).attr('galaryItemLazyLoadSrc'));
               }
            }
            if(initIndex+i<$(this).find('.galaryItem').length){
                if(undefined == $(this).find('.galaryItem').eq(initIndex+i).attr('src')){
                        $(this).find('.galaryItem').eq(initIndex+i).attr('src',$(this).find('.galaryItem').eq(initIndex+i).attr('galaryItemLazyLoadSrc'));
               }
            }
        };
    }
     //遍历每一个.galaryWindow页面中可能不止一处用了这个
        $(this).find('.galaryItem').each(function(index, el) { 
            if($(el).width()>$(el).parent('.galaryWindow').width()){
                $(el).css({
                   height: 'auto',
                    width: '100%'
                }); //默认是根据height=100%的，如果横向溢出就根据width = 100%
            }
        });
       
        $(this).find('.galaryItem').attr('show', '0').css({
            position: 'absolute',
            top: $(this).height()
        }); //对于window的子元素全部隐藏到window下方，设置属性为不可见

        //index位置以及相邻位置的img标签设置纵向居中，横向居中
        //
        $(this).find('.galaryItem').eq(initIndex).attr('show', '1').css({
            top: ($(this).height()-$(this).find('.galaryItem').eq(initIndex).height())/2,
            position: 'absolute',
            left: ($(this).width()-$(this).find('.galaryItem').eq(initIndex).width())/2
        }); 
        $(this).find('.galaryItem[show=1]').next('.galaryItem').css({
            position: 'absolute',
            top: ($(this).height()-$(this).find('.galaryItem[show=1]').next('.galaryItem').height())/2,
            left: $(this).width()
        });
        $(this).find('.galaryItem[show=1]').prev('.galaryItem').css({
            position: 'absolute',
            top: ($(this).height()-$(this).find('.galaryItem[show=1]').prev('.galaryItem').height())/2,
            left:-$(this).find('.galaryItem[show=1]').prev('.galaryItem').width()
        });
};  
//定义初始化函数结束


jQuery.fn.setGalary=function(attrObj){
   $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);  //this指window
   attrObj.status = 0;
   attrObj.mousedownX = 0;
   attrObj.clickpointInPicX = 0;
   //图片加mousedown事件监听
   $(this).find('.galaryItem').mousedown(function(mouseDownEvent) { 
        $(this).siblings(' .galaryItem').css('transition', 'none');  //this指window
        $(this).css('transition', 'none');
        mouseDownEvent.preventDefault();
        attrObj.status = 1;
        console.log("galary鼠标按下事件");
        attrObj.mousedownX = mouseDownEvent.pageX;
        attrObj.clickpointInPicX = attrObj.mousedownX - $(this).offset().left;
   });
    
    //mousemove事件监听
    $(this).mousemove(function(mouseMoveEvent) {
    if(attrObj.status==1){
            $(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').css('left', mouseMoveEvent.pageX-$(mouseMoveEvent.currentTarget).offset().left - attrObj.clickpointInPicX); 
            $(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').next('.galaryItem').css('left', mouseMoveEvent.pageX-$(mouseMoveEvent.currentTarget).offset().left - attrObj.clickpointInPicX+$(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').width()+($(mouseMoveEvent.currentTarget).width()- $(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').width())/2);
            $(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').prev('.galaryItem').css('left', mouseMoveEvent.pageX-$(mouseMoveEvent.currentTarget).offset().left - attrObj.clickpointInPicX-($(mouseMoveEvent.currentTarget).width()- $(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').width())/2-$(mouseMoveEvent.currentTarget).find('.galaryItem[show=1]').prev('.galaryItem').width());
    }});

    //mouseup事件监听
    $(this).mouseup(function(mouseUpEvent) {
        console.log("galary鼠标放开事件");
        if($(mouseUpEvent.currentTarget).find('.galaryItem[show=1]').position().left+$(mouseUpEvent.currentTarget).find('.galaryItem[show=1]').width()<$(mouseUpEvent.currentTarget).width()/2){
            console.log('左移动成功');
            if (attrObj.showIndex<$(mouseUpEvent.currentTarget).find('.galaryItem').length-1) {
                attrObj.showIndex = attrObj.showIndex+1;
            };
            $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
            $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);
        }else if($(this).find('.galaryItem[show=1]').position().left>$(this).width()/2){
            console.log('右移动成功');
            if(attrObj.showIndex>0){
                attrObj.showIndex = attrObj.showIndex-1;
            }
            $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
            $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);
        }else{
             console.log('复位');
             $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
            $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);
        }
           attrObj.status=0;
           attrObj.mousedownX = 0;
           attrObj.clickpointInPicX = 0;
    });

    //mouseleave事件监听
        $(this).mouseleave(function(mouseLeaveEvent) {
           if(attrObj.status == 1){
            console.log("galary鼠标移出galary容器");
            if($(this).find('.galaryItem[show=1]').position().left+$(this).find('.galaryItem[show=1]').width()<$(this).width()/2){
            console.log('左移动成功');
            if (attrObj.showIndex<$(this).find('.galaryItem').length-1) {
                attrObj.showIndex = attrObj.showIndex+1;
            };
            $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
            $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);

        }else if($(this).find('.galaryItem[show=1]').position().left>$(this).width()/2){
            console.log('右移动成功');
            if(attrObj.showIndex>0){
                attrObj.showIndex = attrObj.showIndex-1;
            }
            $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
            $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);


        }else{
             console.log('复位');
             $(this).find('.galaryItem').css({
                transition: 'left 1s',
            });
             $(this).initGalary(attrObj.showIndex,attrObj.lazyLoadNum);
        }

            attrObj.status = 0;
            attrObj.mousedownX=0;
            attrObj.clickpointInPicX = 0;
           }
       }); 
 };

var attrObj1={
    showIndex:0
};
$('#galaryWindow1').setGalary(attrObj1);
var attrObj2={
    showIndex:0,
    lazyLoadNum:2
};
$('#galaryWindow2').setGalary(attrObj2);

/*-----拖拽幻灯图片组件over---------------*/

/*---高度随宽度缩放组件start------*/
jQuery.fn.heightSetByWidth=function(){
    $('[heightAttr]').each(function(index, el) {
        $(el).css('height', $(el).width()*$(el).attr('heightAttr'));
    });
}
$('body').heightSetByWidth();
/*---高度随宽度缩放组件over------*/

/*---进度条组件start------*/
jQuery.fn.initProgressBar=function(progressVal){
     console.log("传入的参数是"+progressVal);
     $(this).css('width', progressVal);
};  
jQuery.fn.setProgressBar=function(){
     $(".progressBar").each(function(index, el) {
        console.log("第"+index+"个progressBar的参数是："+$(el).find('.progressFulfill').attr('progressVal'))
         $(el).find('.progressFulfill').initProgressBar($(el).find('.progressFulfill').attr('progressVal'))
     });
};  
$('body').setProgressBar();

/*---进度条组件over------*/



});