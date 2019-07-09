class Test{
    constructor(name,say){
        this.name=name;
        this.say=say;
    }
    showSay(){
        return this.name+":"+this.say;
    }
}
export default new Test("huaihai","爱吃鬼")