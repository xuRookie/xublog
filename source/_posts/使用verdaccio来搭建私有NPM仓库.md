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
<!-- ![启动示例](/images/run-verdaccio.png) -->