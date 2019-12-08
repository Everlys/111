var storage={
    set(key,value){//设置
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key){//读取
        return JSON.parse(localStorage.getItem(key));
    },remove(key){//删除指定key
        localStorage.removeItem(key);
    }
}
//localStorage智能存储字符串
//备注：如果存储对象 json等 需要先序列化成字符串
export default storage;