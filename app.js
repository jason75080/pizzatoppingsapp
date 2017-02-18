var MyModule = angular.module("PizzaToppingApp", []);

MyModule.controller("PizzaToppingController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
    
    var pt = this;
	
	pt.pizzas = [];
	
	
	// Sizes
	pt.size = 
	[
		{
			size_name: "Small"
		},
		{
			size_name: "Medium"
		},
		{
			size_name: "Large"
		},
		{
			size_name: "Extra Large"
		}
	];	
	
	// Crusts
	pt.crust = 
	[
		{
			crust_name: "Hand Tossed"
		},
		{
			crust_name: "Thin Crust"
		},
		{
			crust_name: "Handmade Pan"
		},
		{
			crust_name: "Brooklyn Style"
		}
	];	
	
	// Sauces
	pt.sauce = 
	[
		{
			sauce_name: "Tomato Sauce"
		},
		{
			sauce_name: "Marinara Sauce"
		},
		{
			sauce_name: "BBQ Sauce"
		},
		{
			sauce_name: "Alfredo Sauce"
		}
	];	
	
	// Toppings
	pt.toppings = 
	[
		{
			topping_name: "Pepperoni"
		},
		{
			topping_name: "Italian Sausage"
		},
		{
			topping_name: "Beef"
		},
		{
			topping_name: "Bacon"
		},
		{
			topping_name: "Chicken"
		},
		{
			topping_name: "Banana Peppers"
		},
		{
			topping_name: "Mushrooms"
		},
		{
			topping_name: "Onions"
		}
	];
	
	pt.selected = [];
	
	

	pt.toggle = function (topping) {
		var idx = pt.selected.indexOf(topping);
		if (idx > -1) {
			pt.selected.splice(idx, 1);
		}
		else {
			pt.selected.push(topping);
		}
	};
	
	pt.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
    pt.update = function() {
		pt.pizzas = pt.latestData();
		if(pt.pizzas == null){
			pt.pizzas = [];
		}
		var custName = pt.customerNameValue;
		var pizzaSize = pt.sizeValue.size_name;
		var pizzaCrust = pt.crustValue.crust_name;
		var pizzaSauce = pt.sauceValue.sauce_name;
		pt.clearForm();
		var pizza = { customerName: custName, size: pizzaSize, crust: pizzaCrust, sauce: pizzaSauce, topping: pt.selected};
		pt.pizzas.push(pizza);
        return LocalStorageService.setData('my-storage', angular.toJson(pt.pizzas));
    };
    
    pt.update2 = function(pizza, $index) {
		pt.pizzas = pt.latestData();
		var custName = pizza.customerName;
		
		var pizzaSize = "";
		if (pt.sizeValue2 == null) {
			pizzaSize = pizza.size;
		} else {
			pizzaSize = pt.sizeValue2.size_name;
		}
		
		var pizzaCrust = "";
		if (pt.crustValue2 == null) {
			pizzaCrust = pizza.crust;
		} else {
			pizzaCrust = pt.crustValue2.crust_name;
		}
		
		var pizzaSauce = "";
		if (pt.sauceValue2 == null) {
			pizzaSauce = pizza.sauce;
		} else {
			pizzaSauce = pt.sauceValue2.sauce_name;
		}
		
		pt.clearForm();
		pizza = { customerName: custName, size: pizzaSize, crust: pizzaCrust, sauce: pizzaSauce, topping: pt.selected};
		pt.pizzas.splice($index, 1, pizza);
        return LocalStorageService.setData('my-storage', angular.toJson(pt.pizzas));
    };
    
    pt.clearForm = function() {
    	pt.customerNameValue = null;
    	pt.sizeValue = null;
    	pt.crustValue = null;
    	pt.sauceValue = null;
    	pt.toppingValue = null;
    	pt.sizeValue2 = null;
    	pt.crustValue2 = null;
    	pt.sauceValue2 = null;
    	pt.toppingValue2 = null;
    };
    
    pt.edit = function(pizza) {
    	pt.selected = [];
    	for(var x = 0; x < pizza.topping.length; x++) {
    		pt.toggle(pizza.topping[x]);
    	}
    };
    
    pt.remove = function($index){

		pt.pizzas = pt.latestData();
		pt.pizzas.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(pt.pizzas));		
		
	};
	
	//Check to see if null
	if(pt.pizzas != null){
		pt.pizzas = pt.latestData();
	}else{
		console.log("Whatever!!!");
	}
	
        
	}
]);

MyModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
