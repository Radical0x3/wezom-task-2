$(document).ready(function () {
  $(".tabs__link").on("click", function () {
    let parent = $(this).parent();
    $(".tabs__item.active").removeClass("active");
    parent.addClass("active");
  });

  $(".product__slider").slick({
    slidesToShow: 4,
    vertical: true,
    verticalSwiping: true,
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

  $("#tab-1 .comments__btn").on("click", function (e) {
    e.preventDefault();
    let target = $("#tab-1 .comments__list");
    let commentsCount = $("#tab-1 .comments__item").length;
    loadComments(target, commentsCount);
  });

  $("#tab-4 .comments__btn").on("click", function (e) {
    e.preventDefault();
    let target = $("#tab-4 .comments__list");
    let commentsCount = $("#tab-4 .comments__item").length;
    loadComments(target, commentsCount);
  });

  $(".subscribe__tel").mask("+38 (099) 99 - 99 - 999");

  $(".product__slider .slick-slide").on("click", function () {
    let id = $(this).attr("data-slick-index");
    $(".product__big-slider").slick("slickGoTo", id);
  });

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

  $(".tabs__link").on("click", function (e) {
    let target = $(this).attr("href").slice(1);
    $(".tabs-item.active").removeClass("active");
    $(`#${target}`).addClass("active");
  });

  $(".link-to-tab").on("click", function () {
    let target = $(this).attr("href").slice(1);
    let id = target.slice(-1);
    $(".tabs-item.active").removeClass("active");
    $(".tabs__item.active").removeClass("active");
    $(".tabs__item")
      .eq(id - 1)
      .addClass("active");
    $(`#${target}`).addClass("active");
  });

  $(".goods__icon").on("click", function () {
    $(this).toggleClass("active");
  });

  // <------ Button scroll-up START ------>
  $("a").on("click", function (e) {
    let href = $(this).attr("href");

    if (href.startsWith("#") && href !== "#" && href !== "##") {
      $("html, body").animate(
        {
          scrollTop: $(href).offset().top - 100,
        },
        {
          duration: 600,
          easing: "linear",
        }
      );

      return false;
    }
  });

  $(window).scroll(function () {
    toggleBtnUp();
  });
  toggleBtnUp();

  function toggleBtnUp() {
    let btnUp = $(".button-up");
    if ($(window).scrollTop() > 0) {
      btnUp.addClass("show");
    } else {
      btnUp.removeClass("show");
    }
  }
  // <------ Button scroll-up END ------>
});

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

function moveFooterIcons() {
  let block = $(".payments");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth < 850) {
    $(".footer__top").append(block);
  } else {
    block.insertAfter(".social__list");
  }
}

function loadComments(target, commentsCount) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../data.json", true);
  xhr.send();

  xhr.onload = function () {
    let data = JSON.parse(xhr.responseText);

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

      target.append(object);
      if (commentsCount + i + 1 === data.length) {
        $(target).next().find(".comments__btn").remove();
      }
    }
  };
}
