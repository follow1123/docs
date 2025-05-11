# Vim/Neovim

> 以下文档不是全部，只是个人常用的一部分<br></br>
> 使用`:help`查询详细的帮助文档

## 移动（motions）

### 键位
                
* 方向键：<kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd>

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>w</kbd>/<kbd>W</kbd> | 光标右移动一个词/包含词周围的符号 |
| `Normal` | <kbd>b</kbd>/<kbd>B</kbd> | 光标左移动一个词/包含词周围的符号 |
| `Normal` | <kbd>0</kbd> | 光标移动到行首，包含空白字符 |
| `Normal` | <kbd>^</kbd> | 光标移动到行首, 不包含空白字符   |
| `Normal` | <kbd>$</kbd> | 光标移动到行尾 |
| `Normal` | <kbd>f</kbd>/<kbd>F</kbd>+<kbd>{'{char}'}</kbd> | 向左或向右搜索字符，光标移动该字符上 |
| `Normal` | <kbd>t</kbd>/<kbd>T</kbd>+<kbd>{'{char}'}</kbd> | 向左或向右搜索字符，光标移动该字符周围 |
| `Normal` | <kbd>;</kbd> | 重复<kbd>f</kbd>/<kbd>F</kbd>/<kbd>t</kbd>/<kbd>T</kbd>按键搜索字符 |
| `Normal` | <kbd>,</kbd> | 反方向重复<kbd>f</kbd>/<kbd>F</kbd>/<kbd>t</kbd>/<kbd>T</kbd>按键搜索字符 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>u</kbd> | 向上移动半页 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>d</kbd> | 向下移动半页 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>f</kbd> | 向上移动一页 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>b</kbd> | 向下移动一页 |
| `Normal` | <kbd>H</kbd> | 光标移动到当页的头部 |
| `Normal` | <kbd>M</kbd> | 光标移动到当页的中间 |
| `Normal` | <kbd>L</kbd> | 光标移动到当页的尾部 |
| `Normal` | <kbd>z</kbd>+<kbd>z</kbd> | 光标不动，光标下的内容移动到窗口的中间 |
| `Normal` | <kbd>{'{'}</kbd> | 向上移动一段 |
| `Normal` | <kbd>{'}'}</kbd> | 向下移动一段 |
| `Normal` | <kbd>%</kbd> | 光标移动到另一半大、中、小括号上 |
| `Normal` | <kbd>g</kbd>+<kbd>g</kbd> | 光标移动到文件的第一行 |
| `Normal` | <kbd>G</kbd> | 光标移动到文件的最后一行 |

---

## 模式（modes）

