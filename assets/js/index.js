function addCssFileToHead(params) {
	const link = document.createElement('link');
	Object.keys(params).forEach(key => {
		link.setAttribute(key, params[key]);
	});
	document.getElementsByTagName('head')[0].appendChild(link);
}

class Router {
	constructor() {
		// super();

	}

	changeRouter() {

	}
}

class ImagesPage {
	constructor() {
		this.currentImage = 0;
		this.images = [
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
		];
		this.imagesLength = this.images.length;
	}

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
	constructor() {
		addCssFileToHead({
			rel: "stylesheet",
			href: "assets/css/countdown.css"
		});
		this.expireDate = '01/11/2019 00:00:00 AM';
		this.checkDate();
	}

	init() {
		this.countdown();
	}

	checkDate() {
		const currentTime = moment().unix();
    const eventTime = moment(this.expireDate, 'DD-MM-YYYY HH:mm:ss').unix();
	  this.diffTime = eventTime - currentTime;
  	this.expired = this.diffTime < 0 ? true : false ;
	}

	countdown() {
	  var
	    $clock = $('#clock'),
	    duration = moment.duration(this.diffTime * 1000, 'milliseconds'),
	    interval = 1000;

	  // if time to countdown
	  if(this.diffTime > 0) {
	    // Show clock
	    // $clock.show();

	    var
		    $d = $('<div class="days"></div>').appendTo($clock),
		    $h = $('<div class="hours"></div>').appendTo($clock),
		    $m = $('<div class="minutes"></div>').appendTo($clock),
		    $s = $('<div class="seconds"></div>').appendTo($clock);

	    this.counter = setInterval(() => {
			  if(this.diffTime < 0) {
			  	this.expired = true;
			  	// activeRoute = 'content';
			  	if (this.expired) {
			  		clearInterval(this.counter);
			  	}
			  	return;
			  }
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
	  } else {
	  	clearInterval(this.counter);
	  	this.expired = true;
	  	runBirthday();
	  	var typeWriter, texts;
			
			texts = ["SÜMEYYE ÜÇÜNCÜ"]
			typeWriter = new TypeWriter({
				words: texts,
				elementId: 'namesurname',
				speed: 150
			});
			typeWriter.typewriter();
	  	// activeRoute = 'content';
	  	// renderApp();
	  }
	}

	showMessage() {
		const element = `<div class="modal"><div id="typedtext" class="typed-text--font-family"></div></div>`;
		$('.message-box').remove();
		$('.birthday').append(element);
  	const texts = [
	  	"İyi ki doğdun sevgilim, birlikte nice senelere, sağlıkla ve mutlulukla :)",
	  	"imza: said furkan dize"
  	]
		const typeWriter = new TypeWriter({
			words: texts,
			elementId: 'typedtext',
			speed: 100
		});
		typeWriter.typewriter();
		setTimeout(() => {
			$('.modal').append(`<img src="assets/images/ss-5.jpg">`);
			$(document).on('click', '.modal img', () => {
				$('.modal').append(`<p id="imageText" class="typed-text--font-family"></p>`);
				var typeWriter, texts;
				texts = ["Güzel yüzün ve gözlerin, bunlar beni mutlu eder :)"]
				typeWriter = new TypeWriter({
					words: texts,
					elementId: 'imageText',
					speed: 150
				});
				typeWriter.typewriter();
			})
		}, 3000)
	}

	handleClick(selector, callback) {
		$(document).on('click', selector, callback);
	}

	render() {
		this.handleClick('.message-box', this.showMessage);
		setTimeout(() => {
			$('.birthday').append(`<div class="message-box">BİR ADET MESAJINIZ VAR</div>`);
		}, 3000)

		const birthdayTemplate = `
			<div class="birthday">
				<canvas id="birthday"></canvas>
			</div>
		`;
		
// <h1>SÜMEYYE ÜÇÜNCÜ</h1>
		return `
			<div class="stars"></div>
			${this.expired ? '' : '<div class="twinkling"></div>'}
			${this.expired ? '' : '<div class="clouds"></div>'}
			<div id="countdown">
				<h1 id="namesurname" class="typed-text--font-family"></h1>
				${this.expired
					? birthdayTemplate
					: '<div id="clock"></div>'
				}
			</div>
		`;
	}
}

class Content {
	constructor() {
		this.activePage = 0;

	}

	init() {
		activeRoute = 'content';
	}

	render() {
		return `
			<div>

			</div>
		`;
	}
}

const router = {
	countdown: CountDown,
	content: Content,
};
let activeRoute = 'countdown';

$(document).ready(() => {
	renderApp();
});

function renderApp() {
	const Component = new router[activeRoute]();
	$('#app').html(Component.render());
	Component.init();
}