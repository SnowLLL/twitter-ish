(this["webpackJsonptweetme-web"]=this["webpackJsonptweetme-web"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(5),r=n.n(s),i=(n(15),n(6)),l=n(3),o=n(2);var u=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken"),d=function(e,t,n,c){var a;c&&(a=JSON.stringify(c));var s=new XMLHttpRequest,r="http://localhost:8000/api/".concat(t);s.responseType="json",s.open(e,r),s.setRequestHeader("Content-Type","application/json"),u&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",u)),s.onload=function(){if(403===s.status&&s.response){var e=s.response.detail;"Authentication credentials were not provided."===e&&(window.location.href="/login?showLoginRequired=true",console.log(e))}n(s.response,s.status)},s.onerror=function(e){console.log("error: ",e),alert("An error occured. Please try again later")},s.send(a)};function j(e,t,n){var c="tweets/";e&&(c="tweets/?username=".concat(e)),null!==n&&void 0!==n&&(c=n.replace("http://localhost:8000/api/","")),d("GET",c,t)}function b(e,t){var n="tweets/feed";null!==t&&void 0!==t&&(n=t.replace("http://localhost:8000/api/","")),d("GET",n,e)}var m=n(10),f=n(0);function O(e){var t=e.tweet,n=e.action,c=e.didPerformAction,a=t.likes?t.likes:0,s=e.className?e.className:"btn btn-primary btn-sm",r=n.display?n.display:"ACTION",i=function(e,t){c&&c(e,t)},l="like"===n.type?"".concat(a," ").concat(r):"".concat(r);return Object(f.jsx)("button",{className:s,onClick:function(e){e.preventDefault(),function(e,t,n){d("POST","tweets/action",n,{id:e,action:t})}(t.id,n.type,i)},children:l})}var w=function(e){var t=e.username;return Object(f.jsx)("span",{className:"pointer p-3",onClick:function(e){window.location.href="/profile/".concat(t)},children:e.children})},h=function(e){var t=e.user,n=e.includeFullName,c=e.hiddeLink,s=!0===n?"".concat(t.first_name," ").concat(t.last_name," "):null;return Object(f.jsx)(a.a.Fragment,{children:Object(f.jsxs)("div",{className:"pt-3",children:[Object(f.jsx)("span",{className:"fw-bolder",children:s}),!0===c?"@".concat(t.username):Object(f.jsxs)(w,{username:t.username,children:["@",t.username]})]})})},x=function(e){var t=e.user,n=e.hiddeLink,c=Object(f.jsx)("div",{children:Object(f.jsx)("span",{className:"px-3 py-2 rounded-circle bg-dark text-white",children:t.username[0]})});return!0===n?c:Object(f.jsx)(w,{username:t.username,children:c})};var p=n(9),v=n.n(p),g=function(e){return Object(f.jsx)("span",{className:e.className,children:v()(e.children).format("0 a")})},N=function(e){var t=e.user,n=e.didFollowToggle,c=e.profileLoading,a=t&&t.is_following?"unfollow":"follow";a=c?"Loading":a;return t?Object(f.jsx)("div",{className:"card shadow-sm",children:Object(f.jsxs)("div",{className:"card-body",children:[Object(f.jsxs)("div",{className:"row",style:{height:"3rem"},children:[Object(f.jsx)("div",{className:"col-1 align-middle my-auto",children:Object(f.jsx)(x,{user:t,hiddeLink:!0})}),Object(f.jsxs)("p",{className:"col-9 align-middle mx-auto",children:[" ",Object(f.jsx)(h,{user:t,includeFullName:!0,hiddeLink:!0})]})]}),Object(f.jsxs)("div",{className:"card-text mt-4",children:[Object(f.jsxs)("p",{children:[" ",Object(f.jsx)(g,{className:"fw-bold",children:t.follower_count})," ",Object(f.jsx)("span",{className:"text-muted",children:1===t.follower_count?"Follower":"Followers"})]}),Object(f.jsxs)("p",{children:[" ",Object(f.jsx)(g,{className:"fw-bold",children:t.following_count})," ",Object(f.jsx)("span",{className:"text-muted",children:"Following"})]}),Object(f.jsx)("p",{children:t.location}),Object(f.jsx)("p",{children:t.bio})]}),Object(f.jsx)("button",{className:"btn btn-primary container",onClick:function(e){e.preventDefault(),n&&!c&&n(a)},children:a})]})}):null},y=function(e){var t=e.username,n=Object(c.useState)(!1),a=Object(o.a)(n,2),s=a[0],r=a[1],i=Object(c.useState)(null),l=Object(o.a)(i,2),u=l[0],j=l[1],b=Object(c.useState)(!1),m=Object(o.a)(b,2),O=m[0],w=m[1],h=function(e,t){200===t&&j(e)};Object(c.useEffect)((function(){!1===s&&(!function(e,t){d("GET","profiles/".concat(e),t)}(t,h),r(!0))}),[t,s,r]);return!1===s?"Loading...":u?Object(f.jsx)(N,{user:u,didFollowToggle:function(e){!function(e,t,n){var c={action:"".concat(t&&t).toLowerCase()};d("POST","profiles/".concat(e,"/follow"),n,c)}(t,e,(function(e,t){console.log(e,t),200===t&&j(e),w(!1)})),w(!0)},profileLoading:O}):null};function k(e){var t=e.tweet;return t.parent?Object(f.jsx)(S,{isRetweet:!0,hiddenActions:!0,retweeter:e.retweeter,tweet:t.parent}):null}function S(e){var t=e.tweet,n=e.didRetweet,s=e.hiddenActions,r=e.isRetweet,i=e.retweeter,l=Object(c.useState)(e.tweet?e.tweet:null),u=Object(o.a)(l,2),d=u[0],j=u[1],b=e.className?e.className:"col-10 mx-auto";b=!0===r?"".concat(b," border rounded"):b;var w=window.location.pathname.match(Object(m.a)(/([0-9]+)/,{tweetid:1})),p=w?w.groups.tweetid:-1,v="".concat(t.id)==="".concat(p),g=function(e,t){200===t?j(e):201===t&&n&&n(e)};return Object(f.jsxs)("div",{className:b,children:[!0===r&&Object(f.jsxs)("div",{className:"mb-3",children:[" ",Object(f.jsxs)("span",{className:"small text-muted p-2",children:["Retweet via ",Object(f.jsx)(h,{user:i})]})]}),Object(f.jsxs)("div",{className:"container",children:[Object(f.jsxs)("div",{className:"row text-center",style:{height:"3rem"},children:[Object(f.jsx)("div",{className:"col-2 align-middle my-auto",children:Object(f.jsx)("span",{className:"d-grid",children:Object(f.jsx)(x,{user:t.user})})}),Object(f.jsx)("div",{className:"col-2 align-middle",children:Object(f.jsx)(h,{includeFullName:!0,user:t.user})})]}),Object(f.jsxs)("div",{className:"card-body mt-3",children:[Object(f.jsx)("p",{className:"card-text",children:t.content}),Object(f.jsx)("div",{className:"mx-auto",children:Object(f.jsx)(k,{tweet:t,retweeter:t.user})}),Object(f.jsxs)("div",{className:"btn btn-group px-0",children:[d&&!0!==s&&Object(f.jsxs)(a.a.Fragment,{children:[Object(f.jsx)(O,{tweet:d,didPerformAction:g,action:{type:"like",display:"Likes"}}),Object(f.jsx)(O,{tweet:d,didPerformAction:g,action:{type:"unlike",display:"UnLikes"}}),Object(f.jsx)(O,{tweet:d,didPerformAction:g,action:{type:"retweet",display:"Retweet"}})]}),!0===v?null:Object(f.jsx)("button",{id:"viewLink",className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),window.location.href="".concat(t.id)},children:" View "})]})]})]})]})}var T=function(e){var t=Object(c.useState)([]),n=Object(o.a)(t,2),s=n[0],r=n[1],i=Object(c.useState)([]),u=Object(o.a)(i,2),d=u[0],b=u[1],m=Object(c.useState)(null),O=Object(o.a)(m,2),w=O[0],h=O[1],x=Object(c.useState)(!1),p=Object(o.a)(x,2),v=p[0],g=p[1];Object(c.useEffect)((function(){var t=Object(l.a)(e.newtweets).concat(s);d.length!==t.length&&b(t)}),[e.newtweets,d,s]),Object(c.useEffect)((function(){if(!1===v){j(e.username,(function(e,t){200===t&&(h(e.next),r(e.results),g(!0))}))}}),[s,v,g,e.username]);var N=function(e){var t=Object(l.a)(s);t.unshift(e),r(t);var n=Object(l.a)(d);n.unshift(d),b(n)};return Object(f.jsxs)(a.a.Fragment,{children:[d.map((function(e,t){return Object(f.jsx)(S,{tweet:e,didRetweet:N,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{ item.id }"))})),null!=w&&Object(f.jsx)("button",{className:"btn btn-outline-primary",onClick:function(t){if(t.preventDefault(),null!==w){j(e.username,(function(e,t){if(200===t){h(e.next);var n=Object(l.a)(d).concat(e.results);r(n),b(n)}}),w)}},children:"Next Page"})]})},F=function(e){var t=Object(c.useState)([]),n=Object(o.a)(t,2),s=n[0],r=n[1],i=Object(c.useState)([]),u=Object(o.a)(i,2),d=u[0],j=u[1],m=Object(c.useState)(null),O=Object(o.a)(m,2),w=O[0],h=O[1],x=Object(c.useState)(!1),p=Object(o.a)(x,2),v=p[0],g=p[1];Object(c.useEffect)((function(){var t=Object(l.a)(e.newtweets).concat(s);d.length!==t.length&&j(t)}),[e.newtweets,d,s]),Object(c.useEffect)((function(){if(!1===v){b((function(e,t){200===t&&(h(e.next),r(e.results),g(!0))}))}}),[s,v,g,e.username]);var N=function(e){var t=Object(l.a)(s);t.unshift(e),r(t);var n=Object(l.a)(d);n.unshift(d),j(n)};return Object(f.jsxs)(a.a.Fragment,{children:[d.map((function(e,t){return Object(f.jsx)(S,{tweet:e,didRetweet:N,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{ item.id }"))})),null!=w&&Object(f.jsx)("button",{className:"btn btn-outline-primary d-block mx-auto",onClick:function(e){if(e.preventDefault(),null!==w){b((function(e,t){if(200===t){h(e.next);var n=Object(l.a)(d).concat(e.results);r(n),j(n)}}),w)}},children:"Next Page"})]})};function L(e){var t=a.a.createRef(),n=e.didTweet;return Object(f.jsx)("div",{className:e.className,children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=t.current.value;d("POST","tweets/create/",(function(e,t){201===t?n(e):(console.log(e),alert("An error occured"))}),{content:c}),t.current.value=""},children:[Object(f.jsx)("textarea",{required:!0,className:"form-control mt-5 shadow-sm",name:"tweet",ref:t}),Object(f.jsx)("button",{type:"submit",className:"btn btn-primary my-2",children:"Tweet"})]})})}var R=function(e){var t=e.tweetId,n=Object(c.useState)(!1),a=Object(o.a)(n,2),s=a[0],r=a[1],i=Object(c.useState)(null),l=Object(o.a)(i,2),u=l[0],j=l[1],b=function(e,t){200===t?j(e):alert("There was an error finding your tweet.")};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){d("GET","tweets/".concat(e),t)}(t,b),r(!0))}),[t,s,r]),null===u?null:Object(f.jsx)(S,{tweet:u,className:e.className})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))},C=a.a.createElement,A=document.getElementById("tweetme"),P=document.getElementById("tweetme-feed"),q=document.querySelectorAll(".tweetme-detail"),D=document.querySelectorAll(".tweetme-profileBadge");A&&(r.a.render(C((function(e){var t=Object(c.useState)([]),n=Object(o.a)(t,2),a=n[0],s=n[1],r="false"!==e.cantweet;return Object(f.jsxs)("div",{className:e.className,children:[!0===r&&Object(f.jsx)(L,{didTweet:function(e){var t=Object(l.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(f.jsx)(T,Object(i.a)(Object(i.a)({},e),{},{newtweets:a}))]})}),A.dataset),A),console.log(A)),P&&(r.a.render(C((function(e){var t=Object(c.useState)([]),n=Object(o.a)(t,2),a=n[0],s=n[1],r="false"!==e.cantweet;return Object(f.jsxs)("div",{className:e.className,children:[!0===r&&Object(f.jsx)(L,{didTweet:function(e){var t=Object(l.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(f.jsx)(F,Object(i.a)(Object(i.a)({},e),{},{newtweets:a}))]})}),P.dataset),P),console.log(P)),q.forEach((function(e){r.a.render(C(R,e.dataset),e),console.log(e)})),D.forEach((function(e){r.a.render(C(y,e.dataset),e),console.log(e)})),E()}},[[17,1,2]]]);
//# sourceMappingURL=main.ac785ce1.chunk.js.map