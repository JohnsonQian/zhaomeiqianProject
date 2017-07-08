$(document).ready(function() {


/*-------汉堡包菜单组件start---------------------*/
  $(".burgerMenuIcon").click(function() {
        $(this).attr('class', 'burgerMenuIcon open');
   });
  $("#burgerPopMenu .redCloseX").click(function(event) {
      $("a.burgerMenuIcon").attr('class', 'burgerMenuIcon');
  });
/*--------汉堡包菜单组件over----------------------------*/











});