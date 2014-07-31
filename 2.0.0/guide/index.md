## PluginHost

- by 虎牙

## 简介

> 这是一个插件宿主的简单扩充类，提供了插拔的功能，可以被扩充到任何的类中，更好地解耦代码

## 开始使用

		<script>
			
			KISSY.use('kg/pluginhost/2.0.0/', function(S, PluginHost) {
				// 你的代码
			});
			
		</script>

## 简单例子
		//给Node对象扩充插件的功能
		KISSY.use('node,kg/pluginhost/2.0.0/', function(S, Node, PluginHost) {
			
			//给Node类扩充插件功能
			S.augment(Node, PluginHost);
			
			function Visible(cfg) {
				//host为当前Node实例对象
				this._host = cfg.host;
				
				//传入参数，是visibility还是display
				this._isVisibility = !!cfg.visibility;
			}
			
			//插件命名空间
			Visible.NS = 'vs';
			
			Visible.prototype = {
				
				show: function() {
					//host有可能为NodeList
					this._host.each(function(node) {
						if (this._isVisibility) {
							node.css('visibility', 'visible');
						} else {
							node.css('display', 'block');
						}
					}, this);
				},
				
				hide: function() {
					//host有可能为NodeList
					this._host.each(function(node) {
						if (this._isVisibility) {
							node.css('visibility', 'hidden');
						} else {
							node.css('display', 'none');
						}
					}, this);
				},
				
				//unplug时会调用destroy的方法
				destroy: function() {
					this._host = null;
					delete this._host;
				}
				
			};
			
			var box = S.one('.box');
			
			//绑定插件
			box.plug(Visible, {
				visibility: true
			});
			
			//通过插件命名空间调用插件方法
			box.vs.show();
			
			//解除插件绑定
			box.unplug('vs');
		});

