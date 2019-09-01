Page({
  data:{
    //文本框的数据类型
    search:"",
    //任务清单数据模型
    todos:[
      {name:'Learning WEAPP',completed:false},
      { name: 'Learning JavaScript', completed: true },
      { name: 'Learning HTML', completed: false }
    ],
    leftCount:2,//默认2
    allCompleted:false
  },
  //1先让按钮点击时执行一段代码
  //2拿大文本框里面的值的数值绑定是单向的
  //必须要给文件注册改变事件
  //2.1由于小程序
  //3将这个值添加到列表中
  inputChangeHandle(e){
  this.setData({
    search:e.detail.value
  })
  },
  addTodoHandle(){
  //当添加按钮点击事件发生时执行的函数
  if(!this.data.search) return
  //如果输入框为空  惹人突然
    var todos = this.data.todos
    todos.push({
      name:this.data.search,
      completed:false
    })
    //必须显示的通过setData去改变数据，这样界面随之改变
    this.setData({
      todos:todos,
      search:'',
      leftCount:this.data.leftCount+1
      })
  },
  toggleTodoHandle(e){
    //切换当前点中的item的完成状态
    // console.log(e.currentTarget)
    var item = this.data.todos[e.currentTarget.dataset.index]
    // console.log(item)对象
    item.completed = !item.completed
    // 根据当前任务的完成状态决定添加一个或减少一个
    var leftCount = this.data.leftCount + (item.completed?-1:1)
    this.setData({ todos: this.data.todos, leftCount: leftCount})
  },
  //注意冒泡问题
  removeTodoHandle(e){
    var todos = this.data.todos
    // item就是splice方法中移除掉的元素
   var item = todos.splice(e.currentTarget.dataset.index,1) //得到的是一个长度为1的数组并且是对象
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]//删除那个对象
   console.log(item)
   var leftCount = this.data.leftCount-(item.completed?0:1)
    //todos中会移除掉index所指向的元素
    this.setData({todos:todos,leftCount:leftCount})
  },
  //全选或不全选
  ToggleAllHandle(){
    // this在这里永远指向的是当前页面对象
    this.data.allCompleted = !this.data.allCompleted;
    var todos = this.data.todos
    var that = this
    todos.forEach(function (item){
      item.completed = that.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({todos:todos,leftCount:leftCount})
  },
  clearHandle(){
    // var todos = []
    console.log(1)
    // this.data.todos.forEach(function(item){
    //   if(!item.completed){
    //     todos.push(item)
    //   }
    // })
    //todos => 新的未完成的任务列
    var todos = this.data.todos.filter(function(item){
      return !item.completed
    })
    this.setData({todos:todos})
  }
})