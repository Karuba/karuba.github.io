$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 800,
      /* adaptiveHeight: true, */
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.svg"></button>',
      responsive: [
         {
            breakpoint: 768,
            settings: {
               dots: true,
               arrows: false
            }
         }
      ]
   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
      $(this)
         .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list-active');
         })
      })
   }

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   //Modal

   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('fast');
   });

   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
   });

   $('.button-mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('fast');
      });
   });



   function validateForm(form) {
      $(form).validate({
         rules: {
            name: "required",
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Введи свое имя нормально!",
            phone: "Слышь, ну ты реально не вдупляешь!",
            email: {
               required: "Сотри и введи нормально!",
               email: "Неправильно! Широкую на широкую клади!!!"
            }
         }
      });
   };
   validateForm('#consultation-form');
   validateForm('#consultation form');
   validateForm('#order form');

   $('input[name=phone]').mask("+7 (999) 999-99-99");

   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut('fast');
         $('.overlay #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll and pageup

   $(window).scroll(function () {
      if ($(this).scrollTop() > 500) {
         $('.pageup').fadeIn('slow');
      }
      else {
         $('.pageup').fadeOut('slow');
      }
   });

   const $page = $('html, body');
   $('a[href=#up]').click(function () {
      $page.animate({ scrollTop: $($.attr(this, 'href')).offset().top }, 400);
      return false;
   });

   new WOW().init();
});