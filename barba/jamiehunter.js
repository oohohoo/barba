/*
================================================================================
JEBIGA NE ZNAM TOČNO ŠTO SE OVSJE DOGAĐA???? CHECK
================================================================================
*/
var scrollbar;
var Scrollbar = window.Scrollbar;
var doWaypoints;
var doNextProjectWaypoint;
var titleTl = new TimelineMax();
var timerTl = new TimelineMax();
var nextProjectTl = new TimelineMax();
var goToContactTl = new TimelineMax();
let scrolling = false;
let projectInTimer;
var projectInView = 0;
let nextProjectInView = false;
let contactInview = false;
var logoTl;

/*
================================================================================
FUNKCIJE
================================================================================
*/
// -----------------------------------------------------------------------------

function splitValue(value, index) {
  return [value.substring(0, index) ,value.substring(index)];
}

// -----------------------------------------------------------------------------

function titleToWords(input){
  var inputString = input.text();//Content as String
  var positions = [];
  var splitString = inputString.split(".");//Split on .
  var firstString = splitString[0];//Get left side of .
  var getLimit = firstString.length;//Get the length of string
  for(var i=0; i<getLimit; i++){
    if(firstString[i].match(/[A-Z]/) != null){
      positions.push(i);//Push capital letter positions
    }
  }
  positions.push(getLimit);//Add length to positions array
  var stringsArray = [];
  $.each(positions, function( index, value ) {
    if(value != getLimit){
      stringsArray.push(inputString.substring(value, positions[index+1]));
    }
  });
  var wordsArray = [];
  $.each(stringsArray, function( index, value ) {
    wordsArray.push(splitValue(value, 1));
  });
  var flattened = [].concat.apply([],wordsArray);
  var spansArray = [];
  $.each(flattened, function( index, value ) {
    spansArray.push("<span class='words'>"+value+"</span>");
  });
  if(splitString[1] != ''){
    spansArray.push("<span class='dot'>.</span><span class='words'>"+splitString[1]+"</span>");
  }
  input.html(spansArray);
  input.find("span:even").addClass('initial');
  var elems = $(input).children();
  var wrapper = $('<span class="no-wrap"/>');
  var pArrLen = elems.length;
  for (var i = 0;i < pArrLen;i+=2){
      elems.filter(':eq('+i+'),:eq('+(i+1)+')').wrapAll(wrapper);
  };
}

// -----------------------------------------------------------------------------

function scrollTracker(){
  var scrollPercent = scrollbar.scrollTop / (scrollbar.limit.y / 100);
  var num = scrollPercent.toFixed(1);
  TweenMax.set($('#slider-indicator_inner_line_marker'), { top: ""+num+"%" });
  TweenMax.set($('#slider-indicator_inner_labels'), { top: ""+num+"%" });
}

// -----------------------------------------------------------------------------

function setupScrollTracker(target){
  TweenMax.to($('#slider-indicator'), 0.5, { opacity: 1 });
  var items = [];
  var dots = [];
  $.each(target, function(i, item) {
    items.push('<li><span>' + $(item).data('label') + '.</span></li>');
    dots.push('<li class="slider-indicator_inner_line_dots_dot"></li>');
  });
  $('#slider-indicator_inner_labels ul').append(items.reverse().join(''));
  $('#slider-indicator_inner_line_dots').append(dots.join(''));
  $.each(target, function(i, item) {
    var num = $(item).position().top / ($('.scroll-content').height() - $(window).height()) * 100;
    TweenMax.set($('#slider-indicator_inner_line_dots li').eq(i), { top: ""+num+"%" });
    let inView = false;
    scrollbar.addListener(function() {
      var last = target.length-1;
      var marker = $('#slider-indicator_inner_line_marker')[0].style.top;
      var dot = $('.slider-indicator_inner_line_dots_dot').eq(i)[0].style.top;
      if(i === last){
        var nextdot = $('#slider-indicator_inner_line_dots li').eq(last)[0].style.top;
      } else {
        var nextdot = $('#slider-indicator_inner_line_dots li').eq(i+1)[0].style.top;
      }
      var markerNum = parseInt(marker);
      var dotNum = parseInt(dot);
      var nextdotNum = parseInt(nextdot);
      if (!inView && markerNum >= dotNum-1 && markerNum < nextdotNum-1) {
        inView = true;
        TweenMax.to($('#slider-indicator_inner_labels_wrapper ul'), 0.5, { y: i*16+"px" });
      }
      if (!inView && i == last && markerNum >= 99) {
        //inView = true;
        TweenMax.to($('#slider-indicator_inner_labels_wrapper ul'), 0.5, { y: last*16+"px" });
      }
      if (inView && markerNum < dotNum || markerNum > nextdotNum-1) {
        inView = false;
      }
    })
  });
  TweenMax.to($('#slider-indicator_inner_labels'), 0.5, { height:"1.5em" });
  TweenMax.to($('#slider-indicator_inner_line_marker'), 0.5, { width:"7px" });
  TweenMax.staggerTo($('.slider-indicator_inner_line_dots_dot'), 0.5, { scale:1 }, 0.1);
  scrollbar.addListener( scrollTracker );
  scrollTracker();
}

