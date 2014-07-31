/*
combined files : 

kg/pluginhost/2.0.0/index

*/
/**
 * S.PluginHost
 * @fileoverview 插件宿主
 * @author 虎牙<ningzbruc@gmail.com>
 * @module pluginhost
 * @date 2013-01-07
 * @version 0.0.1
 */

KISSY.add('kg/pluginhost/2.0.0/index',function (S) {
    
/**
 * 插件宿主
 * @module pluginhost
 */
    
    'use strict';
    
    /**
     * 插件宿主构造函数
		
		S.augment(MyClass, S.PluginHost);
		var myInstance = new MyClass(cfg);
		myInstance.plug(MyPlugin, cfg);
		myInstance.pluginNS.pluginMethod();
		myInstance.unplug(pluginNS);
		
     * @class PluginHost
     * @for PluginHost
     * @constructor
     */
    function PluginHost() {
        //S.augment的时候不会执行构造函数，WTF?!
        this._plugins = {};
    }

    S.mix(PluginHost.prototype, {
        
        /**
         * 配置插件
         * @method plug
         * @param {Function|Array} plugin 插件构造函数/数组
         * @param {Object} config 插件配置参数
         * @chainable
         * @public
         */
        plug: function(Plugin, config) {
            var i, ln, ns;
            
            this._plugins = this._plugins || {};
            
            if (S.isArray(Plugin)) {
                for (i = 0, ln = Plugin.length; i < ln; i++) {
                    this.plug(Plugin[i]);
                }
            } else {
                if (Plugin && !S.isFunction(Plugin)) {
                    config = Plugin.cfg;
                    Plugin = Plugin.fn;
                }

                // Plugin should be fn by now
                if (Plugin && Plugin.NS) {
                    ns = Plugin.NS;
        
                    config = config || {};
                    config.host = this;
        
                    if (this.hasPlugin(ns)) {
                        // Update config
                        if (this[ns].setAttrs) {
                            this[ns].setAttrs(config);
                        }
                    } else {
                        // Create new instance
                        this[ns] = new Plugin(config);
                        this._plugins[ns] = Plugin;
                    }
                }
            }
            return this;
        },
        
        /**
         * 移除插件
         * @method unplug
         * @param {String|Function} plugin 插件构造函数或命名空间，plugin.NS
         * @chainable
         * @public
         */
        unplug: function(plugin) {
            var ns = plugin, 
                plugins = this._plugins || (this._plugins = {});
            
            if (plugin) {
                if (S.isFunction(plugin)) {
                    ns = plugin.NS;
                    if (ns && (!plugins[ns] || plugins[ns] !== plugin)) {
                        ns = null;
                    }
                }
        
                if (ns) {
                    if (this[ns]) {
                        if (this[ns].destroy) {
                            this[ns].destroy();
                        }
                        delete this[ns];
                    }
                    if (plugins[ns]) {
                        delete plugins[ns];
                    }
                }
            } else {
                for (ns in this._plugins) {
                    if (this._plugins.hasOwnProperty(ns)) {
                        this.unplug(ns);
                    }
                }
            }
            return this;
        },
        
        /**
         * 检查是否已经存在该插件
         * @method hasPlugin
         * @param {String} ns 插件命名空间，plugin.NS
         * @return {Boolean} 是否存在
         * @public
         */
        hasPlugin : function(ns) {
            return (this._plugins && this._plugins[ns] && this[ns]);
        }
        
    });

    S.PluginHost = PluginHost;
    
    return PluginHost;

});




