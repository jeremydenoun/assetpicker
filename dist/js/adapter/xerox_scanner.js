!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.AssetPickerAdapterXerox_scanner=e()}}(function(){return function e(t,n,r){function i(a,s){if(!n[a]){if(!t[a]){var f="function"==typeof require&&require;if(!s&&f)return f(a,!0);if(o)return o(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){t.exports={translations:{description:{en:"Xerox Scanner",de:"Xerox Scanner",fr:"Xerox Scanner"}},http:function(){var e={base:this.config.url.replace(/\/+$/,"")};return e},data:function(){return{items:null,results:{}}},watch:{"appConfig.pick":{handler:function(e){this.loadAssets({})},immediate:!0}},events:{"load-more-items":function(e){this.loadAssets(e)}},methods:{loadAssets:function(e){var t={page:0,pages:0,items:[]};return this.results=t,this.http.get("mailbox/folder.php?name="+this.config.directory).then(function(e){var n=JSON.parse(e.data);e.data=n,t.page=parseInt(e.data.page),t.pages=parseInt(e.data.pages);var r=this.config.url.replace(/\/+$/,"")+"/mailbox/action.php?action=frc_dwnld&name="+this.config.directory+"&file=";return e.data.results.forEach(function(e){var n=this.createItem({id:e.id,type:e.isfolder?"file":"dir",name:e.name,extension:e.name,links:{download:r+e.id,open:r+e.id},data:e});console.log(t.items),t.items.push(n)}.bind(this)),t}.bind(this))}}}},{}]},{},[1])(1)});
//# sourceMappingURL=../maps/adapter/xerox_scanner.js.map
