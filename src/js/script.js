$(document).ready(function () {
  // Switch between tabs
  $(".tabs__link", ".tabs").on("click", function () {
    let target = $(this).attr("href");

    if (!$(this).parents(".tabs__item").hasClass("active")) {
      $(".tabs-item.active").removeClass("active");
      $(`${target}`).addClass("active");

      $(".tabs__item.active").removeClass("active");
      $(this).parent().addClass("active");
    }

    scrolltoElement(this);
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
  $("#tab-1 .comments__btn").on("click", function () {
    let target = $("#tab-1 .comments__list");
    let commentsCount = $("#tab-1 .comments__item").length;
    loadComments(target, commentsCount);
  });

  // Load comments from JSON to Comments Tab
  $("#tab-4 .comments__btn").on("click", function () {
    let target = $("#tab-4 .comments__list");
    let commentsCount = $("#tab-4 .comments__item").length;
    loadComments(target, commentsCount);
  });

  // Set input mask for telephone number
  $(".subscribe__tel").mask("+38 (099) 99 - 99 - 999");

  // Change active slide of the big slider by clicking on the slide
  // of the small (vertical) slider
  $(".product__slider .slick-slide").on("click", function () {
    let id = $(this).attr("data-slick-index");
    $(".product__big-slider").slick("slickGoTo", id);
  });

  // Accordion
  $(".product__payment-header").on("click", function () {
    let target = $(this).next(".product__payment-body");

    if (target.is(":visible")) {
      $(this).removeClass("active");
      target.slideUp();
    } else {
      $(".product__payment-header.active").removeClass("active");
      $(".product__payment-body").slideUp();
      $(this).addClass("active");
      target.slideDown();
    }
  });

  // Go to tab
  $(".link-to-tab").on("click", function () {
    let target = $(this).attr("href");
    let id = target.slice(-1);
    $(".tabs-item.active").removeClass("active");
    $(".tabs__item.active").removeClass("active");
    $(".tabs__item")
      .eq(id - 1)
      .addClass("active");
    $(`${target}`).addClass("active");
    scrolltoElement(this);
  });

  $(".goods__icon").on("click", function () {
    $(this).toggleClass("active");
  });

  $(".button-up").on("click", function () {
    scrolltoElement(this);
  });

  $(".rating__votes").on("click", function () {
    scrolltoElement(this);
  });

  $(window).scroll(function () {
    toggleBtnUp();
  });
  toggleBtnUp();

  // Toggle button for scrolling up
  function toggleBtnUp() {
    let btnUp = $(".button-up");
    if ($(window).scrollTop() > 0) {
      btnUp.addClass("show");
    } else {
      btnUp.removeClass("show");
    }
  }
});

function scrolltoElement(target) {
  let href = $(target).attr("href");

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
  const data = $(".goods__list").attr("data-slick");
  const sliderOptions = JSON.parse(data);
  const sliderSlidesCount = $(".goods__list .goods__item").length;

  if (sliderSlidesCount > sliderOptions.slidesToShow) {
    $(".goods__list").slick({
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
    $(".goods__list").addClass("non-slider");
  }
}

// Move some footer icons
function moveFooterIcons() {
  let block = $(".payments");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth < 850) {
    $(".footer__top").append(block);
  } else {
    block.insertAfter(".social__list");
  }
}

// Load comments from JSON
function loadComments(target, commentsCount) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../data.json", true);
  xhr.send();

  xhr.onload = function () {
    let data = JSON.parse(xhr.responseText);
    let result = "";

    for (let i = 0; i < 3; i++) {
      if (commentsCount + i >= data.length) {
        $(target).next().find(".comments__btn").remove();
        return;
      }

      let item = data[commentsCount + i];
      let object = `
      <li class="comments__item">
        <header class="comments__meta">
          <span class="comments__author">${item.author}</span>
          <span class="comments__date">/ ${item.date}</span>
          <ul class="rating__list" data-total-value="${item.ratingValue}">
            <li class="rating__item">&#9733;</li>
            <li class="rating__item">&#9733;</li>
            <li class="rating__item">&#9733;</li>
            <li class="rating__item">&#9733;</li>
            <li class="rating__item">&#9733;</li>
          </ul>
        </header>
        <p class="comments__body">${item.comment}</p>
      </li>`;

      result += object;

      if (commentsCount + i + 1 === data.length) {
        $(target).parent().find(".comments__btn").remove();
      }
    }

    target.append(result);
  };
}
