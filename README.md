# SectionScroll.js
<b>ScrollSection.js</b> is a very simple plugin which enables you to scroll by sections.

### Purpose
The main difference of this plugin compared to other scroll-by-section plugins is that it doesn't manipulate anything but the scroll and it supports any element height.

## Features
<ul>
  <li>Any number of containers.</li>
  <li>Any number of child sections.</li>
  <li>Infinite scrolling - <i>if there are offsets placed both on top of first container and bottom of last container, or if your browser supports scrolling above and below webpage contents.</i></li>
  <li>Mobile touch</li>
  <li>Key press scrolling - <i>UP, DOWN, LEFT, RIGHT (vertical movement only)</i></li>
</ul>

## Notes

This plugin only supports layouts which consist of only the container and child sections. Any other layouts which have elements placed above or below the containers will not be accessible to the user.

## Usage

### v2.1.0
SectionScroll(**container**, **children**, _scroll duration_)<br>
<i>Scroll duration is optional, default 500(ms).</i><br><br>
<i>Note: jQuery migration may be required, as seen in the working example.</i>
```html
<script type="text/javascript" src="SectionScroll-2.0.0.js"></script>
<script type="text/javascript">
  $(document).ready(() => {
    SectionScroll("article", "section", 500);
  });
</script>
```

### v1.0.0 (DOM)
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
v2.1.0 - <a href="https://jsfiddle.net/SmellyFatDuck/4h3gqptj/167/">JSFiddle</a><br>
v1.0.0 - <a href="https://jsfiddle.net/daddymicael/aoh5jpf9/">JSFiddle</a>


## Current Bugs
<b>MAJOR</b> - If there is an offset for the infinite scrolling, the page will scroll to the bottom from the top when scrolling down, and vica versa.

## Licence
<img src="https://img.shields.io/apm/l/vim-mode"> <img src="https://img.shields.io/github/v/release/SmellyFatDuck/SectionScroll.js"> <img src="https://img.shields.io/github/downloads/SmellyFatDuck/SectionScroll.js/total">
