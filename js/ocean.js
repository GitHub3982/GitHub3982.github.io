(function ($) {
  //
  // Search ------------
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  //
  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  //
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size() && !isMobile.any()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  //
  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Qzone"></a>',
        '<a href="http://service.weibo.com/share/share.php?url=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Sina"></a>',
        '<a href="http://connect.qq.com/widget/shareqq/index.html?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="QQ"></a>',
        '<a href="inc/qrcode_img.php?url=http://zixuephp.net/article-1.htmlurl=' + encodedUrl + '" class="article-share-google" target="_blank" title="Wechat"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }
    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //
  // fancybox
  if ($.fancybox) {
    $('[data-fancybox]').fancybox({
      protect: true
    });
  }

  //
  // lazyload
  $("img.lazy").lazyload({
    effect : "fadeIn"
  });

  //
  // justifiedGallery
  $('#gallery').justifiedGallery({
    rowHeight : 180,
    margins : 5
  });



  //
  $(document).ready(function ($) {
    $('.anchor').click(function (event) {
      event.preventDefault();
      $('html,body').animate({scrollTop: $(this.hash).offset().top}, 'smooth');
    });
  });

  // To top
  (function($) {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    var upperLimit = 1000;

    // Our scroll link element
    var scrollElem = $('#totop');

    // Scroll to top speed
    var scrollSpeed = 1600;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    $(window).scroll(function () {
      var scrollTop = $(document).scrollTop();
      if ( scrollTop > upperLimit ) {
        $(scrollElem).stop().fadeTo(300, 1); // fade back in
      }else{
        $(scrollElem).stop().fadeTo(300, 0); // fade out
      }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function(){
      $('html, body').animate({scrollTop:0}, scrollSpeed); return false;
    });
  })(jQuery);

  // Mobile nav
  var $content = $('.content'),
    $sidebar = $('.sidebar'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('.navbar-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
    stopMobileNavAnim();
  });

  $($content).on('click', function () {
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

})(jQuery);


//vv评论
$(document).ready(function(){
    //$('.vemoji-btn').text('😀');
    $("#vcomments").on('click', 'span.vat',function(){
        $(this).parent('div.vmeta').next("div.vcontent").after($("div.vwrap"));
        $('textarea#veditor').focus();
    })
})


//转动头像
var rotateVal = 0 // 旋转角度
			var InterVal // 定时器
			window.onload = function () {
				// 网页加载完成后即运行rotate函数
				rotate()
				// 鼠标悬浮在图片上时，停止旋转，即清除定时器
				document.getElementById('img').onmousemove = function () {
					clearInterval(InterVal)
				}
				// 鼠标离开图片时，继续旋转，即继续运行定时器
				document.getElementById('img').onmouseleave = function () {
					rotate()
				}
			}
			
			// 设置定时器
			function rotate () {
				InterVal = setInterval(function () {
					var img = document.getElementById('img')
					rotateVal += 1
					// 设置旋转属性(顺时针)
					img.style.transform = 'rotate(' + rotateVal + 'deg)'
					// 设置旋转属性(逆时针)
					//img.style.transform = 'rotate(-' + rotateVal + 'deg)'
					// 设置旋转时的动画  匀速0.1s
					img.style.transition = '0.2s linear'
				}, 100)
			}