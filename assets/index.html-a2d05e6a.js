import{_ as o,X as c,Y as i,Z as n,$ as s,a0 as e,a3 as p,a2 as a,F as l}from"./framework-c25c54d8.js";const u={},r=a(`<h1 id="解析原理与使用-redux" tabindex="-1"><a class="header-anchor" href="#解析原理与使用-redux" aria-hidden="true">#</a> 解析原理与使用 redux</h1><h2 id="createstore" tabindex="-1"><a class="header-anchor" href="#createstore" aria-hidden="true">#</a> createStore</h2><ul><li>核心方法</li><li>redux 的三原则,设计核心</li></ul><p>(1) 单一数据源,每一个 redux 应用只有一个 store。</p><p>(2) state 只读,唯一该改变的方式就是触发 action。</p><p>(3) 使用纯函数 reducer 修改 state。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">,</span> enhancer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 约束 reducer 参数类型</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> reducer <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;reducer必须是函数&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 判断 enhancer 有没有传递</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> enhancer <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断 enhancer 是不是一个函数</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> enhancer <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;enhancer必须是函数&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">enhancer</span><span class="token punctuation">(</span>createStore<span class="token punctuation">)</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// store 对象中存储的状态</span>
  <span class="token keyword">var</span> currentState <span class="token operator">=</span> preloadedState<span class="token punctuation">;</span>
  <span class="token comment">// 存放订阅者函数</span>
  <span class="token keyword">var</span> currentListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// 获取状态</span>
  <span class="token keyword">function</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> currentState<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 触发 action</span>
  <span class="token keyword">function</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token parameter">action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断 action 是否是对象</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;action必须是对象&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断对象中是否具有 type 属性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> action<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;action对象中必须要有type属性&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// reducer操作赋值</span>
    currentState <span class="token operator">=</span> <span class="token function">reducer</span><span class="token punctuation">(</span>currentState<span class="token punctuation">,</span> action<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 循环数组 ，调用订阅者</span>
    currentListeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 订阅状态 参数为回调函数</span>
  <span class="token keyword">function</span> <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">listener</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentListeners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>listener<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    getState<span class="token punctuation">,</span>
    dispatch<span class="token punctuation">,</span>
    subscribe<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 判断 obj 参数是否是对象,createStore中使用的方法</span>
<span class="token keyword">function</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 排除基本数据类型和空</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> obj <span class="token operator">!==</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">||</span> obj <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token comment">// 区分数组和对象 原型对象对比的方式</span>
  <span class="token keyword">var</span> proto <span class="token operator">=</span> obj<span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    proto <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">===</span> proto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,8),k={class:"hint-container tip"},d=n("p",{class:"hint-container-title"},"提示",-1),v=n("blockquote",null,[n("p",null,[n("strong",null,"p-12")])],-1),m=n("h2",{id:"applymiddleware",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#applymiddleware","aria-hidden":"true"},"#"),s(" applyMiddleware")],-1),b=n("li",null,[n("p",null,"创建中间件")],-1),h=n("li",null,[n("p",null,"中间件是 redux 的一个核心方法,在多种库中都有中间件的使用,使用场景主要是 redux 异步请求,redux 缓存等等")],-1),y=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>middlewares</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用 扩招运算符和 下面代码意思一致 可以忽略不写，写入作用是提示</span>
  middlewares <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arguments<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 将 createStore 传入进来 applyMiddleware()(createState)</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">createStore</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将 createState 的参数也传入 applyMiddleware()(createState)(reducer,preloadedState)</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">reducer<span class="token punctuation">,</span> preloadedState</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 创建 store    redux的全部参数都已经传入，组合成 store 对象传出中间件</span>
      <span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> preloadedState<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">var</span> chain <span class="token operator">=</span> middlewares<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">middleware</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">middleware</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 中间件第一参 store</span>
      <span class="token comment">// 第一个参数是 中间件们</span>
      <span class="token comment">// 第二个参数是给 compose 中的返回函数使用 store.dispatch，就是后面dispatch</span>
      <span class="token comment">// 这里特别重要 dispatch = store.dispatch 这样写的意思是更直观的理解compose中的dispatch</span>
      <span class="token comment">// var dispatch = compose(...chain)(dispatch) 清晰的写出来</span>
      <span class="token keyword">var</span> dispatch <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token operator">...</span>chain<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>dispatch <span class="token operator">=</span> store<span class="token punctuation">.</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>store<span class="token punctuation">,</span>
        dispatch<span class="token punctuation">,</span> <span class="token comment">// 调用此方法就是中间件第三参 action ，具体实现再 compose</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>chain</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用意思与 ...funcs一致，可以忽略不写，写入作用是提示</span>
  chain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arguments<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">dispatch</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里的dispatch，就是上面写入的 store.dispatch,是store的方法</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> chain<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将 dispatch 方法传入</span>
      dispatch <span class="token operator">=</span> chain<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 中间件第二参 dispatch</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dispatch<span class="token punctuation">;</span> <span class="token comment">// 调用此方法就是传入第三参， action</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),f={class:"hint-container warning"},w=n("p",{class:"hint-container-title"},"注意",-1),g=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 简单演示</span>
<span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      a<span class="token operator">+</span>b<span class="token operator">+</span>c<span class="token operator">===</span><span class="token number">6</span> <span class="token operator">?</span> <span class="token comment">//这里是否相等</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token constant">A</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这就是柯里化的简单使用方法,可以能有人要问为什么不使用 <strong>A(1,2,3)</strong><ul><li>我们这里是不知道 a,b,c 具体值的，而通过柯里化的方法可以知道自己使用的具体方法.</li><li>如果你觉得我理解的不对，可以与我讨论,主要是我也不是很理解。</li></ul></li></ul>`,2),_=a(`<h2 id="bindactioncreators" tabindex="-1"><a class="header-anchor" href="#bindactioncreators" aria-hidden="true">#</a> bindActionCreators</h2><ul><li>这个方法使用的较少,可以作为了解使用</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bindActionCreators</span><span class="token punctuation">(</span><span class="token parameter">actionCreators<span class="token punctuation">,</span> dispatch</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> boundActionCreators <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> actionKey <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>actionCreators<span class="token punctuation">)</span><span class="token punctuation">;</span>
  actionKey<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> key <span class="token operator">=</span> item<span class="token punctuation">;</span>
    boundActionCreators<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">dispatch</span><span class="token punctuation">(</span>actionCreators<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 在这里直接调用 action 也可以完成操作</span>
  <span class="token keyword">return</span> boundActionCreators<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="combinreducers" tabindex="-1"><a class="header-anchor" href="#combinreducers" aria-hidden="true">#</a> combinReducers</h2>`,4),j=n("li",null,"这个方法是常用的一个语法糖，主要作用是 redux 模块化.",-1),x=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">combinReducers</span><span class="token punctuation">(</span><span class="token parameter">reducers</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Object.keys 取出key值，存入一个数组 [&quot;user&quot;,&quot;config&quot;]</span>
  <span class="token keyword">var</span> reducerKeys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>reducers<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> finalReducers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  reducerKeys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> key <span class="token operator">=</span> item<span class="token punctuation">;</span>
    <span class="token comment">// 将key作为对于标识存入finalReducers,形成一个新对象方法</span>
    finalReducers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> reducers<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> finalReducerKeys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>finalReducers<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> nextState <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    finalReducerKeys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> key <span class="token operator">=</span> item<span class="token punctuation">;</span>
      <span class="token keyword">var</span> reducer <span class="token operator">=</span> finalReducers<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">var</span> previousStateForKey <span class="token operator">=</span> state<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
      nextState<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">reducer</span><span class="token punctuation">(</span>previousStateForKey<span class="token punctuation">,</span> action<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> nextState<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">example</p><blockquote><p><strong><em>p-1</em></strong></p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 方法的使用</span>
