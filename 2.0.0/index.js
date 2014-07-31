/**
 * @fileoverview
 * @author
 * @module pluginhost
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     *
     * @class Pluginhost
     * @constructor
     * @extends Base
     */
    function Pluginhost(comConfig) {
        var self = this;
        //调用父类构造函数
        Pluginhost.superclass.constructor.call(self, comConfig);
    }
    S.extend(Pluginhost, Base, /** @lends Pluginhost.prototype*/{

    }, {ATTRS : /** @lends Pluginhost*/{

    }});
    return Pluginhost;
}, {requires:['node', 'base']});



