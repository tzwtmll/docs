import{_ as t,X as c,Y as o,a1 as n,a2 as s,$ as p,a3 as l,a0 as a,F as i}from"./framework-decf3de5.js";const u="/docs/fiber.webp",d={},r=a('<h1 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h1><ul><li>可能在前端平时的工作中，很难使用数据结构与算法，但是可以作为技术储备，对后续晋升发展有帮助</li></ul><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2><h3 id="单向链表" tabindex="-1"><a class="header-anchor" href="#单向链表" aria-hidden="true">#</a> 单向链表</h3><ul><li>单向链表较为简单，主要是熟悉最基本的<code>javascript数组[]</code>数据结构<div class="hint-container tip"><p class="hint-container-title">与 js 数组有何种区别？</p></div></li></ul><ol><li>在 javascript 中，比如我们使用<code>pop</code>或<code>shift</code>对数组第一项进行了处理，其实第一项是被空缺了，接下来再由 javascript 将每一项都向前或向后移动一位，在我们看来是没有任何异常的，这是由 v8 引擎以及现代 cpu 的强大算力实现，假如如果数据量异常巨大可能就会导致程序缓慢。这时数据结构的作用就出来了</li><li>数据结构能够使程序更加快速，比如<code>react17</code>发布的<code>fiber</code>数据结构 <img src="'+u+'" alt="Fiber" loading="lazy"></li></ol>',6),k=n("li",null,[s("他是由"),n("code",null,"父子兄"),s("三种节点组成，主要的设计理念就是一个父亲只有一个儿子，对于第二个儿子，"),n("code",null,"父节点"),s("不与其建立关系，将其作为自己"),n("code",null,"子节点"),s("的"),n("code",null,"兄弟节点"),s("，这样做的好处是每一个节点都做到了一 一对应的关系，不存在任意一种节点对应相同类型的两个节点。总结就是"),n("strong",null,"一父一子一兄,三角形最为稳定 😀")],-1),v=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建一个calss，为后续实例准备</span>
<span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>element <span class="token operator">=</span> element
    <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 单链</span>
<span class="token keyword">class</span> <span class="token class-name">LinkedList</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 索引</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 第一项</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 添加元素-方法</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实例化一个对象</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span>
    <span class="token comment">// 第一项</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 作一下命名处理，便于理解</span>
      <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head
      <span class="token comment">// 第二项以后就拼接在前一项的结尾</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>next
      <span class="token punctuation">}</span>
      current<span class="token punctuation">.</span>next <span class="token operator">=</span> node
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加索引</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">正在开发中。。。</p></div>`,2);function m(h,b){const e=i("RouterLink");return c(),o("div",null,[r,n("ul",null,[k,n("li",null,[s("详情请查看"),p(e,{to:"/frontend/react/core.html"},{default:l(()=>[s("React 原理解析")]),_:1}),s(" :::")])]),v])}const _=t(d,[["render",m],["__file","dataStructure.html.vue"]]);export{_ as default};
