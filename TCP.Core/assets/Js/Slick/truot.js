
$('.autoplayalbum-detail').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
          }
      }
    ]
});
$('.autoplay').slick({
            infinite: true,
            speed: 300,
            slidesToShow:1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: true,
            responsive: [
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow:1,
                      slidesToScroll: 1,
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow:1,
                      slidesToScroll: 1,
                      autoplay: true,
                  }
              }
            ]
});
$('.autoplaymain').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1224,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1124,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1, arrows: false,
                slidesToScroll: 1,
            }
        }
    ]
});
$('.autoplaydetail').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 1224,
            settings: {
                slidesToShow:6,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1124,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow:6,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 6, arrows: false,
                slidesToScroll: 1,
            }
        }
    ]
});
        $('.autoplay1').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            arrows:true,
            responsive: [
              {
                  breakpoint: 1224,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                  }
              },
              {
                  breakpoint: 1124,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      
                  }
              },
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                   
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow:1,
                      slidesToScroll: 1,
                     
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1, arrows: false,
                      slidesToScroll: 1,
                  }
              }
            ]
        });

        $('.autoplay2').slick({
            infinite: true,
            speed: 300,
            slidesToShow:4,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            responsive: [
            
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                     
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      arrows: false,
                      slidesToScroll: 1,
                  }
              }
            ]
        });
$('.autoplay3').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [

        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                arrows: false,
                slidesToScroll: 1,
            }
        }
    ]
});
$('.autoplay4').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [

        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                arrows: false,
                slidesToScroll: 1,
            }
        }
    ]
});
        $(document).ready(function () {
            ////$("#back-top").hide();
            //$(function () {
            //    $(window).scroll(function () {
            //        if ($(this).scrollTop() > 100) {
            //            $('#back-top').fadeIn();
            //        } else {
            //            $('#back-top').fadeOut();
            //        }
            //    });
            //    $('#back-top').click(function () {
            //        $('body,html').animate({
            //            scrollTop: 0
            //        }, 800);
            //        return false;
            //    });
            //});
        });
        $('.autoplayfaded').slick({
            autoplay: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: true,
            dots: true,
            cssEase: 'linear', arrows: false,
            pauseOnHover:false,
            pauseOnFocus:false,
        });
        function jsShowMsg() {
            alert("Gửi tin nhắn thành công");
            window.location.href = window.location.pathname;
        }
        function ChangeVideo(id)
        {
            var a = ($("#" + id).html());
            $("#videochinh").html(a);
        }
        function Search()
        {
            var timkie = $("#Text1").val();
            window.location.href = "/tim-kiem.aspx?searchtext=" + timkie;
        }