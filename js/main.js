jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};

window.onload = () => {
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.03
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            var h = document.querySelector("header");
            if (entry.isIntersecting) {
                h.classList.add("dark");
            }else{
                h.classList.remove("dark");
            }
        });
    }, options);

    const arr = document.querySelectorAll('.dark');
    arr.forEach(i => {
        observer.observe(i);
    });
}

$(document).ready(function(){

    $("[type=phone],[type=tel]").mask("+7 (000) 000-00-00"),
    $(document).on("change", "form input, form textarea", function(){""==$(this).val()?$(this).removeClass("in"):$(this).addClass("in");});
    $("form input, form textarea").each(function(){
        ""==$(this).val()?$(this).removeClass("in"):$(this).addClass("in");
    });
    
    $("header nav .lvl1").on("click", function(){
       $(this).addClass("open").siblings().removeClass("open"); 
    });

    $(".catalog_toggle, .catalog_toggle_mobile").on("click", function(){
       $("header").toggleClass("active"); 
    });
    
    var bcp = $(".select_time select").html();
    $(".select_day select").on("change", function(){
        var obj = $(".select_time select");
        
        if($(this).prop('selectedIndex') === 0){
            if(bcp){
                obj.html(bcp);
            }
        }else{
            var days = "";
            for (var d = 11; d < 22; ++ d){
                days = days + '<option value="'+d+':00">'+d+':00</option>';
                days = days + '<option value="'+d+':30">'+d+':30</option>';
            }
            obj.html(days);
        }
    });
    
    $(".fix_toggle").on("click", function(){
       $(".fix_block").toggleClass("active"); 
    });
    
    $(".mobile_toggle").on("click", function(){
       $("header").toggleClass("nav_open"); 
    });
    
    $(".count button").on("click", function(){
       var inp = $(this).siblings("input"),
            num = inp.val();
       if($(this).data("action") == "incr"){
           num++;
       }else{
           num--;
       }
       
       if(num <= 0){num=1;}
       
       inp.val(num).trigger("change");
    });
    
    $(".tab").on("click", function(){
       var cl = $(this).data("element"),
           fo = $(this).data("action");
       $(this).addClass("active").siblings().removeClass("active"); 
       
       $(cl).removeClass("active");
       $(fo).addClass("active");
    });
    
    $("#order-sideform select[name=place]").on("change", function(){
        if($(this).val() === "VIP"){
            $("#order-sideform .warning").show();
        }else{
            $("#order-sideform .warning").hide();
        }
    });
    
    if($(".gs_carousel").length > 0){
        $(".gs_carousel").owlCarousel({
           items: 1,
           lazyLoad: true,
           loop: false,
           dots: false,
           nav: true,
           navText: ['<svg><use xlink:href="/assets/template/svg.svg#icon-wing" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>','<svg><use xlink:href="/assets/template/svg.svg#icon-wing" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>'],
           responsive : {
                0 : {
                    dots: true,
                    nav: false
                },
                768 : {
                    dots: false,
                    nav: true
                }
            }
        });
    }
    
    if($(".hs_carousel").length > 0){
        var hs = $(".hs_carousel");
        hs.owlCarousel({
           margin: 20,
           lazyLoad: true,
           loop: true,
           dots: false,
           nav: true,
           navText: ['',''],
           responsive : {
                0 : {
                    items: 1,
                    dots: true,
                    nav: false
                },
                1020 : {
                    items: 2,
                    dots: true,
                    nav: false 
                },
                1220 : {
                    items: 2,
                    nav: true,
                    dots: false
                },
                1440 : {
                    items: 3
                },
                1920 : {
                    items: 3
                },
                2560 : {
                    items: 4
                }
            }
        });
        
        $(".hs_next").on("click", function(){
           hs.trigger('next.owl.carousel');
        });
    }

    $(".product_form_control span").on("click", function(){
       var p = $(this).data("option"),
           f = $(".product_data form"),
           o = f.data("original");
           
        $(this).addClass("active").siblings().removeClass("active");
           
        f.find("input[name=count]").val(p);
        f.find("p span").html(new Intl.NumberFormat().format(p*o)+"&nbsp;&#8381;");
    });
    
    $(".cart_control input[name=fd]").on("change", function(){
       var t = $(this).val();
       $("#delivery_"+t).prop("checked", true);
    });
    
    $(document).on("click", ".count_block button[type=button]", function(){
        var cur = $(this).parent().find("input[type=number]"), 
            num = 1,
            step = cur.prop("step")?parseInt(cur.prop("step")):1;
            
        
        $(this).hasClass("plus") ? num = parseInt(cur.val()) + step : num = parseInt(cur.val()) - step;

        if(num < step){
            num = step;
        }
        cur.val(num).trigger("change");
    });
    
    $("[data-caption]").on("click", function(){
       let s = $(this).data("caption");
       $("#feed input[name=subject]").val(s);
    });
    
    $(document).on('click', '.product button[type=submit]', function(){
        var that = $(this).closest('.product').find('img');
    	var cart = $(".msMiniCart");
    	var w = that.width();
    	
           that.clone()
               .css({'width' : w,
    		'position' : 'absolute',
    		'z-index' : '9999',
    		top: that.offset().top,
    		left:that.offset().left})
               .appendTo("body")
               .animate({opacity: 0.05,
                   left: cart.offset()['left'],
                   top: cart.offset()['top'],
                   width: 20}, 1000, function() {	
    				$(this).remove();
    			});
            
        });
    
        
    //goals  
    //2 more on template-1.js
    $(document).on("click", ".product .product_form", "submit", function(){
        ym(88743074,'reachGoal','cart-from-listing'); 
    });
    
    $(document).on("click", ".product_data form", "submit", function(){
        ym(88743074,'reachGoal','cart-from-product');
    });
    
    //если контакты
    if($("main").hasClass("page-8")){
        ym(88743074,'reachGoal','contacts-open');
    }
    
    //если корзина
    if($("main").hasClass("page-46")){
        ym(88743074,'reachGoal','order-cart');
    }
    
    miniShop2.Callbacks.add('Order.submit.response.success', 'orders_add_ok', function(response) {
        ym(88743074,'reachGoal','order-submit');
    });
    
    $(".menu_link").on("click", function(){
       ym(88743074,'reachGoal','food-menu-open');
    });
    
    $(".spec_menu_link").on("click", function(){
       ym(88743074,'reachGoal','special-menu');
    });
    
    $(".biz_menu_link").on("click", function(){
       ym(88743074,'reachGoal','business-lunches');
    });
    
    $(".bar_link").on("click", function(){
       ym(88743074,'reachGoal','bar-menu-open'); 
    });
    
    $(document).on('af_complete', function(event, response) {
        var form = response.form;
        if(form.attr('id') == 'one-click-form' && response.success) {
            ym(88743074,'reachGoal','submit-order-1-click');
        }
        
        if(form.attr('id') == 'event-form' && response.success) {
            ym(88743074,'reachGoal','booking-for-event');
        }
        
        if($("main").hasClass("page-8") && form.attr('id') == 'order-sideform' && response.success) {
            ym(88743074,'reachGoal','table-reservation-with-contacts');
        }
        
        if (form.attr('id') == 'order-sideform') {
            ym(88743074,'reachGoal','table-reservation-food');
        }
    });
    
    
    if($("#over_18").length > 0){
        const f = new Fancybox([{
            src: "#over_18",
            type: "inline",
            closeButton: false,
            dragToClose: false,
            click: false,
            on: {
                    shouldClose: function (fancybox, event) {
                        const value = event && event.target ? parseInt(event.target.dataset.value, 10) : 0;
                        if (value !== 1) {
                            return false;
                        }
                    },
                }
            }
        ]);
        
        $("#over_18 button").on("click", function(){
            if($(this).val() === "1"){
                f.close();
                document.cookie = 'over18=yes;expires=100800;path=/';
            }else{
                window.location.replace('https://ya.ru');
            }
        });
    }
});

$(document).mouseup(function (e) {
    var container = $("header");
    if (container.has(e.target).length === 0){
        $("header").removeClass("active");
    }
});

$(document).on('af_complete', function(event, response) {
    if(response.success){
        Fancybox.close();
        $(".fix_block").removeClass("active");
    }
});


