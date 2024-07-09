$(window).on("load", function(){
    if(!window.dataLayer){
        window.dataLayer = window.dataLayer || [];
    }
    
    //просмотр объявлен в шаблоне
    
    //Добавление в корзину
    miniShop2.Callbacks.add('Cart.add.ajax.always', 'ajax_log', function(xhr) {
        var hash = xhr.responseJSON.data.key;
        $.post("/ajax/", {action: "get_product_from_cart", hash: hash}, function(data) {
            var cart = JSON.parse(data);
            console.log(cart);
            window.dataLayer.push({
                "ecommerce": {
                    "currencyCode": "RUB",
                    "add": {
                        "products": [
                            {
                                "id": cart[hash]["id"],
                                "name": cart[hash]["pagetitle"],
                                "price": cart[hash]["price"],
                                "quantity": 1
                            }
                        ]
                    }
                }
            });
        });
    });
    
    //Обработка заказа
    miniShop2.Callbacks.Order.submit.response.success = function (response) {
        var productData = [];
        
        $('#msCart .cart_row').each(function() {
            var item = $(this);
            productData.push({
                name: item.find('.title').text(),
                price: item.find('.price span').text().replace(/[^+\d]/g, ''),
                quantity: item.find('input[name="count"]').val()
            });
        })
        
        var orderId = response.data.msorder;
        
        dataLayer.push({
            "ecommerce": {
                "purchase": {
                    "actionField": {
                        "id" : orderId,
                        "goal_id" : "251427258",
                    },
                    "products": productData
                }
            }
        });
        
    }
});