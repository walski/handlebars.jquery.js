# handlebars.jquery.js

 This [jQuery](http://jquery.com) Plugin lets you easily bind 
 [Handlebars.js](https://github.com/wycats/handlebars.js) templates to DOM
 elements.
 
 It's a simple and lean way to glue a model to a view.

## Features

  * write your Handlebars template just inside the DOM element
  * bind a model to the template
  * supports any kind of model that is compatible to jQuery's data() API

## Installation

Just include jQuery, Handlebars and handlebars.jquery.js in your HTML Head:

  &lt;!DOCTYPE html&gt;
  &lt;html&gt;
  &lt;head&gt;
    &lt;script src=&quot;jquery-1.5.1.min.js&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;handlebars-0.9.0.pre.4.js&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;handlebars.jquery.js&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
  ...

## Usage Examples

Simple example:

  ...
  &lt;h1 data-title=&quot;It&#x27;s a headline!&quot;&gt;{{title}}&lt;/h1&gt;
  ...
  &lt;script style=&quot;text/javascript&quot;&gt;
    $(&#x27;h1&#x27;).template();
  &lt;/script&gt;
  ...

See the *demo* folder for more examples.