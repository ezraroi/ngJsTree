ngJsTree
========

Angular Directive for the famous [JS Tree] library.


Dependencies
-----------

The ngJsTree depends on the following libraries:
* Angular
* JsTree


Install
-----------

You can install the ngJsTree with bower:

```bat
bower install ngJsTree --save
```

or you can add the ngJsTree.min.js file to your HTML page:
```html
<script src="jqeury.js">
<script src="angular.js">
<script src="jstree.min.js">
<script src="ngJsTree.min.js">
```

Documentation
----
You can find the JSTree documentation at [this link]

### Usage

```html
<div js-tree="treeConfig" ng-model="treeData" tree="treeInstance" tree-events="ready:readyCB">></div>
```



### Development
#### Prepare your environment

* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g grunt-cli karma`
* Install local dev dependencies: `npm install` while current directory is bootstrap repo

#### Build
* Build the whole project: `grunt` - this will run `jshint` and `test` and will build the project


#### TDD
* Run test: `grunt watch`

License
----

MIT

[JS Tree]:http://www.jstree.com/
[this link]:http://www.jstree.com/api/
