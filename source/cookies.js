/* Cookies take a type and an optimal baking time (optional, default: 10 time units).
   Cookies track how long they have been baked (based on
   calls to bake), and set their status to an appropriate Cookie.Status {RAW, STILL_GOOEY,
   JUST_RIGHT, CRISPY} accordingly. */
var Cookie = function Cookie_new(type, opt_bakeTime) {
	this.type = type;
	this.bakeTime = opt_bakeTime || 10;
	this.bakedFor = 0;
	this.status = Cookie.Status.RAW;
};

Cookie.Status = {
	RAW: 'raw',
	STILL_GOOEY: 'still_gooey',
	JUST_RIGHT: 'just_right',
	CRISPY: 'crispy'
};

/* Cookie.bake(opt_time) bakes this cookie. If opt_time is specified, the cookie is baked
 * for that amount of time. Otherwise, it is baked for one time unit. After it bakes, this
 * cookie updates its status to a value in Cookie.Status based on whether it has been baked for
 * zero time units (Cookie.Status.RAW), a positive number of time units less than its optimal baking
 * time (Cookie.Status.STILL_GOOEY), exactly its optimal baking time (Cookie.Status.JUST_RIGHT), or
 * too long (Cookie.Status.CRISPY). */
Cookie.prototype.bake = function Cookie_bake(opt_time) {
	var time = opt_time || 1;
	console.log('Cookie.bake(' + time + ')');
	this.bakedFor += time;
	if (this.bakedFor == 0) {
		this.status = Cookie.Status.RAW;
	} else if (this.bakedFor < this.bakeTime) {
		this.status = Cookie.Status.STILL_GOOEY;
	} else if (this.bakedFor == this.bakeTime) {
		this.status = Cookie.Status.JUST_RIGHT;
	} else {
		this.status = Cookie.Status.CRISPY;
	}
	return this.status;
};

/* Describe a cookie in a human-readable string. */
Cookie.prototype.toString = function Cookie_toString() {
	return this.type + ' (' + this.status + ', baked ' + this.bakedFor + ' of ' + this.bakeTime + ' minutes)';
};

/* Ovens contain bakeable objects (they respond to the bake(time) method, where time is a number).
   When constructing an oven, you can optionally specify a capacity (default: 3). */
var Oven = function Oven_new(opt_capacity) {
	var capacity = opt_capacity || 3;
	this.capacity = capacity;
	this.contents = [];
};

/* Bake the contents of the oven. You can optionally specify how many time units to bake
   for (default: 1). */
Oven.prototype.bakeContents = function Oven_bakeContents(opt_time) {
	var time = opt_time || 1;
	for (var i = 0; i != this.contents.length; ++i) {
		this.contents[i].bake(time);
	}
};

/* Add a bakeable object (responds to bake(opt_time: number)) to the oven.
   This method will throw an error if the oven is at capacity. */
Oven.prototype.addItem = function Oven_addItem(item) {
	if (this.contents.length == this.capacity) {
		throw new Error('Oven full');
	}
	this.contents.push(item);
};

/* Remove an item currently in the oven. This method will throw an error if
   the object is not in the oven. */
Oven.prototype.removeItem = function Oven_removeItem(item) {
	var index = this.contents.indexOf(item);
	if (index == -1) {
		throw new Error('Item ' + item + ' is not in oven');
	}
	this.contents.splice(this.contents.indexOf(item), 1);
	return item;
};

/* Describe an oven in a human-readable string. */
Oven.prototype.toString = function Oven_toString() {
	if (this.contents.length == 0) {
		return 'Oven empty (capacity: ' + this.capacity + ')';
	}

	return 'Oven ready to bake (items: ' + this.contents.length + ', ' +
		'capacity: ' + this.capacity + ')';
}

var View = function View_new(oven) {
	this.oven = oven;

	// Find our containers in the DOM.
	this.$oven = $('#oven');

	this.$newCookieForm = $('#new-cookie');
	this.$newCookieType = $('#new-cookie-type');
	this.$newCookieBakeTime = $('#new-cookie-bake-time');

	this.$error = $('#error');

	// Attach event listeners.
	this.addCookieSubmitListener();
	this.addOvenBakeListener();

	// Attach the oven model to the status list element so we
	// will update its status in View.update.
	$('#oven > li.status')[0].status = oven;

	// Select the default text in the new cookie field, so
	// typing will erase it (but enter will still prepare delicious
	// chocolate chip cookies).
	$('#new-cookie-type').select();

	// Put the keyboard focus on the new cookie field.
	$('#new-cookie-type').focus();	
};

View.prototype.update = function View_update() {
	$ovenItems = $('li', this.$oven);
	for (var i = 0; i != $ovenItems.length; ++i) {
		$ovenItems[i].textContent = $ovenItems[i].status;
	}
};

View.prototype.addCookieSubmitListener = function View_addCookieSubmitListener() {
	// Store a reference to the view in the newCookieForm DOM object, so we have
	// access to it in the submit handler.
	this.$newCookieForm[0].view = this;

	this.$newCookieForm.submit(function(event) {
		/* Note: In this scope, this is the #new-cookie-form DOM element. */

		// We don't actually want to submit the form to the server. All processing
		// occurrs client side.
		event.preventDefault();

		// Create a new cookie based on the form values.
		var cookie = new Cookie(
			this.view.$newCookieType.val(),  			// type comes from the #new-cookie-type input
			this.view.$newCookieBakeTime.val() * 1		// bakeTime comes from #new-cookie-bake-time input.
														// Multiplying by 1 forces the value to be a number
														// if it isn't already (though I believe jQuery handles
														// this for <input type=number>).
		);

		// Create a list item describing the cookie. Note that '...' + cookie + '...' implicitly
		// calls cookie.toString().
		var li = $('<li>' + cookie + '<span class="action">&#8595; Add To Oven</span></li>');

		// Attach the cookie model to the DOM object, so it's accessible in its click handler.
		li[0].cookie = cookie;
		li[0].status = cookie;

		// We store a reference to the view in the li so that we have access to it in the
		// click handler.
		li[0].view = this.view;

		li.click(function() {
			/* Note: In this scope, this is a list item on the prep table. */

			// When the list item is clicked, try to add the cookie to the oven.
			try {
				this.view.oven.addItem(this.cookie);
			} catch (error) {
				// If we couldn't add the item, show an error.
				this.view.error(error);

				// Re-throwing the error will log it to the console as well.
				throw error;
			}

			// Remove the "Add To Oven" span from the cookie display and this
			// click handler.
			$('.action', this).remove();
			$(this).off('click');

			// Put the list item in the oven list.
			this.view.$oven.append(this);

			// Update the status display of things in the oven.
			this.view.update();
		});

		// Put the new cookie on the prep table.
		$('#prep-table').append(li);
	});
};

View.prototype.addOvenBakeListener = function View_addOvenBakeListener() {
	this.$oven.click(function() {
		// Bake the contents of the oven.
		this.oven.bakeContents();

		// Update the status display of things in the oven.
		this.update();
	});
};

View.prototype.error = function View_error(message) {
	this.$error.html(message);
	this.$error.addClass('show');
	setTimeout(function() {
		this.$error.removeClass('show');
	}.bind(this), 1000)
};

$(document).ready(function() {
	var oven = new Oven();
	var view = new View(oven);	
});