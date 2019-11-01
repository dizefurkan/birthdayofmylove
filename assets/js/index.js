function addCssFileToHead(params) {
	const link = document.createElement('link');
	Object.keys(params).forEach(key => {
		link.setAttribute(key, params[key]);
	});
	document.getElementsByTagName('head')[0].appendChild(link);
}

class ImagesPage {
	currentImage = 0
	images = [
		{
			src: 'assets/images/ss-5.jpg',
			class: 'image active',
			style: 'transform: rotate(270deg);',
		},
		{
			src: 'assets/images/ss-2.jpg',
			class: 'image',
			style: 'transform: rotate(270deg);',
		},
		{
			src: 'assets/images/ss-3.jpg',
			class: 'image',
			style: 'transform: rotate(270deg);',
		},
		{
			src: 'assets/images/ss-4.jpg',
			class: 'image',
		},
		{
			src: 'assets/images/ss-1.jpg',
			class: 'image',
			style: 'transform: rotate(270deg);',
		},
	]
	imagesLength = this.images.length

	init() {
		const backgroundElement = document.querySelector('.full-background');
		$('#change').on('click', () => {
			this.changeActiveImage();
		});
		// setInterval(changeActiveImage, 10000);
		this.images.forEach((item) => {
			const image = this.createImage(item);
			backgroundElement.appendChild(image);
		});
	}

	createImage(params) {
		const image = document.createElement('img');
		Object.keys(params).forEach(key => image.setAttribute(key, params[key]));
		return image;
	}

	changeActiveImage() {
		++this.currentImage;
		if (this.currentImage >= this.imagesLength) {
			this.currentImage = 0;
		}
		$('.image').removeClass('active');
		$($('.image')[this.currentImage]).addClass('active');
	}

	render() {
		return `
			<div class="full-background"></div>
			<div id="change">
				<img src="./assets/icons/shuffle.svg" title="Change Image">
			</div>
		`;
	}
}

class CountDown {
	init() {
		addCssFileToHead({
			rel: "stylesheet",
			href: "assets/css/countdown.css"
		});
		this.countdown('02/11/2019 00:00:00 AM');
	}

	countdown(expireDate) {
	  var
	    $clock = $('#clock'),
	    eventTime = moment(expireDate, 'DD-MM-YYYY HH:mm:ss').unix(),
	    currentTime = moment().unix(),
	    diffTime = eventTime - currentTime,
	    duration = moment.duration(diffTime * 1000, 'milliseconds'),
	    interval = 1000;

	  // if time to countdown
	  if(diffTime > 0) {

	    // Show clock
	    // $clock.show();

	    var
		    $d = $('<div class="days"></div>').appendTo($clock),
		    $h = $('<div class="hours"></div>').appendTo($clock),
		    $m = $('<div class="minutes"></div>').appendTo($clock),
		    $s = $('<div class="seconds"></div>').appendTo($clock);

	    setInterval(() => {
	      duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
	      var
		      d = moment.duration(duration).days(),
		      h = moment.duration(duration).hours(),
		      m = moment.duration(duration).minutes(),
		      s = moment.duration(duration).seconds();

		      d = $.trim(d).length === 1 ? '0' + d : d;
		      h = $.trim(h).length === 1 ? '0' + h : h;
		      m = $.trim(m).length === 1 ? '0' + m : m;
		      s = $.trim(s).length === 1 ? '0' + s : s;
        // show how many hours, minutes and seconds are left
        $d.text(`${d} gün`);
        $h.text(`${h} saat`);
        $m.text(`${m} dakika`);
        $s.text(`${s} saniye`);
      }, interval);
	  };
	}

	render() {
		return `
			<div class="stars"></div>
			<div class="twinkling"></div>
			<div class="clouds"></div>
			<div id="countdown">
				<h1>SÜMEYYE ÜÇÜNCÜ</h1>
				<div id="clock"></div>
			</div>
		`;
	}
}

const router = {
	images: new ImagesPage(),
	countdown: new CountDown(),
};
let activeRoute = 'countdown';


$(document).ready(() => {
	$('#app').html(router[activeRoute].render());
	router[activeRoute].init();
});