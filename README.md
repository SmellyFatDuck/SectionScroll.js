# SectionScroll.js
<b>ScrollSection.js</b> is a very simple plugin which enables you to scroll by sections.

The main difference about this plugin to other scroll-by-section plugins is that it doesn't manipulate anything but the scroll.

This plugin allows you to use any number of containers and, obviously, sections.

Simply enter the selector for your container and the selector for your sections then you're done!

## Usage

### v2.0.0
SectionScroll(**container**, **children**, **scroll duration**)
```html
<script type="text/javascript" src="SectionScroll-2.0.0.js"></script>
<script type="text/javascript">
  $(document).ready(() => {
    SectionScroll("article", "section", 500);
  });
</script>
```

### v1.0.0
SectionScroll(**container**, **children**)
```html
<script type="text/javascript" src="SectionScroll.js"></script>
<script type="text/javascript">
  window.load = SectionScroll("article", "section");
  window.onresize = SectionScroll("article", "section");
</script>
```

## Examples
See working examples:<br>
v2.0.0 - <a href="https://jsfiddle.net/SmellyFatDuck/4h3gqptj/167/">JSFiddle</a><br>
v1.0.0 - <a href="https://jsfiddle.net/daddymicael/aoh5jpf9/">JSFiddle</a>

## Licence
<img src="https://img.shields.io/apm/l/vim-mode"> <img src="https://img.shields.io/github/v/release/SmellyFatDuck/SectionScroll.js"> <img src="https://img.shields.io/github/downloads/SmellyFatDuck/SectionScroll.js/total">
