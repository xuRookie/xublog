---
title: 使用verdaccio来搭建私有NPM仓库
date: 2020-03-18 14:54:13
categories: "Javascript"
tags:
  - Javascript
  - node
  - npm
---

作为一个前端开发，不知道npm那你就落后了。npm是一个包管理工具，我们可以从这上面下载任何你想用到的依赖包，但是npm毕竟是国外的，有时候下载起来，速度非常的慢（你们都懂的^_^），所以，要是我们可以又一个自己的这样的包管理器，上传/下载还非常方便，而且是私有的，不是任何人都可以访问、上传、下载依赖包，这样是不是就非常的nice了，那我们就快快来看看是如何来搭建自己的npm私有仓库的吧。

#### 为什么要搭建npm服务器

+ 便于开发上的协作，统一管理，方便开发和使用
+ 私有性、安全性。由于一些公司业务上原因，存在一些私有的开发模块，这些模块并不希望外人看见，但是又要方便内部人员使用
+ 快速。搭建的私有npm服务器，本身可以自带常用的package缓存，cnpm 有一些包存在路径问题,而npm 的速度有些感人,自建的服务器会缓存下载过的包,能节省时间

#### 使用方法：verdaccio

**verdaccio**是 *sinopia* 开源框架的一个fork，但是由于一些原因，*sinopia* 已经没有维护了，还有很多bug，出现问题就只有自己解决咯。

#### 安装

1. 安装**node**环境。可以到网址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)下载，可以根据不同平台系统选择你需要的 Node.js 安装包。具体就不在细述了，可参考教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

2. 安装**verdaccio**。使用 npm 全局安装即可。
 > npm install verdaccio -g

 如果在安装过程中报 grywarn的权限错的话，那么需要加上 --unsafe-perm, 如下命令：
 > npm install verdaccio -g --unsafe-perm

3. 运行
![启动示例](/images/run-verdaccio.png)

4. 修改配置文件config.yaml。运行verdaccio，就可以看见配置文件存放目录，找到文件修改，加添一行：
> # 如下是新增的，默认是没有的，只能在本机访问，添加完成后就可以在外网访问了~  
> listen: 0.0.0.0:4873  

5. 一般会通过pm2来管理进程（pm2就不过多讲述）
安装：`npm install -g pm2`
启动：`pm2 start which verdaccio`

6. 使用
```
#当前npm 服务指向 本地
npm set registry http://localhost:4873
# 注册用户
npm adduser –registry http://localhost:4873

#查看当前用户,是否是注册用户.
npm who am i
```

7. npm发布包
新建一个文件夹，npm init初始化一个package.json，完成新建包后，就使用`npm publish`发布包。
> npm publish --registry http://localhost:4873

发布完成后，在刷新下 http://localhost:4873/#/ 就可以看到我们刚刚发布的包了

9. 下载包 `npm install [package name]`

### 本次内容还很粗糙，后续会跟进内容，在将内容细致化一下