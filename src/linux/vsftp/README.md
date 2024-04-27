# linux安装ftp服务器

* 已Debian11为例
* 使用root登录
* 添加ftp用户和对应的目录和组
* 添加组
  * `groupadd 组名`
* 创建用户目录，建议创建在/home目录下
  * `mkdir /home/目录名称`
* 创建用户
  * `useradd -dftp目录 -g组名 用户名`
* 设置用户密码
  * `passwd 用户名`
* 设置目录的所属用户
  * `chown 用户名:组名 ftp目录`
* 设置ftp目录的权限
  * `chmod 775 ftp目录`
* apt 安装，（也可以使用其他工具）
  * `apt install vsftpd -y`

* 使用[vsftp.conf](../../assets/linux/vsftpd.conf)文件作为ftp为配置文件
* 具体配置见配置文件
* 重启服务即可
