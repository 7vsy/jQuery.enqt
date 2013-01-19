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
  $(selector).enqt( styles, duration, [easing], [callback] );
</script>
```
+ `$(selector)` : jQueryObject
+ `styles` : Object
+ `duration` : Integer[ms]
+ `[easing]` : String
+ `[callback]` : Function

## Example

### Transform

``` javascript
$('#maru')
.enqt( { translate:{ x:'200px', y:'100px'} }, 500, "ease-out" )
.enqt( { translate:{ x:'200px', y:'100px'}, scale:{ x:2,y:2 }, backgroundColor:'#00f' }, 1000 )
.enqt( { rotate: '45deg', delay: 500 }, 500, function(){ console.log(123); } );
```

## Depends

* jQuery 1.9.0

## License

Copyright(c) 2012 Masato WATANABE  
Licensed under the MIT license.

