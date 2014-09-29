(function (angular) {

    //// JavaScript Code ////
    function jsTreeCtrl($scope) {
        var nodeSerialId = 1;
        this.nodes = $scope.treeData;

        this.nodesFingerprint = function (e) {
            if (!e.__uiNodeId) {
                e.__uiNodeId = nodeSerialId++;
            }
            return '' + e.__uiNodeId + (e.id || '') + (e.text || '') + (e.type || '');
        };

        this.changeWatcher = function (arraySource, tokenFn) {
            var self;
            var getTokens = function () {
                var array = angular.isFunction(arraySource) ? arraySource() : arraySource;
                var result = [], token, el;
                for (var i = 0, n = array.length; i < n; i++) {
                    el = array[i];
                    token = tokenFn(el);
                    map[token] = el;
                    result.push(token);
                }
                return result;
            };
            // returns elements in that are in a but not in b
            // subtractAsSets([4, 5, 6], [4, 5, 7]) => [6]
            var subtractAsSets = function (a, b) {
                var result = [], inB = {}, i, n;
                for (i = 0, n = b.length; i < n; i++) {
                    inB[b[i]] = true;
                }
                for (i = 0, n = a.length; i < n; i++) {
                    if (!inB[a[i]]) {
                        result.push(a[i]);
                    }
                }
                return result;
            };

            // Map objects to tokens and vice-versa
            var map = {};

            var applyChanges = function (newTokens, oldTokens) {
                var i, n, el, token;
                var replacedTokens = {};
                var removedTokens = subtractAsSets(oldTokens, newTokens);
                for (i = 0, n = removedTokens.length; i < n; i++) {
                    var removedToken = removedTokens[i];
                    el = map[removedToken];
                    delete map[removedToken];
                    var newToken = tokenFn(el);
                    // if the element wasn't removed but simply got a new token, its old token will be different from the current one
                    if (newToken === removedToken) {
                        self.onRemoved(el);
                    } else {
                        replacedTokens[newToken] = removedToken;
                        self.onChanged(el);
                    }
                }

                var addedTokens = subtractAsSets(newTokens, oldTokens);
                for (i = 0, n = addedTokens.length; i < n; i++) {
                    token = addedTokens[i];
                    el = map[token];
                    if (!replacedTokens[token]) {
                        self.onAdded(el);
                    }
                }

            };
            self = {
                subscribe: function (scope, onChanged) {
                    scope.$watch(getTokens, function (newTokens, oldTokens) {
                        if (!onChanged || onChanged(newTokens, oldTokens) !== false) {
                            applyChanges(newTokens, oldTokens);
                        }
                    }, true);
                },
                onAdded: angular.noop,
                onChanged: angular.noop,
                onRemoved: angular.noop
            };
            return self;
        };
    }

    function jsTreeDirective($log) {
        return {
            restrict: 'A',
            scope: {
                treeData: '=ngModel'
            },
            controller: 'jsTreeCtrl',
            link: function (scope, elm, attrs, controller) {

                var config = null,
                    nodesWatcher = controller.changeWatcher(controller.nodes, controller.nodesFingerprint);

                function manageEvents(s, e, a) {
                    if (a.treeEvents) {
                        var evMap = a.treeEvents.split(';');
                        for (var i = 0; i < evMap.length; i++) {
                            if (evMap[i].length > 0) {
                                var evt = evMap[i].split(':')[0] + '.jstree',
                                    cb = evMap[i].split(':')[1];
                                s.tree.on(evt, s.$parent[cb]);
                            }
                        }
                    }
                }

                function getOptions() {
                    //$log.debug('jsTree: getOptions called');
                    var jsTreeSettings = attrs.jsTree ? scope.$parent.$eval(attrs.jsTree) : {};
                    config = {};
                    angular.copy(jsTreeSettings, config);
                    var result = JSON.stringify(config);
                    if (config.core) {
                        config.core.data = scope.treeData;
                    }
                    else {
                        config.core = { data: scope.treeData };
                    }
                    return result;
                }

                scope.destroy = function () {
                    $log.debug('jsTree: destroy called');
                    if (attrs.tree) {
                        scope.tree = scope.$parent[attrs.tree] = elm;
                    } else {
                        scope.tree = elm;
                    }
                    scope.tree.jstree('destroy');
                };

                scope.init = function () {
                    $log.debug('jsTree: init called');
                    scope.tree.jstree(config);
                    manageEvents(scope, elm, attrs);
                };

                nodesWatcher.onChanged = function (node) {
                    scope.tree.jstree(true).set_type(node.id, node.type);
                    scope.tree.jstree(true).rename_node(node.id, node.text);
                };

                nodesWatcher.onAdded = function (node) {
                    var parent = scope.tree.jstree(true).get_node(node.parent);
                    var res = scope.tree.jstree(true).create_node(parent, node, 'inside', angular.noop);
                    if (!res) {
                        $log.warn('jsTree: res is ' + res);
                    }
                };

                nodesWatcher.onRemoved = function (node) {
                    scope.tree.jstree(true).delete_node(node.id);
                };

                nodesWatcher.subscribe(scope, function () {
                    return true;
                });

                scope.$watch(getOptions, function () {
                    $log.debug('jsTree: options changed, will recreate tree');
                    scope.destroy();
                    scope.init();
                });
            }
        };
    }

    //// Angular Code ////
    var mi = angular.module('ngJsTree',[]);
    mi.controller('jsTreeCtrl',jsTreeCtrl);
    mi.directive('jsTree',jsTreeDirective);

})(angular);
