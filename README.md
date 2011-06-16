jQuery.rtl.js
------------
a jQuery adapter plugin that automatically mirrors all your CSS properties that run through jQuery's `css()` and `animate()` methods. Check it out.


Code that looks like this:
```js
$('.content').css({
  margin: '1px 2px 3px 4px',
  paddingLeft: '5px',
  right: '6px',
  'text-decoration': 'left'
})
  .animate({
    right: 50
  })
```

automatically runs through jQuery as this:
``` js
$('.content').css({
  margin: '1px 4px 3px 2px',
  paddingRight: '5px',
  left: '6px',
  'text-decoration': 'right'
})
  .animate({
    left: 50
  })
```