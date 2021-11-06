(function ($) {

    var _container,
        _children,
        _activeContainer,
        _activeChild,
        _screen,
        _position,
        _lastScroll,
        _scrollDown,
        _duration,
	_touchStart,
	_touchEnd;

    DetectOnScreen = () => {
        $(_container).each((i, e) => {
            var $this = $(e);
            if (_position >= $this.offset().top && _position <= ($this.offset().top + $this.outerHeight()))
                _activeContainer = i;
        }).children(_children).each((i, c) => {
            var $that = $(c);
            if (_position >= $that.offset().top && _position <= ($that.offset().top + $that.outerHeight()))
            	_activeChild = i;
        });

        _activeContainer = typeof _activeContainer === "undefined" ? 0 : _activeContainer;
	_activeChild = typeof _activeChild === "undefined" ? 0 : _activeChild;
    }

    Scroll = (top) =>  $('html, body').animate({ scrollTop: top }, _duration).promise().done(SetScrollListener);

    ScrollToNext = () => {
        let activeChild,
            activeChildren,
            activeContainer;

        activeContainer = $(_container)[_activeContainer];
        activeChildren = $(activeContainer).children(_children);
        
        _activeChild++;

        if (_activeChild == activeChildren.length) {
            _activeContainer++;
            _activeChild = 0;
            
            if (_activeContainer == $(_container).length)
                _activeContainer = 0;
        }
        
        activeChild = $($($(_container)[_activeContainer]).children(_children)[_activeChild]);
        Scroll(activeChild.offset().top);
    }

    ScrollToPrev = () => {
        let activeChild,
            activeChildren,
            activeContainer;

        activeContainer = $(_container)[_activeContainer];
        activeChildren = $(activeContainer).children(_children);

        if (_activeChild == 0) {
            if (_activeContainer == 0)
                _activeContainer = $(_container).length - 1;
            else
                _activeContainer--;
            
            _activeChild = activeChildren.length - 1;
        } else
            _activeChild--;
        
        activeChild = $($($(_container)[_activeContainer]).children(_children)[_activeChild]);
        Scroll((activeChild.offset().top + activeChild.outerHeight()) - _screen);
    }

    AlterScroll = (e) => {
        let active,
            scrollTrigger,
	    deltaY;
						
	deltaY = e.originalEvent.deltaY;

        active = $($(_container)[_activeContainer]).children(_children)[_activeChild];
        scrollTrigger = ($(active).offset().top + $(active).outerHeight()) - _screen;
			
        _scrollDown = _position > _lastScroll ? true : false;

        if (_scrollDown && _position > scrollTrigger || deltaY > 0 && (_position + _screen) >= $(window).height())
	    $(document).unbind("mousewheel").promise().done(ScrollToNext);
        else if (!_scrollDown && _position < $(active).offset().top || deltaY < 0 && _position >= 0)
	    $(document).unbind("mousewheel").promise().done(ScrollToPrev);
        
        _lastScroll = _position <= 0 ? 0 : _position;
    }

    ScrollListening = (e) => AlterScroll(e);

    SetScrollListener = () => $(document).on("mousewheel", (e) => ScrollListening(e));

    WindowListening = () => {
	_screen = $(this).height();
        _position = $(document).scrollTop();
        _lastScroll = _position;
        _scrollDown = false;
    }
	
    SetWindowListener = () => {
	WindowListening();
	$(window).on("ready resize", WindowListening);
    }
	
    SetTouchStart = (e) => _touchStart = e.originalEvent.touches[0].clientY;

    TouchListening = (e) => {
	let currentPosition,
	    active,
	    scrollTrigger;
		
	_touchEnd = e.originalEvent.changedTouches[0].clientY;
		
	currentPosition = $(window).scrollTop();
	active = $($(_container)[_activeContainer]).children(_children)[_activeChild];
        scrollTrigger = ($(active).offset().top + $(active).outerHeight()) - _screen;
		
	if(_touchStart > (_touchEnd + 5) && currentPosition > scrollTrigger)
            $(document).unbind("mousewheel").promise().done(ScrollToNext);
   	else if(_touchStart < (_touchEnd - 5) && currentPosition < $(active).offset().top)
            $(document).unbind("mousewheel").promise().done(ScrollToPrev);
    }
	
    SetTouchListeners = () => {
	$(document).on("touchstart", (e) => SetTouchStart(e));
	$(document).on("touchend", (e) => TouchListening(e));
    }
	
    KeyListening = (e) => {
	switch(e.keyCode) {
	    case 37:
	    case 38: {
		$(document).unbind("mousewheel").promise().done(ScrollToPrev);
		break;
	    }
	    case 39:
	    case 40: {
		$(document).unbind("mousewheel").promise().done(ScrollToNext);
		break;
	    }
	}
    }
	
    SetKeyListener = () => $(window).on("keydown", (e) => KeyListening(e));

    $(window).on("scroll", () => _position = $(document).scrollTop());

    SectionScroll = (parent, child, duration) => {
        _container = parent;
        _children = child;
        _duration = duration || 500;
    
        $(SetWindowListener()).promise().done(DetectOnScreen);
        SetScrollListener();
	SetTouchListeners();
	SetKeyListener();
    }
 
}(jQuery));
