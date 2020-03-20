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

### 为什么要搭建npm服务器

+ 便于开发上的协作，统一管理，方便开发和使用
+ 私有性、安全性。由于一些公司业务上原因，存在一些私有的开发模块，这些模块并不希望外人看见，但是又要方便内部人员使用
+ 快速。搭建的私有npm服务器，本身可以自带常用的package缓存，cnpm 有一些包存在路径问题,而npm 的速度有些感人,自建的服务器会缓存下载过的包,能节省时间

#### 搭建工具：verdaccio

**verdaccio**是 *sinopia* 开源框架的一个fork，但是由于一些原因，*sinopia* 已经没有维护了，还有很多bug，出现问题就只有自己解决咯。

废话就不多说了，那就开始吧！

* * * * * *  

### 安装

  安装**node**环境。可以到网址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)下载，可以根据不同平台系统选择你需要的 Node.js 安装包。
  具体就不在细述了，可参考教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

  安装**verdaccio**。使用 npm 全局安装即可。
 > npm install verdaccio -g

  如果在安装过程中报 grywarn的权限错的话，那么需要加上 --unsafe-perm, 如下命令：
 > npm install verdaccio -g --unsafe-perm

### 运行
  
  安装完成后，命令行中输入 `verdaccio` ,如下所示：
  ![图片示例](https://s1.ax1x.com/2020/03/21/8RlxW4.png)

  然后再浏览器中运行 **http://localhost:4873** 就可以看到如下图示：
  ![成功示例](https://s1.ax1x.com/2020/03/21/8R1jBt.png)

  上图中，config file就是安装文件的目录，进入目录找到配置文件config.yaml。配置如下，最后一行是新增配置：
  
  ```
  #
  # This is the default config file. It allows all users to do anything,
  # so don't use it on production systems.
  #
  # Look here for more config file examples:
  # https://github.com/verdaccio/verdaccio/tree/master/conf
  #
  
  # path to a directory with all packages
  storage: /Users/tugenhua/.local/share/verdaccio/storage
  
  auth:
    htpasswd:
      file: ./htpasswd
      # Maximum amount of users allowed to register, defaults to "+inf".
      # You can set this to -1 to disable registration.
      #max_users: 1000
  
  # a list of other known repositories we can talk to
  uplinks:
    npmjs:
      url: https://registry.npmjs.org/
  
  packages:
    '@*/*':
      # scoped packages
      access: $all
      publish: $authenticated
      proxy: npmjs
  
    '**':
      # allow all users (including non-authenticated users) to read and
      # publish all packages
      #
      # you can specify usernames/groupnames (depending on your auth plugin)
      # and three keywords: "$all", "$anonymous", "$authenticated"
      access: $all
  
      # allow all known users to publish packages
      # (anyone can register by default, remember?)
      publish: $authenticated
  
      # if package is not available locally, proxy requests to 'npmjs' registry
      proxy: npmjs
  
  # To use `npm audit` uncomment the following section
  middlewares:
    audit:
      enabled: true
  
  # log settings
  logs:
    - {type: stdout, format: pretty, level: http}
    #- {type: file, path: verdaccio.log, level: info}
  
  # 如下是新增的，默认是没有的，只能在本机访问，添加完成后就可以在外网访问了~  
  listen: 0.0.0.0:4873
  ```


  启动服务时，一般会通过pm2来管理进程
  安装：`npm install -g pm2`
  启动：`pm2 start which verdaccio`

### 使用

// 当前npm 服务指向 本地
`npm set registry http://192.168.101.104:4873`
// 注册用户
`npm adduser –registry http://192.168.101.104:4873`

// 查看当前用户,是否是注册用户.
`npm who am i`


### npm发布包
新建一个文件夹，npm init初始化一个package.json，完成新建包后，就使用`npm publish`发布包。
> npm publish --registry http://192.168.101.104:4873

发布完成后，在刷新下 http://192.168.101.104:4873/#/ 就可以看到我们刚刚发布的包了

### 下载包 
`npm install [package name]`