// -----------------------------------------------------------------------------

function updateScrollTracker(){
  $.each($('.dot-marker'), function(i, item) {
    var num = $(item).position().top / ($('.scroll-content').height() - $(window).height()) * 100;
    TweenMax.set($('#slider-indicator_inner_line_dots li').eq(i), { top: ""+num+"%" });
  });
}

// -----------------------------------------------------------------------------

function clearScrollTracker(){
  TweenMax.staggerTo($('.slider-indicator_inner_line_dots_dot'), 0.5, { scale:0 },0.1);
  TweenMax.to($('#slider-indicator_inner_labels'), 0.5, { height:0 });
  TweenMax.to($('#slider-indicator_inner_line_marker'), 0.5, { width:0, onComplete: function(){
    $("#slider-indicator_inner_line_dots").empty();
    $("#slider-indicator_inner_labels ul").empty();
    TweenMax.set($('#slider-indicator_inner_labels'), { clearProps: "all" });
  }});
}

// -----------------------------------------------------------------------------

function setupProjects(){
  $(".project-name").each(function(){
    titleToWords($(this));
  });
  $('.project-name-caption').appendTo(".projectnames-js");
  $('.project-name-caption').wrap("<li class='title-container'></li>");
  $('.projectnames-js').insertAfter(".header");
  $('.title').addClass("lowercase");
  $(".lettering").lettering('words');
  $('.projects').addClass("projects-js");
  $('video').each(function () {
    this.currentTime = 0;
    this.pause();
  });
  $.each( $('.projects-page .project-middle'), function( i, el ){
    let inView = false;
    scrollbar.addListener(function() {
      if(doWaypoints){
        if (!inView && scrollbar.isVisible($(el)[0])) {
          inView = true;
          projectInView = i;
          titleIn($('.project-name-caption').eq(i));
          projectIn($('.project').eq(i));
        }
        if (inView && !scrollbar.isVisible($(el)[0])) {
          inView = false;
          titleOut($('.project-name-caption').eq(i))
          projectOut($('.project').eq(i));
        }
      }
    })
  });
}

// -----------------------------------------------------------------------------

function setupProject(){
  TweenMax.set($('.text'),{ visibility:"hidden" });
  TweenMax.set($('.text'), { opacity:0 });
  $.each( $('.text'), function( i, el ){
    let inView = false;
    scrollbar.addListener(function() {
      if (!inView && scrollbar.isVisible($(el)[0])) {
        inView = true;
        TweenMax.set($(el)[0],{ visibility:"visible" });
        TweenMax.to($(el)[0],2, { opacity:1 });
        TweenMax.from($(el)[0], 2, { y:"-10%", ease: Power4.easeOut, delay:0.2, onComplete:function(){
          TweenMax.set($(el)[0],{ clearProps:"all" });
        }});
      }
    })
  });
  $.each( $('.scale-trans'), function( i, el ){
    let inView = false;
    let first = true;
    scrollbar.addListener(function() {
      if (!inView && scrollbar.isVisible($(el)[0])) {
        inView = true;
        if(first == true){
          TweenMax.from($(el).children().first(), 2, { transformOrigin:"top", scale:1.1, ease: Power4.easeOut, opacity:0 });
        }
        if($(el).find('video').length){
          $(el).find('video').get(0).play();
        }
        first = false;
      }
      if (inView && !scrollbar.isVisible($(el)[0])) {
        inView = false;
        if($(el).find('video').length){
          $(el).find('video').get(0).pause();
        }
      }
    });
  });
};

// -----------------------------------------------------------------------------

