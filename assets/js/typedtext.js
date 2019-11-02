// set up text to print, each item in array is new line

class TypeWriter {
	constructor({ words, elementId, speed = 100 }) {
		this.aText = words;
		this.elementId = elementId;
		this.iSpeed = speed; // time delay of print out
		this.iIndex = 0; // start printing array at this posision
		this.iArrLength = this.aText[0].length; // the length of the text array
		this.iScrollAt = 20; // start scrolling up at this many lines
		 
		this.iTextPos = 0; // initialise text position
		this.sContents = ''; // initialise contents variable
		this.iRow; // initialise current row
	}

	typewriter() {
		this.sContents =  ' ';
		this.iRow = Math.max(0, this.iIndex-this.iScrollAt);
		var destination = document.getElementById(this.elementId);

		while ( this.iRow < this.iIndex ) {
			this.sContents += this.aText[this.iRow++] + '<br />';
		}
		destination.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos);
		if ( this.iTextPos++ == this.iArrLength ) {
			this.iTextPos = 0;
			this.iIndex++;
			if ( this.iIndex != this.aText.length ) {
				this.iArrLength = this.aText[this.iIndex].length;
				setTimeout(this.typewriter.bind(this), 500);
			}
		} else {
			setTimeout(this.typewriter.bind(this), this.iSpeed);
		}
	}
}