<span class="token function">combinReducers</span><span class="token punctuation">(</span>reducers<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> userReducer <span class="token keyword">from</span> <span class="token string">&#39;./user/reducer&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> configReducer <span class="token keyword">from</span> <span class="token string">&#39;./config/reducer&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reducers <span class="token operator">=</span> <span class="token function">combinReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">user</span><span class="token operator">:</span> userReducer<span class="token punctuation">,</span>
  <span class="token literal-property property">config</span><span class="token operator">:</span> configReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="usage-method" tabindex="-1"><a class="header-anchor" href="#usage-method" aria-hidden="true">#</a> usage method</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>正在开发中</p></div><h2 id="use-in-react" tabindex="-1"><a class="header-anchor" href="#use-in-react" aria-hidden="true">#</a> Use in react</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>正在开发中</p></div>`,6);function S(R,O){const t=l("RouterLink");return c(),i("div",null,[r,n("div",k,[d,v,n("ul",null,[n("li",null,[s("这是 redux 理解的一个难点核心,技术原理是"),e(t,{to:"/frontend/javascript/currying.html"},{default:p(()=>[s("函数柯里化")]),_:1})])])]),m,n("ul",null,[b,h,n("li",null,[n("p",null,[s("设计原理非常简单,通过"),e(t,{to:"/frontend/javascript/currying.html"},{default:p(()=>[s("柯里化")]),_:1}),s("和判断类型的方法,来决定使用哪种方式调用 dispatch.")])])]),y,n("div",f,[w,n("ul",null,[n("li",null,[s("这是 redux 中最难以理解的一个方法,主要是函数"),e(t,{to:"/frontend/javascript/currying.html"},{default:p(()=>[s("柯里化")]),_:1}),s("的使用")])]),g]),_,n("ul",null,[j,n("li",null,[s("其中也使用到了"),e(t,{to:"/frontend/javascript/currying.html"},{default:p(()=>[s("柯里化")]),_:1}),s(".")])]),x])}const E=o(u,[["render",S],["__file","index.html.vue"]]);export{E as default};