* 常用模式有4种：[Normal](#normal) [Insert](#insert) [Visual](#visual) [Command](#command)

---

## 文本对象（textobject）

* 操作：<kbd>c</kbd> <kbd>d</kbd> <kbd>y</kbd> <kbd>v</kbd>
* 范围：<kbd>i</kbd> <kbd>a</kbd>
* 对象：<kbd>w</kbd> <kbd>s</kbd> <kbd>p</kbd> <kbd>(</kbd> <kbd>)</kbd> <kbd>[</kbd> <kbd>]</kbd> <kbd>{'{'}</kbd> <kbd>{'}'}</kbd>
<kbd>&lt;</kbd> <kbd>&gt;</kbd> <kbd>'</kbd> <kbd>"</kbd> <kbd>&#96;</kbd> <kbd>t</kbd>

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>c</kbd> <kbd>i</kbd> <kbd>w</kbd> | 删除当前光标下的单词并进入`Insert`模式 |
| `Normal` | <kbd>d</kbd> <kbd>a</kbd> <kbd>p</kbd> | 删除当前光标所在段落 |
| `Normal` | <kbd>y</kbd> <kbd>i</kbd> <kbd>(</kbd> | 复制当前光标所在行右边<kbd>()</kbd>内的内容 |
| `Normal` | <kbd>v</kbd> <kbd>a</kbd> <kbd>t</kbd> | 选中当前光标所在的整个标签，`html`、`xml`等标签语法的标签 |

## 搜索（search）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>/</kbd> <kbd>{'{pattern}'}</kbd> | 向后搜索输入的pattern |
| `Normal` | <kbd>?</kbd> <kbd>{'{pattern}'}</kbd> | 向前搜索输入的pattern |
| `Normal` | <kbd>n</kbd>/<kbd>N</kbd> | 根据搜索的方式向前或向后搜索输入的pattern |
| `Normal` | <kbd>\*</kbd>  | 快速向后搜索当前光标下的单词 |
| `Normal` | <kbd>\#</kbd>  | 快速向前搜索当前光标下的单词 |

---

## 替换（substitute）

> 以下选项只是部分，详情参考：`:h substitute`

<code>:<strong>[range]</strong>s[ubstitute]/<strong>{'{pattern}'}</strong>/<strong>{'{string}'}</strong>/<strong>[flags]</strong> <strong>[count]</strong></code>

* range
    * `number` 指定行号
    * `%` 当前文件

* pattern
    * 支持正则表达式

```txt
<a id="mark-a"></a>
<a id="mark-b"></a>
<a id="mark-c"></a>

选中并执行'<,'>s/id="\(\w\+-\(\w\)\)">/href="#\1">\2/g替换成mark的引用处

<a href="#mark-a">a</a>
<a href="#mark-b">b</a>
<a href="#mark-c">c</a>
```

* string
    * 参考：`h sub-replace-special`
    * 特殊操作和正则表达式的捕获组、大小写转换类似

* flags
    * `c` 替换时确认
    * `e` 忽略替换时的错误
    * `g` 替换所有的匹配项
    * `i` 忽略大小写
    * `I` 不忽略大小写
    * `n` 不替换，只显示匹配项的个数
        * 由于搜索最多只能显示99个搜索结果，使用这个方式统计搜索内容的个数
        * `%s/text//gn`

* count
    * 单行替换时将包括当前行内下的count行都执行这个替换操作
    * `:s/x/X/g 5` 将当前行所在内以下5行内的`x`字符替换成`X`字符

* 分隔符说明
    * 命令分隔符不只可以使用`/`，还可以使用`#`、`.`、`+`等，和linux下的`sed`类似

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>&</kbd> | 执行上一次的单行替换操作 |
| `Normal` | <kbd>g</kbd> <kbd>&</kbd> | 执行上一次的整个buffer替换操作 |

---

## 缓冲区（buffer）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>6</kbd> | 切换到上次打开的buffer |
| `Command` | `:ls` | 显示当前所有打开的buffer |
| `Command` | `:b#` | 和 <kbd>Ctrl</kbd>+<kbd>6</kbd> 相同 |

---

## 窗口（window）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>s</kbd> | 水平分屏 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>v</kbd> | 垂直分屏 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>+</kbd> | 增加分屏高度 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>-</kbd> | 减少分屏高度 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>&gt;</kbd> | 减少分屏宽度 |
| `Normal` | <kbd>ctrl</kbd>+<kbd>w</kbd> <kbd>&lt;</kbd> | 增加分屏宽度 |
| `Normal` | <kbd>ctrl</kbd>+<kbd>w</kbd> <kbd>=</kbd> | 将所有分屏设置为相同的宽度和高度 |
| `Normal` | <kbd>ctrl</kbd>+<kbd>w</kbd> <kbd>c</kbd> | 关闭当前分屏 |
| `Normal` | <kbd>ctrl</kbd>+<kbd>w</kbd> <kbd>r</kbd> | 旋转所有分屏 |
| `Command` | `:sp` | 和 <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>s</kbd> 相同 |
| `Command` | `:vs` | 和 <kbd>Ctrl</kbd>+<kbd>w</kbd> <kbd>v</kbd> 相同 |

---

## 变更列表和跳转列表（change list and jump list）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:changes` | 打开变更列表 |
| `Normal` | <kbd>g</kbd>+<kbd>;</kbd> | 跳转到较旧修改的位置 |
| `Normal` | <kbd>g</kbd>+<kbd>,</kbd> | 跳转到较新修改的位置 |
| `Command` | `:jumps` | 打开跳转列表 |
| `Command` | `:clearjumps` | 清空跳转列表 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>i</kbd> | 跳转到较旧的位置 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>o</kbd> | 跳转到较新的位置 |

---

## 快速修复列表（Quickfix list）

* 使用[Vimgrep](#全局搜索vimgrep)搜索的信息会保存在quickfix-list内

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:copen` | 打开Quickfix列表 |
| `Command` | `:cclose` | 关闭Quickfix列表 |
| `Command` | `:cnext` | Quickfix列表下一条 |
| `Command` | `:cprevious` | Quickfix列表上一条 |
| `Command` | `:cfirst` | Quickfix列表第一条 |
| `Command` | `:clast` | Quickfix列表最后一条 |
| `Command` | `:chistory` | 显示Quickfix列表历史记录 |
| `Command` | `:colder` | 使用上一次Quickfix列表操作记录 |
| `Command` | `:cnewer` | 使用下一次Quickfix列表操作记录 |
| `Command` | `:cdo` | 对quickfix list内的内容执行操作，例如<kbd>cdo</kbd>后接[substitute](#替换substitute)相关操作，实现工作区内替换功能 |

---

## 标记（Marks）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:marks` | 打开mark列表 |
| `Normal` | <kbd>m</kbd>+<kbd>{'{mark}'}</kbd> | 插眼 |
| `Normal` | <kbd>&apos;</kbd>+<kbd>{'{mark}'}</kbd>/<kbd>&#96;</kbd>+<kbd>{'{mark}'}</kbd>| 传送 |
| `Normal` | <kbd>&apos;</kbd>+<kbd>&apos;</kbd>/<kbd>&#96;</kbd>+<kbd>&#96;</kbd>| 跳转到上一次的标记 |
| `Command` | <code>:delmarks mark</code> | 排眼 |
| `Command` | `:delmarks!` | 删除所有的标记 |

### mark 说明

* `a-z` 当前buffer的标记
* `A-Z` 跨文件的标记
* `0-9` 跨项目的标记
* `<` `>` `Visual`模式下选中文本的区域的标记

---

## 缩进（Indent）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>&gt;</kbd>+<kbd>&gt;</kbd> | 向右缩进 |
| `Normal` | <kbd>&lt;</kbd>+<kbd>&lt;</kbd> | 向左缩进 |
| `Normal` | <kbd>=</kbd> | 自动对齐缩进 |
| `Visual` | <kbd>&gt;</kbd> | 选中的行向右缩进 |
| `Visual` | <kbd>&lt;</kbd> | 选中的行向左缩进 |
| `Insert` | <kbd>Tab</kbd> | 缩进字符 |

### 缩进相关配置

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:set list`/`:set nolist` | 开启/关闭空白字符显示 |
| `Command` | `:set shiftwitdh={num}` | 使用<kbd>&lt;</kbd>/<kbd>&gt;</kbd>相关按键缩进的宽度 |
| `Command` | `:set tabstop={num}` | 使用<kbd>Tab</kbd>按键缩进的宽度 |

---

## 折叠（Folding）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>z</kbd>+<kbd>f</kbd> | 创建一个折叠块，配合`foldmethod`配置才能使用 |
| `Visual` | <kbd>z</kbd>+<kbd>f</kbd> | 创建一个折叠块，配合`foldmethod`配置才能使用 |
| `Normal` | <kbd>z</kbd>+<kbd>o</kbd> | 开启折叠块 |
| `Normal` | <kbd>z</kbd>+<kbd>c</kbd> | 关闭折叠块 |
| `Normal` | <kbd>z</kbd>+<kbd>a</kbd> | 关闭或关闭折叠块 |
| `Normal` | <kbd>z</kbd>+<kbd>A</kbd> | 关闭或关闭折叠块，递归 |
| `Normal` | <kbd>z</kbd>+<kbd>d</kbd> | 删除折叠块 |
| `Normal` | <kbd>z</kbd>+<kbd>j</kbd> | 下一个折叠块 |
| `Normal` | <kbd>z</kbd>+<kbd>k</kbd> | 上一个折叠块 |

### 折叠块相关配置

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:set foldenable`/ `set nofoldenable` | 开启或关闭打开文件自动折叠相关代码 |
| `Command` | `:set foldlevel={num}` | 最大折叠块深度 |
| `Command` | `:set foldmethod={string}` | 折叠代码方式，`:h foldmethod`查看详细信息 |

---

## 全局搜索（Vimgrep）

* <code>vimgrep /<strong>pattern</strong>/<strong>flags</strong> <strong>file...</strong></code>

* `pattern` 正则表达式或字符串

* `flags`
    * `g` 单行匹配多次
    * `j` 不跳转到匹配的buffer内
    * `f` 模糊匹配，<strong>pattern</strong>输入字符串

* `file` 多个文件
    * `a/*` a文件夹下的所有文件
    * `**/*.c` 所有文件夹下的c文件

---

## 寄存器（Registers）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>"</kbd> <kbd>{'{register}'}</kbd> <kbd>y</kbd> | 将文本复制到对应的寄存器内 |
| `Normal` | <kbd>"</kbd> <kbd>{'{register}'}</kbd> <kbd>p</kbd> | 粘贴对应的寄存器的内容 |
| `Insert` | <kbd>Ctrl</kbd>+<kbd>r</kbd> <kbd>{'{register}'}</kbd> | 输入对应的寄存器的内容 |
| `Command` | <kbd>Ctrl</kbd>+<kbd>r</kbd> <kbd>{'{register}'}</kbd> | 输入对应的寄存器的内容 |
| `Command` | `:registers {register}` | 显示对应寄存器的内容，无参数则显示全部寄存器 |

### 未命名寄存器

* `"` 修改、删除、复制等操作后的文本都会存入这个寄存器内

### 数字寄存器

* `0` 复制的文本都会存入这个寄存器内
* `1-9` 修改或删除后的文本会依次存入这些寄存器内

### 删除寄存器

* `-` 删除的内容少于一行时存入这个寄存器

### 字母寄存器

* `a-z`/`A-Z` 用户自定义操作的寄存器

### 只读寄存器

* `.` 上次新增的内容
* `%` 当前buffer文件路径
* `:` 上次执行的命令

### 备用buffer寄存器

* `#` 上次打开的buffer的文件路径

### 表达式寄存器

* `=` `Insert`模式下<kbd>Ctrl</kbd>+<kbd>r</kbd> <kbd>=</kbd>输入在`Command`模式下执行命令的结果

### 选择寄存器

* `*`/`+` 系统剪切板

### 黑洞寄存器

* `_` 和Linux下`/dev/null`类似

### 上次修改寄存器

* `/` 4. [搜索](#搜索search)后的内容会保存在这个寄存器内

---

## 宏（Macros）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>q</kbd> <kbd>{'{register}'}</kbd> | 录制宏 |
| `Normal` | <kbd>@</kbd> <kbd>{'{register}'}</kbd> | 播放宏 |
| `Normal` | <kbd>@</kbd> <kbd>:</kbd> | 执行上一次的命令 |
| `Normal` | <kbd>@</kbd> <kbd>@</kbd> | 执行上一次的宏 |

---

## 内置插件（builtin-plugin）

### Netrw

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Command` | `:E` | 打开文件管理器buffer |
| `Command` | `:Rexplore` | 返回上次打开的文件管理器 |
| `Command` | `:Lexplore` | 开启或关闭左测的文件管理器 |

---

## 其他（others）

| 模式    | 按键    | 描述    |
|---------------- | --------------- | --------------- |
| `Normal` | <kbd>x</kbd> | 删除当前光标下的字符 |
| `Normal` | <kbd>r</kbd> | 将当前光标下的字符替换为输入的字符 |
| `Normal` | <kbd>y</kbd>+<kbd>{'{operate}'}</kbd> | 复制 |
| `Normal` | <kbd>p</kbd>/<kbd>P</kbd> | 粘贴，根据粘贴的内容是否为一行<br />粘贴的位置在当前行的下面或上面<br />当前字符的右边或左边 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>a</kbd> | 增加数字 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>x</kbd> | 减少数字 |
| `Normal` | <kbd>g</kbd> <kbd>Ctrl</kbd>+<kbd>a</kbd> | 依次增加选中列的数字 |
| `Normal` | <kbd>g</kbd> <kbd>Ctrl</kbd>+<kbd>x</kbd> | 依次减少选中列的数字 |
| `Normal` | <kbd>u</kbd> | 撤销 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>r</kbd> | 重做 |
| `Normal` | <kbd>~</kbd> | 大小写转换 |
| `Normal` | <kbd>Ctrl</kbd>+<kbd>g</kbd> | 底部显示当前buffer的信息 |
| `Normal` | <kbd>1</kbd> <kbd>Ctrl</kbd>+<kbd>g</kbd> | 底部显示当前buffer的信息，绝对路径 |
| `Normal` | <kbd>2</kbd> <kbd>Ctrl</kbd>+<kbd>g</kbd> | 底部显示当前buffer的信息，buffer number |
| `Normal` | <kbd>g</kbd> <kbd>Ctrl</kbd>+<kbd>g</kbd> | 显示当前文件的line、word、char、byte信息 |
| `Visual` | <kbd>g</kbd> <kbd>Ctrl</kbd>+<kbd>g</kbd> | 显示当前选中区域的line、word、char、byte信息 |
| `Command` | `:set laststatus=0` | 隐藏底部输入命令的行高度 |件
| `Command` | `:set laststatus=2` | 设置底部输入命令的行高度 |
| `Command` | `:set guifont=*` | gui模式下设置字体 |
| `Normal` | <kbd>q</kbd> <kbd>:</kbd> | 分屏显示历史命令窗口 |
| `Normal` | <kbd>q</kbd> <kbd>/</kbd> | 分屏显示历史搜索记录窗口 |
| `Normal` | <kbd>q</kbd> <kbd>?</kbd> | 分屏显示历史搜索记录窗口 |
| `Normal` | <kbd>:</kbd> <kbd>{'{number}'}</kbd> | 跳转到对应的行号 |

---

## neovim开发（neovim-dev）

> 以下和lua相关的代码仅支持neovim

### lua语言简介

### neovim api

####  `vim.o`/`vim.opt`/`vim.opt_local`

* 类似vimscript的set操作，o对应原始数据，opt对应使用lua封装的数据，opt_local对应setlocal

| lua | vimscript |
| --------------- | --------------- |
| `vim.o.number` | `set number` |
| `vim.o.relativenumber` | `set relativenumber` |
| `vim.o.clipboard` | `set clipboard` |

#### `vim.keymap`

* 配置按键映射的方法，对应vimscript的`nmap`，`vmap`等
```lua
-- 实现nnoremap <M-w> viw
vim.keymap.set("n", "<M-w>", "viw", {
 noremap = true
})
```

#### `vim.api`

* 对应使用lua实现的vimapi，参考：`h vim.api` 

#### `vim.fn`

* 调用vimscript的函数，参考：`h builtin-function-list`

| lua | vimscript |
| --------------- | --------------- |
| `vim.fn.getcwd()` | `getcwd()` |
| `vim.fn.line()` | `line()` |
| `vim.fn.buflisted()` | `buflisted()` |

#### `vim.cmd`

* 调用vimscript的命令

| lua | vimscript |
| --------------- | --------------- |
| `vim.cmd.e()` | `:e` |
| `vim.cmd.wincmd()` | `:wincmd` |
| `vim.cmd.pwd()` | `:pwd` |

#### `vim.lsp`

* vim内置[lsp](https://microsoft.github.io/language-server-protocol/)相关函数，参考：`h vim.lsp`

#### `vim.uv`/`vim.loop`

* vim内置[luv](https://github.com/luvit/luv)网络编程库，参考：`h luv`

#### `vim.schedule`/`vim.schedule_wrap`

* 等待event-loop内的事件执行完成后再执行里面的操作
