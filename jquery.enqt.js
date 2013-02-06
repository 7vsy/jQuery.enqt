/*!
 * jQuery.enqt 
 * Version: 0.3.3
 * https://github.com/7vsy/jQuery.enqt
 *
 * Copyright(c) 2012 Masato WATANABE <7vsyml@gmail.com>
 * MIT Licensed
 */

;(function ( $, window ) {

  var pluginName = 'enqt',
      document = window.document;

  var useCss3Properties = ['transitionProperty', 'transitionDuration', 'transitionDelay', 'transitionTimingFunction', 'transform', 'transformOrigin'];

  this.vendorPrefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
                      (/firefox/i).test(navigator.userAgent) ? 'Moz' :
                      (/trident/i).test(navigator.userAgent) ? 'ms' :
                      'opera' in window ? 'O' : '';

  var isTranslate3d = (/Android 4/i).test(navigator.userAgent) ? true : false;

  var vendorProperties = (function() {
    var rtn = {};
    $.each(useCss3Properties, function() {
      rtn[this] = vendorPrefix + this.charAt(0).toUpperCase() + this.substring(1);
    });
    return rtn;
  })();

  var joinTransformValues = function( obj ){
    var joinString = '';
    for( var key in obj ){
      joinString += obj[key] + ' ';
    }
    return joinString;
  }

  $.fn[pluginName] = function( styles, duration, easing, callback ) {  

    var totalDelay = duration || 0;
    var transformValues = { 
      'translate' : 'translate(0px, 0px)',
      'scale' : 'scale(1, 1)',
      'rotate' : 'rotate(0deg)',
      'skew' : 'skewX(0deg) skewY(0deg)'
    };

    $.each(useCss3Properties, function() {
      if ( styles[this] ){
        styles[vendorProperties[this]] = styles[this];
      }
    });

    for ( var tfValue in transformValues ){
      if ( styles[tfValue] ){
        if ( tfValue === 'transform' ){
          break;
        } else if ( tfValue === 'translate' ){
          var posX = styles['translate']['x'] || '0px';
          var posY = styles['translate']['y'] || '0px';
          if ( isTranslate3d ){
            transformValues[tfValue] = 'translate3d(' + posX + ', ' + posY + ', 0px )';
          }else{
            transformValues[tfValue] = 'translate(' + posX + ', ' + posY + ' )';
          }
        } else if ( tfValue === 'scale' ){
          var scaleX = styles['scale']['x'] || 1;
          var scaleY = styles['scale']['y'] || 1;
          transformValues[tfValue] = 'scale(' + scaleX + ', ' + scaleY + ' )';
        } else if ( tfValue === 'rotate' ){
          var rotate = styles['rotate'] || '0deg';
          transformValues[tfValue] = 'rotate(' + rotate + ' )';
        } else if ( tfValue === 'skew' ){
          var skewX = styles['skew']['x'] || '0deg';
          var skewY = styles['skew']['y'] || '0deg';
          transformValues[tfValue] = 'skewX(' + skewX + ') skewY(' + skewY + ' )';
        }
      }
    }

    styles[vendorProperties['transform']] =  styles['transform'] || joinTransformValues( transformValues ) || '';

    if ( easing && !$.isFunction( easing ) ){
      styles['ease'] = easing;
    }else if( easing && $.isFunction( easing ) ){
      callback = easing;
    }

    if ( typeof styles['ease'] !== "undefined" && styles['ease'] !== null ){
      styles[vendorProperties['transitionTimingFunction']] = styles['ease'];
      delete styles['ease'];
    }else{
      styles[vendorProperties['transitionTimingFunction']] = 'ease';
    }

    if ( typeof styles['delay'] !== "undefined" && styles['delay'] !== null ){
      totalDelay += parseInt( styles['delay'] );
      styles[vendorProperties['transitionDelay']] = styles['delay'] + 'ms';
      delete styles['delay'];
    }else{
      styles[vendorProperties['transitionDelay']] = '0ms';
    }

    return this.each(function(i,elem) {

      $(this).queue(function(){ 

        if ( callback ){
          setTimeout(function(){
            callback();
          }, totalDelay );
        }

        $(this)
          .css( vendorProperties.transitionDuration, duration + 'ms' )
          .css( styles )
          .dequeue();
      }).delay( totalDelay );

    });
  };
}(jQuery, window));
