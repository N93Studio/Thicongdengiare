let isloadIdex = 0;
$(window).on('scroll  mousemove touchstart',function(){
	try{
		if(!isloadIdex){
			isloadIdex = 1;


			var swiperbanner = new Swiper('.banner-slider', {
				slidesPerView: 3,
				loop: false,
				grabCursor: true,
				roundLengths: true,
				slideToClickedSlide: false,
				spaceBetween: 20,
				pagination: {
					el: '.product-phongkhach-swiper .swiper-pagination',
					clickable: true,
				},
				autoplay: false,
				breakpoints: {
					300: {
						slidesPerView: 1.3,
					},
					500: {
						slidesPerView: 2,
					},
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,

					},
					991: {
						slidesPerView: 3,

					},
					1200: {
						slidesPerView: 3,

					}
				}

			});

			var swiperduan = new Swiper('.duan-slider', {
				slidesPerView: 3,
				loop: false,
				grabCursor: true,
				roundLengths: true,
				slideToClickedSlide: false,
				spaceBetween: 20,

				autoplay: false,
				slidesPerColumn: 2,
				slidesPerColumnFill: "row",
				breakpoints: {
					300: {
						slidesPerView: 1,
					},
					500: {
						slidesPerView: 2,
					},
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,

					},
					991: {
						slidesPerView: 4,

					},
					1200: {
						slidesPerView: 4,

					}
				}

			});
			var swiper = new Swiper('.danhgia-slider', {
				autoplay: false,
				spaceBetween: 30,
				pagination: {
					el: '.danhgia-slider .swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					300: {
						slidesPerView: 1,
					},
					500: {
						slidesPerView: 1,
					},
					640: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,

					},
					991: {
						slidesPerView: 2,

					},
					1200: {
						slidesPerView: 3,

					}
				}
			});



			$(".not-dqtab").each( function(e){
				var $this1 = $(this);
				var datasection = $this1.closest('.not-dqtab').attr('data-section');
				$this1.find('.tabs-title li:first-child').addClass('current');
				var view = $this1.closest('.not-dqtab').attr('data-view');
				$this1.find('.tab-content').first().addClass('current');
				var droptab = $(this).find('.tab-desktop');
				$this1.find('.tabs-title.ajax li').click(function(){
					var $this2 = $(this),
						tab_id = $this2.attr('data-tab'),
						url = $this2.attr('data-url');
					var etabs = $this2.closest('.e-tabs');
					etabs.find('.tab-viewall').attr('href',url);
					etabs.find('.tabs-title li').removeClass('current');
					etabs.find('.tab-content').removeClass('current');
					$this2.addClass('current');
					etabs.find("."+tab_id).addClass('current');
					if(!$this2.hasClass('has-content')){
						$this2.addClass('has-content');		
						getContentTab(url,"."+ datasection+" ."+tab_id,view);
					}
				});
			});


			function getContentTab(url,selector){

				url = url+"?view=ajaxload4";

				var loading = '<div style="width: 100%; margin-top: 20px" class="text-center">Đang tải dữ liệu...</div>';
				var fill = $(selector);
				console.log(url)
				$.ajax({
					type: 'GET',
					url: url,
					beforeSend: function() {
						$(selector).html(loading);
					},
					success: function(data) {
						var content = $(data);
						setTimeout(function(){
							$(selector).html(content.html());

							awe_lazyloadImage();

							$(selector+' .add_to_cart').click(function(e){	
								e.preventDefault();		
								var $this = $(this);
								var form = $this.parents('form');	
								$.ajax({
									type: 'POST',
									url: '/cart/add.js',
									async: false,
									data: form.serialize(),
									dataType: 'json',
									beforeSend: function() { },
									success: function(line_item) {
										$('.cart-popup-name').html(line_item.title).attr('href', line_item.url, 'title', line_item.title);
										ajaxCart.load();

										$('.popup-cart-mobile, .backdrop__body-backdrop___1rvky').addClass('active');
										AddCartMobile(line_item);

									},
									cache: false
								});
							});
							$(document).ready(function () {
								var modal = $('.quickview-product');
								var btn = $('.quick-view');
								var span = $('.quickview-close');

								btn.click(function () {
									modal.show();
								});

								span.click(function () {
									modal.hide();
								});

								$(window).on('click', function (e) {
									if ($(e.target).is('.modal')) {
										modal.hide();
									}
								});
							});

						},300);

					},
					error: function(err){
						$(selector).html('<div style="margin-top: 20px" class="alert alert-warning alert-warning2 alert-dismissible margin-top-15 section" role="alert">		Sản phẩm đang được cập nhật.	</div>');
					},
					dataType: "html"
				});
			};
		}
	}catch(e){
		console.log(e);
	}
});