!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.AssetPickerAdapterXerox_scanner=e()}}(function(){return function e(t,n,i){function r(a,s){if(!n[a]){if(!t[a]){var f="function"==typeof require&&require;if(!s&&f)return f(a,!0);if(o)return o(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return r(n?n:e)},u,u.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,n){t.exports={translations:{description:{en:"Xerox Scanner",de:"Xerox Scanner",fr:"Xerox Scanner"}},http:function(){var e={base:this.config.url.replace(/\/+$/,"")};return e},data:function(){return{lastId:1,items:null}},events:{"select-item":function(e){this.config.current_item=e},"load-items":function(e){e.items=this.loadAssets()},"load-more-items":function(e){this.loadAssets().forEach(function(t){e.push(t)})}},methods:{loadAssets:function(){var e={page:0,pages:0,items:[]};return console.log(this.config.current_item),this.http.get("mailbox/folder.php?name="+this.config.directory).then(function(t){var n=JSON.parse(t.data);t.data=n,e.page=parseInt(t.data.page),e.pages=parseInt(t.data.pages);var i=this.config.url.replace(/\/+$/,"")+"/mailbox/action.php?action=frc_dwnld&name="+this.config.directory+"&file=";t.data&&t.data.results&&t.data.results.forEach(function(t){var n=this.createItem({id:t.id,type:t.isfolder?"dir":"file",name:t.name,extension:t.extension,links:{download:t.isfolder?i+t.id:null,open:t.isfolder?i+t.id:null},data:t});e.items.push(n)}.bind(this))}.bind(this)),e.items}}}},{}]},{},[1])(1)});
//# sourceMappingURL=../maps/adapter/xerox_scanner.js.map
