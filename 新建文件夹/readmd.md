### 1. 面向对象的三个基本特征

```
   1. 封装：
    把一些共性的属性和方法进行一定程度的打包，就是我们所谓的封装。
    封装的好处：
        实现简单的功能模块化
        实现功能代码的复用
        实现功能的抽象化
    2. 继承：
     子类可以继承父类的一些公共特征
        public   公共的
            所有人都可以访问
        private  私有的
            只有自己才可以访问
        protected  受保护的
            自己和自己的子类可以进行访问
    3. 多态：
        常见的使用方式
            重写
                根据参数的数量或者是类型的不同，实现重写function
            覆盖
                同名的function进行覆盖
```

### ES6中class语法的使用
```
    1. 在es6中定义一个类
        class 类名{
            //// 构造函数，初始化构造函数，当类被实例化的时候调用.
            constructor(params1,params2,.....) {
                this.params1 = params1
                this.params2 = params2
            }
            function1() {

            }
            function2() {

            }
        }
```
#### 2类的继承;
```
    class 子类名 extends 类名{
        ......
    }

    //// 使用的时候 // 实例化类
    var Fun = new 类名(params1,params2...)
    Fun.function1()  ////调用方法
    Fun.function2()

```

#### 3语言的进化
```
    javascript标点符号的问题

    ; 在js中可以省略不写, 但是客户端的js建议尽量加上分号;
    在使用了第三方构造工具(如：webpack,grunt,gulp)的时候可以忽略分号;
    因为在编译js代码的时候，他们会自动进行构建。

目前很多语言，除了省略掉了代码行结尾处的分号;有些语言开始已经省略方法体中的{},
使用代码压缩进行语句控制。


    babel 可以把ES6中的写法转译成ES5

    http://babeljs.cn/
```