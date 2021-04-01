/* Source and licensing information for the line(s) below can be found at https://access.redhat.com/misc/jquery-extend-3.4.0.js. */

(function(jQuery){var versionParts=jQuery.fn.jquery.split('.');var majorVersion=parseInt(versionParts[0]);var minorVersion=parseInt(versionParts[1]);var patchVersion=parseInt(versionParts[2]);var isPreReleaseVersion=(patchVersion.toString()!==versionParts[2]);if((majorVersion>3)||(majorVersion===3&&minorVersion>4)||(majorVersion===3&&minorVersion===4&&patchVersion>0)||(majorVersion===3&&minorVersion===4&&patchVersion===0&&!isPreReleaseVersion)){return;}
jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[i]||{};i++;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(i===length){target=this;i--;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){copy=options[name];if(name==="__proto__"||target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){src=target[name];if(copyIsArray&&!jQuery.isArray(src)){clone=[];}else if(!copyIsArray&&!jQuery.isPlainObject(src)){clone={};}else{clone=src;}
copyIsArray=false;target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};})(jQuery);;;
/* Source and licensing information for the above line(s) can be found at https://access.redhat.com/misc/jquery-extend-3.4.0.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at https://access.redhat.com/misc/jquery-html-prefilter-3.5.0-backport.js. */

(function(jQuery){var versionParts=jQuery.fn.jquery.split('.');var majorVersion=parseInt(versionParts[0]);var minorVersion=parseInt(versionParts[1]);if((majorVersion>3)||(majorVersion===3&&minorVersion>=5)){return;}
var selfClosingTagsToReplace=['a','abbr','address','article','aside','audio','b','bdi','bdo','blockquote','button','canvas','caption','cite','code','data','datalist','dd','del','details','dfn','div','dl','dt','em','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','header','hgroup','i','ins','kbd','label','legend','li','main','map','mark','menu','meter','nav','ol','optgroup','option','output','p','picture','pre','progress','q','rp','rt','ruby','s','samp','section','select','small','source','span','strong','sub','summary','sup','table','tbody','td','tfoot','th','thead','time','tr','u','ul','var','video'];var xhtmlRegExpGroup='('+selfClosingTagsToReplace.join('|')+')';var whitespace='[\\x20\\t\\r\\n\\f]';var rxhtmlTagWithoutSpaceOrAttributes=new RegExp('<'+xhtmlRegExpGroup+'\\/>','gi');var rxhtmlTagWithSpaceAndMaybeAttributes=new RegExp('<'+xhtmlRegExpGroup+'('+whitespace+'[^>]*)\\/>','gi');var rtagName;if(majorVersion<3){rtagName=/<([\w:]+)/;}
else if(minorVersion<4){rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i;}
else{rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;}
var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;jQuery.extend({htmlPrefilter:function(html){var tag=(rtagName.exec(html)||["",""])[1].toLowerCase();if((tag==='option'||tag==='optgroup')&&html.match(/<\/?select/i)){html='';}
html=html.replace(rxhtmlTagWithoutSpaceOrAttributes,"<$1></$1>");html=html.replace(rxhtmlTagWithSpaceAndMaybeAttributes,"<$1$2></$1>");if((majorVersion===1&&minorVersion<12)||(majorVersion===2&&minorVersion<2)){var htmlRisky=html.replace(rxhtmlTag,"<$1></$2>");if(htmlRisky!==html){var wrapMap={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],};wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;var getWrappedHtml=function(html){var wrap=wrapMap[tag];if(wrap){html=wrap[1]+html+wrap[2];}
return html;};var getParsedHtml=function(html){var doc=window.document.implementation.createHTMLDocument("");doc.body.innerHTML=html;return doc.body?doc.body.innerHTML:'';};var htmlParsed=getParsedHtml(getWrappedHtml(html));var htmlRiskyParsed=getParsedHtml(getWrappedHtml(htmlRisky));if(htmlRiskyParsed===''||htmlParsed===''||(htmlRiskyParsed!==htmlParsed)){html='';}}}
return html;}});if((majorVersion===1&&minorVersion<12)||(majorVersion===2&&minorVersion<2)){var fnOriginalHtml=jQuery.fn.html;jQuery.fn.extend({html:function(value){if(typeof value==="string"){value=jQuery.htmlPrefilter(value);}
return fnOriginalHtml.apply(this,arguments.length?[value]:[]);}});var rhtml=/<|&#?\w+;/;if(majorVersion===1&&minorVersion<9){var originalClean=jQuery.clean;jQuery.extend({'clean':function(elems,context,fragment,scripts){for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="string"&&rhtml.test(elem)){elems[i]=elem=jQuery.htmlPrefilter(elem);}}
return originalClean.call(this,elems,context,fragment,scripts);}});}
else{var originalBuildFragment=jQuery.buildFragment;jQuery.extend({'buildFragment':function(elems,context,scripts,selection){var l=elems.length;for(var i=0;i<l;i++){var elem=elems[i];if(elem||elem===0){if(jQuery.type(elem)!=="object"&&rhtml.test(elem)){elems[i]=elem=jQuery.htmlPrefilter(elem);}}}
return originalBuildFragment.call(this,elems,context,scripts,selection);}});}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://access.redhat.com/misc/jquery-html-prefilter-3.5.0-backport.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at https://access.redhat.com/misc/jquery.once.js. */

