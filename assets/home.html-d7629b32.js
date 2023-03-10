import{_ as u,M as i,p,q as m,Q as a,R as e,N as s,U as t,t as n,a1 as l}from"./framework-efe98465.js";const _={},v=e("br",null,null,-1),g=e("br",null,null,-1),h=e("br",null,null,-1),k={href:"https://github.com",target:"_blank",rel:"noopener noreferrer"},b=l('<div class="custom-container tip"><p class="custom-container-title">TIP</p><p>提示</p></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>这是一个警告</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>这是一个危险警告</p></div>',3),f={class:"custom-container details"},x=l(`<div class="custom-container danger"><p class="custom-container-title">STOP</p><p>危险区域，禁止通行</p></div><details class="custom-container details"><summary>点击查看代码</summary><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;你好，VuePress！&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>`,2),y=e("div",{class:"language-typescript line-numbers-mode","data-ext":"ts"},[e("pre",{class:"language-typescript"},[e("code",null,[e("span",{class:"token keyword"},"const"),n(" foo "),e("span",{class:"token operator"},"="),n(),e("span",{class:"token string"},"'foo'"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),E=e("div",{class:"language-typescript line-numbers-mode","data-ext":"ts"},[e("pre",{class:"language-typescript"},[e("code",null,[e("span",{class:"token keyword"},"const"),n(" bar "),e("span",{class:"token operator"},"="),n(),e("span",{class:"token string"},"'bar'"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),N=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function R(C,G){const o=i("RouterLink"),d=i("ExternalLinkIcon"),c=i("CodeGroupItem"),r=i("CodeGroup");return p(),m("div",null,[a(`
 * @Author: pdd 483662261@qq.com
 * @Date: 2023-03-01 19:38:13
 * @LastEditors: pdd 483662261@qq.com
 * @LastEditTime: 2023-03-01 19:38:13
 * @FilePath: \\vuepress-docs\\docs\\guide\\home.md
 * @Description: 这是默认设置,请设置\`customMade\`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
`),e("p",null,[s(o,{to:"/"},{default:t(()=>[n("首页")]),_:1}),v,s(o,{to:"/reference/config.html"},{default:t(()=>[n("配置参考")]),_:1}),g,s(o,{to:"/guide/getting-started.html"},{default:t(()=>[n("快速上手")]),_:1})]),a(" 绝对路径 "),e("p",null,[s(o,{to:"/zh/guide/"},{default:t(()=>[n("指南")]),_:1}),h,s(o,{to:"/zh/reference/config.html#links"},{default:t(()=>[n("配置参考 > markdown.links")]),_:1})]),a(" URL "),e("p",null,[e("a",k,[n("GitHub"),s(d)])]),a(" 自定义容器 "),a(` ::: <type> [title]
[content]
::: `),b,e("details",f,[e("p",null,[s(o,{to:"/"},{default:t(()=>[n("首页")]),_:1})])]),x,a(" 输入输出 "),s(r,null,{default:t(()=>[s(c,{title:"FOO"},{default:t(()=>[y]),_:1}),s(c,{title:"BAR"},{default:t(()=>[E]),_:1})]),_:1}),a(" 文件目录 "),N])}const w=u(_,[["render",R],["__file","home.html.vue"]]);export{w as default};
