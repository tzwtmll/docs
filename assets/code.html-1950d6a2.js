import{_ as n,X as s,Y as a,a0 as p}from"./framework-decf3de5.js";const t={},e=p(`<h1 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> nextUnitOfWork <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> currentRoot <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> wipRoot <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> deletions <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 构建虚拟DOM
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token operator">...</span>children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    type<span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>props<span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对children的类型进行判断，是对象说明还有深层次,一直递归到文本为止</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;[object Object]&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> child
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">createTextElement</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">createTextElement</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token comment">// 保存格式的一致性</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;TEXT-ELEMENT&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">nodeValue</span><span class="token operator">:</span> text<span class="token punctuation">,</span> <span class="token comment">//将文本以对象的形式展示出来</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 创建真实DOM
 */</span>
<span class="token keyword">function</span> <span class="token function">createDOM</span><span class="token punctuation">(</span><span class="token parameter">fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dom <span class="token operator">=</span>
    fiber<span class="token punctuation">.</span>type <span class="token operator">==</span> <span class="token string">&#39;TEXT-ELEMENT&#39;</span>
      <span class="token operator">?</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
      <span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>type<span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> key <span class="token operator">!==</span> <span class="token string">&#39;children&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      dom<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> fiber<span class="token punctuation">.</span>props<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> dom
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 构建DOM树
 */</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 首先创建最大的 fiber</span>
  wipRoot <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// work in progress root</span>
    <span class="token literal-property property">dom</span><span class="token operator">:</span> container<span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>element<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 通过 父子兄将全部的fiber连接起来</span>
    <span class="token literal-property property">child</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sibling</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parent</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alternate</span><span class="token operator">:</span> currentRoot<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  deletions <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">//创建一个垃圾桶</span>
  nextUnitOfWork <span class="token operator">=</span> wipRoot
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 浏览器剩余时间请求，递归构建fiber
 */</span>
<span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nextUnitOfWork <span class="token operator">=</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>nextUnitOfWork<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// console.log(nextUnitOfWork);</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> wipRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 因为下面一直再递归请求，所以我们需要关掉这个循环</span>
    <span class="token comment">// nextUnitOfWork有执行完的时候，到最后是 返回 undefined，</span>
    <span class="token comment">// 但是 wipRoot 是存在是实例，需要手动关闭 令 wipFiber = null</span>
    <span class="token function">commitRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span> <span class="token comment">//请求空闲时间</span>
<span class="token punctuation">}</span>

<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">commitRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  deletions<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>commitWork<span class="token punctuation">)</span>
  <span class="token function">commitWork</span><span class="token punctuation">(</span>wipRoot<span class="token punctuation">.</span>child<span class="token punctuation">)</span> <span class="token comment">//到此时，fiber 结构已经构建完</span>
  currentRoot <span class="token operator">=</span> wipRoot <span class="token comment">// 保存这一次的 fiber 为一下 render 提供缓存数据</span>
  wipRoot <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
<span class="token comment">// 对于89行的优化</span>
<span class="token keyword">function</span> <span class="token function">commitWork</span><span class="token punctuation">(</span><span class="token parameter">fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 此时的 fiber 就是根节点下面的第一个 div</span>
  <span class="token comment">// 在这里我们进行一个组装，将异步转化为同步，此时 fiber 各个的关系已经全部构建好</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 寻找最近的父dom节点</span>
  <span class="token keyword">let</span> parentDomFiber <span class="token operator">=</span> fiber<span class="token punctuation">.</span>parent
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>parentDomFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parentDomFiber <span class="token operator">=</span> parentDomFiber<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>dom
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> parentDOM <span class="token operator">=</span> parentDomFiber<span class="token punctuation">.</span>dom
  <span class="token comment">// parentDOM.append(fiber.dom) 太粗暴了</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>effectTag <span class="token operator">===</span> <span class="token string">&#39;PLACEMENT&#39;</span> <span class="token operator">&amp;&amp;</span> fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parentDOM<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token comment">// 创建</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>effectTag <span class="token operator">===</span> <span class="token string">&#39;UPDATE&#39;</span> <span class="token operator">&amp;&amp;</span> fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">updateDOM</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">,</span> fiber<span class="token punctuation">.</span>alternate<span class="token punctuation">.</span>props<span class="token punctuation">,</span> fiber<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>effectTag <span class="token operator">===</span> <span class="token string">&#39;DELETION&#39;</span> <span class="token operator">&amp;&amp;</span> fiber<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// parentDOM.removeChild(fiber.dom)</span>
    <span class="token function">commitDeletion</span><span class="token punctuation">(</span>fiber<span class="token punctuation">,</span> parentDOM<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">commitWork</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>child<span class="token punctuation">)</span>
  <span class="token function">commitWork</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>sibling<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 删除
 */</span>
<span class="token keyword">function</span> <span class="token function">commitDeletion</span><span class="token punctuation">(</span><span class="token parameter">fiber<span class="token punctuation">,</span> parentDOM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parentDOM<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 向下寻找最近的 dom ，因为函数没有dom</span>
    <span class="token function">commitDeletion</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>child<span class="token punctuation">,</span> parentDOM<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter">fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建真实dom，并组装</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fiber<span class="token punctuation">.</span>dom <span class="token operator">=</span> <span class="token function">createDOM</span><span class="token punctuation">(</span>fiber<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 处理 fiber 之间的关系</span>
  <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>fiber<span class="token punctuation">,</span> fiber<span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
  <span class="token comment">// 优先级问题,有子找子，无子找兄弟，再找父的兄弟</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>child<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fiber<span class="token punctuation">.</span>child
  <span class="token punctuation">}</span>
  <span class="token comment">//到这个地方来了，就是子已经找完了，现在就是从最后一个儿子的兄弟把上开始找，找父的兄弟</span>
  <span class="token keyword">var</span> nextFiber <span class="token operator">=</span> fiber
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber<span class="token punctuation">.</span>sibling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> nextFiber<span class="token punctuation">.</span>sibling
    <span class="token punctuation">}</span>
    nextFiber <span class="token operator">=</span> nextFiber<span class="token punctuation">.</span>parent
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 更新dom
 */</span>
<span class="token keyword">function</span> <span class="token function">updateDOM</span><span class="token punctuation">(</span><span class="token parameter">dom<span class="token punctuation">,</span> prevProps<span class="token punctuation">,</span> nextprops</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断是否是事件</span>
  <span class="token keyword">const</span> <span class="token function-variable function">isEvent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> key<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;on&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 返回首字母是 &#39;on&#39; 的</span>
  <span class="token comment">// 删除已经没有的props-------------------------------消除变量，防止内存泄漏---------------------------------------------------------</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> key <span class="token operator">!==</span> <span class="token string">&#39;children&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isEvent</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 首先排除childrne与事件</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> nextprops<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 不在 nextprops 中，清空即可</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      dom<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span> <span class="token comment">// 令他为空即可</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// 判断是否有追加属性--------------------------更新值----------------------------------------------------------------</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>nextprops<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> key <span class="token operator">!==</span> <span class="token string">&#39;children&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isEvent</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 不在 prevprops 中，就是有新增属性，创建即可。或者都有，追加属性值即可</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> prevProps<span class="token punctuation">)</span> <span class="token operator">||</span> prevProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> nextprops<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      dom<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> nextprops<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token comment">// 新增</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// 删除事件-------------------------------------解绑，否则会照成内存泄漏----------------------------------------</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">)</span> <span class="token comment">// 一样的逻辑，prev有next无，就是要删除的事件</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>isEvent<span class="token punctuation">)</span> <span class="token comment">// 取出事件</span>
    <span class="token comment">// 取出新的属性=&gt;   没有，或者没有变化，为什么有一样的事件也要取消绑定，那是因为下面会一直绑定，所以我们需要取消上一个事件，再重新绑定，不解绑会照成内存泄漏</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> nextprops<span class="token punctuation">)</span> <span class="token operator">||</span> prevProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> nextprops<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> eventType <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// onClick =&gt;先转小写，再取第二位开始的后面，者就是事件类型</span>
      <span class="token comment">// 再移除事件</span>
      dom<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> prevProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//删除prev上的事件即可</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// 添加新事件----------------------------------绑定事件--------------------------------------------------------------</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>nextprops<span class="token punctuation">)</span> <span class="token comment">// 一样的逻辑，next有prev无，就是要新增的事件</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>isEvent<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> prevProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> nextprops<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//放回出没有的事件</span>
    <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> eventType <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// onClick =&gt;先转小写，再取第二位开始的后面，者就是事件类型</span>
      dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> nextprops<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 视图更新
 */</span>
<span class="token keyword">function</span> <span class="token function">reconcileChildren</span><span class="token punctuation">(</span><span class="token parameter">wipFiber<span class="token punctuation">,</span> elements</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 我们可以有一个缓存，整体结构不发生改变，我们就复用，只改变数据即可</span>
  <span class="token keyword">var</span> index <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">var</span> prevSibling <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 用于将父亲的第二个儿子保存为儿子的兄弟，各个fiber都是一对一</span>
  <span class="token keyword">var</span> oldFiber <span class="token operator">=</span> wipFiber<span class="token punctuation">.</span>alternate <span class="token operator">&amp;&amp;</span> wipFiber<span class="token punctuation">.</span>alternate<span class="token punctuation">.</span>child <span class="token comment">// 将缓存的老fiber取出</span>
  <span class="token comment">// 构建 fiber架构,使各个 fiber 都有关系</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> elements<span class="token punctuation">.</span>length <span class="token operator">||</span> oldFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> element <span class="token operator">=</span> elements<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token comment">// 具体化操作</span>
    <span class="token keyword">var</span> sameType <span class="token operator">=</span> oldFiber <span class="token operator">&amp;&amp;</span> element <span class="token operator">&amp;&amp;</span> oldFiber<span class="token punctuation">.</span>type <span class="token operator">==</span> element<span class="token punctuation">.</span>type
    <span class="token keyword">var</span> newFiber <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// type 未改变。说明整体dom结构未变，只是props改变，我们就不用构建整个dom</span>
      newFiber <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> oldFiber<span class="token punctuation">.</span>type<span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> element<span class="token punctuation">.</span>props<span class="token punctuation">,</span>
        <span class="token literal-property property">dom</span><span class="token operator">:</span> oldFiber<span class="token punctuation">.</span>dom<span class="token punctuation">,</span>
        <span class="token comment">// 继承dom</span>
        <span class="token literal-property property">parent</span><span class="token operator">:</span> wipFiber<span class="token punctuation">,</span>
        <span class="token literal-property property">child</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sibling</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">alternate</span><span class="token operator">:</span> oldFiber<span class="token punctuation">,</span> <span class="token comment">//依旧继承</span>
        <span class="token literal-property property">effectTag</span><span class="token operator">:</span> <span class="token string">&#39;UPDATE&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 新建</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// oldfiber不存在，渲染dom</span>
      <span class="token keyword">var</span> newFiber <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">//通过虚拟dom构建fiber</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> element<span class="token punctuation">.</span>type<span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> element<span class="token punctuation">.</span>props<span class="token punctuation">,</span>
        <span class="token comment">// 与父fiber关联</span>
        <span class="token literal-property property">parent</span><span class="token operator">:</span> wipFiber<span class="token punctuation">,</span>
        <span class="token literal-property property">dom</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 没用缓存，构建dom</span>
        <span class="token literal-property property">child</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sibling</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">alternate</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token literal-property property">effectTag</span><span class="token operator">:</span> <span class="token string">&#39;PLACEMENT&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 删除</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldFiber <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      oldFiber<span class="token punctuation">.</span>effectTag <span class="token operator">=</span> <span class="token string">&#39;DELETION&#39;</span>
      deletions<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>oldFiber<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 因为只有一个儿子，再找其他儿子需要以儿子的兄弟的身份找，</span>
      oldFiber <span class="token operator">=</span> oldFiber<span class="token punctuation">.</span>sibling
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 第一个为儿子，第二个为兄弟</span>
      <span class="token comment">// 这里为什么要把 父fiber的儿子设置为 newFibr，这是因为都是单项数据流</span>
      <span class="token comment">// 需要两边都绑定关系</span>
      wipFiber<span class="token punctuation">.</span>child <span class="token operator">=</span> newFiber
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//兄弟</span>
      prevSibling<span class="token punctuation">.</span>sibling <span class="token operator">=</span> newFiber
    <span class="token punctuation">}</span>
    <span class="token comment">// 保存兄弟，其他的都是第一个儿子的兄弟，父不认识他，但是他认识他父亲</span>
    prevSibling <span class="token operator">=</span> newFiber
    index<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> render
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","code.html.vue"]]);export{r as default};