(function($){var cache={},uuid=0;$.fn.once=function(id,fn){if(typeof id!='string'){if(!(id in cache)){cache[id]=++uuid;}
if(!fn){fn=id;}
id='jquery-once-'+cache[id];}
var name=id+'-processed';var elements=this.not('.'+name).addClass(name);return $.isFunction(fn)?elements.each(fn):elements;};$.fn.removeOnce=function(id,fn){var name=id+'-processed';var elements=this.filter('.'+name).removeClass(name);return $.isFunction(fn)?elements.each(fn):elements;};})(jQuery);;;
/* Source and licensing information for the above line(s) can be found at https://access.redhat.com/misc/jquery.once.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at https://access.redhat.com/misc/drupal.js. */

var Drupal=Drupal||{'settings':{},'behaviors':{},'locale':{}};jQuery.noConflict();(function($){var jquery_init=$.fn.init;$.fn.init=function(selector,context,rootjQuery){if(selector&&typeof selector==='string'){var hash_position=selector.indexOf('#');if(hash_position>=0){var bracket_position=selector.indexOf('<');if(bracket_position>hash_position){throw'Syntax error, unrecognized expression: '+selector;}}}
return jquery_init.call(this,selector,context,rootjQuery);};$.fn.init.prototype=jquery_init.prototype;if($.ajaxPrefilter){$.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});}
else if($.httpData){var jquery_httpData=$.httpData;$.httpData=function(xhr,type,s){if(!type&&!Drupal.urlIsLocal(s.url)){var content_type=xhr.getResponseHeader('content-type')||'';if(content_type.indexOf('javascript')>=0){type='text';}}
return jquery_httpData.call(this,xhr,type,s);};$.httpData.prototype=jquery_httpData.prototype;}
Drupal.attachBehaviors=function(context,settings){context=context||document;settings=settings||Drupal.settings;$.each(Drupal.behaviors,function(){if($.isFunction(this.attach)){this.attach(context,settings);}});};Drupal.detachBehaviors=function(context,settings,trigger){context=context||document;settings=settings||Drupal.settings;trigger=trigger||'unload';$.each(Drupal.behaviors,function(){if($.isFunction(this.detach)){this.detach(context,settings,trigger);}});};Drupal.checkPlain=function(str){var character,regex,replace={'&':'&amp;',"'":'&#39;','"':'&quot;','<':'&lt;','>':'&gt;'};str=String(str);for(character in replace){if(replace.hasOwnProperty(character)){regex=new RegExp(character,'g');str=str.replace(regex,replace[character]);}}
return str;};Drupal.formatString=function(str,args){for(var key in args){if(args.hasOwnProperty(key)){switch(key.charAt(0)){case'@':args[key]=Drupal.checkPlain(args[key]);break;case'!':break;default:args[key]=Drupal.theme('placeholder',args[key]);break;}}}
return Drupal.stringReplace(str,args,null);};Drupal.stringReplace=function(str,args,keys){if(str.length===0){return str;}
if(!$.isArray(keys)){keys=[];for(var k in args){if(args.hasOwnProperty(k)){keys.push(k);}}
keys.sort(function(a,b){return a.length-b.length;});}
if(keys.length===0){return str;}
var key=keys.pop();var fragments=str.split(key);if(keys.length){for(var i=0;i<fragments.length;i++){fragments[i]=Drupal.stringReplace(fragments[i],args,keys.slice(0));}}
return fragments.join(args[key]);};Drupal.t=function(str,args,options){options=options||{};options.context=options.context||'';if(Drupal.locale.strings&&Drupal.locale.strings[options.context]&&Drupal.locale.strings[options.context][str]){str=Drupal.locale.strings[options.context][str];}
if(args){str=Drupal.formatString(str,args);}
return str;};Drupal.formatPlural=function(count,singular,plural,args,options){args=args||{};args['@count']=count;var index=Drupal.locale.pluralFormula?Drupal.locale.pluralFormula(args['@count']):((args['@count']==1)?0:1);if(index==0){return Drupal.t(singular,args,options);}
else if(index==1){return Drupal.t(plural,args,options);}
else{args['@count['+index+']']=args['@count'];delete args['@count'];return Drupal.t(plural.replace('@count','@count['+index+']'),args,options);}};Drupal.absoluteUrl=function(url){var urlParsingNode=document.createElement('a');try{url=decodeURIComponent(url);}catch(e){}
urlParsingNode.setAttribute('href',url);return urlParsingNode.cloneNode(false).href;};Drupal.urlIsLocal=function(url){var absoluteUrl=Drupal.absoluteUrl(url);var protocol=location.protocol;if(protocol==='http:'&&absoluteUrl.indexOf('https:')===0){protocol='https:';}
var baseUrl=protocol+'//'+location.host+Drupal.settings.basePath.slice(0,-1);try{absoluteUrl=decodeURIComponent(absoluteUrl);}catch(e){}
try{baseUrl=decodeURIComponent(baseUrl);}catch(e){}
return absoluteUrl===baseUrl||absoluteUrl.indexOf(baseUrl+'/')===0;};Drupal.theme=function(func){var args=Array.prototype.slice.apply(arguments,[1]);return(Drupal.theme[func]||Drupal.theme.prototype[func]).apply(this,args);};Drupal.freezeHeight=function(){Drupal.unfreezeHeight();$('<div id="freeze-height"></div>').css({position:'absolute',top:'0px',left:'0px',width:'1px',height:$('body').css('height')}).appendTo('body');};Drupal.unfreezeHeight=function(){$('#freeze-height').remove();};Drupal.encodePath=function(item,uri){uri=uri||location.href;return encodeURIComponent(item).replace(/%2F/g,'/');};Drupal.getSelection=function(element){if(typeof element.selectionStart!='number'&&document.selection){var range1=document.selection.createRange();var range2=range1.duplicate();range2.moveToElementText(element);range2.setEndPoint('EndToEnd',range1);var start=range2.text.length-range1.text.length;var end=start+range1.text.length;return{'start':start,'end':end};}
return{'start':element.selectionStart,'end':element.selectionEnd};};Drupal.beforeUnloadCalled=false;$(window).bind('beforeunload pagehide',function(){Drupal.beforeUnloadCalled=true;});Drupal.displayAjaxError=function(message){if(!Drupal.beforeUnloadCalled){alert(message);}};Drupal.ajaxError=function(xmlhttp,uri,customMessage){var statusCode,statusText,pathText,responseText,readyStateText,message;if(xmlhttp.status){statusCode="\n"+Drupal.t("An AJAX HTTP error occurred.")+"\n"+Drupal.t("HTTP Result Code: !status",{'!status':xmlhttp.status});}
else{statusCode="\n"+Drupal.t("An AJAX HTTP request terminated abnormally.");}
statusCode+="\n"+Drupal.t("Debugging information follows.");pathText="\n"+Drupal.t("Path: !uri",{'!uri':uri});statusText='';try{statusText="\n"+Drupal.t("StatusText: !statusText",{'!statusText':$.trim(xmlhttp.statusText)});}
catch(e){}
responseText='';try{responseText="\n"+Drupal.t("ResponseText: !responseText",{'!responseText':$.trim(xmlhttp.responseText)});}catch(e){}
responseText=responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");responseText=responseText.replace(/[\n]+\s+/g,"\n");readyStateText=xmlhttp.status==0?("\n"+Drupal.t("ReadyState: !readyState",{'!readyState':xmlhttp.readyState})):"";customMessage=customMessage?("\n"+Drupal.t("CustomMessage: !customMessage",{'!customMessage':customMessage})):"";message=statusCode+pathText+statusText+customMessage+responseText+readyStateText;return message;};$('html').addClass('js');document.cookie='has_js=1; path=/';$(function(){if(jQuery.support.positionFixed===undefined){var el=$('<div style="position:fixed; top:10px" />').appendTo(document.body);jQuery.support.positionFixed=el[0].offsetTop===10;el.remove();}});$(function(){Drupal.attachBehaviors(document,Drupal.settings);});Drupal.theme.prototype={placeholder:function(str){return'<em class="placeholder">'+Drupal.checkPlain(str)+'</em>';}};})(jQuery);;;
/* Source and licensing information for the above line(s) can be found at https://access.redhat.com/misc/drupal.js. */
;/*})'"*/
