import{_ as t}from"./fiber-5cca0479.js";import{_ as p,X as c,Y as o,a1 as s,a2 as n,$ as l,a3 as i,a0 as a,F as u}from"./framework-decf3de5.js";const r={},d=a('<h1 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h1><ul><li>可能在前端平时的工作中，很难使用数据结构与算法，但是可以作为技术储备，对后续晋升发展有帮助</li></ul><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2><h3 id="单向链表" tabindex="-1"><a class="header-anchor" href="#单向链表" aria-hidden="true">#</a> 单向链表</h3><ul><li>单向链表较为简单，主要是熟悉最基本的<code>javascript数组[]</code>数据结构<div class="hint-container tip"><p class="hint-container-title">与 js 数组有何种区别？</p></div></li></ul>',5),k=s("li",null,[n("在 javascript 中，比如我们使用"),s("code",null,"pop"),n("或"),s("code",null,"shift"),n("对数组第一项进行了处理，其实第一项是被空缺了，接下来再由 javascript 将每一项都向前或向后移动一位，在我们看来是没有任何异常的，这是由 v8 引擎以及现代 cpu 的强大算力实现，假如如果数据量异常巨大可能就会导致程序缓慢。这时数据结构的作用就出来了")],-1),v=s("code",null,"react17",-1),m=s("img",{src:t,alt:"Fiber",loading:"lazy"},null,-1),h=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建一个calss，为后续实例准备</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">正在开发中。。。</p></div>`,2);function b(_,w){const e=u("RouterLink");return c(),o("div",null,[d,s("ol",null,[k,s("li",null,[n("数据结构能够使程序更加快速，比如"),v,n("发布的"),l(e,{to:"/frontend/react/core.html#diff"},{default:i(()=>[n("fiber 数据结构")]),_:1}),m,n(" :::")])]),h])}const x=p(r,[["render",b],["__file","dataStructure.html.vue"]]);export{x as default};
