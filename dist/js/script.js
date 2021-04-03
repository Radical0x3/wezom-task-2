$(document).ready(function () {
  // Switch between tabs
  $(".js-tabs").on("click", function (event) {
    const currentNode = event.target.closest("a");
    const targetNode = $(currentNode).attr("href");
    const parentNode = $(currentNode).parents(".js-tabs-item");

    if (!currentNode) return;

    if (!$(parentNode).hasClass("active")) {
      $(".js-tab").removeClass("active");
      $(`${targetNode}`).addClass("active");

      $(".js-tabs-item").removeClass("active");
      $(parentNode).addClass("active");
    }

    scrolltoElement(currentNode);
  });

  // Initialise vertical slider
  $(".product__slider").slick({
    slidesToShow: 4,
    vertical: true,
    infinite: false,
    accessibility: false,
    asNavFor: ".product__big-slider",
    responsive: [
      {
        breakpoint: 851,
        settings: {
          slidesToShow: 4,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  // Initialise big slider
  $(".product__big-slider").slick({
    asNavFor: ".product__slider",
    infinite: false,
    draggable: false,
    swipe: false,
    arrows: false,
    fade: true,
  });

  checkGoodsSlider();
  moveFooterIcons();
  $(window).on("resize", function () {
    moveFooterIcons();
  });

  // Load comments from JSON to About Tab
  $(".js-load-comments", "#tab-1").on("click", function () {
    const context = $("#tab-1");

    loadComments(context);
  });

  // Load comments from JSON to Comments Tab
  $(".js-load-comments", "#tab-4").on("click", function () {
    const context = $("#tab-4");

    loadComments(context);
  });

  // Set input mask for telephone number
  $(".js-tel-mask").mask("+38 (099) 99 - 99 - 999");

  // Change active slide of the big slider by clicking on the slide
  // of the small (vertical) slider
  $(".js-slider-preview .slick-slide").on("click", function () {
    let id = $(this).attr("data-slick-index");

    $(".js-big-slider").slick("slickGoTo", id);
  });

  // Accordion
  $(".js-accordion").on("click", function (event) {
    const currentNode = event.target.closest("header");

    if (!currentNode) return;

    const targetNode = $(currentNode).siblings(".js-accordion-body");

    if (targetNode.is(":visible")) {
      $(currentNode).removeClass("active");
      targetNode.slideUp();
    } else {
      $(".js-accordion-header.active").removeClass("active");
      $(".js-accordion-body").slideUp();
      $(currentNode).addClass("active");
      targetNode.slideDown();
    }
  });

  // Go to tab
  $(".js-tab-link").on("click", function () {
    let target = $(this).attr("href");
    let id = target.slice(-1);
    $(".js-tab.active").removeClass("active");
    $(".js-tabs-item.active").removeClass("active");
    $(".js-tabs-item")
      .eq(id - 1)
      .addClass("active");
    $(`${target}`).addClass("active");
    scrolltoElement(this);
  });

  $(".js-goods").on("click", function (event) {
    const target = event.target.closest("svg");

    if (!target) return;

    $(target).toggleClass("active");
  });

  $(".js-scroll-to").on("click", function () {
    scrolltoElement(this);
  });

  $(window).scroll(function () {
    toggleBtnUp();
  });
  toggleBtnUp();

  // Toggle button for scrolling to top
  function toggleBtnUp() {
    const btnUp = $(".button-up");

    if (!btnUp) return;

    if ($(window).scrollTop() > 0) {
      btnUp.addClass("show");
    } else {
      btnUp.removeClass("show");
    }
  }
});

// Smooth scroll to element
function scrolltoElement(target) {
  const href = $(target).attr("href");

  $("html, body").animate(
    {
      scrollTop: $(href).offset().top - 100,
    },
    {
      duration: 600,
      easing: "linear",
    }
  );
}

// Initialise third slider
function checkGoodsSlider() {
  const slider = $(".js-goods-slider");

  if (!slider) return;

  const data = $(slider).attr("data-slick");
  const sliderOptions = JSON.parse(data);
  const sliderSlidesCount = $(".js-goods-item", slider).length;

  if (sliderSlidesCount > sliderOptions.slidesToShow) {
    $(slider).slick({
      responsive: [
        {
          breakpoint: 1430,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 476,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          },
        },
      ],
    });
  } else {
    $(slider).addClass("non-slider");
  }
}

// Move some footer icons
function moveFooterIcons() {
  let block = $(".js-footer-icons");
  let windowInnerWidth = window.innerWidth;

  if (!block) return;

  if (windowInnerWidth < 850) {
    $(".footer__top").append(block);
  } else {
    block.insertAfter(".social__list");
  }
}

// Load comments from JSON
function loadComments(context) {
  const target = $(".comments__list", context);
  const commentsCount = $(".comments__item", context).length;
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "../data.json", true);
  xhr.send();

  xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    let result = "";

    for (let i = 0; i < 3; i++) {
      if (commentsCount + i >= data.length) {
        break;
      }

      const item = data[commentsCount + i];
      const object = `
      <li class="comments__item">
        <header class="comments__meta">
          <span class="comments__author">${item.author}</span>
          <span class="comments__date">/ ${item.date}</span>
          <ul class="rating__list" data-total-value="${item.ratingValue}">
            <li class="rating__item">
              <svg class="rating__icon">
                <use xlink:href="img/icons/icons.svg#star"></use>
              </svg>
            </li>
            <li class="rating__item">
              <svg class="rating__icon">
                <use xlink:href="img/icons/icons.svg#star"></use>
              </svg>
            </li>
            <li class="rating__item">
              <svg class="rating__icon">
                <use xlink:href="img/icons/icons.svg#star"></use>
              </svg>
            </li>
            <li class="rating__item">
              <svg class="rating__icon">
                <use xlink:href="img/icons/icons.svg#star"></use>
              </svg>
            </li>
            <li class="rating__item">
              <svg class="rating__icon">
                <use xlink:href="img/icons/icons.svg#star"></use>
              </svg>
            </li>
          </ul>
        </header>
        <p class="comments__body">${item.comment}</p>
      </li>`;

      result += object;

      if (commentsCount + i + 1 === data.length) {
        $(target).parent().find(".js-load-comments").remove();
      }
    }

    target.append(result);
  };
}
