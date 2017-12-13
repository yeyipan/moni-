
// 定义一个Animal
class Animal {
    // 初始化执行，构造函数
    constructor(name) {
        this.name = name
    }

    sleep() {
        console.log(`${this.name} can sleep`)
    }

    eat() {
        console.log(`${this.name} can eat`)
    }

    walk() {
        console.log(`${this.name} can walk`)
    }
}

// 继承Animal类
class Duck extends Animal{
    walk() {
        super.walk() // 此处的super指向Duck的父类，即Animal
        console.log(`${this.name} has two legs`)
    }
}

// let定义变量的关键，在定义局部变量的时候使用
let yellowDuck = new Duck('小黄鸭')  //实例化
    yellowDuck.walk()
console.log(yellowDuck.name)






