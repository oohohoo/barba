/* global Modernizr, ScrollMagic, mobileAndTabletcheck, TimelineMax, TweenLite, MorphSVGPlugin, TweenMax, Power0, Power1, Power2, Power3, Power4, Back, Elastic, Bounce, Rough, SlowMo, Stepped, Circ, Expo, Sine, window, jQuery,  */
var $ = jQuery;
import barba from '@barba/core';

$(document).ready(function(){
  /*
  ================================================================================

    BARBA

  ================================================================================
  */

  var preloader = $('#pre-loader')

  barba.init({
    transitions: [{
      leave(data) {
        var done = this.async()

        TweenMax.to(preloader, 0.5, {
          autoAlpha: 1,
          onComplete: done
        })
      }, enter(data) {
        TweenMax.to(preloader, 0.5, {
          autoAlpha: 0,
        })
      }
    }]
  })

  /*
  ================================================================================

    FIXED HEADER

  ================================================================================
  */

  //Variable for the scroll boolean
  var didScroll;
  // Variable for the offset
  var lastScrollTop = 0;
  //Variable for scroll margin
  var delta = 5;
  //Variable for navbarHeight
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
      return
    }

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('header').removeClass('nav-down').addClass('nav-up');

    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down')
      }
    }
    lastScrollTop = st;
  }

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  /*
  ================================================================================

    REMOVE NO_JS CLASS

  ================================================================================
  */

  if ($('body').hasClass('no_js')) {
    $('body').removeClass('no_js')
  }

  /*
  ================================================================================

    MOBILE AND TABLET CHECK

  ================================================================================
  */

  function mobileAndTabletcheck(a) {
    if (a !== undefined && a !== null) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        $('body').addClass('mobile')
      }
    }
  }

  mobileAndTabletcheck(navigator.userAgent)
  mobileAndTabletcheck(navigator.vendor)
  mobileAndTabletcheck(window.opera)

  /*
  ================================================================================

    IE SUPPORT CLASS

  ================================================================================
  */

  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  if (isIE11) {
    $('body').addClass('ie11')
  }

  /*
  ================================================================================

    SVG TO PNG FALLBACK

  ================================================================================
  */

  function svgpngfallback(){
    if (!Modernizr.svgasimg) {
      $('img').each(function(){
        var dataSrc = $(this).attr('data-src')
        var include = "wp-content/uploads"

        if (typeof dataSrc !== typeof undefined && dataSrc !== false) {
          if (dataSrc.includes(include) === false) {
            var newSrc = dataSrc.replace(/\.svg/, '.png')
            $(this).attr('data-src', newSrc)
          }

        } else {
          var dataLazy = $(this).attr('data-lazy')

          if (typeof dataLazy !== typeof undefined && dataLazy !== false) {
            if (dataLazy.includes(include) === false) {
              var newLazy = dataLazy.replace(/\.svg/, '.png')
              $(this).attr('data-lazy', newLazy)
            }
          } else {
            var src = $(this).attr('src')

            if (src.includes(include) === false) {
              $(this).attr('src', src.replace(/\.svg/, '.png'))
            }
          }
        }
      })
    }
  }

  /*
  ================================================================================

    LAZY LOADING IMAGES

  ================================================================================
  */

  // create config object: rootMargin and threshold
  // are two properties exposed by the interface
  const configImg = {
    threshold: 0,
    rootMargin: "100px"
  };

  function preloadImage(el) {
    el.src = el.dataset.src
  }

  // register the config object with an instance
  // of intersectionObserver
  var observer = new IntersectionObserver(function(entries, self) {
    // iterate over each entry
    entries.forEach(entry => {
      // process just the images that are intersecting.
      // isIntersecting is a property exposed by the interface
      if(entry.isIntersecting) {
        // custom function that copies the path to the img
        // from data-src to src
        preloadImage(entry.target);
        // the image is now in place, stop watching
        self.unobserve(entry.target);
      }
    });
  }, configImg);

  const imgs = document.querySelectorAll('img[data-src]');
  imgs.forEach(img => {
    observer.observe(img);
  });

  /*
  ================================================================================

    ANIMATION TO

  ================================================================================
  */

  if ($('main').is('#contact')) {
    let url = window.location.href
    url = url.substring(url.lastIndexOf("#") + 1);

    let li = $('.visiting-locations li[data-location="' + url + '"]')

    $('html, body').animate({
      scrollTop: li.offset().top - 150
    }, 1000);
  }

  /*
  ================================================================================

    INPUT ANIMATION

  ================================================================================
  */

  $('.custom-input input:not([type="submit"]), .custom-textarea textarea').focus(function(){
    $(this).parents('.custom-input, .custom-textarea').addClass('focused');
  });

  $('.custom-input input:not([type="submit"]), .custom-textarea textarea').blur(function(){
    let _val = $(this).val()

    if ( _val == "" ) {
      $(this).parents('.custom-input, .custom-textarea').removeClass('focused')
    } else {
      $(this).parents('.custom-input, .custom-textarea').addClass('focused')
    }
  })

  /*
  ================================================================================

    HOMEPAGE HERO HEIGHT

  ================================================================================
  */

  function heroFix() {
    let left = $('#hero .left')
    let right = $('#hero .right')
    let leftH = left.height()
    let rightH = right.height()

    left.css('margin-top', left.innerHeight())

    if (leftH > rightH) {
      right.css('height', leftH)
    } else {
      left.css('height', rightH)
    }
  }

  if ($('main').is('#homepage')) {
    heroFix()

    $(window).on("resize", function(){
      heroFix()
    })
  }

  /*
  ================================================================================

    RECENT CASES

  ================================================================================
  */

  function recentCases() {
    $('.recent-cases').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      let i = (currentSlide ? currentSlide : 0) + 1
      let count = slick.slideCount
      let el = $(this).parents('.recent-cases-slider').find('.counter')

      if (i < 10) { i = "0" + i }
      if (count < 10) { count = "0" + count }

      el.text( i + ' | ' + count)
    })

    let slidesToShow = 3
    let size = $('.recent-cases .case-item').size()

    if (size < slidesToShow && size !== 1) {
      slidesToShow = size
    }

    $('.recent-cases').slick({
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      dots: false,
      centerMode: false,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-white.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-white.svg" alt="Arrow left"></button>',
      swipeToSlide: true
    })
  }

  if ($('.recent-cases').size() > 0) {
    recentCases()
  }

  /*
  ================================================================================

    EMPLOYE VIDEOS

  ================================================================================
  */

  function employeVideos() {
    $('.employe-videos').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      let i = (currentSlide ? currentSlide : 0) + 1
      let count = slick.slideCount
      let el = $(this).parents('.employe-videos-slider').find('.counter')

      if (i < 10) { i = "0" + i }
      if (count < 10) { count = "0" + count }

      el.text( i + ' | ' + count)
    })

    let slidesToShow = 3
    let size = $('.employe-videos .employe-video').size()

    if (size < slidesToShow && size !== 1) {
      slidesToShow = size
    }

    $('.employe-videos').slick({
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 0,
      arrows: true,
      dots: false,
      centerMode: false,
      swipeToSlide: true,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-white.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-white.svg" alt="Arrow left"></button>'
    })
  }

  employeVideos()

  /*
  ================================================================================

    NEWS SLIDER

  ================================================================================
  */

  function newsSlider() {
    let slidesToShow = 4
    let size = $('.news-slider .news-items .news-item').size()

    if (size < slidesToShow && size !== 1) {
      slidesToShow = size
    }

    $('.news-slider .news-items').slick({
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      dots: false,
      centerMode: false,
      swipeToSlide: true,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-grey.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-grey.svg" alt="Arrow left"></button>'
    })
  }

  newsSlider()

  /*
  ================================================================================

    PROJECT GALLARY

  ================================================================================
  */

  function projectGallary() {
    $('.project-gallery ul').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      let i = (currentSlide ? currentSlide : 0) + 1
      let count = slick.slideCount
      let el = $(this).parents('.project-gallery').find('.counter')

      if (i < 10) { i = "0" + i }
      if (count < 10) { count = "0" + count }

      el.text( i + ' | ' + count)
    })

    $('.project-gallery ul').slick({
      lazyLoad: 'ondemand',
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      dots: false,
      swipeToSlide: true,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-white.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-white.svg" alt="Arrow left"></button>'
    })
  }

  projectGallary()

  /*
  ================================================================================

    SLIDE BANNER

  ================================================================================
  */

  function slideBanner() {
    $('.banner.slider').each(function(){
      let h = $('.info', this).height()

      if (h < 200) {
        h = 200
      }

      $('.slide-side li').each(function(){
        $(this).css('width', h)
        $(this).css('height', h)
      })
    })

    $('.banner .slide-side ul').slick({
      infinite: false,
      draggable: true,
      slidesToShow: 1,
      variableWidth: true,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: false,
      autoplaySpeed: 3000,
      arrows: true,
      dots: false,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/arrow-right-white.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/arrow-left-white.svg" alt="Arrow left"></button>'
    })
    .on('afterChange', function(event, slick, currentSlide, nextSlide){

      if (currentSlide > 0) {
        $('.slick-prev', this).css('opacity', 1)
        $(this).parents('.banner').find('.info').css('opacity', 0.1)
      } else {
        $('.slick-prev', this).css('opacity', 0)
        $(this).parents('.banner').find('.info').css('opacity', 1)
      }

    });
  }

  slideBanner()

  /*
  ================================================================================

    CLIENT LOGO SLIDER

  ================================================================================
  */

  function logoSliders(){
    $('.banner.logo-slider .slider.ltr').slick({
      // speed: 10000,
      autoplay: true,
      autoplaySpeed: 2500, //0
      // centerMode: true,
      cssEase: 'ease-in-out',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: true,
      // initialSlide: 1,
      arrows: false,
      buttons: false,
      swipe: false,
      touchMove: false,
      pauseOnHover: false
    })

    $('.banner.logo-slider .slider.rtl').slick({
      // speed: 10000,
      autoplay: true,
      autoplaySpeed: 2500, //0
      // centerMode: true,
      cssEase: 'ease-in-out',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: true,
      // initialSlide: 1,
      arrows: false,
      buttons: false,
      rtl: true,
      swipe: false,
      touchMove: false,
      pauseOnHover: false
    })
  }

  if ($(".banner.logo-slider").size() > 0) {
    logoSliders()
  }

  /*
  ================================================================================

    CASES DEF SLIDER

  ================================================================================
  */

  function casesDefSlider(){
    $('.cases-def-slider .slider.ltr').slick({
      // speed: 10000,
      autoplay: true,
      autoplaySpeed: 2500, //0
      // centerMode: true,
      cssEase: 'ease-in-out',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: true,
      // initialSlide: 1,
      arrows: false,
      buttons: false,
      swipe: false,
      touchMove: false,
      pauseOnHover: false
    })

    $('.cases-def-slider .slider.rtl').slick({
      // speed: 10000,
      autoplay: true,
      autoplaySpeed: 2500, //0
      // centerMode: true,
      cssEase: 'ease-in-out',
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: true,
      // initialSlide: 1,
      arrows: false,
      buttons: false,
      rtl: true,
      swipe: false,
      touchMove: false,
      pauseOnHover: false
    })
  }

  if ($(".cases-def-slider").size() > 0) {
    casesDefSlider()
  }

  /*
  ================================================================================

    TAXONOMIE IMAGES

  ================================================================================
  */

  function ajaxCatImagees(){
    if ($('.sf-field-taxonomy-case_categorie, .sf-field-category').size() > 0) {
      $('.sf-field-taxonomy-case_categorie li input, .sf-field-category li input').each(function(){
        let _this = this
        let slug = $(_this).val()

        $.ajax({
            'url':'/wp-admin/admin-ajax.php',
            'type':'post',
            'dataType': 'json',
            'data': {
                'action': 'imgTax',
                'slug': slug
            },
            'success': function(data) {
              if (data.url !== null && _this.parentNode.childNodes.length === 2) {
                let img = document.createElement('img')
                img.src = data.url
                img.alt = slug
                _this.parentNode.prepend(img)
              }
            },
            'error': function () {
              console.log("ajax load error");
            }
        });
      })
    }
  }

  ajaxCatImagees()

  if($('main').is('#news') || $('main').is('#cases')) {
    $(document).on("sf:ajaxfinish", ".searchandfilter", function(){
      ajaxCatImagees()
    });
  }

  $('.sf-field-taxonomy-case_categorie li input, .sf-field-category li input').each(function(){
    if ($(this).is(":checked")) {
      $(this).parent().addClass('checked')
    } else {
      $(this).parent().removeClass('checked')
    }
  })

  /*
  ================================================================================

    CUSTOM SELECT

  ================================================================================
  */

  $('select').each(function(){
    if ($('main').is('#case-single') || $('main').is('#markt-single') || $(this).parents('.open-job-application')) {
      $(this).wrap('<div class="custom-select grey"></div>')
    } else {
      $(this).wrap('<div class="custom-select"></div>')
    }
  })

  /*
  ================================================================================

    CASE SINGLE VIDEO

  ================================================================================
  */

  $('.video-thumbnail').each(function(){
    $(this).click(function(){
      let dataVideo = $(this).attr('data-video')
      let videoPop = $('.video-pop-up[data-video="' + dataVideo + '"]')

      videoPop.css('display', 'flex').hide().fadeIn(200)

      if (videoPop.hasClass('file')) {
        let video = videoPop.find('video')
        video.attr('src', video.attr('data-video-src'))
        video[0].play()
      } else if (videoPop.hasClass('youtube') || videoPop.hasClass('vimeo')) {
        let video = videoPop.find('iframe')
        video.attr('src', video.attr('data-video-src'))
        video.attr('autoplay')
      }
    })
  })

  $('.video-pop-up .close').each(function(){
    $(this).click(function(e){
      let parent = $(this).parent()

      if (parent.hasClass('file')) {
        parent.find('video')[0].pause()
      } else if (parent.hasClass('youtube') || parent.hasClass('vimeo')) {
        parent.find('iframe').attr('src', '')
      }

      parent.fadeOut(200)
    })
  })

  $('.video-pop-up').each(function(){
    $(this).click(function(e){
      if (e.target !== e.currentTarget) { return }

      if ($(this).hasClass('file')) {
        $(this).find('video')[0].pause()
      } else if ($(this).hasClass('youtube') || $(this).hasClass('vimeo')) {
        $(this).find('iframe').attr('src', '')
      }

      $(this).fadeOut(200)
    })
  })

  if ($('.video-thumbnail').size() > 0) {
    $(document).on('keydown', function(evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
          isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
          isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        let pop = $('.video-pop-up:visible')

        if (pop.hasClass('file')) {
          pop.find('video')[0].pause()
        } else if (pop.hasClass('youtube') || pop.hasClass('vimeo')) {
          pop.find('iframe').attr('src', '')
        }

        pop.fadeOut(200)
      }
    })
  }

  /*
  ================================================================================

    FLIP COUNTER

  ================================================================================
  */

  const configFacts = {
    threshold: 0,
    rootMargin: "-100px"
  };

  function handleTickInit(tick) {
    let newValue = $(tick).attr('data-go-to')
    $(tick).attr('data-value', newValue)

    let next = $(tick).parent().next().find('.fact')

    if (next.size() > 0) {
      setTimeout(function(){
        handleTickInit(next)
      }, 1000)
    }
  }

  var factsObserver = new IntersectionObserver(function(entries, self) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        var tick = entry.target.firstElementChild
        var value = tick.dataset.goto
        handleTickInit(tick)

        self.unobserve(entry.target);
      }
    });
  }, configFacts);

  const facts = document.querySelectorAll('.facts-wrapper .fact-wrapper:first-child');
  facts.forEach(fact => {
    factsObserver.observe(fact);
  });

  /*
  ================================================================================

    CONTACT PERSON SLIDER

  ================================================================================
  */

  function contactPersonSlider() {
    $('.contact-person .images, .contact-person .text .data').slick({
      autoplay: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      cssEase: 'linear',
      swipe: false,
      touchMove: false,
    })
  }

  contactPersonSlider()

  function contactPersonSliderResize() {
    $('.contact-person .images').each(function () {
      $('.slick-track', this).css('height', $(this).height())
    })
  }
  contactPersonSliderResize()

  $(window).on('resize', function(){
    contactPersonSliderResize()
  })


  $('.contact-person select').each(function(){
    $(this).on('change', function(){
      let container = $(this).parents('.contact-person')
      let index = $(this).val()

      container.find('.images, .text .data').slick('slickGoTo', parseInt(index) );

    })
  })

  /*
  ================================================================================

    HISTORY SLIDER

  ================================================================================
  */

  $('.images-slider').each(function(){
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrow: true,
      dots: false,
      fade: true,
      cssEase: 'linear',
      autoplay: false,
      nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-white.svg" alt="Arrow right"></button>',
      prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-white.svg" alt="Arrow left"></button>'
    })
  })

  /*
  ================================================================================

    LOCATIONS BANNER

  ================================================================================
  */

  if ($('.location-banner').size() > 0) {
    $('.location-banner').each(function(){
      let lb = $(this)

      $('.locations li a', this).on('mouseenter', function(){
        let index = $(this).parent().index()
        let img = lb.find('.images').children().eq(index)

        lb.find('a.hover').removeClass('hover')
        $(this).addClass('hover')

        lb.find('.images').find('li.show').removeClass('show')
        img.addClass('show')

      })
    })
  }

  /*
  ================================================================================

    VACATURE SEARCH AND FILTER PRO LAZY LOAD IMAGES

  ================================================================================
  */

  if($('main').is('#vacatures') || $('main').is('#news') || $('main').is('#cases')) {
    $(document).on("sf:ajaxfinish", ".searchandfilter", function(){
    	$('.vacature, .news-item, .case-item').each(function(){
        $('.img-box img', this).attr('src', $('.img-box img', this).attr('data-src'))
      })
    });
  }

  /*
  ================================================================================

    OPEN JOB APPLICATION

  ================================================================================
  */

  $('.open-job-application select[name="vestigingen"] option:first-child').each(function(){
    $(this).prop('disabled', true).text("Selecteer vestiging:")
  })

  /*
  ================================================================================

    READ ON

  ================================================================================
  */

  if ($('.read-on-vacature').size() > 0) {
    $('.read-on-vacature .head button').each(function(){
      $(this).click(function(e){
        if (!$(this).hasClass('active')) {
          e.preventDefault()

          let index = $(this).index()
          let parent = $(this).parents('.read-on-vacature')

          parent.find('.head button.active').removeClass('active')
          $(this).addClass('active')

          parent.find('.tabs > li.active').removeClass('active')
          parent.find('.tabs > li').eq(index).addClass('active')
        }
      })
    })
  }

  /*
  ================================================================================

    CUSTOM FILE UPLOAD

  ================================================================================
  */

  $('.file-upload-container').each(function(){
    let fileUploadHandler = $('input[type="file"]', this)
    let fileNameContainer = $('.file-name', this)

    $('button', this).click(function(e){
      e.preventDefault();

      fileUploadHandler.click()
    })

    fileUploadHandler.on('change', function(e){
      let fileName = e.target.files[0].name
      fileNameContainer.text(fileName)
    })
  })

  /*
  ================================================================================

    SCROLL TO ANCHOR

  ================================================================================
  */

  $('a[href^="#"]').each(function(){
    $(this).click(function(e){
      e.preventDefault()
      let target = $($(this).attr('href'))

      $('body, html').animate({
        scrollTop: target.offset().top
      }, 1000)
    })
  })

  /*
  ================================================================================

    COLLEAGUES TELL

  ================================================================================
  */

  $('.colleague-tells .text').each(function(){
    $(this).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      let i = (currentSlide ? currentSlide : 0) + 1
      let count = slick.slideCount
      let el = $(this).parents('.right').find('.counter')

      if (i < 10) { i = "0" + i }
      if (count < 10) { count = "0" + count }

      el.text( i + ' | ' + count)
    })
  })

  $('.colleague-tells .text, .colleague-tells .images').each(function(){
    if ($(this).hasClass('text')) {
      let images = $(this).parents('.colleague-tells').find('.images')

      $(this).slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: false,
        fade: true,
        cssEase: 'ease-in-out',
        centerMode: false,
        nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-grey.svg" alt="Arrow right"></button>',
        prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-grey.svg" alt="Arrow left"></button>',
        asNavFor: images,
        swipeToSlide: true
      })
    } else {
      let text = $(this).parents('.colleague-tells').find('.text')

      $(this).slick({
        lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: false,
        fade: true,
        cssEase: 'ease-in-out',
        centerMode: false,
        nextArrow: '<button class="slick-next" aria-label="Next slide"><img src="/wp-content/themes/vicoma/dist/images/angle-right-grey.svg" alt="Arrow right"></button>',
        prevArrow: '<button class="slick-prev" aria-label="Previous slide"><img src="/wp-content/themes/vicoma/dist/images/angle-left-grey.svg" alt="Arrow left"></button>',
        asNavFor: text,
        swipeToSlide: true
      })
    }
  })

})
