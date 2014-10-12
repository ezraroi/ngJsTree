[![Build Status](https://travis-ci.org/ezraroi/ngJsTree.svg?branch=master)](https://travis-ci.org/ezraroi/ngJsTree)
[![Dependency Status](https://gemnasium.com/ezraroi/ngJsTree.svg)](https://gemnasium.com/ezraroi/ngJsTree)

ngJsTree
========

Angular Directive for the famous [JS Tree] library.


##Dependencies


The ngJsTree depends on the following libraries:
* Angular
* JsTree


##Install


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

#Documentation


You can find the JSTree documentation at [this link]

## Usage

```html
<div js-tree="treeConfig" ng-model="treeData" should-apply="ignoreModelChanges()" tree="treeInstance" tree-events="ready:readyCB;create_node:createNodeCB"></div>
```

* `treeConfig` - This is the configuration object of the JsTree, if you will not supply one, an empty one will be created (not mandatory).
* `treeData` - The array with the elements of the tree, will be used for data binding (adding / removing / updating this data will be reflected in the tree).
* `ignoreModelChanges()` - A method that returns true or false. when returning false, model changes will not be reflected in the tree (not mandatory).
* `treeInstance` - The Js Tree instance will be assigned to this variable in your controller scope (not mandatory).
* `ready:readyCB;create_node:createNodeCB` - List of Js Tree events and callbacks in your controller scope that will be called for each event (not mandatory.


### Registering for events
You can register a callback for any Js Tree event in the following way:
* add the  `tree-events` attribute and specify the name of the events to register for and a callback for each event.

Example:
```html```
<div ng-controller='myCtrl'>
    <div js-tree="treeConfig" ng-model="treeData" should-apply="ignoreModelChanges()" tree="treeInstance"tree-events="ready:readyCB;create_node:createNodeCB"></div>
</div>
```
```javascript
angular.module('myApp').controller('myCtrl', function($scope,$log) {
    $scope.readyCB = function() {
        $log.info('ready called');
    };
    
    $scope.createNodeCB = function(e,item) {
        $log.info('create_node called');
    };
);

```






## Development
#### Prepare your environment

* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g grunt-cli karma`
* Install local dev dependencies: `npm install` while current directory is ngJsTree
* Install javascript dependencies: `bower install` while current directory is ngJsTree

#### Build
* Build the whole project: `grunt` - this will run `jshint` and `test` and will build the project


#### TDD
* Run test: `grunt watch`

License
----

MIT

[JS Tree]:http://www.jstree.com/
[this link]:http://www.jstree.com/api/
