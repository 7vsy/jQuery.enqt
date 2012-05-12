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
  $(selector).enqt( duration, delay, styles, [callback] );
</script>
```
+ `$(selector)` : jQueryObject
+ `duration` : Integer[ms]
+ `delay` : Integer[ms]
+ `styles` : Object
+ `[callback]` : Function

## Example

### Transform

``` javascript
$('#maru')
.enqt( 500,   0, { translate:{ x:'100px', y:'200px'} } )
.enqt( 1000,  0, { scale:{ x:2,y:2 }, backgroundColor:'#f00' } )
.enqt( 500, 500, { rotate: '45deg' }, function(){ console.log(123); } );
```

## Depends

* jQuery 1.7.2

## License

Copyright(c) 2012 Masato WATANABE  
Licensed under the MIT license.

