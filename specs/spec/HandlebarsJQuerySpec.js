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

  it("uses a given template string when present", function() {
    div1.template(false, 'Hello Attribute World!');
    expect(div1.text()).toEqual("Hello Attribute World!");
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
  
  it('returns the existing template object when calling template() on a DOM element with existing template', function() {
    var model = $({});
    var templateObject = div1.template(model, 'Hello Attribute World!');
    expect(templateObject.jQueryModel).toBe(model);
    expect(div1.template()).toBe(templateObject);
  });
  
  describe('collections', function() {
    var peter;
    var paul;
    var mary;
    var people;
    
    var ul;
    
    beforeEach(function() {
      peter = $({});
      peter.data({name: 'Peter'});
      
      paul = $({});
      paul.data({name: 'Paul'});
      
      mary = $({});
      mary.data({name: 'Mary'});
      
      people = $.collection(peter, paul);
      
      ul = $('<ul/>');
      ul.template(people, "<li>It's: {{name}}</li>");
    });
    
    it('renders a collection', function() {
      var lis = ul.find('li');
      expect(lis.length).toBe(2);
      expect($(lis[0]).text()).toEqual("It's: Peter");
      expect($(lis[1]).text()).toEqual("It's: Paul");
    });
    
    it('re-renders when the collection gets changed', function() {
      people.push(mary);
      var lis = ul.find('li');
      expect(lis.length).toBe(3);
      expect($(lis[2]).text()).toEqual("It's: Mary");
      
      people.pop();
      lis = ul.find('li');
      expect(lis.length).toBe(2);
      expect($(lis[1]).text()).toEqual("It's: Paul");
      
      people.splice(0,1);
      lis = ul.find('li');
      expect(lis.length).toBe(1);
      expect($(lis[0]).text()).toEqual("It's: Paul");
    });
    
    it('re-renders when the collection gets sorted', function() {
      var arnold = $({});
      arnold.data('name', 'Arnold');
      
      people.push(arnold);
      people.push(mary);
      
      var lis = ul.find('li');
      expect(lis.length).toBe(4);
      expect($(lis[0]).text()).toEqual("It's: Peter");
      expect($(lis[1]).text()).toEqual("It's: Paul");
      expect($(lis[2]).text()).toEqual("It's: Arnold");
      expect($(lis[3]).text()).toEqual("It's: Mary");
      
      people.sort(function(a, b) {
        if (a.data('name') > b.data('name')) {
          return 1;
        }
        
        return a.data('name') < b.data('name') ? -1 : 1;
      });
      
      lis = ul.find('li');
      expect(lis.length).toBe(4);
      expect($(lis[0]).text()).toEqual("It's: Arnold");
      expect($(lis[1]).text()).toEqual("It's: Mary");
      expect($(lis[2]).text()).toEqual("It's: Paul");
      expect($(lis[3]).text()).toEqual("It's: Peter");
    });
    
    it('updates the dom element when an element in the collection', function() {
      paul.data('name', 'new name');
      
      var lis = ul.find('li');
      expect(lis.length).toBe(2);
      expect($(lis[0]).text()).toEqual("It's: Peter");
      expect($(lis[1]).text()).toEqual("It's: new name");
    });
  });
});