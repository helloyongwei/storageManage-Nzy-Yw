# 说明
这是我和同学(Nzy)的数据库实训作业, 大部分是Nzy同学完成的.
虽然这个作业去年学数据库末尾的时候做完了, 一直没有找机会上传, 这次就上传吧. 备用.

# 使用
环境参数

macOS     10.13.1

nodejs    8.0
npm       4.0.0

确保node 与 npm 存在于终端的环境变量中

mysql     5.7.18
redis     3.2.8


确保 mysql 与 redis 启动

使用时请使用redis的默认端口

mysql的配置在 back-end/config/db-config.js 中配置

使用sql.sql 将测试数据导入到本地的mysql中，并确保当前mysql中不存在已有的 storagemanage 数据库

保持本地 localhost:3000 与 localhost:8080 通常不被占用 localhost:3000 作为api服务器，localhost:8080 作为前端页面服务器

在 back-end 文件夹中执行 npm install && node server.js 启动后台api服务器

在 font-end 文件夹中执行 npm install && npm run dev 启动前端服务器

浏览器打开 http://localhost:8080/app 即可看到页面

此应用为半成品，部分功能为实现

已有用户参见表 user，由于是管理系统不支持登录

