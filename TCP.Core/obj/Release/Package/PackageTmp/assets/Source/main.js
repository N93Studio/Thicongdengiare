window.awe = window.awe || {};
awe.init = function () {
	awe.showPopup();
	awe.hidePopup();	
};
awe_lazyloadImage();
function awe_lazyloadImage() {
	var ll = new LazyLoad({
		elements_selector: ".lazyload",
		load_delay: 100,
		threshold: 0
	});
} window.awe_lazyloadImage=awe_lazyloadImage;
let isload = 0;
$(window).on('scroll  mousemove touchstart',function(){
	try{
		if(!isload){
			isload = 1
			
			var placeholderText = ['Bạn muốn tìm gì?','Đèn năng lượng mặt trời', 'Trụ sân vườn', 'Quạt năng lượng mặt trời', 'Phụ kiện năng lượng mặt trời'];
			$('.search-auto').placeholderTypewriter({text: placeholderText});
			
			var wDWs = $(window).width();
			
		
			
			$(document).ready(function(){
				function getItemSearch(name, smartjson){
					return fetch(`https://${window.location.hostname}/search?q=name:(*${name}*)&view=${smartjson}&type=product`)
						.then(res => res.json())
						.catch(err => console.error(err))
				}
				function getItemSearch2(title, smartjsonarticle){
					return fetch(`https://${window.location.hostname}/search?q=${title}&view=${smartjsonarticle}&type=article`)
						.then(res => res.json())
						.catch(err => console.error(err))
				}
				$('.search-smart input[type="text"]').bind('keyup change', function(e){
					let term = $(this).val().trim();
					let term2 = $(this).val().trim();
					let data = '';
					let data2 = '';
					var resultbox = '';
					var resultbox2 = '';
					if(term.length > 0) {
						$('.search-suggest').addClass('open');
						async function goawaySearch() {

							data = await getItemSearch(term, 'smartjson');
							data2 = await getItemSearch2(term, 'smartjsonar');


							setTimeout(function(){
								var sizeData = Object.keys(data).length;
								var sizeData2 = Object.keys(data2).length;
								var check1 = data.searchResultCount;
								var check2 = data2.searchResultCount;
								if(sizeData > 0) {	
									resultbox +=`<div class="title-search"><span>Sản phẩm</span></div>`

									Object.keys(data).forEach(function(key) {

										if (data[key].url == undefined){

										} else {
											if (data[key].compare_price != 0 ) {
												resultbox += `<div class="product-smart"><a class="image_thumb" href="${data[key].url}" title="${data[key].name}"><img width="370" height="480" class="lazyload loaded" src="${data[key].image}" data-src="${data[key].image}" alt="${data[key].name}" data-was-processed="true"></a><div class="product-info"><h3 class="product-name line-clamp line-clamp-1"><a href="${data[key].url}" title="${data[key].name}">${data[key].name}</a></h3><div class="price-box"><span class="price">${data[key].price}</span><span class="compare-price">${data[key].compare_price}</span></div></div></div>`
											} else {
												resultbox += `<div class="product-smart"><a class="image_thumb" href="${data[key].url}" title="${data[key].name}"><img width="370" height="480" class="lazyload loaded" src="${data[key].image}" data-src="${data[key].image}" alt="${data[key].name}" data-was-processed="true"></a><div class="product-info"><h3 class="product-name line-clamp line-clamp-1"><a href="${data[key].url}" title="${data[key].name}">${data[key].name}</a></h3><div class="price-box"><span class="price">${data[key].price}</span></div></div></div>`
											}
										}
									});
									resultbox +=`<a class="see-more" href="/search?q=name:(*${term}*)&type=product"  title="Xem thêm ${check1} sản phẩm">Xem thêm ${check1} sản phẩm</a>`

									$('.list-search').html(resultbox);
								} else {

									$('.list-search').html('<span></span>');
								}

								if(sizeData2 > 0 ) {
									resultbox2 +=`<div class="title-search"><span>Tin tức</span></div>`


									Object.keys(data2).forEach(function(key) {
										if (data2[key].url == undefined){

										}else{
											resultbox2 += `<div class="art-smart"><a class="image_thumb" href="${data2[key].url}" title="${data2[key].name}"><img width="370" height="480" class="lazyload loaded" src="${data2[key].image}" data-src="${data2[key].image}" alt="${data2[key].name}" data-was-processed="true"></a><div class="product-info"><h3 class="product-name"><a href="${data2[key].url}" title="${data2[key].name}">${data2[key].name}</a></h3></div></div>`
										}
									});
									resultbox2 +=`<a class="see-more" href="/search?query=(*${term}*)&type=article"  title="Xem thêm ${check2} tin tức">Xem thêm ${check2} tin tức</a></div>`
									$('.list-search2').html(resultbox2);

								} else {
									$('.list-search2').html('<span></span>');
								}
								if(sizeData == 0 && sizeData2 == 0 ){
									$('.list-search').html('<div class="not-pro">Không có thấy kết quả tìm kiếm</div>');
								}
							}, 200);
						}
						goawaySearch();
					}else {
						$('.search-suggest').removeClass('open');
						$('.list-search').html('');
						$('.list-search2').html('');
					}
				});
			});
			$('.header-search-form').submit(function(e){
				e.preventDefault();
				var search_val = $(this).parent().find('input').val();
				var url = '/search?query=name:(*'+search_val +'*)&type=product';
				window.location.href = url;
			})
			

			$('.btn-close').click(function() {
				$(this).parents('.dropdown').toggleClass('open');
			}); 


			$('.ul_collections li > svg').click(function(){
				$(this).parent().toggleClass('current');
				$(this).toggleClass('fa-angle-down fa-angle-right');
				$(this).next('ul').slideToggle("fast");
				$(this).next('div').slideToggle("fast");
			});
			awe_backtotop();
			$(document).on('click','.overlay, .close-window, .btn-continue, .fancybox-close', function() {   
				awe.hidePopup('.awe-popup'); 
				setTimeout(function(){
					$('.loading').removeClass('loaded-content');
				},500);
				return false;
			})
			if (wDWs < 991) {
				$('.menu-bar').on('click', function(){
					$('.opacity_menu').addClass('current');
					$('.header-nav').addClass('current');
				})
				$('.menu-bar2').on('click', function(){
					$('.opacity_menu').addClass('current');
					$('.ul-contact').addClass('current');
				})
				$('.item_big li .fa').click(function(e){
					if($(this).hasClass('current')) {
						$(this).closest('ul').find('li, .fa').removeClass('current');
					} else {
						$(this).closest('ul').find('li, .fa').removeClass('current');
						$(this).closest('li').addClass('current');
						$(this).addClass('current');
					}
				});
				$('.opacity_menu').on('click', function(){
					$('.header-nav').removeClass('current');
					$('.opacity_menu').removeClass('current');
					$('.ul-contact').removeClass('current');
				})
			}
			awe_category();


			$('.dropdown-toggle').click(function() {
				$(this).parent().toggleClass('open'); 	
			}); 


			$(document).ready(function() {
				var margin_left = 0;
				$('#prev').on('click', function(e) {
					e.preventDefault();
					animateMargin( 190 );
				});
				$('#next').on('click', function(e) {
					e.preventDefault();
					animateMargin( -190 );
				});
				const animateMargin = ( amount ) => {
					margin_left = Math.min(0, Math.max( getMaxMargin(), margin_left + amount ));
					$('ul.item_big').animate({
						'margin-left': margin_left
					}, 300);
				};
				const getMaxMargin = () => 
				$('ul.item_big').parent().width() - $('ul.item_big')[0].scrollWidth;
			})

			function awe_showLoading(selector) {
				var loading = $('.loader').html();
				$(selector).addClass("loading").append(loading); 
			}  window.awe_showLoading=awe_showLoading;
			function awe_hideLoading(selector) { 
				$(selector).removeClass("loading"); 
				$(selector + ' .loading-icon').remove();
			}  window.awe_hideLoading=awe_hideLoading;
			function awe_showPopup(selector) {
				$(selector).addClass('active');
			}  window.awe_showPopup=awe_showPopup;
			function awe_hidePopup(selector) {
				$(selector).removeClass('active');
			}  window.awe_hidePopup=awe_hidePopup;
			awe.hidePopup = function (selector) {
				$(selector).removeClass('active');
			}


			function awe_convertVietnamese(str) { 
				str= str.toLowerCase();
				str= str.replace(/Ă |Ă¡|áº¡|áº£|Ă£|Ă¢|áº§|áº¥|áº­|áº©|áº«|Äƒ|áº±|áº¯|áº·|áº³|áºµ/g,"a"); 
				str= str.replace(/Ă¨|Ă©|áº¹|áº»|áº½|Ăª|á»|áº¿|á»‡|á»ƒ|á»…/g,"e"); 
				str= str.replace(/Ă¬|Ă­|á»‹|á»‰|Ä©/g,"i"); 
				str= str.replace(/Ă²|Ă³|á»|á»|Ăµ|Ă´|á»“|á»‘|á»™|á»•|á»—|Æ¡|á»|á»›|á»£|á»Ÿ|á»¡/g,"o"); 
				str= str.replace(/Ă¹|Ăº|á»¥|á»§|Å©|Æ°|á»«|á»©|á»±|á»­|á»¯/g,"u"); 
				str= str.replace(/á»³|Ă½|á»µ|á»·|á»¹/g,"y"); 
				str= str.replace(/Ä‘/g,"d"); 
				str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
				str= str.replace(/-+-/g,"-");
				str= str.replace(/^\-+|\-+$/g,""); 
				return str; 
			} window.awe_convertVietnamese=awe_convertVietnamese;
			var wDWs = $(window).width();


			function awe_category(){
				$('.nav-category .fa-angle-right').click(function(e){
					$(this).toggleClass('fa-angle-down fa-angle-right');
					$(this).parent().toggleClass('active');
				});
				$('.nav-category .fa-angle-down').click(function(e){
					$(this).toggleClass('fa-angle-right');
					$(this).parent().toggleClass('active');
				});
			} window.awe_category=awe_category;


			function awe_backtotop() { 
				$(window).scroll(function() {
					$(this).scrollTop() > 200 ? $('.backtop').addClass('show') : $('.backtop').removeClass('show')
				});
				$('.backtop').click(function() {
					return $("body,html").animate({
						scrollTop: 0
					}, 800), !1
				});
			} window.awe_backtotop=awe_backtotop;

			
			var swipertext = new Swiper('.text-slider', {
				autoplay: true,
				effect: 'fade',
			});
			if (wDWs > 992) {
				function horizontalNav() {
					return {
						wrapper: $('.header-menu-des'),
						navigation: $('.header-menu-des .header-nav'),
						item: $('.header-menu-des .header-nav .nav-item'),
						totalStep: 0,
						onCalcNavOverView: function(){
							let itemHeight = this.item.eq(0).outerWidth(),
								lilength = this.item.length,
								total = 0;
							for (var i = 0; i < lilength; i++) {
								itemHeight = this.item.eq(i).outerWidth();
								total += itemHeight;
							}
							return Math.ceil(total)
						},
						onCalcTotal: function(){
							let  navHeight = this.navigation.width();
							return Math.ceil(navHeight)
						},
						init:function(){
							this.totalStep = this.onCalcNavOverView();
							this.totalTo = this.onCalcTotal();
							if(this.totalStep > this.totalTo){
								$('.control-menu').addClass("d-lg-block");
							
							} 
						}
					}	
				}
			}
			$(document).ready(function ($) {
				if(window.matchMedia('(min-width: 992px)').matches){
					horizontalNav().init()
				}
			});
			
		}
	}catch(e){
		console.log(e);
	}
});