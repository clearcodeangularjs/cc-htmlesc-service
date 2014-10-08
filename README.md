Clearcode HTML decode Service
=========

This service consists of methods that helps with escaping and unescaping HTML.
Installation
--------------
TODO


Usage
------

Add ``` cc.htmlesc.service ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.htmlesc.service'
    ]);
```
and you are ready to go!

How to use service methods:

*htmlEsc.htmlDecode*

```
htmlEsc.htmlDecode(text); // -> returns unescaped html text - &quot;&amp;&lt;&gt;&#64;&#230; =  "&<>@æ', escapes html markup

```


*htmlEsc.htmlDecodeObject*

```
htmlEsc.htmlDecodeObject(object); // -> same as htmlDecode, but for object, it decodes object properies and returns object with them

```

```
Author
------

Roman Sek 


License
----

LGPL

