const DinnerModel = function () {
	var numberOfGuests = 5; // TODO: COOKIES FOR INIT
	var selectedDishes = [];
	var detailedDinner = 0;
	var observers = [];
	var errors = [];

	var types = ["all", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];
	

	// Observer pattern
	this.removeObserver = function (observerId) {
		observers = observers.filter(o => o.id !== observerId);
	};

	this.addObserver = function(observer) {
		observers.push(observer);
	}
	
	this.notifyObservers = function(id) {
		if(id === "ERROR-LIST"){
			var errorListView = observers.find(obs => obs.id === "ERROR-LIST");
			errorListView.update();
			return;
		}
		
		// TODO: performance boost by checking obj;
		observers.forEach(function(observer) {
			observer.update();
		});
	}

	this.getTypes = () => {
		return types;
	}

	this.setNumberOfGuests = function(num) {
		numberOfGuests = Math.max(num, 1);
		this.notifyObservers();
	}
	
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	this.getDetailedDinner = function() {
		return detailedDinner;
	}

	this.setDetailedDinner = function(id) {
		detailedDinner = id;
		this.notifyObservers();
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		return selectedDishes.find(function(element) {
			return element.type === type;
		});
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return selectedDishes;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totalPrice = 0;
		selectedDishes.forEach((dish) => {
			totalPrice += this.getDishPrice(dish);
		});
		return totalPrice;
	}

	//Returns the price of the dish times number of guests
	/**
	 * @param {Object} dish id of the disdh 
	 * @returns {Number} the price of the dish times number of guest
	 */
	this.getDishPrice = function(dish) {
		var price = 0;
		dish.extendedIngredients.forEach(ingredient => {
			price += Math.round(ingredient.amount*numberOfGuests);
		})
		return price;
	}	

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dishToAdd) {
		var existingDishWithSameType = selectedDishes.find(function(dish) {
			var intersection =  dish.dishTypes.filter(x => dishToAdd.dishTypes.includes(x));
			if (intersection.length > 0) {
				return true;
			}
			return false;
		});

		if(existingDishWithSameType){
			this.removeDishFromMenu(existingDishWithSameType.id);
		}

		selectedDishes.push(dishToAdd);
		this.notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		selectedDishes = selectedDishes.filter(function(value, index, arr) {
			return value.id !== id;
		});
		this.notifyObservers();
	}

	this.buildSearchUrl = (type, filter) => {
		var params = new URLSearchParams();
		params.append('query', filter);
		if (type !== 'all') params.append('type', type);
		// params.append('instructionsRequired', true); // TODO: maybe include?
		params.append('number', 20);
		return 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' + params.toString();
	}

	/**
	 * Convert bad requests into errors and throw. 
	 */
	this.handleErrors = (response) => {
		if (!response.ok) {
			throw response;
		}
		return response;
	}

	this.getAllDishes = (type, filter) => {
		return fetch(
				this.buildSearchUrl(type, filter),
				{headers: {'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'}})
			.then(this.handleErrors)
			.then(response => response.json())
			.then(data => data.results)
			.catch(error => {
				this.addError(this.createError(error, "Could not execute search"));
				return null;
			});
	}

	//function that returns a dish of specific ID
	this.getDish = (id) => {
		return fetch(
			'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + "/information",
			{headers: {'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'}})
		.then(this.handleErrors)
		.then(response => response.json())
		.catch(error => {
			this.addError(this.createError(error, "Could not get recipe"));
			return null;
		});
	}

	this.getErrors = () => {
		return errors;
	}

	this.addError = (error) => {
		if (errors.find(e => e.id === error.id)) return;
		errors.push(error);
		this.notifyObservers("ERROR-LIST");
	}

	this.removeError = (id) => {
		errors = errors.filter(error => error.id !== id);
		this.notifyObservers("ERROR-LIST");
	}

	this.createError = (error, details) => {
		if (error.status === undefined) {
			return {
				code: '',
				statusText: error,
				id: 'NoInternet',
				details,
			}
		}
		
		return {
			code: error.status,
			statusText: error.statusText,
			id: error.url,
			details,
		}
	}
};

export const modelInstance = new DinnerModel();
