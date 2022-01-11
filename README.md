# PAVO Official Website

## 一、Getting Started

Install dependencies,

```bash
$ npm install yarn -g
$ yarn
```

starts in development mode,

```bash
# 默认启动开发环境
$ yarn start


builds the application for production usage,

```bash
$ yarn build
```


## 二、项目目录
src/components: 封装的头尾代码 及其组件
src/hooks: 自定义hooks封装，屏幕大小，分辨率等
src/page: 首页的代码
src/public: 静态资源(图片，字体)
src/styles: 公共样式(主要是主题颜色的js 封装)
src/utils: 公共方法封装



## 三、国际化

```js
import useTranslate from '@/hooks/useTranslate'
// 在组件内
const lang = useTranslate()
{lang('contact')}
```

## 四、请求数据

### GET请求

#### 参考资料
[swr](https://swr-cn.vercel.app/)用于请求数据的 React Hooks 库

```jsx
import useSwr from 'swr'

function Profile () {

  const { data, error } = useSwr('/user/123')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // 渲染数据
  return <div>hello {data.name}!</div>
}
```

### POST请求

```jsx
import post from 'utils/post'

const { data } = post('/user/123', { username: '123', password: '123' })
```

## 响应式
  [material UI](https://material-ui.com/zh/guides/responsive-ui/)提供了一套比较完善的响应式方案，此处我们可以直接使用，为了保证项目的一致性，约定禁用其他响应式方案。  默认mdDown 为mobile样式，其余则为desktop样式。
  此处列出两种比较常用的使用方法:  
  1. [Hidden 隐藏组件](https://material-ui.com/zh/components/hidden/)  

  ```jsx
  import ShowInDesktop from '@/components/responsive/show-in-desktop'

  <ShowInDesktop>will show this only desktop</ShowInDesktop>

  import ShowInMobile from '@/components/responsive/show-in-mobile'

  <ShowInMobile>will show this only mobile</ShowInMobile>
  ```


  2. [useMediaQuery](https://material-ui.com/zh/components/use-media-query/)

  ```jsx
  import useMobileDown from '@/hooks/useMobileDown'

  const mdDown = useMobileDown()
  // if on mobile device mdDown will give a true.
  ```


## 设计资料  

[PC端交互设计](https://www.figma.com/file/UzEUspeadefKAVAwzwD3Gw/pavo%E5%AE%98%E7%BD%91(1)?node-id=0%3A3)  
[移动端交互设计](https://www.figma.com/file/UzEUspeadefKAVAwzwD3Gw/pavo%E5%AE%98%E7%BD%91(1)?node-id=0%3A3)

[静态设计稿]https://www.figma.com/file/UzEUspeadefKAVAwzwD3Gw/pavo%E5%AE%98%E7%BD%91(1)?node-id=0%3A3)  
[产品原型](https://shimo.im/docs/gY9wk3C3Dpktj6Cr/)

## Git 提交规范
  commit 信息包括三个字段: type (必需)， scope(可选) 和 subject(必需)。
1. type。type 是用于说明该 commit 的类型的，一般我们会规定 type 的类型如下：
• feat: 新功能(feature)
• fix: 修复 bug
• docs: 文档(documents)
• style: 代码格式(不影响代码运行的格式变动，注意不是指 CSS 的修改)
• refactor: 重构(既不是新增功能，也不是修改 bug 的代码变动)
• test: 提交测试代码(单元测试，集成测试等)
• chore: 构建或辅助工具的变动
• misc: 一些未归类或不知道将它归类到什么方面的提交
2. scope。scope 说明 commit 影响的范围，比如数据层，控制层，视图层等等，这个需要视具体场景与项目的不同而灵活变动
3. subject。subject 是对于该 commit 目的的简短描述
• 使用第一人称现在时的动词开头，比如 modify 而不是 modified 或 modifies
• 首字母小写，并且结尾不加句号
4. ISSUEE_ID。这个与公司的需求管理与项目管理有关，假设你的项目放在 github 上，你的需求或者 bug 修复可能会有对应的 issues 记录，你可以加到你的 commit 信息中如 issue-37938634。

  #### 也可以使用[commitizen](https://www.npmjs.com/package/commitizen) 工具来完成commit,操作方式如下：  
  ```sh
  npx git-cz 或者
  yarn commit
  ```

## git协作流程[work flow](https://www.processon.com/view/link/5b45cd4ae4b07df3b4360592)

## Resources 


[material-ui](https://material-ui.com/)

[分支的合并](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)  

[GIT使用rebase和merge的正确姿势](https://zhuanlan.zhihu.com/p/34197548)

[eslint](https://eslint.org/docs/rules/)
