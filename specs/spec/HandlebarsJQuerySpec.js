describe("handlebars.jquery.js", function() {
  var div1;
  
  beforeEach(function() {
    div1 = jQuery('<div />');
  });
  
  it("uses a template set in the data-template attribute of the DOM element by default", function() {
    div1.attr('data-template', 'Hello Attribute World!');
    div1.template();
    expect(div1.text()).toEqual("Hello Attribute World!");
  });
  
  it("uses its own content as a template when the data-template attribute is not set", function() {
    div1 = jQuery('<div>Hello {{name}}</div>');
    div1.data('name', 'Corey');
    div1.template();
    expect(div1.text()).toEqual("Hello Corey");
  });
  
  describe("giving a model explicitly", function() {
    var model;
    beforeEach(function() {
      div1.data('template', "Hello {{name}} {{surname}}!");
      model = $({}).data({name: 'Klaus', surname: 'Krapp'});
      div1.template(model);
    });
    
    it('uses the model as the templates context', function() {
      expect(div1.text()).toEqual('Hello Klaus Krapp!');
    });
    
    it("updates on changes to model", function() {
      model.data('name', 'Oliver');
      expect(div1.text()).toEqual('Hello Oliver Krapp!');
    });
  });

  describe("not giving a model explicitly", function() {
    beforeEach(function() {
      div1.data({name: 'Sue', surname: 'Donnor'});
      div1.data({template: "Hello {{name}} {{surname}}!"});
      div1.template();
    });
    
    it("uses it's own data() as the templates context", function() {
      expect(div1.text()).toEqual('Hello Sue Donnor!');
    });
    
    it("updates on changes to the DOMs data()", function() {
      div1.data('name', 'Delaney');
      expect(div1.text()).toEqual('Hello Delaney Donnor!');
    });
  });
  
  it('works with several DOM elements at once', function() {
    div1 = jQuery('<div>{{name}}</div>');
    var div2 = jQuery('<div>{{surname}}</div>');
    var container = jQuery('<div/>').append(div1).append(div2);

    var model = $({}).data({name: 'Bob', surname: 'Bonk'});

    container.find('*').template(model);
    expect(div1.text()).toEqual('Bob');
    expect(div2.text()).toEqual('Bonk');
  });
  
});