function projectAppear(){
  TweenMax.from($('section header .figure-cropper'), 1.5, { x:"+10%", maxWidth:0, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  setTimeout(function(){
    var scrollTopDistance = -($('main').offset().top - $('article').find('.figure-cropper').offset().top);
    var scrollTop = parseInt(scrollTopDistance);
    scrollbar.scrollTo(0, scrollTop, 600);
  }, 2000);
}

// -----------------------------------------------------------------------------

function nextProjectWaypoint(){
  if (!nextProjectInView && scrollbar.isVisible($('.next-project .project-middle')[0])) {
    nextProjectInView = true;
    simpleIn($('.next-project_label'));
    var target = $('.next-project figcaption');
    var title = target.find('.title');
    var description = target.find('.lettering');
    var container = description.parent().parent();
    TweenMax.set(target,{ visibility:"visible" });
    TweenMax.set(description.find('span'),{ visibility:"hidden" });
    nextProjectTl = new TimelineMax();
    nextProjectTl.from(title.find('span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height" })
           .to(title.find('span span:not(.initial)'), 0.8, { width:0, autoAlpha:0, ease: Power4.easeInOut })
           .set(description.find('span'),{ clearProps:"visibility" })
           .to(target, 0.5, {y:"-25%", ease: Power2.easeInOut},"description")
           .staggerFrom(description.find('span'), 0.5, { height:0, autoAlpha:0, rotation:5, transformOrigin:"left bottom", ease: Power2.easeOut, clearProps:"all" }, 0.02, "description")
    var target2 = $('.next-project');
    if(target2.find('video').length){
      var video = target2.find('video');
      video.get(0).currentTime = 0;
      video.get(0).play();
    }
    TweenMax.set(target2, { visibility:"visible" });
    TweenMax.from(target2.find('.figure-cropper'), 1.5, { x:"+10%", maxWidth:0, autoAlpha:0, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
    TweenMax.from(target2.find('video'), 1.5, { scale:1.3, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
    TweenMax.from(target2.find('img'), 1.5, { scale:1.3, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  }
  if (nextProjectInView && !scrollbar.isVisible($('.next-project .project-middle')[0])) {
    nextProjectInView = false;
    var title = $('figcaption').find('.title');
    var description = $('figcaption').find('.lettering');
    TweenMax.to(title.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut, overwrite:1 });
    TweenMax.to(description.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut, overwrite:1 });
    $('.next-project').find('video').currentTime = 0;
    TweenMax.to($('.next-project').find('.figure-cropper'), 1.5, {
      maxWidth:0,
      ease: Power4.easeInOut,
      overwrite:1,
      onComplete: function(){
        TweenMax.set($('figcaption'), { clearProps:"all" });
        TweenMax.set($('.next-project'), { visibility:"hidden" });
        TweenMax.set($('.next-project').find('figure'), { clearProps:"all" });
        TweenMax.set($('.next-project').find('.figure-cropper'), { clearProps:"all" });
      }
    });
    if($('.next-project').find('video').length){
      var video = $('.next-project').find('video');
      video.get(0).pause();
    }
    simpleOut($('.next-project_label'));
  }
}

// -----------------------------------------------------------------------------

function setupNextProject(){
  $(".next-project .project-name").each(function(){
    titleToWords($(this));
  });
  $('.next-project .title').addClass("lowercase");
  $(".next-project .lettering").lettering('words');
  $('.projects').addClass("projects-js");
  scrollbar.addListener( nextProjectWaypoint );
}

// -----------------------------------------------------------------------------

function goToContact(){
  if (!contactInview && scrollbar.isVisible($('.contact h4')[0])) {
    contactInview = true;
    $('.contact').css({ visibility: "visible"});
    TweenMax.from($('.contact h4 span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height" });
    TweenMax.staggerFrom($('.contact li span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height", delay:0.1 }, 0.1);
  }
}

// -----------------------------------------------------------------------------

function setupAbout(){
  $('.about').css({ visibility:"hidden"});
  $(".about header li").lettering('words');
  scrollbar.addListener( goToContact );
  $.each($('p'), function( i, el ){
    let inView = false;
    TweenMax.set($(el)[0], { opacity:0 });
    scrollbar.addListener(function() {
      if (!inView && scrollbar.isVisible($(el)[0])) {
        inView = true;
        TweenMax.from($(el)[0], 2, { y:"20%", opacity:0, ease: Power4.easeOut, delay:0.2 });
        TweenMax.to($(el)[0], 2, { opacity:1, ease: Power4.easeOut, delay:0.2 });
      }
    })
  });
  $.each( $('.lists'), function( i, el ){
    let inView = false;
    TweenMax.set($(el)[0], { opacity:0 });
    scrollbar.addListener(function() {
      if (!inView && scrollbar.isVisible($(el)[0])) {
        inView = true;
        TweenMax.from($(el)[0], 2, { y:"20%", opacity:0, ease: Power4.easeOut, delay:0.2 });
        TweenMax.to($(el)[0], 2, { opacity:1, ease: Power4.easeOut, delay:0.2 });
      }
    })
  });
}

// -----------------------------------------------------------------------------

function aboutIn(){
  new ClipboardJS('.emailtoclipboard');
  $( ".emailtoclipboard" ).click(function() {
    event.preventDefault();
    TweenMax.to(".copied", 0.5, { opacity:1 });
    TweenMax.to(".copied", 0.5, { delay:4, opacity:0 });
  });
  TweenMax.from($('.about-image'), 1.5, { x:"+10%", width:0, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  TweenMax.from($('.about-image img'), 1.5, { scale:1.3, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  TweenMax.staggerFrom($('.about header ul li').find('span'), 0.5, { height:0, autoAlpha:0, rotation:5, transformOrigin:"left bottom", ease: Power2.easeOut, clearProps:"all", delay:0.8},0.02);
}

// -----------------------------------------------------------------------------

function aboutOut(){
  TweenMax.to($('.about-image'), 1, { width:0, ease: Power4.easeInOut });
  simpleOut($('.about header ul li'));
  TweenMax.to($('.contact h4 span'), 0.8, { height:0, ease: Power4.easeInOut });
  TweenMax.staggerTo($('.contact li span'), 0.8, { height:0, ease: Power4.easeInOut }, 0);
  TweenMax.to($('p'),0.5,{ opacity:0, ease: Power4.easeInOut });
  TweenMax.to($('.lists'),0.5,{ opacity:0, ease: Power4.easeInOut });
}

// -----------------------------------------------------------------------------

function setupContact(){
  $('.text').css({ visibility:"hidden"});
}

// -----------------------------------------------------------------------------

function contactIn(){
  new ClipboardJS('.emailtoclipboard');
  $( ".emailtoclipboard" ).click(function() {
    event.preventDefault();
    TweenMax.to(".copied", 0.5, { opacity:1 });
    TweenMax.to(".copied", 0.5, { delay:4, opacity:0 });
  });
  $('.text').css({ visibility:""});
  TweenMax.from($('.contact h4 span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height" });
  TweenMax.staggerFrom($('.contact li span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height", delay:0.1 }, 0.1);
}

// -----------------------------------------------------------------------------

function contactOut(){
    TweenMax.to($('.contact h4 span'), 0.8, { height:0, ease: Power4.easeInOut });
  TweenMax.staggerTo($('.contact li span'), 0.8, { height:0, ease: Power4.easeInOut }, 0);
}

// -----------------------------------------------------------------------------

function logoIn(target) {
  logoTl = TweenMax.to(target.find('span span:not(.initial)'), 0.8, { width:0, opacity:0, ease: Power4.easeInOut });
  var tl = new TimelineMax();
  tl.from(target.find('span span'), 0.8, { height:0, ease: Power4.easeInOut, delay:0.8 })
    .set(target.find('span span'),{ clearProps:"height" })
}

// -----------------------------------------------------------------------------

function menuIn(){
  TweenMax.staggerFrom($('.menu-item span'),0.25,{ height:0, delay:1.5, clearProps:"height" },0.1);
}

// -----------------------------------------------------------------------------

function titleIn(target){
  target.parent().parent().addClass('title-js-positioning');
  var title = target.find('.title');
  var description = target.find('.lettering');
  var container = description.parent().parent();
  if($(target).is('h1')){
    var toOffset = $(target).parent();
  } else {
    var toOffset = target;
  }
  TweenMax.set(target,{visibility:"visible"});
  TweenMax.set(description.find('span'),{ visibility:"hidden" });
  titleTl = new TimelineMax();
  titleTl.from(title.find('span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height" })
         .to(title.find('span span:not(.initial)'), 0.8, { width:0, autoAlpha:0, ease: Power4.easeInOut, delay:0.4 })
         .set(description.find('span'),{ clearProps:"visibility" })
         .to(toOffset, 0.5, {y:"-25%", ease: Power2.easeInOut},"description")
         .staggerFrom(description.find('span'), 0.5, { height:0, autoAlpha:0, rotation:5, transformOrigin:"left bottom", ease: Power2.easeOut, clearProps:"all" },0.02,"description")
}

// -----------------------------------------------------------------------------

function descriptionIn(num){
      if ($(window).width() > $(window).height()) {
    var scrollTopDistance = -($('.projects-page .project').first().offset().top - $('.projects-page .project').eq(num).offset().top);
    var scrollTop = parseInt(scrollTopDistance);
    scrollbar.scrollTo(0, scrollTop, 600);
  }
}

// -----------------------------------------------------------------------------

function titleOut(target){
  var title = target.find('.title');
  var description = target.find('.lettering');
  var container = description.parent().parent();
  var tl = new TimelineMax();
  tl.to(title.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut, overwrite:1 }, "out")
    .to(description.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut, overwrite:1 }, "out")
    .set(title.find('span:not(.initial)'),{clearProps:"all"}, "set")
    .set(target,{clearProps:"all"}, "set")
}

// -----------------------------------------------------------------------------

function projectIn(target){
  if(target.find('video').length){
    var video = target.find('video');
    video.get(0).currentTime = 0;
    video.get(0).play();
  }
  TweenMax.set(target, { visibility:"visible" });
  TweenMax.from(target.find('figure'), 1.5, { x:"+10%", ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  TweenMax.from(target.find('.figure-cropper'), 1.5, { maxWidth:0, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  TweenMax.from(target.find('video'), 1.5, { scale:1.3, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
  TweenMax.from(target.find('img'), 1.5, { scale:1.3, ease: Power4.easeInOut, delay:0.4, clearProps:"all" });
}

// -----------------------------------------------------------------------------

function projectOut(target){
  target.find('video').currentTime = 0;
  var tl = new TimelineMax();
  TweenMax.to(target.find('.figure-cropper'), 1, {
    maxWidth:0,
    ease: Power4.easeInOut,
    overwrite:1,
    onComplete: function(){
      TweenMax.set(target, { visibility:"hidden" });
      TweenMax.set(target.find('figure'), { clearProps:"all" });
      TweenMax.set(target.find('.figure-cropper'), { clearProps:"all" });
    }
  });
  if(target.find('video').length){
    var video = target.find('video');
    video.get(0).pause();
  }
}

// -----------------------------------------------------------------------------

//
function timer(){
  if($('#timer').data('url') == 'projects'){
    var link = '#Projects a';
  }
  if($('#timer').data('url') == 'project'){
    var link = '.next-project a';
  }
  if($('#timer').data('url') == 'contact'){
    var link = '#Contact a';
  }
  timerTl = new TimelineMax();
  timerTl.to($('#timer #timer-active'), 2, { rotation: 180, ease: Power1.easeInOut }, "spin")
         .to($('#timer #timer-active path'), 2, { strokeDashoffset:502, ease: Power1.easeInOut }, "spin")
         .to($('#timer #timer-active'), 0.8, { rotation: 360, ease: Power1.easeOut }, "click")
         .to($('#timer #timer-active path'), 0.8, { strokeDashoffset:753, ease: Power1.easeOut }, "click")
         .add( function(){
           $(link)[0].click();
         }, "click");
}


//
function simpleIn(target){
  TweenMax.set(target.find('span'),{ clearProps:"height" });
  TweenMax.from(target.find('span'), 0.8, { height:0, ease: Power4.easeInOut, clearProps:"height" });
}

// -----------------------------------------------------------------------------

function simpleOut(target){
  TweenMax.to(target.find('span'), 0.8, { height:0, ease: Power4.easeInOut });
}

// -----------------------------------------------------------------------------

function simpleBackIn(target){
  TweenMax.to(target.find('span'), 0.8, { height:"100%", ease: Power4.easeInOut, clearProps:"height" });
}

// -----------------------------------------------------------------------------

function headerIn(){
  $('.header').css({ visibility:"visible" });
  titleToWords($('.logo'));
  logoIn($('.logo'));
  menuIn();
}

// -----------------------------------------------------------------------------

function logoOver(){
  $('.logo').on('mouseover', () => {
    logoTl.reverse().timeScale(1);
  });
  $('.logo').on('mouseout', () => {
    logoTl.play().timeScale(1);
  });
}

// -----------------------------------------------------------------------------

//Scroll Plugins
function FilterEventPlugin() {
  Scrollbar.ScrollbarPlugin.apply(this, arguments);
};

FilterEventPlugin.prototype = Object.create(Scrollbar.ScrollbarPlugin.prototype);
FilterEventPlugin.prototype.onRender = function(remainMomentum) {
  if($('main').data('barba-namespace') === 'projects'){
    if (!scrolling && remainMomentum.y === 0) {
      scrolling = true;
      projectInTimer = setTimeout(function(){
        descriptionIn(projectInView);
      }, 250);
    }
    if (scrolling && remainMomentum.y !== 0) {
      clearTimeout(projectInTimer);
      scrolling = false;
    }
  }
};
FilterEventPlugin.pluginName = 'filterEvent';
Scrollbar.use(FilterEventPlugin);


// -----------------------------------------------------------------------------

//State Control
function stateThinking(){
  $('a').off();
  $('.cursor').removeClass("hover");
  $('.cursor').addClass("thinking");
  $('#cover').css({display:"block",opacity:0});
  $('.cursor svg path').css({ stroke: "" });
}

// -----------------------------------------------------------------------------

function stateActive(){
  $('a').addClass('cursoractive');
  $('.cursor').removeClass("thinking");
  $('a').on('mouseover', function(){
    $('.cursor').addClass("hover");
    if($(this).parent().hasClass('project')){
      var colour = $(this).data('colour');
      $('.cursor svg path').css({ stroke: colour });
    }
  });
  $('a').on('mouseout', function(){
    $('.cursor').removeClass("hover");
    $('.cursor svg path').css({ stroke: ""});
  });
  $('#cover').css({display:"none"});
}

/*
================================================================================
GLOBAL HOOKS
================================================================================
*/

// defines a global hook
barba.hooks.appear((data) => {
  $('#cover').removeClass('no-js');
});

// -----------------------------------------------------------------------------

barba.hooks.afterAppear((data) => {
  $('body').css({opacity:1});
  $('#cover').css({display:"none"});
  stateActive();
});

// -----------------------------------------------------------------------------

barba.hooks.enter((data) => {
  scrollbar.scrollTop = 0;
});

// -----------------------------------------------------------------------------

barba.hooks.afterEnter((data) => {
  stateActive();
});

// -----------------------------------------------------------------------------

barba.hooks.beforeLeave((data) => {
  stateThinking();
});

/*
================================================================================
INIT BARBA + OPACITY TRANSITION DEFAULT
================================================================================
*/

barba.init({
  //debug: true,
  transitions: [
    {
      name: 'legacy-example',
      appear: function(data) {
        const done = this.async();
        TweenMax.from(data.current.container, 0.5, {
          opacity: 1,
          onComplete: done,
        });
      },
      leave: function(data) {
        const done = this.async();
        TweenMax.to(data.current.container, 0.5, {
          opacity: 1,
          onComplete: done,
        });
      },
      enter: function(data) {
        const done = this.async();
        TweenMax.from(data.next.container, 0.5, {
          opacity: 1,
          onComplete: done,
        });
      },
    },
    {
/*
================================================================================
RULES - sve kombinacije kako ide na koju stranicu
================================================================================
*/

      name: 'home-projects',
      from: { namespace:'home' },
      to: { namespace:'projects' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        var target = $('h1');
        var title = target.find('.title');
        var description = target.find('.lettering');
        var container = description.parent().parent();
        var tl = new TimelineMax();
        tl.to(title.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut }, "out")
          .to(description.find('span'),0.5,{ height:0, clearProps:"all", ease: Power4.easeInOut }, "out")
          .set($(data.current.container), { display:"none" })
          .set($(data.next.container), { display:"none", onComplete: done });
      },
      enter: function(data) {
        const done = this.async();
        TweenMax.set($(data.next.container), { clearProps:"display" });
        return done();
      },
    },
    {

      // -----------------------------------------------------------------------------

      name: 'projects-project',
      from: { namespace:'projects' },
      to: { namespace:'project' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        var scrollTopDistance = -($('.project').first().offset().top - $(data.trigger).parent().offset().top);
        var scrollTop = parseInt(scrollTopDistance);
        scrollbar.scrollTo(0, scrollTop, 600);
        var i = $(data.trigger).parent().index();
        var target = $('figcaption').eq(i);
        var videoTarget = $(data.trigger).find('.figure-cropper');
        //titleOut(target);
        //titleToProject(target);
        titleTl.reverse();
        var tl = new TimelineMax();
        tl.to(videoTarget, 0.8, { maxWidth:"100%", ease: Power4.easeInOut, overwrite:1 }, "video")
          .to(videoTarget.find('video'), 0.8, { width:"100vw", ease: Power4.easeInOut }, "video")
          .to(videoTarget.find('img'), 0.8, { width:"100vw", ease: Power4.easeInOut }, "video")
          .to(videoTarget, 0.8, { scale:0.85, ease: Power4.easeInOut })
        if(window.innerHeight > window.innerWidth){
          TweenMax.to(videoTarget.find('video'), 0.8, { width:"100vw", ease: Power4.easeInOut });
        }
        setTimeout(function(){
          $(data.trigger).parent().insertAfter('.scrollWrapper');
          $(data.trigger).parent().wrap("<ul id='passed' class='projects projects-js'></ul>");
          $(data.trigger).children().unwrap();
        }, 800);
        setTimeout(function(){
          $('.projectnames-js').remove();
          done();
        }, 2500);
      },
      enter: function(data) {
        const done = this.async();
        var videoTarget = $(data.trigger).find('.figure-cropper');
        $('#passed').insertAfter('main article header');
        $('#passed').find('.project').removeClass('dot-marker');
        TweenMax.set($('article header'), { display:"none" });
        $(data.current.container).css({ "display" : "none" });
        return done();
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'projects-about',
      from: { namespace:'projects' },
      to: { namespace:'about' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        $.each( $('.project-middle'), function( i, el ){
          if (scrollbar.isVisible($(el)[0])) {
            titleOut($('figcaption').eq(i))
            projectOut($('.project').eq(i));
          }
        });
        setTimeout(function(){
          $('.projectnames-js').remove();
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        aboutIn();
        return done();
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'projects-contact',
      from: { namespace:'projects' },
      to: { namespace:'contact' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        $.each( $('.project-middle'), function( i, el ){
          if (scrollbar.isVisible($(el)[0])) {
            titleOut($('figcaption').eq(i))
            projectOut($('.project').eq(i));
          }
        });
        setTimeout(function(){
          $('.projectnames-js').remove();
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        return done();
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'about-projects',
      from: { namespace:'about' },
      to: { namespace:'projects' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        aboutOut();
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        done();
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'project-project',
      from: { namespace:'project' },
      to: { namespace:'project' },
      leave: function(data) {
        const done = this.async();
        //Scroll To
        var scrollTopDistance = -($('.projectpage').offset().top - $(data.trigger).parent().offset().top);
        var scrollTop = parseInt(scrollTopDistance);
        scrollbar.scrollTo(0, scrollTop, 600);
        var i = $(data.trigger).parent().index();
        var videoTarget = $(data.trigger).find('.figure-cropper');
        nextProjectTl.reverse();
        simpleOut($('.next-project_label'));
        var tl = new TimelineMax();
        tl.to(videoTarget, 0.8, { maxWidth:"100%", ease: Power4.easeInOut }, "video")
          .to(videoTarget.find('video'), 0.8, { width:"100vw", ease: Power4.easeInOut }, "video")
          .to(videoTarget.find('img'), 0.8, { width:"100vw", ease: Power4.easeInOut }, "video")
          .to($(data.trigger).find('figcaption'), 0.8, { left:"0", ease: Power4.easeInOut }, "video")
          .to(videoTarget, 0.8, { scale:0.85, ease: Power4.easeInOut })
        if(window.innerHeight > window.innerWidth){
          TweenMax.to(videoTarget.find('video'), 0.8, { width:"100vw", ease: Power4.easeInOut });
        }
        setTimeout(function(){
          $('.projectpage article').css({ visibility:"hidden" });
          $('#passed').remove();
          $(data.trigger).parent().insertAfter('.scrollWrapper');
          $(data.trigger).parent().wrap("<ul id='passed' class='projects projects-js'></ul>");
          $(data.trigger).children().unwrap();
        }, 800);
        setTimeout(function(){
          $('.next-project figcaption').remove();
          $('#passed li').removeClass('project next-project');
          done();
        }, 2500);
      },
      enter: function(data) {
        const done = this.async();
        var videoTarget = $(data.trigger).find('.figure-cropper');
        var insertTo = $(data.next.container).find('article header');
        $('#passed').insertAfter(insertTo);
        TweenMax.set($('main article header'), { display:"none" });
        $(data.current.container).css({ "display" : "none" });
        return done();
      },
    },
    {

// -----------------------------------------------------------------------------


      name: 'about-contact',
      from: { namespace:'about' },
      to: { namespace:'contact' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        aboutOut();
        setTimeout(function(){
          done();
        }, 800);
      },
      enter: function(data) {
        const done = this.async();
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 100);
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'contact-about',
      from: { namespace:'contact' },
      to: { namespace:'about' },
      leave: function(data) {
        const done = this.async();
        contactOut();
        setTimeout(function(){
          done();
        }, 800);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          aboutIn();
          done();
        }, 100);
      },
    },

// -----------------------------------------------------------------------------

    {
      name: 'contact-projects',
      from: { namespace:'contact' },
      to: { namespace:'projects' },
      leave: function(data) {
      
        const done = this.async();
        contactOut();
        setTimeout(function(){
          done();
        }, 800);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          done();
        }, 100);
      },
    },
    {

// -----------------------------------------------------------------------------     

      name: 'project-about',
      from: { namespace:'project' },
      to: { namespace:'about' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        TweenMax.to($('.projectpage'), 1, { opacity:0, ease: Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          aboutIn();
          done();
        }, 100);
      },
    },
    {
      name: 'project-contact',
      from: { namespace:'project' },
      to: { namespace:'contact' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        TweenMax.to($('.projectpage'), 1, { opacity:0, ease: Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
          done();
        }, 100);
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'project-projects',
      from: { namespace:'project' },
      to: { namespace:'projects' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        TweenMax.to($('.projectpage'), 1, { opacity:0, ease: Power4.easeInOut });
        setTimeout(function(){
          //$('.next-project').remove();
          done();
        }, 1100);
      },
      enter: function(data) {
        const done = this.async();
        return done();
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'projects-home',
      from: { namespace:'projects' },
      to: { namespace:'home' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        $.each( $('.project-middle'), function( i, el ){
          if (scrollbar.isVisible($(el)[0])) {
            titleOut($('figcaption').eq(i))
            projectOut($('.project').eq(i));
          }
        });
        TweenMax.to($('.logo').find('span'), 0.8, { height:0, ease: Power4.easeInOut });
        TweenMax.staggerTo($('.menu-item span'),0.25,{ height:0 },0.1);
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        setTimeout(function(){
          $('.projectnames-js').remove();
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          done();
        }, 100);
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'about-home',
      from: { namespace:'about' },
      to: { namespace:'home' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        aboutOut();
        TweenMax.to($('.logo').find('span'), 0.8, { height:0, ease: Power4.easeInOut });
        TweenMax.staggerTo($('.menu-item span'),0.25,{ height:0 },0.1);
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          done();
        }, 100);
      },
    },
    {

// -----------------------------------------------------------------------------

      name: 'contact-home',
      from: { namespace:'contact' },
      to: { namespace:'home' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        contactOut();
        TweenMax.to($('.logo').find('span'), 0.8, { height:0, ease: Power4.easeInOut });
        TweenMax.staggerTo($('.menu-item span'),0.25,{ height:0 },0.1);
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          done();
        }, 100);
      },
    },
    {
      name: 'project-home',
      from: { namespace:'project' },
      to: { namespace:'home' },
      leave: function(data) {
        const done = this.async();
        scrollbar._listeners.clear();
        //Scroll To
        TweenMax.to($('.projectpage'), 1, { opacity:0, ease: Power4.easeInOut });
        TweenMax.to($('.logo').find('span'), 0.8, { height:0, ease: Power4.easeInOut });
        TweenMax.staggerTo($('.menu-item span'),0.25,{ height:0 },0.1);
        TweenMax.to($('#slider-indicator'), 0.5, { opacity:0, ease:Power4.easeInOut });
        setTimeout(function(){
          done();
        }, 1000);
      },
      enter: function(data) {
        const done = this.async();
        setTimeout(function(){
          done();
        }, 100);
      },
    },
  ],
/*
================================================================================
VIEWS - init or destroy things / or call FUNCTION
================================================================================
*/


  views: [
    {

// -----------------------------------------------------------------------------

      namespace: 'home',
      beforeAppear(data){
        //titleToWords($("h1 .title"));
        //$(".lettering p").lettering('words');
        //$('.header').css({ visibility:"hidden" });
      },
      beforeEnter(data){
        $('h1').css({ visibility:"hidden" });
        titleToWords($("h1 .title"));
        $(".lettering p").lettering('words');
        $('.header').css({ visibility:"hidden" });
      },
      afterEnter(data){
        titleIn($('h1'));
        setTimeout(function(){
          timer();
        },2000);
      },
      afterLeave(data){
        headerIn();
      }
    },
    {

// -----------------------------------------------------------------------------

      namespace: 'projects',
      beforeAppear(data){
        $(".project-name").each(function(){
          titleToWords($(this));
        })
      },
      afterAppear(data){
        headerIn();
        logoOver();
        setupScrollTracker($('.dot-marker'));
        scrollbar.setPosition(0, 1);
        scrollbar.setPosition(0, 0);
      },
      beforeEnter(data){
        doWaypoints = true;
        setupProjects();
      },
      afterEnter(data) {
        setTimeout(function(){
          logoOver();
          setupScrollTracker($('.dot-marker'));
          scrollbar.setPosition(0, 1);
          scrollbar.setPosition(0, 0);
        },100);
      },
      beforeLeave(data){
        scrollbar._listeners.clear();
        clearScrollTracker();
      }
    },
    {

// -----------------------------------------------------------------------------

      namespace: 'project',
      beforeAppear(data){
        projectAppear();
      },
      afterAppear(data){
        //logoOver();
        headerIn();
        //setupScrollTracker($('.dot-marker'));
        //setupProject();
      },
      beforeEnter(data){
        scrollbar._listeners.clear();
        setupNextProject();
        timerTl.clear();
      },
      afterEnter(data){
        setupProject();
        setTimeout(function(){
          logoOver();
          setupScrollTracker($('.dot-marker'));
          if(data.trigger !== 'barba'){
            var scrollTopDistance = -($('main').offset().top - $('article #passed').find('.figure-cropper').offset().top);
            var scrollTop = parseInt(scrollTopDistance);
            scrollbar.scrollTo(0, scrollTop, 600);
          }
        }, 100);
      },
      beforeLeave(data){
        clearScrollTracker();
        doNextProjectWaypoint = false;
        scrollbar._listeners.clear();
        scrollbar.removeListener( nextProjectWaypoint );
      },
    },
    {

// -----------------------------------------------------------------------------

      namespace: 'about',
      beforeAppear(data){
        //setupAbout();
      },
      afterAppear(data){
        logoOver();
        headerIn();
        aboutIn();
        setupScrollTracker($('.dot-marker'));
        scrollbar.setPosition(0, 1);
        scrollbar.setPosition(0, 0);
      },
      beforeEnter(data){
        scrollbar._listeners.clear();
        setupAbout();
      },
      afterEnter(data){
        $('.about').css({ visibility:"visible"});
        setTimeout(function(){
          logoOver();
          setupScrollTracker($('.dot-marker'));
          scrollbar.setPosition(0, 1);
          scrollbar.setPosition(0, 0);
        }, 100);
      },
      beforeLeave(data){
        clearScrollTracker();
        scrollbar._listeners.clear();
      },
    },
    {

// -----------------------------------------------------------------------------

      namespace: 'contact',
      beforeAppear(data){
        setupContact();
      },
      afterAppear(data){
        logoOver();
        headerIn();
        //contactIn();
      },
      beforeEnter(data){
        scrollbar._listeners.clear();
        setupContact();
      },
      afterEnter(data){
        setTimeout(function(){
          logoOver();
          contactIn();
        }, 100);
      },
      beforeLeave(data){
      },
    },
  ],
});

/*
================================================================================
FUNCTION ON RESIZE
================================================================================
*/

function onResize() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

onResize();
$( window ).resize(function() {
  onResize();
});
$(window).bind('resize', function(e){
  window.resizeEvt;
  $(window).resize(function(){
    clearTimeout(window.resizeEvt);
    window.resizeEvt = setTimeout(function(){
      updateScrollTracker();
      }, 250);
    });
});

/*
================================================================================
SCROLLBAR - NEBITNO
================================================================================
*/
scrollbar = Scrollbar.init(document.querySelector('.scrollWrapper'));
//
let lastOffset = null;
const dir = [];

scrollbar.addListener(({ offset }) => {
  if (!lastOffset) {
    lastOffset = offset;
    return;
  }

  if (offset.y < lastOffset.y) {
    dir[0] = 'up';
  } else if (offset.y > lastOffset.y) {
    dir[0] = 'down';
  } else {
    dir[0] = 'still';
  }

  if (offset.x < lastOffset.x) {
    dir[1] = 'left';
  } else if (offset.x > lastOffset.x) {
    dir[1] = 'right';
  } else {
    dir[1] = 'still';
  }

  lastOffset = offset;

  switch(dir[0]) {
    case 'up':
    case 'down':
    case 'still':
  }

  switch(dir[1]) {
    case 'left':
    case 'right':
    case 'still':
  }
});

/*
================================================================================
CUSTOM CURSOR
================================================================================
*/

document.addEventListener('mousemove', e => {
    $('.cursor').attr("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;")
});
/*
document.addEventListener('click', () => {
    $('.cursor').addClass("expand");
    setTimeout(() => {
      $('.cursor').removeClass("expand");
    }, 500)
})
*/
$('a').on('mouseover', () => {
  $('.cursor').addClass("hover");
});
$('a').on('mouseout', () => {
  $('.cursor').removeClass("hover");
});
$( document ).ready(function() {
  $('body').addClass('cursoractive');
  $('.cursor').addClass('active');
});
