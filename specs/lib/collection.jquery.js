(function($){
  // Original Stack code (C) Andrea Giammarchi (http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html)- MIT Style License
  var Stack = (function(){ 
    function Stack(length) {
      this.jQuery = $('<div/>');
      
      if (arguments.length === 1 && typeof length === "number") {
        this.length = -1 < length && length === length << 1 >> 1 ? length : this.push(length);
      }
      else if (arguments.length) {
        this.push.apply(this, arguments);
      }
    }

    function Array() { }
    Array.prototype = [];

    Stack.prototype = new Array;
    Stack.prototype.length = 0;
    Stack.prototype.toString = function () {
      return this.slice(0).toString();
    };
    
    Stack.prototype.bind = function(event, callback) {
      this.jQuery.bind(event, callback);
    };
    
    Stack.prototype.remove = function(obj) {
      var index = this.indexOf(obj);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    
    Stack.prototype.constructor = Stack;

    function addTriggerToMethods(eventName, methods) {
      $.each(methods, function() {
        var proxied = Stack.prototype[this];
        Stack.prototype[this] = function() {
          var result = proxied.apply(this, arguments);
          this.jQuery.trigger(eventName, $(arguments).toArray().concat(result));
          return result;
        };
      });
    }
    addTriggerToMethods('addData',   ['push', 'unshift']);
    addTriggerToMethods('removeData', ['pop', 'shift']);
    addTriggerToMethods('changeData', ['sort', 'splice', 'reverse']);

    return Stack;
  })();
  
  $.collection = function() {
    var collection = new Stack();
    $.each(arguments, function() {
      collection.push(this);
    });
    return collection;
  };
})(jQuery);