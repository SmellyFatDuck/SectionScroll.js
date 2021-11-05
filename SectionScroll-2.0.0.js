(function ($) {

    var _container,
        _children,
        _activeContainer,
        _activeChild,
        _screen,
        _position,
        _lastScroll,
        _scrollDown,
        _duration;

    DetectOnScreen = () => {
        $(_container).each((i, e) => {
        		var $this = $(e);
            if (_position >= $this.offset().top && _position <= ($this.offset().top + $this.outerHeight())) {
                _activeContainer = i;
            }
        }).children(_children).each((i, c) => {
        		var $that = $(c);
            if (_position >= $that.offset().top && _position <= ($that.offset().top + $that.outerHeight()))
            		_activeChild = i;
        });
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
                _activeContainer = _container.length - 1;
            else
                _activeContainer--;
            
            _activeChild = activeChildren.length - 1;
        } else
            _activeChild--;
        
        activeChild = $($($(_container)[_activeContainer]).children(_children)[_activeChild]);
        Scroll((activeChild.offset().top + activeChild.outerHeight()) - _screen);
    }

    AlterScroll = () => {
        let active,
            scrollTrigger;

        active = $(_container).eq(_activeContainer).children(_children)[_activeChild];
        scrollTrigger = ($(active).offset().top + $(active).outerHeight()) - _screen;

        _scrollDown = _position > _lastScroll ? true : false;

        if (_scrollDown && _position > scrollTrigger)
        		$(document).off("scroll", ScrollListening).promise().done(ScrollToNext);
        else if (!_scrollDown && _position < $(active).offset().top)
        		$(document).off("scroll", ScrollListening).promise().done(ScrollToPrev);
        
        _lastScroll = _position <= 0 ? 0 : _position;
    }

    ScrollListening = () => AlterScroll();

    SetScrollListener = () => $(document).on("scroll", ScrollListening);

    $(window).on("load resize", () => {
        _screen = $(this).height();
        _position = $(document).scrollTop();
        _lastScroll = _position;
        _scrollDown = false;
    });

    $(window).on("scroll", () => _position = $(document).scrollTop());

    SectionScroll = (parent, child, duration) => {
        _container = parent;
        _children = child;
        _duration = duration;
    
        DetectOnScreen();
        SetScrollListener();
    }
 
}(jQuery));
