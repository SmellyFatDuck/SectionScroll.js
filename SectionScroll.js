var windowHeight,
	container,
	sections,
    position,
    activeCon,
	activeSec,
    scrollPos,
    scrollDown;
    
function Reset() {
	windowHeight = window.innerHeight;
	position = window.pageYOffset || document.documentElement.scrollTop;
    scrollPos = position;
    scrollDown = false;
}

function GetActive() {
	for (var c = 0; c < container.length; c++)
  	    if (position >= container[c].offsetTop && position <= (container[c].offsetTop + container[c].clientHeight))
    	    activeCon = c;
      
    for (var s = 0; s < sections[activeCon].length; s++)
  	    if (position >= sections[activeCon][s].offsetTop && position <= (sections[activeCon][s].offsetTop + sections[activeCon][s].clientHeight))
    	    activeSec = s;
}

function ActiveDetails() {
	var details,
  		sectionTop,
  		sectionHeight,
        scrollTrigger;
  
    details = [];
    sectionTop = sections[activeCon][activeSec].offsetTop;
    sectionHeight = sections[activeCon][activeSec].clientHeight;
    scrollTrigger = (sectionTop + sectionHeight) - windowHeight;
    
    details.push(sectionTop, sectionHeight, scrollTrigger);
    
    return details;
}

function ScrollListening() {
	position = window.pageYOffset || document.documentElement.scrollTop;    
    AlterScroll(ActiveDetails());
}

function SetScrollListener() {
	document.addEventListener("scroll", ScrollListening, { passive: true });
}

function ScrollTo(offset, callback) {
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
    	if (window.pageYOffset.toFixed() === fixedOffset) {
      	window.removeEventListener('scroll', onScroll);
        callback();
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
}

function ScrollToNext() {   
	var top;
  
	if (activeSec == (sections[activeCon].length - 1)) {
        if (activeCon == (container.length - 1))
            activeCon = 0;
        else
    	    activeCon++;
        activeSec = 0;
    } else
        activeSec++;
    
    top = sections[activeCon][activeSec].offsetTop;
 	
    ScrollTo(top, SetScrollListener);
}

function ScrollToPrev() {
	var top;

	if (activeSec == 0) {
        if (activeCon == 0)
        activeCon = (container.length - 1);
        else
    	    activeCon--;
        activeSec = (sections[activeCon].length - 1);
    } else
        activeSec--;
    
    top = (sections[activeCon][activeSec].offsetTop + sections[activeCon][activeSec].clientHeight) - window.innerHeight;
    
    ScrollTo(top, SetScrollListener);
}

function AlterScroll(details) {
    var sectionTop,
  		sectionHeight,
        scrollTrigger;
      
    sectionTop = details[0];
    sectionHeight = details[1];
    scrollTrigger = details[2];
  
 	scrollDown = position > scrollPos ? true : false;
  
    if (position > scrollTrigger && scrollDown) {
        document.removeEventListener("scroll", ScrollListening);
        ScrollToNext();
    } else if (position < sectionTop && !scrollDown) {
        document.removeEventListener("scroll", ScrollListening);
        ScrollToPrev();
    }
  
    scrollPos = position <= 0 ? 0 : position;
}
    
function ScrollSection(a, b) {
	Reset();
  
	container = document.querySelectorAll(a);
  
    sections = [];

    for (var c = 0; c < container.length; c++)
		sections.push(container[c].querySelectorAll(b));
    
    GetActive();
  
    SetScrollListener();
}
