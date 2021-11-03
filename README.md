# SectionScroll.js
<b>ScrollSection.js</b> is a very simple plugin which enables you to scroll by sections.

The main difference about this plugin to other scroll-by-section plugins is that it doesn't manipulate anything but the scroll.

This plugin allows you to use any number of containers and, obviously, sections.

Simply enter the selector for your container and the selector for your sections then you're done!

## Usage
The function MUST be called by an event, I recommend load and resize (as resizing can throw off the calculations).

```html
<script type="text/javascript" src="ScrollSection.js"></script>
<script type="text/javascript">
  window.load = SectionScroll("article", "section");
  window.onresize = SectionScroll("article", "section");
</script>
```

## Example
See working example on <a href="https://jsfiddle.net/daddymicael/aoh5jpf9/">JSFiddle</a>

## Licence
<img src="https://img.shields.io/apm/l/vim-mode">
