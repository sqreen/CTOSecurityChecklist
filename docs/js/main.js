// Isotope filtering
//========================================
var $grid = $('.checklist').isotope();
$grid.isotope({
  filter: "*"
})

// Show seed items
$('.filter-bar .seed').on( 'click', function() {
  $('.filter-bar li').removeClass('selected');
  $('.filter-bar ul').removeClass();
  $(this).parent().addClass('selected-one');
  $grid.isotope({
    transitionDuration: 300,
    filter: ".seed"
  });
});
// Show seriesa items
$('.filter-bar .seriesa').on( 'click', function() {
  $('.filter-bar li').removeClass('selected');
  $('.filter-bar ul').removeClass();
  $(this).parent().addClass('selected-two');
  $grid.isotope({
    transitionDuration: 300,
    filter: ".seriesa, .seed"
  });
});
// Show all item
$('.filter-bar .above').on( 'click', function() {
  $('.filter-bar li').removeClass('selected');
  $('.filter-bar ul').removeClass();
  $(this).parent().addClass('selected-three');
  $grid.isotope({
    transitionDuration: 300,
    filter: '*'
  })
});

// Smooth scrolling
//========================================
$('nav a').click(function(e){
  e.preventDefault();
  $('nav li').removeClass('active');
  $(this).parent().addClass('active');
  var target = $(this).attr('href');

  $('html, body').animate({
    scrollTop: $(target).offset().top - 100
  }, 1000);
});

// Check
//========================================
$('.check').click(function(){
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).parent().find('.expend-bar').removeClass('checked');
  }
  else {
    $(this).addClass('checked');
    $(this).parent().find('.expend-bar').addClass('checked');
  }
});

// Expend/collapse
//========================================
$('.btn, .expend-bar').click(function(){
  var parent = $(this).parent().parent();
  var body = $(parent).find(".body");

  if ($(parent).hasClass('expend')) {
    $(parent).removeClass('expend');
    $(body).slideUp(300);
    $grid.isotope();
  }
  else {
    $(parent).addClass('expend');
    $(body).slideDown(300);
    $grid.isotope();
  }
});

// Open/close menu mobile
//========================================
$('.burger').click(function(){
  $('.mobile-menu').show();
  setTimeout(function(){
    $('.mobile-menu').addClass('open');
  }, 100);
});
$('.close, .mobile-menu .nav a').click(function(){
  $('.mobile-menu').removeClass('open');

  setTimeout(function(){
    $('.mobile-menu').hide();
  }, 600);
});

// Open share links in a popup
//========================================
$('.social a, .social-mob a').click(function(e){
  e.preventDefault();
  function mypopup(link) {
    mywindow = window.open(link, "Share it!", "location=1,status=1,scrollbars=1,  width=900,height=700");
    mywindow.moveTo(window.innerWidth/4, 100);
  }
  mypopup($(this).attr('href'));
});

// Scrollspy
//========================================
$('.scrollspy').on('scrollSpy:enter', function() {
    var enterId = $(this).attr('id');
    $('nav').find('a[href$='+enterId+']').parent().addClass('active');
});

$('.scrollspy').on('scrollSpy:exit', function() {
    var exitId = $(this).attr('id');
    $('nav').find('a[href$='+exitId+']').parent().removeClass('active');
});
$('.scrollspy').scrollSpy();
// $.winSizeSpy().on('scrollSpy:winSize', funcy);
