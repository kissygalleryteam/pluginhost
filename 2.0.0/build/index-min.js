/*!build time : 2014-07-31 8:22:21 PM*/
KISSY.add("kg/pluginhost/2.0.0/index",function(a){"use strict";function b(){this._plugins={}}return a.mix(b.prototype,{plug:function(b,c){var d,e,f;if(this._plugins=this._plugins||{},a.isArray(b))for(d=0,e=b.length;e>d;d++)this.plug(b[d]);else b&&!a.isFunction(b)&&(c=b.cfg,b=b.fn),b&&b.NS&&(f=b.NS,c=c||{},c.host=this,this.hasPlugin(f)?this[f].setAttrs&&this[f].setAttrs(c):(this[f]=new b(c),this._plugins[f]=b));return this},unplug:function(b){var c=b,d=this._plugins||(this._plugins={});if(b)a.isFunction(b)&&(c=b.NS,!c||d[c]&&d[c]===b||(c=null)),c&&(this[c]&&(this[c].destroy&&this[c].destroy(),delete this[c]),d[c]&&delete d[c]);else for(c in this._plugins)this._plugins.hasOwnProperty(c)&&this.unplug(c);return this},hasPlugin:function(a){return this._plugins&&this._plugins[a]&&this[a]}}),a.PluginHost=b,b});