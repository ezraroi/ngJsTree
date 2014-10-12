(function(angular) {
    'use strict';

    //// JavaScript Code ////
    function treeCtrl($log,$timeout,toaster) {
        var newId = 1;
        this.ignoreChanges = false;
        this.newNode = {};
        this.treeData = [
            { id : 'ajson1', parent : '#', text : 'Simple root node' },
            { id : 'ajson2', parent : '#', text : 'Root node 2' },
            { id : 'ajson3', parent : 'ajson2', text : 'Child 1' },
            { id : 'ajson4', parent : 'ajson2', text : 'Child 2' }
        ];
        this.treeConfig = {
            core : {
                multiple : false,
                animation: true,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'glyphicon glyphicon-flash'
                },
                star : {
                    icon : 'glyphicon glyphicon-star'
                },
                cloud : {
                    icon : 'glyphicon glyphicon-cloud'
                }
            },
            plugins : ['types']
        };


        this.addNewNode = function() {
            this.treeData.push({ id : (newId++).toString(), parent : this.newNode.parent, text : this.newNode.text});
        };

        this.setNodeType = function() {
            var item = _.findWhere(this.treeData, { id : this.selectedNode } );
            item.type = this.newType;
            toaster.pop('success', 'Node Type Changed', 'Changed the type of node ' + this.selectedNode);
        };

        this.readyCB = function() {
            $timeout(function() {toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')});
        };

        this.createCB  = function(e,item) {
            $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
        };

        this.applyModelChanges = function() {
            return !this.ignoreChanges;
        };
    }

    //// Angular Code ////

    angular.module('ngJsTreeDemo').controller('treeCtrl', treeCtrl);

})(angular);