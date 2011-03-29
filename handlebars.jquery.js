(function($){
  $.fn.template = function(model, passedString) {
    var result = [];
    this.each(function() {
      var domElement = $(this);
      
      if (domElement.data('_templateObject')) {
        result.push(domElement.data('_templateObject'));
      } else {
        var templateString = passedString || domElement.data('template') || domElement.html();
        var template = Handlebars.compile(templateString);
        template.jQueryModel = (model || domElement);
      
        template.jQueryModel.bind('changeData addData removeData', function() {
          template.renderFunction();
        });
      
        template.renderModel = function(model) {
          model = model || this.jQueryModel;
          return this(model.data());
        };
      
        template.renderSingle = function() {
          domElement.html(template.renderModel());
        };
      
        template.renderCollection = function() {
          var outerTemplate = $(templateString);
        
          var result = $('<div/>');
          $.each(this.jQueryModel, function() {
            var item = outerTemplate.clone();
            item.template(this);
            result.append(item);
          });
          domElement.empty().append(result.children());
        };
      
        template.renderFunction = (template.jQueryModel instanceof Array) ? template.renderCollection : template.renderSingle;
      
        domElement.data('_templateObject', template);
      
        template.renderFunction();
        result.push(template);
      }
    });
    
    if (result.length < 2) {
      return result[0];
    }
    
    return result;
  };
})(jQuery);