!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.AssetPickerAdapterXerox_scanner=e()}}(function(){return function e(t,n,r){function i(f,s){if(!n[f]){if(!t[f]){var a="function"==typeof require&&require;if(!s&&a)return a(f,!0);if(o)return o(f,!0);var u=new Error("Cannot find module '"+f+"'");throw u.code="MODULE_NOT_FOUND",u}var p=n[f]={exports:{}};t[f][0].call(p.exports,function(e){var n=t[f][1][e];return i(n?n:e)},p,p.exports,e,t,n,r)}return n[f].exports}for(var o="function"==typeof require&&require,f=0;f<r.length;f++)i(r[f]);return i}({1:[function(e,t,n){t.exports={translations:{description:{en:"Xerox Scanner",de:"Xerox Scanner",fr:"Xerox Scanner"}},http:{base:"http://printer-01",list:"/mailbox/folder.php?name=_PUBLIC",download:"/mailbox/action.php?action=frc_dwnld&name=_PUBLIC&file="},events:{"load-items":function(e){e.items=this.createItems()},"load-more-items":function(e){this.createItems().forEach(function(t){e.push(t)})}},methods:{item:function(e,t){return this.createItem({id:""+this.lastId++,type:e?"file":"dir",extension:e,name:"Random "+(e||" directory")+(t?" with thumb":"")+" "+this.lastId,thumbnail:t})},createItems:function(){var e=[],t=["txt","pdf","xls","doc","pot","jpeg","zip","mp3","avi","html","any"];e.push(this.item());for(var n=0,r=t.length;n<r;n++)e.push(this.item(t[n]));return e.push(this.item("jpeg","http://lorempixel.com/nature/160/200")),e.push(this.item("jpeg","http://lorempixel.com/nature/200/160")),e.total=10*e.length,e}}}},{}]},{},[1])(1)});
//# sourceMappingURL=../maps/adapter/xerox_scanner.js.map
