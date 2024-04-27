# WSL2

* windows 10版本
* [官方文档](https://learn.microsoft.com/zh-cn/windows/wsl)

## 安装debian

* 查看wsl的版本和安装信息 `wsl -l -v`

* 指定默认以WSL2为结构体系,以后再安装任何 版本都是在WSL2中运行的 `wsl --set-default-version 2`

* 自带商店搜索linux版本安装就可以

* 启动时报错`WslRegisterDistribution failed with error: 0x800701bc`
  
  * 根系wsl2内核，使用软件`wsl_update_x64.msi`从`https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi`下载
  
* 启动后报错`参考的对象类型不支持尝试的操作`
  
  * ~~运行[fix_wsl2_error.reg](../../assets/windows/fix_wsl2_error.reg)文件修改注册表~~
  * ~~也可以按文件内容手动修改注册表~~
  * 将[netsh_winsock_reset.cmd](../../assets/windows/netsh_winsock_reset.cmd) 脚本开机自启
    * win+r 输入 `shell:startup`
    * 脚本放入这个文件夹就可以了
  
* 安装`ifconfig`相关命令`sudo apt install net-tools`

* 安装`firewall-cmd`相关工具

* ### systemd 支持

* 若要启用 systemd，请使用 在文本编辑器中打开`wsl.conf`文件，以获取管理员权限，并将以下行添加到 `/etc/wsl.conf`

  ```shell
  [boot]
  systemd=true
  ```

  
