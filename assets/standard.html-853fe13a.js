import{_ as n,X as s,Y as a,a0 as t}from"./framework-decf3de5.js";const p={},e=t(`<h1 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范" aria-hidden="true">#</a> 代码规范</h1><ul><li>写在前面 <blockquote><p>我认为每一个程序员都需要有一套自己的代码风格与规范，这能够直接反应一个程序员的技术水平，就像一套制度，它会自动去规范 每个人的行为，使其在一个良好的环境中运作</p></blockquote></li></ul><h2 id="对-react-组件的规范与要求" tabindex="-1"><a class="header-anchor" href="#对-react-组件的规范与要求" aria-hidden="true">#</a> 对 React 组件的规范与要求</h2><ul><li>接下来我们实现一个简单的增删改与弹窗的例子书写，规范名称与代码风格，就以新增编辑查看用户作为例子 <blockquote><p>下面的每一行注释也是规范的一部分 #后面不写，真正的注释</p></blockquote></li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 这里的导入省略,自行导入对应的仓库</span>

<span class="token comment">// 这里使用枚举类型区分，使内容更加清晰明了</span>
<span class="token keyword">enum</span> UserEnum <span class="token punctuation">{</span>
  新增<span class="token punctuation">,</span>
  编辑<span class="token punctuation">,</span>
  查看
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Home</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 用户弹窗状态#状态名称以\`visible\`结尾</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>userVisible<span class="token punctuation">,</span>setUserVisible<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token comment">// 用户弹窗功能</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>modalMethod<span class="token punctuation">,</span>setModalMethod<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span>UserEnum<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>UserEnum<span class="token punctuation">.</span>新增<span class="token punctuation">)</span>
  <span class="token comment">// 弹窗操作数据</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>modalData<span class="token punctuation">,</span>setModalData<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span>Data<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      &lt;a onClick=()=&gt;</span><span class="token punctuation">{</span>
          <span class="token function">setModalMethod</span><span class="token punctuation">(</span>UserEnum<span class="token punctuation">.</span>新增<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token plain-text">&gt;新增</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        &lt;a onClick=()=&gt;</span><span class="token punctuation">{</span>
          <span class="token comment">//  #此时在table中存在record</span>
          <span class="token function">setModalData</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span>
          <span class="token function">setModalMethod</span><span class="token punctuation">(</span>UserEnum<span class="token punctuation">.</span>编辑<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token plain-text">&gt;编辑</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        &lt;a onClick=()=&gt;</span><span class="token punctuation">{</span>
          <span class="token function">setModalData</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span>
          <span class="token function">setModalMethod</span><span class="token punctuation">(</span>UserEnum<span class="token punctuation">.</span>查看<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token plain-text">&gt;新增</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      // 弹窗以Modal结尾
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">UserModal</span></span>
        <span class="token attr-name">open</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>userVisible<span class="token punctuation">}</span></span>
        <span class="token attr-name">modalMethod</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>modalMethod<span class="token punctuation">}</span></span>
        <span class="token attr-name">modalData</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>modalData<span class="token punctuation">}</span></span>
        <span class="token attr-name">pageClose</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
          <span class="token function">setModalData</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token function">setUserVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  open<span class="token operator">:</span><span class="token builtin">boolean</span>
  <span class="token function-variable function">pageClose</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">void</span>
  modalMethod<span class="token operator">:</span>UserEnum
  modalData<span class="token operator">:</span>Data
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">UserModal</span> <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token operator">:</span>Props<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * @description 回显
  */</span>
 <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">// 其render部分依旧可以通过   props.modalMethod与UserEnum进行区分与展示</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>modalMethod<span class="token operator">===</span>UserEnum<span class="token punctuation">.</span>编辑<span class="token operator">||</span>props<span class="token punctuation">.</span>modalMethod<span class="token operator">===</span>UserEnum<span class="token punctuation">.</span>查看<span class="token punctuation">)</span><span class="token punctuation">{</span>
     form<span class="token punctuation">.</span><span class="token function">setFieldsValue</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>modalData<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">[</span>props<span class="token punctuation">.</span>modalData<span class="token punctuation">,</span>props<span class="token punctuation">.</span>modalMethod<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Modal</span></span> <span class="token attr-name">open</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>open<span class="token punctuation">}</span></span> <span class="token attr-name">onCancel</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>closePage<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Modal</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><ul><li>开始主要是对风格依旧变量命名进行约束</li></ul></div><h2 id="文件目录" tabindex="-1"><a class="header-anchor" href="#文件目录" aria-hidden="true">#</a> 文件目录</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── services
│   └── user.ts // 用户相关接口
├── types
│   ├── common.ts // 公共类型
│   ├── user.ts // 用户相关类型
│   └── index.ts  // 全局导出types
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="types-文件配置" tabindex="-1"><a class="header-anchor" href="#types-文件配置" aria-hidden="true">#</a> types 文件配置</h2><ul><li>/types/user.ts <blockquote><p>eg.这个文件我们导出 user 相关的类型</p></blockquote></li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Data</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>/types/index.ts</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token operator">*</span> from <span class="token punctuation">.</span><span class="token operator">/</span>user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>在此时我们在全局地方就可以只通过一个路径进行导出，这样就形成了一个类型导出规范</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Data <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/types&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ts-与接口的使用规范" tabindex="-1"><a class="header-anchor" href="#ts-与接口的使用规范" aria-hidden="true">#</a> TS 与接口的使用规范</h2><ul><li>/types/common.ts <blockquote><p>这里依然是在 index 下添加 <code>export * from &quot;./common&quot;</code> 即可</p></blockquote></li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//配置接口返回值的第一层类型</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Record<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  msg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>/services/user.ts</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Record<span class="token punctuation">,</span> Data <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/types&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 这是你封装好的请求方法</span>
<span class="token keyword">import</span> request <span class="token keyword">from</span> <span class="token string">&quot;@/request&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 这样进行一个规范即可，对接口进行了ts配置规范</span>
<span class="token keyword">export</span> <span class="token function-variable function">getUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span>Data<span class="token operator">&gt;&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;/getUser&quot;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    method<span class="token operator">:</span> <span class="token string">&#39;GET&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","standard.html.vue"]]);export{r as default};
