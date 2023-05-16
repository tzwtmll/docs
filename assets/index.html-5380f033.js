import{_ as o}from"./fiber-5cca0479.js";import{_ as c,X as i,Y as l,a1 as n,$ as a,a3 as r,a2 as s,a0 as u,F as e}from"./framework-decf3de5.js";const d="/docs/delect.jpg",k="/docs/diff.webp",v={},m=n("h1",{id:"react-框架原理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react-框架原理","aria-hidden":"true"},"#"),s(" React 框架原理")],-1),b={href:"https://pomb.us/build-your-own-react/",target:"_blank",rel:"noopener noreferrer"},y=u(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/tzwtmll/source_react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="virtual-dom" tabindex="-1"><a class="header-anchor" href="#virtual-dom" aria-hidden="true">#</a> Virtual dom</h2><div class="hint-container tip"><p class="hint-container-title">虚拟 DOM</p><ul><li>这是 react 的 <code>jsx</code> 所带来的概念，这是一个非常重要的概念，虚拟 DOM</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>app<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 这段代码 js 之所以是能够编译，是以为\`react-dom\`提供的 babel 环境将其编译,这段代码会被转化成一个 js 对象，再经过一些代码的运作就可以渲染到浏览器
 */</span>
<span class="token keyword">let</span> Vdom <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="createelement" tabindex="-1"><a class="header-anchor" href="#createelement" aria-hidden="true">#</a> createElement</h2><ul><li>我们需要首先有一个虚拟 DOM 的对象，才能进行下一步操作</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 现在只创建一个简单的dom</span>
<span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 它的html标签
   * <span class="token keyword">@param</span>  <span class="token parameter">type</span>
   */</span>
  <span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 它的属性，事件，类名等
   * <span class="token keyword">@param</span> <span class="token parameter">props</span>
   * <span class="token keyword">@replenish</span> 暂不添加props
   */</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token comment">//-------------下面则是children:[{},{}]的两个元素------------------</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 它的子元素
   * <span class="token keyword">@param</span> <span class="token parameter">children</span>
   */</span>
  <span class="token string">&#39;hello&#39;</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 它的子元素
   */</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>
    <span class="token string">&quot;p&quot;</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 暂时不添加方法</span>
    <span class="token string">&quot;world&quot;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>
    <span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 暂时不添加方法</span>
    <span class="token string">&#39;world&#39;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 上面的代码被转化为这了这段虚拟dom，接下来就重头戏就开始了
 我们后续的代码都围绕一段虚拟dom展开
 */</span>
<span class="token keyword">const</span> <span class="token constant">VDOM</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;TEXT-ELEMENT&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">ondeValue</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;TEXT-ELEMENT&#39;</span><span class="token punctuation">,</span>
              <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">ondeValue</span><span class="token operator">:</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> render</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>
    <span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 暂时不添加方法</span>
    <span class="token string">&#39;world&#39;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token function">render</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 从这里开始</span>
<span class="token keyword">let</span> nextUnitOfWork <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> currentRoot <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> wipRoot <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">let</span> deletions <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@desciption</span> 开始
 */</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 构建根节点</span>
  wipRoot <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 需要挂载的真实dom
     */</span>
    <span class="token literal-property property">dom</span><span class="token operator">:</span> container<span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 自身属性
     */</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>element<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 子节点
     */</span>
    <span class="token literal-property property">child</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 兄弟节点
     */</span>
    <span class="token literal-property property">sibling</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 父节点
     */</span>
    <span class="token literal-property property">parent</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 一颗完整的DOM树
     */</span>
    <span class="token literal-property property">alternate</span><span class="token operator">:</span> currentRoot<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  deletions <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 垃圾桶</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 赋值之后就开始构建了
   */</span>
  nextUnitOfWork <span class="token operator">=</span> wipRoot
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 浏览器自带方法，浏览器会不停调用该方法，会将空闲时间传入
 我们直接启动这个函数
 * @补充 这个是一切递归的开始
 */</span>
<span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="workloop" tabindex="-1"><a class="header-anchor" href="#workloop" aria-hidden="true">#</a> workLoop</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> fiber加工厂，由浏览器提供api requestIdleCallback启动
 */</span>
<span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">deadline</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> nextUnitOfWork有材料时且空闲时间大于1，开始加工
   */</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> deadline<span class="token punctuation">.</span><span class="token function">timeRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nextUnitOfWork <span class="token operator">=</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>nextUnitOfWork<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>nextUnitOfWork <span class="token operator">&amp;&amp;</span> wipRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 因为下面一直再递归请求，所以我们需要关掉这个循环</span>
    <span class="token comment">// nextUnitOfWork有执行完的时候，到最后是 返回 undefined，</span>
    <span class="token comment">// 但是 wipRoot 是存在是实例，需要手动关闭 令 wipFiber = null</span>
    <span class="token function">commitRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">requestIdleCallback</span><span class="token punctuation">(</span>workLoop<span class="token punctuation">)</span> <span class="token comment">//请求空闲时间</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="performunitofwork" tabindex="-1"><a class="header-anchor" href="#performunitofwork" aria-hidden="true">#</a> performUnitOfWork</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 车间一
 */</span>
<span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter">fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 为每个fiber节点-创建真实DOM，根据自己属性
   * <span class="token keyword">@replenish</span>  排除根节点，因为根节点本身就是真实DOM
   */</span>
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
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 走过了 if (fiber.child) 那就是走到节点尽头，最后一个子节点了 fiber 现在就是最后一个子节点，现在需要找的就是 fiber 的兄弟节点
   */</span>
  <span class="token keyword">var</span> nextFiber <span class="token operator">=</span> fiber
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber<span class="token punctuation">.</span>sibling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> nextFiber<span class="token punctuation">.</span>sibling
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 这里是兄弟节点也找到头了，现在的fiber就是最边缘的那个，他已经\`无兄无子\`了，
     */</span>
    nextFiber <span class="token operator">=</span> nextFiber<span class="token punctuation">.</span>parent
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="createdom" tabindex="-1"><a class="header-anchor" href="#createdom" aria-hidden="true">#</a> createDOM</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span> 构建真实DOM
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reconcilechildren" tabindex="-1"><a class="header-anchor" href="#reconcilechildren" aria-hidden="true">#</a> reconcileChildren</h2><ul><li>这个调和节点过程是该段代码的核心难点，较难理解，需要逐步解析</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@description</span>
 * <span class="token keyword">@param</span> <span class="token parameter">fiber</span>
 * <span class="token keyword">@param</span> <span class="token parameter">fiber<span class="token punctuation">.</span>props<span class="token punctuation">.</span>children</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">reconcileChildren</span><span class="token punctuation">(</span><span class="token parameter">wipFiber<span class="token punctuation">,</span> elements</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@description</span> 索引，为了递归拿去 children中的数据
   */</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> preSibling <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@descritpion</span> 发送在DOM更新后，可以使用缓存
   */</span>
  <span class="token keyword">let</span> oldFiber <span class="token operator">=</span> WipFiber<span class="token punctuation">.</span>alternate <span class="token operator">&amp;&amp;</span> WipFiber<span class="token punctuation">.</span>alternate<span class="token punctuation">.</span>child
  <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> elements<span class="token punctuation">.</span>length <span class="token operator">||</span> oldFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> element <span class="token operator">=</span> elements<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
    <span class="token keyword">let</span> sameType <span class="token operator">=</span> oldFiber <span class="token operator">&amp;&amp;</span> element <span class="token operator">&amp;&amp;</span> oldFiber <span class="token operator">==</span> element<span class="token punctuation">.</span>type
    <span class="token keyword">let</span> newFiber <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 有缓存且type未改变，整齐dom结构未变，这是props改变
     我们就不用构建整个dom
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> type改变，新建，-不管是第一次，还是更新,所以不考虑oldFiber是否有缓存
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      newFiber <span class="token operator">=</span> <span class="token punctuation">{</span>
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
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 删除，有缓存，但是type不一样
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldFiber <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>sameType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      oldFiber<span class="token punctuation">.</span>effectTag <span class="token operator">=</span> <span class="token string">&#39;DELETION&#39;</span>
      deletions<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>oldFiber<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 构建下级fiber，因为再更新后，可能是更新或者删除，原来的结构需要重构，但是上级结构是完好的
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldFiber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token doc-comment comment">/**
       * <span class="token keyword">@description</span> 因为只有一个儿子，再找其他儿子需要以儿子的兄弟的身份找
       * @补充 因为我们开始构建时就是 一夫一子一兄的关系，不需要在做其他的操作
       */</span>
      oldFiber <span class="token operator">=</span> oldFiber<span class="token punctuation">.</span>sibling
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 第一个儿子为子节点，第二个儿子作为第一子节点的兄弟的节点，本节点(也就是他们的父节点)不与第二个儿子建立关系
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      wipFiber<span class="token punctuation">.</span>child <span class="token operator">=</span> newFiber
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      prevSibling<span class="token punctuation">.</span>sibling <span class="token operator">=</span> newFiber
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * <span class="token keyword">@description</span> 我详细描述一下，这里可能有一点不好懂
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>index<span class="token punctuation">=</span><span class="token punctuation">=</span><span class="token punctuation">=</span><span class="token number">0</span><span class="token punctuation">}</span></span> <span class="token parameter">这是父节点与子建立关系字节</span> p74，再将子节点暂存为上一次兄弟节点 prevSibling = newFiber，为等会连接第二个儿子节点作铺垫，这个很好理解
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>index<span class="token punctuation">&gt;</span><span class="token number">0</span><span class="token punctuation">}</span></span> <span class="token parameter">现在的newFiber是第二个儿子，我们现在手上已经拥有第一个儿子节点，我们现在只需将newFiber挂载到</span> prevSibling.sibling 即可
     */</span>
    prevSibling <span class="token operator">=</span> newFiber
    index<span class="token operator">++</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+'" alt="这是fiber运行的方式，当type不同时先添加最新的，再删除以前的，而不是找到再修改" tabindex="0" loading="lazy"><figcaption>这是fiber运行的方式，当type不同时先添加最新的，再删除以前的，而不是找到再修改</figcaption></figure><hr><h2 id="react-diff" tabindex="-1"><a class="header-anchor" href="#react-diff" aria-hidden="true">#</a> React-Diff</h2><ol><li>同级之间比较</li><li>如果发现<code>key</code>发送改变，则直接删除该节点及其子节点<code>reconcileChildren-56行</code>，这样就将起复杂度由 O(n3)转变欸 O(n),极大提高了递归效率</li></ol><figure><img src="'+k+'" alt="diff同级比较" tabindex="0" loading="lazy"><figcaption>diff同级比较</figcaption></figure><h2 id="fiber" tabindex="-1"><a class="header-anchor" href="#fiber" aria-hidden="true">#</a> Fiber</h2><figure><img src="'+o+`" alt="Fiber" tabindex="0" loading="lazy"><figcaption>Fiber</figcaption></figure><ul><li>他是由<strong>父子兄</strong>三种节点组成，主要的设计理念就是一个<code>父亲只有一个儿子</code>，对于<code>第二个子节点</code>，<code>父节点</code>不与其建立关系，将其作为自己<code>子节点</code>的<code>兄弟节点</code>，而第二个子节点是不认识<code>第一个子节点的</code>，他只能识别<code>父节点</code>，这样做的好处是每一个节点都做到了一 一对应的关系，不存在任意一种节点对应相同类型的两个节点。总结就是<strong>一父一子一兄</strong></li></ul><h2 id="updatedom" tabindex="-1"><a class="header-anchor" href="#updatedom" aria-hidden="true">#</a> updateDOM</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateDOM</span><span class="token punctuation">(</span><span class="token parameter">dom<span class="token punctuation">,</span> prevProps<span class="token punctuation">,</span> nextprops</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commitdeletion" tabindex="-1"><a class="header-anchor" href="#commitdeletion" aria-hidden="true">#</a> commitDeletion</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">commitDeletion</span><span class="token punctuation">(</span><span class="token parameter">fiber<span class="token punctuation">,</span> parentDOM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parentDOM<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>dom<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 向下寻找最近的 dom ，因为函数没有dom</span>
    <span class="token function">commitDeletion</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>child<span class="token punctuation">,</span> parentDOM<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>正在开发中</p></div>`,31);function f(h,w){const p=e("RouterLink"),t=e("ExternalLinkIcon");return i(),l("div",null,[m,n("ul",null,[n("li",null,[a(p,{to:"/frontend/react/code.html"},{default:r(()=>[s("React 完整代码")]),_:1})]),n("li",null,[n("a",b,[s("Build your own React"),a(t)])])]),y])}const E=c(v,[["render",f],["__file","index.html.vue"]]);export{E as default};
