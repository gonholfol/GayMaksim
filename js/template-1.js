function get_quote(event){

    $(".vs_content blockquote span").html("");
    $('.vs_content blockquote p, .vs_content blockquote picture').removeClass().addClass("fadeOutLeft");
    
    var id =  $(".vs_carousel .owl-item").eq(event.item.index).find(".wine_slide").data("product"),
    sp = $(".vs_content blockquote span");

    sp.html(quotes[id].quote);
    $('.vs_content blockquote small').html(quotes[id].quote_name);

	sp.css("min-height", sp.css("height"));
	sp.css("min-width", sp.css("width"));
 	sp.html("");
 	$(".vs_content blockquote img").remove();
	
	$(".vs_content blockquote p, .vs_content blockquote picture").removeClass().addClass("fadeInLeft");
	
	if(quotes[id].quote_photo){
	    $(".vs_content blockquote").prepend($('<img>',{src:'/assets/template/img/' + quotes[id].quote_photo}))
	}
	
	var typed = new Typed('.vs_content blockquote span', {
        strings: [quotes[id].quote],
        typeSpeed: 15,
        smartBackspace: true,
        loop: false,
        showCursor: false,
        startDelay: 300
    });

    $(".vs_carousel").on('changed.owl.carousel', function(e) {
       if(typed){
            typed.destroy();
        }
    });

}

$(document).ready(function(){
    
    if($(".prepare").length > 0){
        $({numberValue: 0}).animate({numberValue: 100}, {
        	duration: 3000,
        	easing: "linear",
        	step: function(val) {
        		$(".prepare_load").text(Math.ceil(val)+"%");
        	},
        	complete: function() {
    	        
    	        $(".prepare_svg, .prepare_load").addClass("fade-out-right");
    	        document.cookie = "prepare=done";
    	        
    	        setTimeout(function(){
    	            $(".main_section").removeClass("prepare");
    	            $("header").addClass("fade-in-top");
    	        }, 1500);
    	        
    	        setTimeout(function(){
    	            $("body").removeClass("fix");
    	            $(".chain_cell picture").addClass("fade-in-right");
    	            $(".chain_text").addClass("fadeInLeft");
    	            
        	        $(".chain_cell").on("mouseover", function(){
                      $(this).addClass("active").siblings().removeClass("active"); 
                    }); 
    	        }, 2500);
    	        
    	        setTimeout(function(){
    	            $(".main_section").addClass("done");
    	        }, 3500);
     
        	}
        });
    }else{
        $(".chain_text").addClass("fadeInLeft");
        $(".chain_cell picture").addClass("fade-in-right");
        $("header").addClass("fade-in-top");
        $(".chain_cell").on("mouseover", function(){
          if(!$(this).hasClass("active")){
              if($(this).data("caption") == "Винотека"){
                  ym(88743074,'reachGoal','slider-2-slide');
              }
              
              if($(this).data("caption") == "Ресторан"){
                  ym(88743074,'reachGoal','slider-3-slide');
              }
          }
          $(this).addClass("active").siblings().removeClass("active"); 
        });
    }
 
    if($(".vs_carousel").length > 0){
        $(".vs_carousel").owlCarousel({
           items: 1,
           lazyLoad: true,
           loop: false,
           dots: false,
           nav: true,
           navText: ['',''],
           onInitialized: get_quote,
           onTranslate: get_quote,
           animateOut: "fadeOutLeft",
           animateIn: "fadeInLeft",
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
    
    
    if($(".msm_carousel").length > 0){
        $(".msm_carousel").owlCarousel({
           items: 1,
           lazyLoad: true,
           loop: false,
           dots: false,
           nav: false,
           navText: ['',''],
           animateOut: "fadeOutLeft",
           animateIn: "fadeInLeft"
        });
    }
    
        
    var slides = $(".food_chain").data("slides"),
        current = 1;
        
    setInterval(function() {
        $(".food_chain img").fadeOut(800, function(){
            $(".food_chain picture source").prop("media","off");
            
            $(".source-"+current).each(function(){
                $(this).prop("media",$(this).data("media")).prop("srcset", $(this).data("srcset"));
            });
            
            $(".food_chain picture img").fadeIn();
            
            current >= slides? current = 0 : current++;
        });
    }, 6000);
        

});