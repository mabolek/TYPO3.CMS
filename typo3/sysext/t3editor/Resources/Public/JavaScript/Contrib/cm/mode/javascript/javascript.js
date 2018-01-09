!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";a.defineMode("javascript",function(b,c){function d(a){for(var b,c=!1,d=!1;null!=(b=a.next());){if(!c){if("/"==b&&!d)return;"["==b?d=!0:d&&"]"==b&&(d=!1)}c=!c&&"\\"==b}}function e(a,b,c){return Ea=a,Fa=c,b}function f(a,b){var c=a.next();if('"'==c||"'"==c)return b.tokenize=g(c),b.tokenize(a,b);if("."==c&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return e("number","number");if("."==c&&a.match(".."))return e("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(c))return e(c);if("="==c&&a.eat(">"))return e("=>","operator");if("0"==c&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),e("number","number");if("0"==c&&a.eat(/o/i))return a.eatWhile(/[0-7]/i),e("number","number");if("0"==c&&a.eat(/b/i))return a.eatWhile(/[01]/i),e("number","number");if(/\d/.test(c))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),e("number","number");if("/"==c)return a.eat("*")?(b.tokenize=h,h(a,b)):a.eat("/")?(a.skipToEnd(),e("comment","comment")):Da(a,b,1)?(d(a),a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/),e("regexp","string-2")):(a.eat("="),e("operator","operator",a.current()));if("`"==c)return b.tokenize=i,i(a,b);if("#"==c)return a.skipToEnd(),e("error","error");if(Na.test(c))return">"==c&&b.lexical&&">"==b.lexical.type||(a.eat("=")?"!"!=c&&"="!=c||a.eat("="):/[<>*+\-]/.test(c)&&(a.eat(c),">"==c&&a.eat(c))),e("operator","operator",a.current());if(La.test(c)){a.eatWhile(La);var f=a.current();if("."!=b.lastType){if(Ma.propertyIsEnumerable(f)){var j=Ma[f];return e(j.type,j.style,f)}if("async"==f&&a.match(/^(\s|\/\*.*?\*\/)*[\(\w]/,!1))return e("async","keyword",f)}return e("variable","variable",f)}}function g(a){return function(b,c){var d,g=!1;if(Ia&&"@"==b.peek()&&b.match(Oa))return c.tokenize=f,e("jsonld-keyword","meta");for(;null!=(d=b.next())&&(d!=a||g);)g=!g&&"\\"==d;return g||(c.tokenize=f),e("string","string")}}function h(a,b){for(var c,d=!1;c=a.next();){if("/"==c&&d){b.tokenize=f;break}d="*"==c}return e("comment","comment")}function i(a,b){for(var c,d=!1;null!=(c=a.next());){if(!d&&("`"==c||"$"==c&&a.eat("{"))){b.tokenize=f;break}d=!d&&"\\"==c}return e("quasi","string-2",a.current())}function j(a,b){b.fatArrowAt&&(b.fatArrowAt=null);var c=a.string.indexOf("=>",a.start);if(!(c<0)){if(Ka){var d=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(a.string.slice(a.start,c));d&&(c=d.index)}for(var e=0,f=!1,g=c-1;g>=0;--g){var h=a.string.charAt(g),i=Pa.indexOf(h);if(i>=0&&i<3){if(!e){++g;break}if(0==--e){"("==h&&(f=!0);break}}else if(i>=3&&i<6)++e;else if(La.test(h))f=!0;else{if(/["'\/]/.test(h))return;if(f&&!e){++g;break}}}f&&!e&&(b.fatArrowAt=g)}}function k(a,b,c,d,e,f){this.indented=a,this.column=b,this.type=c,this.prev=e,this.info=f,null!=d&&(this.align=d)}function l(a,b){for(var c=a.localVars;c;c=c.next)if(c.name==b)return!0;for(var d=a.context;d;d=d.prev)for(var c=d.vars;c;c=c.next)if(c.name==b)return!0}function m(a,b,c,d,e){var f=a.cc;for(Ra.state=a,Ra.stream=e,Ra.marked=null,Ra.cc=f,Ra.style=b,a.lexical.hasOwnProperty("align")||(a.lexical.align=!0);;){var g=f.length?f.pop():Ja?x:w;if(g(c,d)){for(;f.length&&f[f.length-1].lex;)f.pop()();return Ra.marked?Ra.marked:"variable"==c&&l(a,d)?"variable-2":b}}}function n(){for(var a=arguments.length-1;a>=0;a--)Ra.cc.push(arguments[a])}function o(){return n.apply(null,arguments),!0}function p(a){function b(b){for(var c=b;c;c=c.next)if(c.name==a)return!0;return!1}var d=Ra.state;if(Ra.marked="def",d.context){if(b(d.localVars))return;d.localVars={name:a,next:d.localVars}}else{if(b(d.globalVars))return;c.globalVars&&(d.globalVars={name:a,next:d.globalVars})}}function q(a){return"public"==a||"private"==a||"protected"==a||"abstract"==a||"readonly"==a}function r(){Ra.state.context={prev:Ra.state.context,vars:Ra.state.localVars},Ra.state.localVars=Sa}function s(){Ra.state.localVars=Ra.state.context.vars,Ra.state.context=Ra.state.context.prev}function t(a,b){var c=function(){var c=Ra.state,d=c.indented;if("stat"==c.lexical.type)d=c.lexical.indented;else for(var e=c.lexical;e&&")"==e.type&&e.align;e=e.prev)d=e.indented;c.lexical=new k(d,Ra.stream.column(),a,null,c.lexical,b)};return c.lex=!0,c}function u(){var a=Ra.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function v(a){function b(c){return c==a?o():";"==a?n():o(b)}return b}function w(a,b){return"var"==a?o(t("vardef",b.length),ca,v(";"),u):"keyword a"==a?o(t("form"),z,w,u):"keyword b"==a?o(t("form"),w,u):"keyword d"==a?Ra.stream.match(/^\s*$/,!1)?o():o(t("stat"),B,v(";"),u):"debugger"==a?o(v(";")):"{"==a?o(t("}"),S,u):";"==a?o():"if"==a?("else"==Ra.state.lexical.info&&Ra.state.cc[Ra.state.cc.length-1]==u&&Ra.state.cc.pop()(),o(t("form"),z,w,u,ha)):"function"==a?o(na):"for"==a?o(t("form"),ia,w,u):"class"==a||Ka&&"interface"==b?(Ra.marked="keyword",o(t("form"),qa,u)):"variable"==a?Ka&&"type"==b?(Ra.marked="keyword",o(W,v("operator"),W,v(";"))):Ka&&"declare"==b?(Ra.marked="keyword",o(w)):Ka&&("module"==b||"enum"==b)&&Ra.stream.match(/^\s*\w/,!1)?(Ra.marked="keyword",o(t("form"),da,v("{"),t("}"),S,u,u)):Ka&&"namespace"==b?(Ra.marked="keyword",o(t("form"),x,S,u)):o(t("stat"),L):"switch"==a?o(t("form"),z,v("{"),t("}","switch"),S,u,u):"case"==a?o(x,v(":")):"default"==a?o(v(":")):"catch"==a?o(t("form"),r,v("("),oa,v(")"),w,u,s):"export"==a?o(t("stat"),ua,u):"import"==a?o(t("stat"),wa,u):"async"==a?o(w):"@"==b?o(x,w):n(t("stat"),x,v(";"),u)}function x(a,b){return A(a,b,!1)}function y(a,b){return A(a,b,!0)}function z(a){return"("!=a?n():o(t(")"),x,v(")"),u)}function A(a,b,c){if(Ra.state.fatArrowAt==Ra.stream.start){var d=c?H:G;if("("==a)return o(r,t(")"),Q(oa,")"),u,v("=>"),d,s);if("variable"==a)return n(r,da,v("=>"),d,s)}var e=c?D:C;return Qa.hasOwnProperty(a)?o(e):"function"==a?o(na,e):"class"==a||Ka&&"interface"==b?(Ra.marked="keyword",o(t("form"),pa,u)):"keyword c"==a||"async"==a?o(c?y:x):"("==a?o(t(")"),B,v(")"),u,e):"operator"==a||"spread"==a?o(c?y:x):"["==a?o(t("]"),Ba,u,e):"{"==a?R(N,"}",null,e):"quasi"==a?n(E,e):"new"==a?o(I(c)):o()}function B(a){return a.match(/[;\}\)\],]/)?n():n(x)}function C(a,b){return","==a?o(x):D(a,b,!1)}function D(a,b,c){var d=0==c?C:D,e=0==c?x:y;return"=>"==a?o(r,c?H:G,s):"operator"==a?/\+\+|--/.test(b)||Ka&&"!"==b?o(d):Ka&&"<"==b&&Ra.stream.match(/^([^>]|<.*?>)*>\s*\(/,!1)?o(t(">"),Q(W,">"),u,d):"?"==b?o(x,v(":"),e):o(e):"quasi"==a?n(E,d):";"!=a?"("==a?R(y,")","call",d):"."==a?o(M,d):"["==a?o(t("]"),B,v("]"),u,d):Ka&&"as"==b?(Ra.marked="keyword",o(W,d)):"regexp"==a?(Ra.state.lastType=Ra.marked="operator",Ra.stream.backUp(Ra.stream.pos-Ra.stream.start-1),o(e)):void 0:void 0}function E(a,b){return"quasi"!=a?n():"${"!=b.slice(b.length-2)?o(E):o(x,F)}function F(a){if("}"==a)return Ra.marked="string-2",Ra.state.tokenize=i,o(E)}function G(a){return j(Ra.stream,Ra.state),n("{"==a?w:x)}function H(a){return j(Ra.stream,Ra.state),n("{"==a?w:y)}function I(a){return function(b){return"."==b?o(a?K:J):"variable"==b&&Ka?o(_,a?D:C):n(a?y:x)}}function J(a,b){if("target"==b)return Ra.marked="keyword",o(C)}function K(a,b){if("target"==b)return Ra.marked="keyword",o(D)}function L(a){return":"==a?o(u,w):n(C,v(";"),u)}function M(a){if("variable"==a)return Ra.marked="property",o()}function N(a,b){if("async"==a)return Ra.marked="property",o(N);if("variable"==a||"keyword"==Ra.style){if(Ra.marked="property","get"==b||"set"==b)return o(O);var c;return Ka&&Ra.state.fatArrowAt==Ra.stream.start&&(c=Ra.stream.match(/^\s*:\s*/,!1))&&(Ra.state.fatArrowAt=Ra.stream.pos+c[0].length),o(P)}return"number"==a||"string"==a?(Ra.marked=Ia?"property":Ra.style+" property",o(P)):"jsonld-keyword"==a?o(P):Ka&&q(b)?(Ra.marked="keyword",o(N)):"["==a?o(x,T,v("]"),P):"spread"==a?o(y,P):"*"==b?(Ra.marked="keyword",o(N)):":"==a?n(P):void 0}function O(a){return"variable"!=a?n(P):(Ra.marked="property",o(na))}function P(a){return":"==a?o(y):"("==a?n(na):void 0}function Q(a,b,c){function d(e,f){if(c?c.indexOf(e)>-1:","==e){var g=Ra.state.lexical;return"call"==g.info&&(g.pos=(g.pos||0)+1),o(function(c,d){return c==b||d==b?n():n(a)},d)}return e==b||f==b?o():o(v(b))}return function(c,e){return c==b||e==b?o():n(a,d)}}function R(a,b,c){for(var d=3;d<arguments.length;d++)Ra.cc.push(arguments[d]);return o(t(b,c),Q(a,b),u)}function S(a){return"}"==a?o():n(w,S)}function T(a,b){if(Ka){if(":"==a)return o(W);if("?"==b)return o(T)}}function U(a){if(Ka&&":"==a)return Ra.stream.match(/^\s*\w+\s+is\b/,!1)?o(x,V,W):o(W)}function V(a,b){if("is"==b)return Ra.marked="keyword",o()}function W(a,b){return"variable"==a||"void"==b?"keyof"==b?(Ra.marked="keyword",o(W)):(Ra.marked="type",o($)):"string"==a||"number"==a||"atom"==a?o($):"["==a?o(t("]"),Q(W,"]",","),u,$):"{"==a?o(t("}"),Q(Y,"}",",;"),u,$):"("==a?o(Q(Z,")"),X):void 0}function X(a){if("=>"==a)return o(W)}function Y(a,b){return"variable"==a||"keyword"==Ra.style?(Ra.marked="property",o(Y)):"?"==b?o(Y):":"==a?o(W):"["==a?o(x,T,v("]"),Y):void 0}function Z(a){return"variable"==a?o(Z):":"==a?o(W):void 0}function $(a,b){return"<"==b?o(t(">"),Q(W,">"),u,$):"|"==b||"."==a?o(W):"["==a?o(v("]"),$):"extends"==b||"implements"==b?(Ra.marked="keyword",o(W)):void 0}function _(a,b){if("<"==b)return o(t(">"),Q(W,">"),u,$)}function aa(){return n(W,ba)}function ba(a,b){if("="==b)return o(W)}function ca(){return n(da,T,fa,ga)}function da(a,b){return Ka&&q(b)?(Ra.marked="keyword",o(da)):"variable"==a?(p(b),o()):"spread"==a?o(da):"["==a?R(da,"]"):"{"==a?R(ea,"}"):void 0}function ea(a,b){return"variable"!=a||Ra.stream.match(/^\s*:/,!1)?("variable"==a&&(Ra.marked="property"),"spread"==a?o(da):"}"==a?n():o(v(":"),da,fa)):(p(b),o(fa))}function fa(a,b){if("="==b)return o(y)}function ga(a){if(","==a)return o(ca)}function ha(a,b){if("keyword b"==a&&"else"==b)return o(t("form","else"),w,u)}function ia(a){if("("==a)return o(t(")"),ja,v(")"),u)}function ja(a){return"var"==a?o(ca,v(";"),la):";"==a?o(la):"variable"==a?o(ka):n(x,v(";"),la)}function ka(a,b){return"in"==b||"of"==b?(Ra.marked="keyword",o(x)):o(C,la)}function la(a,b){return";"==a?o(ma):"in"==b||"of"==b?(Ra.marked="keyword",o(x)):n(x,v(";"),ma)}function ma(a){")"!=a&&o(x)}function na(a,b){return"*"==b?(Ra.marked="keyword",o(na)):"variable"==a?(p(b),o(na)):"("==a?o(r,t(")"),Q(oa,")"),u,U,w,s):Ka&&"<"==b?o(t(">"),Q(aa,">"),u,na):void 0}function oa(a,b){return"@"==b&&o(x,oa),"spread"==a?o(oa):Ka&&q(b)?(Ra.marked="keyword",o(oa)):n(da,T,fa)}function pa(a,b){return"variable"==a?qa(a,b):ra(a,b)}function qa(a,b){if("variable"==a)return p(b),o(ra)}function ra(a,b){return"<"==b?o(t(">"),Q(aa,">"),u,ra):"extends"==b||"implements"==b||Ka&&","==a?o(Ka?W:x,ra):"{"==a?o(t("}"),sa,u):void 0}function sa(a,b){return"async"==a||"variable"==a&&("static"==b||"get"==b||"set"==b||Ka&&q(b))&&Ra.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(Ra.marked="keyword",o(sa)):"variable"==a||"keyword"==Ra.style?(Ra.marked="property",o(Ka?ta:na,sa)):"["==a?o(x,T,v("]"),Ka?ta:na,sa):"*"==b?(Ra.marked="keyword",o(sa)):";"==a?o(sa):"}"==a?o():"@"==b?o(x,sa):void 0}function ta(a,b){return"?"==b?o(ta):":"==a?o(W,fa):"="==b?o(y):n(na)}function ua(a,b){return"*"==b?(Ra.marked="keyword",o(Aa,v(";"))):"default"==b?(Ra.marked="keyword",o(x,v(";"))):"{"==a?o(Q(va,"}"),Aa,v(";")):n(w)}function va(a,b){return"as"==b?(Ra.marked="keyword",o(v("variable"))):"variable"==a?n(y,va):void 0}function wa(a){return"string"==a?o():n(xa,ya,Aa)}function xa(a,b){return"{"==a?R(xa,"}"):("variable"==a&&p(b),"*"==b&&(Ra.marked="keyword"),o(za))}function ya(a){if(","==a)return o(xa,ya)}function za(a,b){if("as"==b)return Ra.marked="keyword",o(xa)}function Aa(a,b){if("from"==b)return Ra.marked="keyword",o(x)}function Ba(a){return"]"==a?o():n(Q(y,"]"))}function Ca(a,b){return"operator"==a.lastType||","==a.lastType||Na.test(b.charAt(0))||/[,.]/.test(b.charAt(0))}function Da(a,b,c){return b.tokenize==f&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(b.lastType)||"quasi"==b.lastType&&/\{\s*$/.test(a.string.slice(0,a.pos-(c||0)))}var Ea,Fa,Ga=b.indentUnit,Ha=c.statementIndent,Ia=c.jsonld,Ja=c.json||Ia,Ka=c.typescript,La=c.wordCharacters||/[\w$\xa1-\uffff]/,Ma=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),c=a("keyword b"),d=a("keyword c"),e=a("keyword d"),f=a("operator"),g={type:"atom",style:"atom"};return{if:a("if"),while:b,with:b,else:c,do:c,try:c,finally:c,return:e,break:e,continue:e,new:a("new"),delete:d,void:d,throw:d,debugger:a("debugger"),var:a("var"),const:a("var"),let:a("var"),function:a("function"),catch:a("catch"),for:a("for"),switch:a("switch"),case:a("case"),default:a("default"),in:f,typeof:f,instanceof:f,true:g,false:g,null:g,undefined:g,NaN:g,Infinity:g,this:a("this"),class:a("class"),super:a("atom"),yield:d,export:a("export"),import:a("import"),extends:d,await:d}}(),Na=/[+\-*&%=<>!?|~^@]/,Oa=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Pa="([{}])",Qa={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,"jsonld-keyword":!0},Ra={state:null,column:null,marked:null,cc:null},Sa={name:"this",next:{name:"arguments"}};return u.lex=!0,{startState:function(a){var b={tokenize:f,lastType:"sof",cc:[],lexical:new k((a||0)-Ga,0,"block",!1),localVars:c.localVars,context:c.localVars&&{vars:c.localVars},indented:a||0};return c.globalVars&&"object"==typeof c.globalVars&&(b.globalVars=c.globalVars),b},token:function(a,b){if(a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation(),j(a,b)),b.tokenize!=h&&a.eatSpace())return null;var c=b.tokenize(a,b);return"comment"==Ea?c:(b.lastType="operator"!=Ea||"++"!=Fa&&"--"!=Fa?Ea:"incdec",m(b,c,Ea,Fa,a))},indent:function(b,d){if(b.tokenize==h)return a.Pass;if(b.tokenize!=f)return 0;var e,g=d&&d.charAt(0),i=b.lexical;if(!/^\s*else\b/.test(d))for(var j=b.cc.length-1;j>=0;--j){var k=b.cc[j];if(k==u)i=i.prev;else if(k!=ha)break}for(;("stat"==i.type||"form"==i.type)&&("}"==g||(e=b.cc[b.cc.length-1])&&(e==C||e==D)&&!/^[,\.=+\-*:?[\(]/.test(d));)i=i.prev;Ha&&")"==i.type&&"stat"==i.prev.type&&(i=i.prev);var l=i.type,m=g==l;return"vardef"==l?i.indented+("operator"==b.lastType||","==b.lastType?i.info+1:0):"form"==l&&"{"==g?i.indented:"form"==l?i.indented+Ga:"stat"==l?i.indented+(Ca(b,d)?Ha||Ga:0):"switch"!=i.info||m||0==c.doubleIndentSwitch?i.align?i.column+(m?0:1):i.indented+(m?0:Ga):i.indented+(/^(?:case|default)\b/.test(d)?Ga:2*Ga)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Ja?null:"/*",blockCommentEnd:Ja?null:"*/",blockCommentContinue:Ja?null:" * ",lineComment:Ja?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Ja?"json":"javascript",jsonldMode:Ia,jsonMode:Ja,expressionAllowed:Da,skipExpression:function(a){var b=a.cc[a.cc.length-1];b!=x&&b!=y||a.cc.pop()}}}),a.registerHelper("wordChars","javascript",/[\w$]/),a.defineMIME("text/javascript","javascript"),a.defineMIME("text/ecmascript","javascript"),a.defineMIME("application/javascript","javascript"),a.defineMIME("application/x-javascript","javascript"),a.defineMIME("application/ecmascript","javascript"),a.defineMIME("application/json",{name:"javascript",json:!0}),a.defineMIME("application/x-json",{name:"javascript",json:!0}),a.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),a.defineMIME("text/typescript",{name:"javascript",typescript:!0}),a.defineMIME("application/typescript",{name:"javascript",typescript:!0})});