# jQuery.enqt

### jQuery Plugin ###
This plugin activates several transformations in a particular order.

## Usage
Include this script after jQuery.

``` html
<script src='jquery.min.js'></script>
<script src='jquery.enqt.js'></script>
```
``` javascript
<script>
  $(selector).enqt( duration, styles, [callback] );
</script>
```
+ `$(selector)` : jQueryObject
+ `duration` : Integer[ms]
+ `styles` : Object
+ `[callback]` : Function

## Example

### Transform

``` javascript
$('#maru')
.enqt( 500, { translate:{ x:'200px', y:'100px'}, ease: "ease-out" } )
.enqt( 1000,{ translate:{ x:'200px', y:'100px'}, scale:{ x:2,y:2 }, backgroundColor:'#00f' } )
.enqt( 500, { rotate: '45deg', delay: 500 }, function(){ console.log(123); } );
```

## Depends

* jQuery 1.7.2

## License

Copyright(c) 2012 Masato WATANABE  
Licensed under the MIT license.

