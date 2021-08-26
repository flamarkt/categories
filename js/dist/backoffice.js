module.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=26)}([function(t,e,o){"use strict";function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e)}o.d(e,"a",(function(){return r}))},function(t,e){t.exports=flarum.core.compat["common/Model"]},function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e){t.exports=flarum.core.compat["common/components/LinkButton"]},function(t,e,o){"use strict";o.d(e,"a",(function(){return i}));var n=o(0),r=o(1),a=o.n(r),i=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).slug=a.a.attribute("slug"),e.title=a.a.attribute("title"),e.description=a.a.attribute("description"),e.productCount=a.a.attribute("productCount"),e.isHidden=a.a.attribute("isHidden"),e.parent=a.a.hasOne("parent"),e}return Object(n.a)(e,t),e.prototype.apiEndpoint=function(){return"/flamarkt/categories"+(this.exists?"/"+this.data.id:"")},e}(a.a)},function(t,e){t.exports=flarum.core.compat["common/components/Page"]},function(t,e){t.exports=flarum.core.compat["common/components/Link"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].common["pages/AbstractShowPage"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["pages/ProductShowPage"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/ProductList"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/BackofficeNav"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].common["components/ActiveLinkButton"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].common["states/AbstractListState"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/AbstractList"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/SubmitButton"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/SoftDeleteButton"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/PermanentDeleteButton"]},function(t,e){t.exports=flarum.core.compat["common/components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["common/utils/ItemList"]},function(t,e){t.exports=flarum.extensions["flamarkt-core"].backoffice["components/AbstractRelationshipSelect"]},function(t,e){t.exports=flarum.core.compat["common/helpers/highlight"]},,,,,,function(t,e,o){"use strict";o.r(e);var n=o(2),r=o(10),a=o.n(r),i=o(11),c=o.n(i),s=o(1),u=o.n(s),p=o(4),l=o(0),f=o(5),d=o.n(f),h=o(3),g=o.n(h),y=o(12),b=function(t){function e(){return t.apply(this,arguments)||this}return Object(l.a)(e,t),e.prototype.type=function(){return"flamarkt/categories"},e}(o.n(y).a),x=o(13),v=o.n(x),k=o(6),w=o.n(k),O=function(t){function e(){return t.apply(this,arguments)||this}Object(l.a)(e,t);var o=e.prototype;return o.head=function(){var e=t.prototype.head.call(this);return e.add("parent",m("th","Parent")),e.add("title",m("th","Title")),e.add("productCount",m("th","Products")),e},o.columns=function(e){var o=t.prototype.columns.call(this,e),n=e.parent();return o.add("parent",m("td",n?m(w.a,{href:app.route("categories.show",{id:n.id()})},n.title()):m("em","Root"))),o.add("title",m("td",e.title())),o.add("productCount",m("td",e.productCount())),o},o.actions=function(e){var o=t.prototype.actions.call(this,e);return o.add("edit",g.a.component({className:"Button Button--icon",icon:"fas fa-pen",href:app.route("categories.show",{id:e.id()})})),o},e}(v.a),j=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).state=void 0,e}Object(l.a)(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.state=new b,this.state.refresh()},o.view=function(){return m(".ProductIndexPage",m(".container",[m(".Form-group",[g.a.component({className:"Button",href:app.route("categories.show",{id:"new"})},"New category")]),m(O,{state:this.state})]))},e}(d.a),P=o(7),C=o.n(P),S=o(14),A=o.n(S),F=o(15),L=o.n(F),_=o(16),B=o.n(_),M=o(17),T=o.n(M),R=o(18),D=o.n(R),N=o(19),I=o.n(N),H=o(20),q=o.n(H),z=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,e}Object(l.a)(e,t);var o=e.prototype;return o.search=function(t){var e=this;return t?(t=t.toLowerCase(),app.store.find("flamarkt/categories",{filter:{q:t},page:{limit:5}}).then((function(o){e.resultsCache.set(t,o),m.redraw()}))):(m.redraw(),Promise.resolve())},o.results=function(t){if(!t)return[];t=t.toLowerCase();var e=this.resultsCache.get(t);return void 0===e?null:e||[]},o.item=function(t,e){return[e?q()(t.title(),e):t.title()]},e}(I.a),E=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).category=null,e.saving=!1,e.dirty=!1,e.parent=null,e.slug="",e.title="",e.description="",e}Object(l.a)(e,t);var o=e.prototype;return o.newRecord=function(){return app.store.createRecord("flamarkt-categories")},o.findType=function(){return"flamarkt/categories"},o.show=function(t){this.category=t,this.parent=t.parent()||null,this.slug=t.slug()||"",this.title=t.title()||"",this.description=t.description()||"",app.setTitle(t.title()),app.setTitleCount(0)},o.view=function(){return this.category?m("form.CategoryShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container.container--narrow",this.fields().toArray())):T.a.component()},o.fields=function(){var t=this,e=new D.a;return e.add("parent",m(".Form-group",[m("label","Parent"),m(z,{relationship:this.parent,onchange:function(e){t.parent=e,t.dirty=!0},hasOne:!0})]),20),e.add("slug",m(".Form-group",[m("label","Slug"),m("input.FormControl",{type:"text",value:this.slug,oninput:function(e){t.slug=e.target.value,t.dirty=!0}})]),20),e.add("title",m(".Form-group",[m("label","Title"),m("input.FormControl",{type:"text",value:this.title,oninput:function(e){t.title=e.target.value,t.dirty=!0}})]),20),e.add("description",m(".Form-group",[m("label","Description"),m("textarea.FormControl",{value:this.description,oninput:function(e){t.description=e.target.value,t.dirty=!0}})]),10),e.add("submit",m(".Form-group",[A.a.component({loading:this.saving,dirty:this.dirty,exists:this.category.exists})," ",L.a.component({model:this.category})," ",B.a.component({model:this.category,afterdelete:function(){m.route.set(app.route("categories.index"))}})])),e},o.data=function(){return{slug:this.slug,title:this.title,description:this.description,relationships:{parent:this.parent}}},o.onsubmit=function(t){var e=this;t.preventDefault(),this.saving=!0,this.category.save(this.data()).then((function(t){e.category=t,e.saving=!1,e.dirty=!1,m.redraw(),m.route.set(app.route.category(t))})).catch((function(t){e.saving=!1,m.redraw()}))},e}(C.a),G=o(9),J=o.n(G),K=o(8),Q=o.n(K);app.initializers.add("flamarkt-categories",(function(){app.store.models["flamarkt-categories"]=p.a,app.store.models["flamarkt-products"].prototype.categories=u.a.hasMany("categories"),app.routes["categories.index"]={path:"/categories",component:j},app.routes["categories.show"]={path:"/categories/:id",component:E},app.route.category=function(t){return app.route("categories.show",{id:t.id()})},Object(n.extend)(a.a.prototype,"items",(function(t){t.add("categories",c.a.component({href:app.route("categories.index"),icon:"fas fa-th-list",activeRoutes:["categories.*"]},app.translator.trans("flamarkt-categories.backoffice.nav.categories")))})),Object(n.extend)(J.a.prototype,"head",(function(t){t.add("categories",m("th",app.translator.trans("flamarkt-categories.backoffice.products.head.category")),20)})),Object(n.extend)(J.a.prototype,"columns",(function(t,e){t.add("categories",m("td",(e.categories()||[]).map((function(t){return t.title()})).join(", ")),20)})),Object(n.extend)(Q.a.prototype,"oninit",(function(){this.categories=[]})),Object(n.extend)(Q.a.prototype,"show",(function(t,e){this.categories=e.categories()||[]})),Object(n.extend)(Q.a.prototype,"fields",(function(t){var e=this;t.add("categories",m(".Form-group",[m("label","Categories"),m(z,{relationship:this.categories,onchange:function(t){e.categories=t,e.dirty=!0}})]),100)})),Object(n.extend)(Q.a.prototype,"data",(function(t){t.relationships=t.relationships||{},t.relationships.categories=this.categories}))}))}]);
//# sourceMappingURL=backoffice.js.map