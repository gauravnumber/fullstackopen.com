(this.webpackJsonpfull=this.webpackJsonpfull||[]).push([[0],{39:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(2),o=e.n(c),r=e(15),i=e.n(r),u=e(6),a=e(4),s=e(0),j=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(s.jsxs)("li",{className:"note",children:[n.content,"  ",Object(s.jsx)("button",{onClick:e,children:c})]})},f=e(3),l=e.n(f),b="/api/notes",d=function(){return l.a.get(b).then((function(t){return t.data}))},h=function(t){return l.a.post(b,t).then((function(t){return t.data}))},p=function(t,n){return l.a.put("".concat(b,"/").concat(t),n).then((function(t){return t.data}))},O=(e(39),function(){var t=Object(c.useState)([]),n=Object(a.a)(t,2),e=n[0],o=n[1],r=Object(c.useState)(""),i=Object(a.a)(r,2),f=i[0],l=i[1],b=Object(c.useState)(!0),O=Object(a.a)(b,2),m=O[0],g=O[1],x=m?e:e.filter((function(t){return!0===t.important}));return Object(c.useEffect)((function(){d().then((function(t){return o(t)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Notes"}),Object(s.jsx)("div",{children:Object(s.jsxs)("button",{onClick:function(){return g(!m)},children:["show ",m?"important":"all"]})}),Object(s.jsx)("ul",{children:x.map((function(t){return Object(s.jsx)(j,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(u.a)(Object(u.a)({},n),{},{important:!n.important});p(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})),console.log("importance of "+t+" needs to be toggled")}(t.id)}},t.id)}))}),Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:f,date:(new Date).toISOString(),important:Math.random()<.5,id:e.length+1};h(n).then((function(t){o(e.concat(n)),l("")}))},children:[Object(s.jsx)("input",{value:f,onChange:function(t){return l(t.target.value)}}),Object(s.jsx)("button",{type:"submit",children:"save"})]})]})});i.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.86911b75.chunk.js.map