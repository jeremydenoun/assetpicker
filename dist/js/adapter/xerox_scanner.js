!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.AssetPickerAdapterXerox_scanner=e()}}(function(){return function e(t,i,n){function r(o,a){if(!i[o]){if(!t[o]){var d="function"==typeof require&&require;if(!a&&d)return d(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var f=i[o]={exports:{}};t[o][0].call(f.exports,function(e){var i=t[o][1][e];return r(i?i:e)},f,f.exports,e,t,i,n)}return i[o].exports}for(var s="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(e,t,i){t.exports={translations:{description:{en:"Xerox Scanner",de:"Xerox Scanner",fr:"Xerox Scanner"}},http:function(){var e={base:this.config.url.replace(/\/+$/,""),download:this.config.url.replace(/\/+$/,"")+"/mailbox/action.php?action=frc_dwnld&name="+this.config.directory+"&file=",validate:function(e){console.log(e),e.isValid()}};return e},data:function(){return{items:null,results:{}}},events:{"load-more-items":function(e){this.loadAssets(e)}},methods:{loadAssets:function(e){var t=this.assembleTerms(),i=JSON.stringify(t),n=this.results[i];if(n){if(e&&n.items!==e&&(Array.prototype.push.apply(e,n.items),e.total=n.items.total,e.loading=n.items.loading,e.query=i,n.items=e),n.page===n.pages)return this.$promise(function(e){e(n)})}else n={page:0,pages:0,items:e||[]},n.items.total=n.items.total||n.items.length,this.results[i]=n;return n.items.loading=!0,n.items.query=i,this.http.get("mailbox/folder.php?name="+this.config.directory,{}).then(function(e){if(console.log(e),n.items.query===i){n.page=parseInt(e.data.response.page),n.pages=parseInt(e.data.response.pages),n.items.total=parseInt(e.data.response.totalhits),n.items.loading=!1;var t=this.config.url.replace(/\/+$/,"")+"/mailbox/action.php?action=frc_dwnld&name="+this.config.directory+"&file=";e.data.results.forEach(function(e){var r=this.createItem({id:e.id,query:i,type:e.isfolder?"file":"dir",name:e.assettitle||e.name||e.primaryfile,title:e.assettitle,extension:e.fileformat.id,created:this.parseDate(e.assetcreationdate||e.assetaddeddate),modified:this.parseDate(e.assetmodificationdate),links:{download:t+e.id},data:e});n.items.push(r)}.bind(this))}return n}.bind(this))}}}},{}]},{},[1])(1)});
//# sourceMappingURL=../maps/adapter/xerox_scanner.js.map
