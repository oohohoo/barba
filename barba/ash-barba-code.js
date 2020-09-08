import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import pageNav from './../components/pageNav';
import caseStudiesListing from './../components/caseStudiesListing';
import { TimelineMax, TweenMax } from 'gsap/all';
export default {
  init() {
    // JavaScript to be fired on all pages
    const $body = $('body');
    // tell Barba to use the prefetch module
    barba.use(barbaPrefetch);
    // init Barba
    barba.init({
      debug: true,
      cacheIgnore: true,
      views: [
        {
          namespace: 'work',
          afterEnter() {
            pageNav.init();
          },
          beforeLeave() {
            pageNav.destroy();
          },
        },
        {
          namespace: 'work-listing',
          afterEnter() {
            caseStudiesListing.init();
          },
          beforeLeave() {
            caseStudiesListing.destroy();
          },
        },
      ],
      transitions: [
        {
          name: 'work-listing',
          from: { namespace: 'work' },
          to: { namespace: 'work-listing' },
          leave: ({ current, next }) => {
            const done = this.async(),
                  currentPage = current.container,
                  nextPage = next.container,
                  $currentPage = $(currentPage),
                  $nextPage = $(nextPage),
                  $transitionImage = $currentPage.find('.bg-slider .slick-active .img-video').first(),
                  $caseStudiesListing = $nextPage.find('.case-studies-listing'),
                  $window = $(window),
                  windowWidth = $window.width(),
                  windowHeight = $window.height(),
                  fontSize = parseFloat($('body').css('font-size')),
                  slideWidth = windowWidth - (fontSize*10),
                  transitionTimeline = new TimelineMax({ onComplete: done() });
            let caseStudyWidth, caseStudyHeight;
            $transitionImage.appendTo($('#transition-image'));
            if ($caseStudiesListing.hasClass('three-wide')) {
              caseStudyWidth = (slideWidth/3) - (fontSize*2);
              caseStudyHeight = (windowHeight*0.45) - (fontSize*2);
            } else if ($caseStudiesListing.hasClass('two-wide')) {
              caseStudyWidth = (slideWidth/2) - (fontSize*2);
              caseStudyHeight = (windowHeight*0.6) - (fontSize*2);
            } else {
              caseStudyWidth = slideWidth - (fontSize*2);
              caseStudyHeight = (windowHeight*0.75) - (fontSize*2);
            }
            transitionTimeline
              .add(TweenMax.to($currentPage.find('.bg-slider-container, .fg-slider-container, .slide-counter'), 1, {opacity: 0}), 0)
              .add(TweenMax.to($transitionImage, 1, {opacity: 1}), 1)
              .add(TweenMax.to($transitionImage, 1, {
                width: caseStudyWidth,
                height: caseStudyHeight,
              }), 2)
            ;
          },
          enter: (data) => {},
        },
      ],
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};