ace.define("ace/mode/yaml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"list.markup",regex:/^(?:-{3}|\.{3})\s*(?=#|$)/},{token:"list.markup",regex:/^\s*[\-?](?:$|\s)/},{token:"constant",regex:"!![\\w//]+"},{token:"constant.language",regex:"[&\\*][a-zA-Z0-9-_]+"},{token:["meta.tag","keyword"],regex:/^(\s*\w.*?)(:(?:\s+|$))/},{token:["meta.tag","keyword"],regex:/(\w+?)(\s*:(?:\s+|$))/},{token:"keyword.operator",regex:"<<\\w*:\\w*"},{token:"keyword.operator",regex:"-\\s*(?=[{])"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"[|>][-+\\d\\s]*$",next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:/(\b|[+\-\.])[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)/},{token:"constant.numeric",regex:/[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/},{token:"constant.language.boolean",regex:"\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"}],qqstring:[{token:"string",regex:"(?=(?:(?:\\\\.)|(?:[^:]))*?:)",next:"start"},{token:"string",regex:".+"}]}};r.inherits(o,i),t.YamlHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t),i=n.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length,a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,o-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,o=e("../../range").Range,a=t.FoldMode=function(){};r.inherits(a,i),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,a=e.getLine(n),s=a.search(i);if(s!=-1&&"#"==a[s]){for(var g=a.length,c=e.getLength(),d=n,u=n;++n<c;){a=e.getLine(n);var l=a.search(i);if(l!=-1){if("#"!=a[l])break;u=n}}if(u>d){var h=e.getLine(u).length;return new o(d,g,u,h)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),i=r.search(/\S/),o=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),g=o.search(/\S/);if(i==-1)return e.foldWidgets[n-1]=s!=-1&&s<g?"start":"","";if(s==-1){if(i==g&&"#"==r[i]&&"#"==o[i])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==i&&"#"==r[i]&&"#"==a[i]&&e.getLine(n-2).search(/\S/)==-1)return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return s!=-1&&s<i?e.foldWidgets[n-1]="start":e.foldWidgets[n-1]="",i<g?"start":""}}.call(a.prototype)}),ace.define("ace/mode/yaml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/yaml_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/coffee"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,o=e("./yaml_highlight_rules").YamlHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./folding/coffee").FoldMode,g=function(){this.HighlightRules=o,this.$outdent=new a,this.foldingRules=new s,this.$behaviour=this.$defaultBehaviour};r.inherits(g,i),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);if("start"==e){var i=t.match(/^.*[\{\(\[]\s*$/);i&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/yaml"}.call(g.prototype),t.Mode=g});