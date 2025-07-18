(function ($) {
  'use strict';
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. Preloader or Preloader Must Needed In Your Project
    02. Add Class To Hero
    03. WOW.js Animation
    04. Active Menu Item Based On URL
    05. Lenis Library Support
    06. Parallax With GSAP Plugins
    07. Split Text Animation With GSAP Plugins
    08. Sticky Header With GSAP
    09. Mobile Menu Active
    10. Mobile Footer Menu Active
    11. Set Background Image
    12. Custom Slick Carousel
    13. Popup Sidebar Canvas Menu
    14. Popup Search Box
    15. Popup SideCart
    16. Magnific Popup
    17. Section Padding
    18. Isotope Filter
    19. Login Tab Indicator
    20. Color Palate JS
    21. SVG Assets in Inline
    22. Skill Progressbar - Intersection Observer
    23. Custom Bootstrap Tab with Synchronized Left and Right Tab Content
    24. Dropdown Bootstrap Custom Tab With Content Change
    25. Custom Range Slider
    26. Quantity Increase and Decrease
    27. Woocommerce Toggle
    28. Woocommerce color Swatch
    29. Back to Top
    30. Ajax Dynamic Post Submission Form
    31. Countdown Timer for Coming Soon
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /**************************************
   ***** 01. Preloader or Preloader Must Needed In Your Project *****
   **************************************/
  $(window).on('load', function () {
    // Define GSAP animation for the preloader
    if ($('.preloader').length) {
      gsap.to('.preloader', {
        y: '-100%',
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: function () {
          $('.preloader').hide(); // Hide preloader after animation
        },
      });

      // Handle preloader close event
      $('.preloaderCls').on('click', function (e) {
        e.preventDefault(); // Prevent default action
        gsap.to('.preloader', {
          y: '-100%',
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: function () {
            $('.preloader').hide(); // Hide preloader after animation
          },
        });
      });
    }
    /**************************************
     ***** 02. Add Class To Hero *****
     **************************************/
    $('.vs-hero').addClass('animate-elements'); // Add animation class
    /**************************************
     ***** 03. WOW.js Animation *****
     **************************************/
    var wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'wow-animated', // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      scrollContainer: null, // optional scroll container selector, otherwise use window,
      resetAnimation: false, // reset animation on end (default is true)
    });
    wow.init();
  });

  /**************************************
   ***** 04. Active Menu Item Based On URL *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.main-menu'); // Select the main menu container once
    const windowPathname = window.location.pathname;

    if (navMenu) {
      const navLinkEls = navMenu.querySelectorAll('a'); // Only get <a> tags inside the main menu

      navLinkEls.forEach((navLinkEl) => {
        const navLinkPathname = new URL(navLinkEl.href, window.location.origin)
          .pathname;

        // Match current URL with link's href
        if (
          windowPathname === navLinkPathname ||
          (windowPathname === '/index.html' && navLinkPathname === '/')
        ) {
          navLinkEl.classList.add('active');

          // Add 'active' class to all parent <li> elements
          let parentLi = navLinkEl.closest('li');
          while (parentLi && parentLi !== navMenu) {
            parentLi.classList.add('active');
            parentLi = parentLi.parentElement.closest('li'); // Traverse up safely
          }
        }
      });
    }
  });

  /**************************************
   ***** 05. Lenis Library Support *****
   **************************************/
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

  const lenis = new Lenis({
    lerp: 0.1, // animation smoothness (between 0 & 1)
    touchMultiplier: 0, // scrolling speed for touch events
    smoothWheel: true, // smooth scrolling for while events
    smoothTouch: false, // smooth scrolling for touche events
    mouseWheel: false, // smooth scrolling for mouse events
    autoResize: true,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1200);
  });

  /**************************************
   ***** 06. Parallax With GSAP Plugins *****
   **************************************/
  gsap.utils.toArray('[data-vs-gsap-parallax-speed]').forEach((container) => {
    const img = container.querySelector('img');
    const speed =
      parseFloat(container.getAttribute('data-vs-gsap-parallax-speed')) || 1; // Default speed is 1
    const zoomEnabled = container.hasAttribute('data-vs-gsap-parallax-zoom'); // Check if zoom attribute exists

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
      },
    });

    const fromVars = {
      yPercent: -10 * speed,
      ease: 'none',
    };

    const toVars = {
      yPercent: 10 * speed,
      ease: 'none',
    };

    if (zoomEnabled) {
      fromVars.scale = 1; // Initial scale
      toVars.scale = 1.2; // Target scale
    }

    tl.fromTo(img, fromVars, toVars);
  });

  /**************************************
   ***** 07. Split Text Animation With GSAP Plugins *****
   **************************************/
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
  });

  function vsTitleAnimation() {
    const vsElements = document.querySelectorAll('.title-anime');
    if (!vsElements.length) return;

    vsElements.forEach((container) => {
      const quotes = container.querySelectorAll('.title-anime__title');

      quotes.forEach((quote) => {
        // Reset previous animation and revert SplitText if any
        if (quote.animation) {
          quote.animation.kill();
          quote.split.revert();
        }

        // Identify animation style
        const animationClass =
          container.className.match(/animation-(style\d+)/);
        if (!animationClass || animationClass[1] === 'style4') return; // Skip style4

        // Apply SplitText to split content into lines, words, and chars
        quote.split = new SplitText(quote, {
          type: 'lines,words,chars',
          linesClass: 'split-line',
        });

        // Set perspective for 3D effects
        gsap.set(quote, { perspective: 1000 });

        // Define initial states based on animation style
        const chars = quote.split.chars;
        const style = animationClass[1];

        const initialStates = {
          style1: { opacity: 0, y: '90%', rotateX: '-40deg' },
          style2: { opacity: 0, x: '50' },
          style3: { opacity: 0 },
          style4: { opacity: 0, skewX: '-30deg', scale: 0.8 },
          style5: { opacity: 0, scale: 0.5 },
          style6: { opacity: 0, y: '-100%', rotate: '45deg' },
        };

        gsap.set(chars, initialStates[style]);

        // Animate the characters on scroll
        quote.animation = gsap.to(chars, {
          x: '0',
          y: '0',
          rotateX: '0',
          rotate: '0',
          opacity: 1,
          skewX: '0',
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.02,
          scrollTrigger: {
            trigger: quote,
            start: 'top 90%',
            toggleActions: 'play none none none', // Prevent repeat on refresh
          },
        });
      });
    });
  }

  // Refresh animations when ScrollTrigger refreshes
  ScrollTrigger.addEventListener('refreshInit', () => {
    document.querySelectorAll('.title-anime__title').forEach((quote) => {
      if (quote.split) quote.split.revert();
    });
  });

  ScrollTrigger.addEventListener('refresh', vsTitleAnimation);

  document.addEventListener('DOMContentLoaded', vsTitleAnimation);

  /**************************************
   ***** 08. Sticky Header With GSAP *****
   **************************************/
  let lastScrollY = 0; // To track the previous scroll position
  function handleStickyHeader(scrollY) {
    const header = $('.vs-sticky-header');
    const stickyPlaceholder = $('#sticky-placeholder');
    const menu = $('#navbar-wrap');

    if (menu.length === 0) {
      return;
    }

    const menuHeight = menu.outerHeight();
    const topbarHeight = $('#topbar-wrap').outerHeight(true) || 0; // Include margins
    const targetScroll = topbarHeight;

    // Basic sticky logic
    if (scrollY > targetScroll) {
      if (!header.hasClass('sticky')) {
        header.addClass('sticky');
        stickyPlaceholder.height(menuHeight); // Maintain page layout
      }
    } else {
      if (header.hasClass('sticky')) {
        header.removeClass('sticky');
        stickyPlaceholder.height(0); // Remove placeholder height
      }
    }

    // Add or remove `sticky-hold` when scrolling up
    const scrollDelta = scrollY - lastScrollY; // Positive for down, negative for up
    const windowHeight = $(window).height();
    const docHeight = $(document).height();

    if (
      scrollDelta < 0 && // Scrolling up
      scrollY > 0 &&
      scrollY < docHeight - windowHeight - 0 // 150px below top or bottom
    ) {
      if (!header.hasClass('sticky-hold')) {
        header.addClass('sticky-hold');
      }
    } else if (scrollDelta > 0) {
      // Scrolling down
      // Remove sticky-hold class only when scrolling down
      if (header.hasClass('sticky-hold')) {
        header.removeClass('sticky-hold');
      }
    }

    // Add `stickyon` class when scrolling down 150px from the top
    if (scrollY > 0) {
      if (!header.hasClass('stickyon')) {
        header.addClass('stickyon');
      }
    } else {
      if (header.hasClass('stickyon')) {
        header.removeClass('stickyon');
      }
    }

    // Remove `sticky-hold` when at the top or scrolling up to the top
    if (scrollY <= 0) {
      if (header.hasClass('sticky-hold')) {
        header.removeClass('sticky-hold');
      }
    }

    // Update last scroll position
    lastScrollY = scrollY;
  }

  // Lenis scroll event
  lenis.on('scroll', (e) => {
    handleStickyHeader(e.scroll); // Pass Lenis scroll position
  });

  /**************************************
   ***** 09. Mobile Menu Active *****
   **************************************/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: '.vs-menu-toggle',
        bodyToggleClass: 'vs-body-visible',
        subMenuClass: 'vs-submenu',
        subMenuParent: 'vs-item-has-children',
        subMenuParentToggle: 'vs-active',
        meanExpandClass: 'vs-mean-expand',
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: 'vs-open',
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none');
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });
    });
  };

  $('.vs-menu-wrapper').vsmobilemenu();

  /**************************************
   ***** 10. Mobile Footer Menu Active *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.main-menu--footer .menu');
    const menuToggle = document.getElementById('menuToggle');

    // Check if both elements exist before running the script
    if (!menu || !menuToggle) {
      return; // Exit the script if elements are missing
    }

    const resetMenuStyles = () => {
      if (window.innerWidth > 768) {
        menu.style.height = 'auto'; // Reset height on desktop
        menu.style.opacity = '1'; // Reset opacity on desktop
      }
    };

    menuToggle.addEventListener('click', () => {
      if (menu.classList.contains('show')) {
        // Animate closing the menu
        const menuHeight = menu.scrollHeight;
        menu.style.height = `${menuHeight}px`;
        requestAnimationFrame(() => {
          menu.style.height = '0';
          menu.style.opacity = '0';
        });
        menu.addEventListener(
          'transitionend',
          () => {
            menu.classList.remove('show');
            menu.style.height = '';
          },
          { once: true }
        );

        // Remove the active class from the toggle button
        menuToggle.classList.remove('active');
      } else {
        // Animate opening the menu
        menu.classList.add('show');
        const menuHeight = menu.scrollHeight;
        menu.style.height = '0';
        menu.style.opacity = '0';
        requestAnimationFrame(() => {
          menu.style.height = `${menuHeight}px`;
          menu.style.opacity = '1';
        });
        menu.addEventListener(
          'transitionend',
          () => {
            menu.style.height = 'auto';
          },
          { once: true }
        );

        // Add the active class to the toggle button
        menuToggle.classList.add('active');
      }
    });

    // Reset inline styles when switching between mobile and desktop
    window.addEventListener('resize', resetMenuStyles);
  });

  /**************************************
   ***** 11. Set Background Image *****
   **************************************/
  if ($('[data-bg-src]').length > 0) {
    $('[data-bg-src]').each(function () {
      var src = $(this).attr('data-bg-src');
      $(this).css('background-image', 'url(' + src + ')');
      $(this).removeAttr('data-bg-src').addClass('background-image');
    });
  }
  if ($('[data-mask-src]').length > 0) {
    $('[data-mask-src]').each(function () {
      var src = $(this).attr('data-mask-src');
      $(this).css({
        'mask-image': 'url(' + src + ')',
        '-webkit-mask-image': 'url(' + src + ')', // For better browser compatibility
      });
      $(this).removeAttr('data-mask-src').addClass('masked-element');
    });
  }

  /**************************************
   ***** 12. Custom Slick Carousel *****
   **************************************/
  $('.vs-carousel').each(function () {
    var asSlide = $(this);
    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d('prev-arrow') +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d('next-arrow') +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $('[data-slick-next]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $($(this).data('slick-next')).slick('slickNext');
      });
    });

    $('[data-slick-prev]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $($(this).data('slick-prev')).slick('slickPrev');
      });
    });

    // Check for arrow wrapper
    if (d('arrows') == true) {
      if (!asSlide.closest('.arrow-wrap').length) {
        asSlide.closest('.container').parent().addClass('arrow-wrap');
      }
    }

    asSlide.slick({
      dots: d('dots') ? true : false,
      fade: d('fade') ? true : false,
      arrows: d('arrows') ? true : false,
      speed: d('speed') ? d('speed') : 1000,
      asNavFor: d('asnavfor') ? d('asnavfor') : false,
      autoplay: d('autoplay') == false ? false : true,
      infinite: d('infinite') == false ? false : true,
      slidesToShow: d('slide-show') ? d('slide-show') : 1,
      adaptiveHeight: d('adaptive-height') ? true : false,
      centerMode: d('center-mode') ? true : false,
      autoplaySpeed: d('autoplay-speed') ? d('autoplay-speed') : 8000,
      centerPadding: d('center-padding') ? d('center-padding') : '0',
      focusOnSelect: d('focuson-select') == false ? false : true,
      pauseOnFocus: d('pauseon-focus') ? true : false,
      pauseOnHover: d('pauseon-hover') ? true : false,
      variableWidth: d('variable-width') ? true : false,
      vertical: d('vertical') ? true : false,
      verticalSwiping: d('vertical-swiping') ? true : false,
      prevArrow: d('prev-arrow')
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow: d('next-arrow')
        ? nextButton
        : '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      rtl: $('html').attr('dir') == 'rtl' ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d('xl-arrows') ? true : false,
            dots: d('xl-dots') ? true : false,
            slidesToShow: d('xl-slide-show')
              ? d('xl-slide-show')
              : d('slide-show'),
            centerMode: d('xl-center-mode') ? true : false,
            centerPadding: d('xl-center-padding') || d('center-padding') || '0',
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d('ml-arrows') ? true : false,
            dots: d('ml-dots') ? true : false,
            slidesToShow: d('ml-slide-show')
              ? d('ml-slide-show')
              : d('slide-show'),
            centerMode: d('ml-center-mode') ? true : false,
            centerPadding: d('ml-center-padding') || d('center-padding') || '0',
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d('lg-arrows') ? true : false,
            dots: d('lg-dots') ? true : false,
            slidesToShow: d('lg-slide-show')
              ? d('lg-slide-show')
              : d('slide-show'),
            centerMode: d('lg-center-mode') ? d('lg-center-mode') : false,
            centerPadding: d('lg-center-padding') || d('center-padding') || '0',
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d('md-arrows') ? true : false,
            dots: d('md-dots') ? true : false,
            slidesToShow: d('md-slide-show')
              ? d('md-slide-show')
              : d('slide-show'),
            centerMode: d('md-center-mode') ? d('md-center-mode') : false,
            centerPadding: d('sm-center-padding') || d('center-padding') || '0',
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d('sm-arrows') ? true : false,
            dots: d('sm-dots') ? true : false,
            slidesToShow: d('sm-slide-show')
              ? d('sm-slide-show')
              : d('slide-show'),
            centerMode: d('sm-center-mode') ? d('sm-center-mode') : false,
            centerPadding: 0,
            vertical: d('sm-vertical') ? true : false, // Make sure to toggle vertical setting here
            verticalSwiping: d('sm-vertical') ? true : false, // Ensure vertical swiping is also disabled
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d('xs-arrows') ? true : false,
            dots: d('xs-dots') ? true : false,
            slidesToShow: d('xs-slide-show')
              ? d('xs-slide-show')
              : d('slide-show'),
            centerMode: d('xs-center-mode') ? d('xs-center-mode') : false,
            centerPadding: 0,
            vertical: d('xs-vertical') ? true : false, // Make sure to toggle vertical setting here
            verticalSwiping: d('xs-vertical') ? true : false, // Ensure vertical swiping is also disabled
          },
        },
        {
          breakpoint: 321,
          settings: {
            arrows: d('xxs-arrows') ? true : false,
            dots: d('xxs-dots') ? true : false,
            slidesToShow: d('xs-slide-show') ? d('xs-slide-show') : 1,
            centerMode: d('xxs-center-mode') ? d('xxs-center-mode') : false,
            centerPadding: 0,
            vertical: d('xxs-vertical') ? true : false, // Make sure to toggle vertical setting here
            verticalSwiping: d('xxs-vertical') ? true : false, // Ensure vertical swiping is also disabled
          },
        },
      ],
    });
    // Status Update Element
    var $status = $('.slick-status');

    // Update the slide status
    asSlide.on('afterChange', function (event, slick, currentSlide) {
      var totalSlides = slick.slideCount;
      var currentIndex = currentSlide + 1;
      $('.slick-status__active').text(
        currentIndex < 10 ? '0' + currentIndex : currentIndex
      );
      $('.slick-status span:last').text(
        totalSlides < 10 ? '0' + totalSlides : totalSlides
      );
    });

    // Initialize with first slide (if required)
    asSlide.on('init', function () {
      var totalSlides = asSlide.slick('getSlick').slideCount;
      $('.slick-status__active').text('01'); // Default to first slide
      $('.slick-status span:last').text(
        totalSlides < 10 ? '0' + totalSlides : totalSlides
      );
    });

    // end
  });

  $('.vs-carousel').on('afterChange', function (event, slick, currentSlide) {
    setTimeout(function () {
      $('.slick-slide').attr('aria-hidden', true);
    }, 100);
  });

  // Tabe
  $('.nav-link').on('shown.bs.tab', function (e) {
    $('.vs-carousel').slick('setPosition');
  });

  /**************************************
   ***** 13. Popup Sidebar Canvas Menu *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const menuTogglers = document.querySelectorAll('.sideMenuToggler');
    const menuList = document.querySelector('.sidemenu-wrapper');
    const menuContent = menuList.querySelector('.sidemenu-content');
    const menuItems = menuList.querySelectorAll('.sidemenu-item');
    const closeButton = menuList.querySelector('.closeButton');
    const body = document.body;

    // GSAP Timeline
    const tl = gsap.timeline({ paused: true });

    // Menu Animations
    tl.fromTo(
      menuList,
      {
        opacity: 0,
        visibility: 'hidden',
        x: '100%',
      },
      {
        opacity: 1,
        visibility: 'visible',
        x: '0%',
        duration: 0.5,
        ease: 'power2.out',
      }
    )
      .fromTo(
        menuContent,
        {
          opacity: 0,
          x: 20, // Slightly off-screen horizontally
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<' // Synchronize with menuList animation
      )
      .fromTo(
        menuItems,
        {
          opacity: 0,
          y: 20, // Slightly below
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<'
      );

    // Open Menu
    const openMenu = () => {
      menuList.classList.add('show');
      tl.play();
    };

    // Close Menu
    const closeMenu = () => {
      tl.reverse().then(() => {
        menuList.classList.remove('show');
      });
    };

    // Toggle Menu
    const toggleMenu = () => {
      if (menuList.classList.contains('show')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    // Add click event listener to each toggler
    menuTogglers.forEach((menuToggle) => {
      menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
      });
    });

    // Close menu when clicking outside menu content
    body.addEventListener('click', (event) => {
      if (
        menuList.classList.contains('show') &&
        !menuContent.contains(event.target) &&
        ![...menuTogglers].some((toggler) => toggler.contains(event.target))
      ) {
        closeMenu();
      }
    });

    // Close menu when clicking the close button
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeMenu();
    });
  });

  /**************************************
   ***** 14. Popup Search Box *****
   **************************************/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox)
      .find('form')
      .on('click', function (e) {
        e.stopPropagation();
        $($searchBox).addClass($toggleCls);
      });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  }
  popupSarchBox(
    '.popup-search-box',
    '.searchBoxTggler',
    '.searchClose',
    'show'
  );

  /**************************************
   ***** 15. Popup SideCart *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const sideCartTogglers = document.querySelectorAll(
      '.sideCartToggler, .sideCartTogglerTo'
    );
    const sideCart = document.querySelector('.sideCart-wrapper');
    const sideCartContent = sideCart.querySelector('.cart-sidebar-content');
    const closeButton = sideCart.querySelector('.cart-close-button');
    const body = document.body;
    const cartItems = sideCart.querySelectorAll('.cart-animation-item'); // Cart items selector

    // GSAP Timeline for sideCart
    const tl = gsap.timeline({ paused: true });

    // SideCart Open Animations (from left to right)
    tl.fromTo(
      sideCart,
      {
        opacity: 0,
        visibility: 'hidden',
        x: '-100%', // Start off-screen to the left
      },
      {
        opacity: 1,
        visibility: 'visible',
        x: '0%', // Move to the visible position
        duration: 0.5,
        ease: 'power2.out',
      }
    )
      .fromTo(
        sideCartContent,
        {
          opacity: 0,
          x: -20, // Slightly off-screen horizontally from the left
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<' // Synchronize with the sideCart animation
      )
      .fromTo(
        cartItems,
        {
          opacity: 0,
          y: 20, // Slightly below
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<'
      );

    // Open SideCart
    const openSideCart = () => {
      sideCart.classList.add('cartshow');
      tl.play();
    };

    // Close SideCart
    const closeSideCart = () => {
      tl.reverse().then(() => {
        sideCart.classList.remove('cartshow');
      });
    };

    // Toggle SideCart
    const toggleSideCart = () => {
      if (sideCart.classList.contains('cartshow')) {
        closeSideCart();
      } else {
        openSideCart();
      }
    };

    // Add click event listener to each toggler
    sideCartTogglers.forEach((sideCartToggle) => {
      sideCartToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleSideCart();
      });
    });

    // Close sideCart when clicking outside .cart-sidebar-content
    body.addEventListener('click', (event) => {
      if (
        sideCart.classList.contains('cartshow') &&
        !sideCartContent.contains(event.target) &&
        ![...sideCartTogglers].some((toggler) => toggler.contains(event.target))
      ) {
        closeSideCart();
      }
    });

    // Close sideCart when clicking the close button
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeSideCart();
    });
  });

  /**************************************
   ***** 16. Magnific Popup *****
   **************************************/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe',
  });

  /**************************************
   ***** 17. Section Padding *****
   **************************************/
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function (mainAttr, posAttr, getPosValue) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posValue = convertInteger(section.attr(getPosValue)), // positioning value
          posData = section.attr(mainAttr), // how much to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

        if (posData === 'top-half') {
          $(posFor).css('padding-bottom', parentPB + sectionHeight + 'px');
          section.css('margin-top', '-' + sectionHeight + 'px');
        } else if (posData === 'bottom-half') {
          $(posFor).css('padding-top', parentPT + sectionHeight + 'px');
          section.css('margin-bottom', '-' + sectionHeight + 'px');
        } else if (posData === 'top') {
          $(posFor).css('padding-bottom', parentPB + posValue + 'px');
          section.css('margin-top', '-' + posValue + 'px');
        } else if (posData === 'bottom') {
          $(posFor).css('padding-top', parentPT + posValue + 'px');
          section.css('margin-bottom', '-' + posValue + 'px');
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = '[data-sec-pos]';
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition(
        'data-sec-pos',
        'data-pos-for',
        'data-pos-amount'
      );
    });
  }

  /**************************************
   ***** 18. Isotope Filter *****
   **************************************/
  $('.filter-active, .filter-active2').imagesLoaded(function () {
    var $filter = '.filter-active',
      $filter2 = '.filter-active2',
      $filterItem = '.filter-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });
    }

    if ($($filter2).length > 0) {
      var $grid = $($filter2).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem,
        },
      });
    }

    // Menu Active Class
    $($filterMenu).on('click', 'button', function (event) {
      event.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass('active');
      $(this).siblings('.active').removeClass('active');
    });
  });

  /**************************************
   ***** 19. Login Tab Indicator *****
   **************************************/
  function setPos(element) {
    var indicator = element.siblings('.indicator'),
      btnWidth = element.css('width'),
      btnHiehgt = element.css('height'),
      btnLeft = element.position().left,
      btnTop = element.position().top;
    element.addClass('active').siblings().removeClass('active');
    indicator.css({
      left: btnLeft + 'px',
      top: btnTop + 'px',
      width: btnWidth,
      height: btnHiehgt,
    });
  }

  $('.login-tab a').each(function () {
    var link = $(this);
    if (link.hasClass('active')) setPos(link);
    link.on('mouseover', function () {
      setPos($(this));
    });
  });

  /**************************************
   ***** 20. Color Palate JS *****
   **************************************/
  if ($('.vs-color-plate').length) {
    var oldValue = $('#plate-color').val();
    $('#plate-color').on('change', function (e) {
      var color = e.target.value;
      $('body').css('--vs-theme-color', color);
    });

    $('#plate-reset').on('click', function () {
      $('body').css('--vs-theme-color', '');
      $('#plate-color').val(oldValue);
    });

    $('#plate-toggler').on('click', function () {
      $('.vs-color-plate').toggleClass('open');
    });
  }

  /**************************************
   ***** 21. SVG Assets in Inline *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const svgElements = document.querySelectorAll('.vs-svg-assets');

    svgElements.forEach((svgElement) => {
      const svgPath = svgElement.getAttribute('data-svg-assets');

      if (svgPath) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', svgPath, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
              svgElement.insertAdjacentHTML('afterbegin', xhr.responseText);
            } else {
              console.error(
                `Failed to load SVG: ${xhr.status} ${xhr.statusText}`
              );
            }
          }
        };
        xhr.send();
      } else {
        console.error('SVG path not found for element:', svgElement);
      }
    });
  });

  // Svg line animation
  // Wait for the DOM to fully load
  document.addEventListener('DOMContentLoaded', () => {
    // Select all paths within .vs-svg-assets in .main-menu
    const paths = document.querySelectorAll(
      '.main-menu .vs-svg-assets svg path'
    );

    paths.forEach((path) => {
      // Get the total length of the current path
      const pathLength = path.getTotalLength();

      // Dynamically set the stroke-dasharray and stroke-dashoffset
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength; // Initially hide the stroke
    });
  });

  /**************************************
   ***** 22. Skill Progressbar - Intersection Observer *****
   **************************************/
  document.addEventListener('DOMContentLoaded', function () {
    const progressBoxes = document.querySelectorAll('.progress-box');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Intersection observer threshold
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    progressBoxes.forEach((progressBox) => {
      observer.observe(progressBox);
    });

    function animateProgressBar(progressBox) {
      try {
        const progressBar = progressBox.querySelector('.progress-box__bar');
        const progressNumber = progressBox.querySelector(
          '.progress-box__number'
        );

        // Retrieve target width from data attribute
        const targetWidth = parseInt(progressBar.dataset.width, 10);
        let width = 0;

        const countInterval = setInterval(() => {
          width++;
          progressBar.style.width = width + '%';

          // Safely update the progress number
          if (progressNumber) {
            progressNumber.textContent = width + '%';
          }

          if (width >= targetWidth) {
            clearInterval(countInterval);
          }
        }, 20);
      } catch (error) {
        console.error('Error animating progress bar:', error);
      }
    }
  });

  /**************************************
   ***** 23. Custom Bootstrap Tab with Synchronized Left and Right Tab Content *****
   **************************************/
  document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.vs-nav-link');

    tabs.forEach((tab) => {
      tab.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the target tab IDs
        const targets = tab.getAttribute('data-bs-target').split(',');

        targets.forEach((targetId) => {
          const targetTab = document.querySelector(targetId);
          const tabContent = targetTab.closest('.vs-tab-content');
          const activeTab = tabContent.querySelector('.vs-tab-pane.active');

          if (activeTab) {
            // Fade out the current active tab
            activeTab.classList.remove('show');
            activeTab.addEventListener(
              'transitionend',
              () => {
                activeTab.classList.remove('active');
                // Fade in the new tab
                targetTab.classList.add('active');
                setTimeout(() => {
                  targetTab.classList.add('show');
                }, 50); // Allow time for the fade effect
              },
              { once: true }
            );
          } else {
            // If no active tab, directly activate the target tab
            targetTab.classList.add('active');
            setTimeout(() => {
              targetTab.classList.add('show');
            }, 50);
          }
        });
      });
    });
  });

  /**************************************
   ***** 24. Dropdown Bootstrap Custom Tab With Content Change *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.vs-dropdown');
    const dropdownBtn = document.querySelector('.vs-dropdown-btn');
    const dropdownContent = document.querySelector('.vs-dropdown-content');

    if (dropdownBtn) {
      // Toggle dropdown content visibility on button click
      dropdownBtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside of it
      window.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
          dropdown.classList.remove('show');
        }
      });
    }

    // Update dropdown button text and show the selected tab
    const links = document.querySelectorAll('.vs-dropdown-content a');
    if (links.length > 0) {
      links.forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();

          // Update dropdown button text
          dropdownBtn.textContent = event.target.textContent;

          // Close the dropdown
          dropdown.classList.remove('show');

          // Remove active class from all tabs
          document.querySelectorAll('.vs-tab-content').forEach((tab) => {
            tab.classList.remove('active');
          });

          // Add active class to the selected tab
          const tabId = event.target.getAttribute('data-tab');
          const tab = document.getElementById(tabId);
          if (tab) {
            tab.classList.add('active');
          }
        });
      });
    }
  });

  /**************************************
   ***** 25. Custom Range Slider *****
   **************************************/
  document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderTrack = document.querySelector('.slider-track');
    const minThumb = document.querySelector('.min-thumb');
    const maxThumb = document.querySelector('.max-thumb');
    const priceLabel = document.getElementById('price-label');

    // Check if both thumbs are found, and if not, skip the script without error message
    if (!minThumb || !maxThumb) return;

    let minPrice = 50;
    let maxPrice = 800;
    const minLimit = 50;
    const maxLimit = 800;

    // Function to set the positions of thumbs and track
    function updateSlider() {
      const range = maxLimit - minLimit;
      const minPercent = ((minPrice - minLimit) / range) * 100;
      const maxPercent = ((maxPrice - minLimit) / range) * 100;

      minThumb.style.left = `${minPercent}%`;
      maxThumb.style.left = `${maxPercent}%`;

      sliderTrack.style.left = `${minPercent}%`;
      sliderTrack.style.right = `${100 - maxPercent}%`;

      const roundedMinPrice = Math.round(minPrice);
      const roundedMaxPrice = Math.round(maxPrice);

      priceLabel.textContent = `$${roundedMinPrice} — $${roundedMaxPrice}`;
    }

    // Dragging logic for thumbs
    function dragThumb(event, isMinThumb) {
      const sliderWidth = sliderWrapper.offsetWidth;
      const sliderLeft = sliderWrapper.getBoundingClientRect().left;

      function moveThumb(moveEvent) {
        const position =
          ((moveEvent.clientX - sliderLeft) / sliderWidth) *
            (maxLimit - minLimit) +
          minLimit;

        if (isMinThumb) {
          minPrice = Math.min(Math.max(minLimit, position), maxPrice - 1);
        } else {
          maxPrice = Math.max(Math.min(maxLimit, position), minPrice + 1);
        }

        updateSlider();
      }

      function stopDrag() {
        window.removeEventListener('mousemove', moveThumb);
        window.removeEventListener('mouseup', stopDrag);
      }

      window.addEventListener('mousemove', moveThumb);
      window.addEventListener('mouseup', stopDrag);
    }

    minThumb.addEventListener('mousedown', (event) => dragThumb(event, true));
    maxThumb.addEventListener('mousedown', (event) => dragThumb(event, false));

    // Initialize slider
    updateSlider();
  });

  /**************************************
   ***** 26. Quantity Increase and Decrease *****
   **************************************/
  $('.quantity-plus').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      var $qty = $(this).closest('.quantity-container').find('.qty-input');
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(formatNumber(currentVal + 1));
      }
    });
  });
  $('.quantity-minus').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      var $qty = $(this).closest('.quantity-container').find('.qty-input');
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(formatNumber(currentVal - 1));
      }
    });
  });
  // Function to format the number with leading zeros
  function formatNumber(num) {
    return num.toString().padStart(2, '0');
  }

  /**************************************
   ***** 27. Woocommerce Toggle *****
   **************************************/
  // Ship To Different Address
  $(document).ready(function () {
    $('#ship-to-different-address-checkbox').on('change', function () {
      if ($(this).is(':checked')) {
        $('#ship-to-different-address').next('.shipping_address').slideDown();
      } else {
        $('#ship-to-different-address').next('.shipping_address').slideUp();
      }
    });
  });

  // Login Toggle
  $('.woocommerce-form-login-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-login').slideToggle();
  });

  // Coupon Toggle
  $('.woocommerce-form-coupon-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-coupon').slideToggle();
  });

  // Woocommerce Shipping Method
  $('.shipping-calculator-button').on('click', function (e) {
    e.preventDefault();
    $(this).next('.shipping-calculator-form').slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings('.payment_box')
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on('change', function () {
      $('.payment_box').slideUp();
      $(this).siblings('.payment_box').slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $('.rating-select .stars a').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $(this).parent().parent().addClass('selected');
      $(this).addClass('active');
    });
  });

  /**************************************
   ***** 28. Woocommerce color Swatch *****
   **************************************/
  document.addEventListener('DOMContentLoaded', function () {
    const swatches = document.querySelectorAll('.swatch');

    // Add click event to each swatch
    swatches.forEach((swatch) => {
      swatch.addEventListener('click', function () {
        // Remove 'active' class from all swatches
        swatches.forEach((s) => s.classList.remove('active'));

        // Add 'active' class to the clicked swatch
        this.classList.add('active');
      });
    });
  });

  /**************************************
   ***** 29. Back to Top *****
   **************************************/
  // Get references to DOM elements
  const backToTopBtn = document.getElementById('backToTop');
  const progressCircle = document.querySelector('.progress');
  const progressPercentage = document.getElementById('progressPercentage');

  // Circle properties
  const CIRCLE_RADIUS = 40;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  // Set initial styles for the circle
  progressCircle.style.strokeDasharray = CIRCUMFERENCE;
  progressCircle.style.strokeDashoffset = CIRCUMFERENCE;

  // Update progress based on scroll position
  const updateProgress = () => {
    const scrollPosition = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (totalHeight > 0) {
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      const offset = CIRCUMFERENCE * (1 - scrollPercentage / 100);

      // Update the circle and percentage display
      progressCircle.style.strokeDashoffset = offset.toFixed(2);
      progressPercentage.textContent = `${Math.round(scrollPercentage)}%`;
    }
  };

  // Scroll to top using smooth animation
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0 });
  };

  // Throttle function to limit function execution frequency
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  // Attach event listeners
  window.addEventListener('scroll', throttle(updateProgress, 50));
  backToTopBtn.addEventListener('click', scrollToTop);

  // Initial update to set the correct progress on page load
  updateProgress();

  /**************************************
   ***** 30. Ajax Dynamic Post Submission Form *****
   **************************************/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = 'is-invalid';
    var $email = '[name="email"]';
    var $validation =
      '[name="name"],[name="email"],[name="phone"],[name="message"]'; // Remove [name="subject"]
    var formMessages = $(selectForm).next('.form-messages');

    function sendContact() {
      var formData = $(form).serialize();
      var valid;
      valid = validateContact();
      if (valid) {
        jQuery
          .ajax({
            url: $(form).attr('action'),
            data: formData,
            type: 'POST',
          })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass('error');
            formMessages.addClass('success');
            // Set the message text.
            formMessages.text(response);
            // Clear the form.
            $(form + ' input:not([type="submit"]),' + form + ' textarea').val(
              ''
            );
          })
          .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass('success');
            formMessages.addClass('error');
            // Set the message text.
            if (data.responseText !== '') {
              formMessages.html(data.responseText);
            } else {
              formMessages.html(
                'Oops! An error occurred and your message could not be sent.'
              );
            }
          });
      }
    }

    function validateContact() {
      var valid = true;
      var formInput;
      function unvalid($validation) {
        $validation = $validation.split(',');
        for (var i = 0; i < $validation.length; i++) {
          formInput = form + ' ' + $validation[i];
          if (!$(formInput).val()) {
            $(formInput).addClass(invalidCls);
            valid = false;
          } else {
            $(formInput).removeClass(invalidCls);
            valid = true;
          }
        }
      }
      unvalid($validation);

      if (
        !$(form + ' ' + $email).val() ||
        !$(form + ' ' + $email)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ) {
        $(form + ' ' + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + ' ' + $email).removeClass(invalidCls);
        valid = true;
      }
      return valid;
    }

    $(form).on('submit', function (element) {
      element.preventDefault();
      sendContact();
    });
  }
  ajaxContactForm('.ajax-contact');

  /**************************************
   ***** 31. Countdown Timer for Coming Soon *****
   **************************************/
  $.fn.countdown = function () {
    this.each(function () {
      var $this = $(this),
        offerDate = new Date($this.data('offer-date')).getTime();

      function findElement(selector) {
        return $this.find(selector);
      }

      var interval = setInterval(function () {
        var now = new Date().getTime(),
          timeDiff = offerDate - now,
          days = Math.floor(timeDiff / 864e5),
          hours = Math.floor((timeDiff % 864e5) / 36e5),
          minutes = Math.floor((timeDiff % 36e5) / 6e4),
          seconds = Math.floor((timeDiff % 6e4) / 1e3);

        days < 10 && (days = '0' + days),
          hours < 10 && (hours = '0' + hours),
          minutes < 10 && (minutes = '0' + minutes),
          seconds < 10 && (seconds = '0' + seconds);

        if (timeDiff < 0) {
          clearInterval(interval);
          $this.addClass('expired');
          findElement('.message').css('display', 'block');
        } else {
          findElement('.day').html(days);
          findElement('.hour').html(hours);
          findElement('.minute').html(minutes);
          findElement('.seconds').html(seconds);
        }
      }, 1000);
    });
  };

  $('.offer-counter').length && $('.offer-counter').countdown();

  /**************************************
   ***** 32. Automatic Year Update *****
   **************************************/
  (function updateYear() {
    // Fetch the current year
    const currentYear = new Date().getFullYear();
    // Find the element by its ID and set its content
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = currentYear;
    }
  })();

  // End
})(jQuery);
