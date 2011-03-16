(function($){
  $.fn.template = function(model, templateString) {
    this.each(function() {
      var domElement = $(this);
      var template = Handlebars.compile(templateString || domElement.data('template') || domElement.html());
      template.jQueryModel = (model || domElement);

      template.jQueryModel.bind('changeData', function() {
        template.render();
      });

      template.render = function() {
        domElement.html(this(this.jQueryModel.data()));
      };

      template.render();
    });
  };
})(jQuery);