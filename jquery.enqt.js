/*!
 * jQuery.enqt - 
 * Version: 0.1.2
 * https://github.com/7vsy/jQuery.enqt
 *
 * Copyright(c) 2012 Masato WATANABE <7vsyml@gmail.com>
 * MIT Licensed
 */

;(function ( $, window, undefined ) {

  var pluginName = 'enqt',
      document = window.document;

  var useCss3Properties = ['transitionProperty', 'transitionDuration', 'transitionDelay', 'transitionTimingFunction', 'transform', 'transformOrigin'];

  var vendorPrefix = /webkit/i.test(navigator.appVersion) ? 'webkit' : 
                     /firefox/i.test(navigator.userAgent) ? 'Moz' : 
                     /trident/i.test(navigator.userAgent) ? 'ms' : 
                     __indexOf.call(window, 'opera') >= 0 ? 'O' : '';

  var vendorProperties = (function() {
    var rtn = {};
    $.each(useCss3Properties, function() {
      rtn[this] = vendorPrefix + this.charAt(0).toUpperCase() + this.substring(1);
    });
    return rtn;
  })();

  var isTranslate3d = /Android 4/i.test(navigator.userAgent) ? true : false;


  $.fn[pluginName] = function( duration, delay, styles, callback ) {  

    var totalDelay = duration + delay;
    var transformMethods = new Array();

    $.each(useCss3Properties, function() {
      if ( styles[this] ){
        styles[vendorProperties[this]] = styles[this];
      }
    });

    for (var methodName in styles ){
      if ( methodName === 'translate' ){
        var posX = styles['translate']['x'] || '0px';
        var posY = styles['translate']['y'] || '0px';
        if ( isTranslate3d ){
          transformMethods.push(' translate3d(' + posX + ', ' + posY + ', 0px ) ');
        }else{
          transformMethods.push(' translate(' + posX + ', ' + posY + ' ) ');
        }
      } else if ( methodName === 'scale' ){
        var scaleX = styles['scale']['x'] || 1;
        var scaleY = styles['scale']['y'] || 1;
        transformMethods.push(' scale(' + scaleX + ', ' + scaleY + ' ) ');
      } else if ( methodName === 'rotate' ){
        var rotate = styles['rotate'] || '0deg';
        transformMethods.push(' rotate(' + rotate + ' ) ');
      } else if ( methodName === 'skew' ){
        var skewX = styles['skew']['x'] || '0deg';
        var skewY = styles['skew']['y'] || '0deg';
        transformMethods.push(' skewX(' + skewX + ') skewY(' + skewY + ' ) ');
      } else if ( methodName === 'transform' ){
        transformMethods.push( styles['transform'] );
      }
    }

    styles[vendorProperties['transform']] = transformMethods.join(' ') || '';

    if ( styles[vendorProperties['transform']].indexOf("scale") === -1 ){
      styles[vendorProperties['transform']] += ' scale(1,1) ';
    }
    if ( styles[vendorProperties['transform']].indexOf("rotate") === -1 ){
      styles[vendorProperties['transform']] += ' rotate(0deg) ';
    }
    if ( styles[vendorProperties['transform']].indexOf("skew") === -1 ){
      styles[vendorProperties['transform']] += ' skewX(0deg) skewY(0deg) ';
    }

    return this.each(function(i,elem) {

      if ( callback ){
        setTimeout(function(){
          callback();
        }, totalDelay );
      }

      $(this).queue(function(){ 
        $(this)
          .css( vendorProperties.transitionDuration, duration + 'ms' )
          .css( vendorProperties.transitionDelay, delay + 'ms' )
          .css( styles )
          .dequeue();
      }).delay( totalDelay );

    });
  };
}(jQuery, window));
