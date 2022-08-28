class mypromise {
    //promise有三种状态
    static pedding = '等待'
    static fulfiled = '成功'
    static reject = '失败拒绝'
    //promise接收的是一个函数
    constructor(fuc) {
        this.status = mypromise.pedding
        this.result = '现在是空的'
        //try...catch可以获取报错
        try {
            //记得修改this指向
            fuc(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
        //保存当then状态为pedding时执行的回调
        this.fulfiledCallback = []
        this.rejectCallback = []
    }
    //resolve和reject要在事件末尾执行的
    resolve(result) {
        setTimeout(() => {
            //修改状态
            if (this.status === mypromise.pedding) {
                this.status = mypromise.fulfiled
                this.result = result
                // console.log(this.result);
                //若fulfiledCallback有回调便遍历执行
                this.fulfiledCallback.forEach((callback) => {
                    console.log(54321);
                    callback(result)
                })
            }
        })
    }
    reject(result) {
        setTimeout(() => {
            //修改状态
            if (this.status === mypromise.pedding) {
                this.status = mypromise.reject
                //若rejectCallback有回调便遍历执行
                this.rejectCallback.forEach(callback => {
                    callback(result)
                })
            }
            this.result = result
        })
    }
    //写then方法,里面接收成功和失败两个函数
    then(onfulfiled, onreject) {
        //使用递归达成链式效果,老师讲的好像有问题
        return new mypromise((resolve, reject) => {
            resolve(this.result)
            reject(this.result)
            //确定传入值是否为函数
            onfulfiled = typeof onfulfiled === 'function' ? onfulfiled : () => {}
            onreject = typeof onreject === 'function' ? onreject : () => {}
            //当状态为待定时,将执行函数放入里面 
            console.log(this.status);
            if (this.status === mypromise.pedding) {
                this.fulfiledCallback.push(onfulfiled)
                this.rejectCallback.push(onreject)
            } else if (this.status === mypromise.fulfiled) {
                //异步执行
                setTimeout(() => {
                    console.log(this.result);
                    onfulfiled(this.result)
                })
            } else if (this.status === mypromise.reject) {
                setTimeout(() => {
                    onreject(this.result)
                })
            }
        })
    }
}
const ido = new mypromise((resolve, reject) => {
    console.log('第一步');
    resolve('真的假的？')
})
ido.then((res) => {
    console.log(res);
})