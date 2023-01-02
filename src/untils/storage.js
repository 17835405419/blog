/* 
本地存储封装模块
*/

export const setItem =(name,value)=>{
    //判断value是否是对象 如果是将它转换成字符串
    if(typeof value ==='object'){
        value = JSON.stringify(value)
        
    }
    window.localStorage.setItem(name,value)
}


export const getItem =name=>{
   const data = window.localStorage.getItem(name)
   //为什么把json.parse放到 try catch中？
   //因为data可能不是json格式字符串
  try {
      //尝试把data转化为 js对象
      return JSON.parse(data)
  } catch (error) {
      return data
  }
}


export const removeItem =name=>{
    window.localStorage.removeItem(name)
}