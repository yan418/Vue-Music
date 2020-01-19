## 使用Vue 搭建的移动端案例
[music] 一个移动端的手机播放器
#模仿百度音乐播放器
#数据来源于百度音乐提供


## 搭建项目
``` bash
# 先安装 node
# 升级 npm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 全局安装vue
cnpm install vue

# 全局安装vue-cli
cnpm install -g vue-cli

# 创建项目
vue init webpack music

# 配置完，启动项目
cnpm run dev
```

## 安装插件

``` bash
# axios 的安装
cnpm install axios

# swiper的安装
cnpm install vue-awesome-swiper --save

# element 安装
cnpm i element-ui -S

# 配置完，启动项目
cnpm run dev
```
## swiper的安装配置
网站：https://github.com/surmon-china/vue-awesome-swiper

## element的安装配置
网站：https://element.eleme.cn/#/zh-CN/component/installation

## awesome-vue的安装配置
网站：https://github.com/vuejs/awesome-vue


## 音乐数据接口来源于百度云音乐
 接口url ：http://tingapi.ting.baidu.com/v1/restserver/ting
	
 歌曲菜单接口地址：
 method=baidu.ting.billboard.billList&type=1&size=10&offset=0
 
 歌手歌曲接口地址：
 method=baidu.ting.artist.getSongList&tinguid="+ 歌手id +"&limits= 条数 &use_cluster=1&order=2"
 
 搜索列表：
 method=baidu.ting.search.catalogSug&query=
 
 歌手的信息：
 method=baidu.ting.artist.getInfo&tinguid= 歌手id
 
 歌曲歌词详情接口
method=baidu.ting.song.lry&songid="+this.songid 歌曲id

