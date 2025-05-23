function throttle(func: Function, delay: number){
    let lastTime = 0
    return function(...args: any[]){
        const nowTime = new Date().getTime()
        if (nowTime - lastTime >= delay){
            func(...args)
            lastTime = nowTime
        }
    }
}

export default throttle