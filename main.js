import pue from './src'
const checkBox = pue.el("input")
const h1 = pue.el("h1")
const check = pue.ref(0);
const counter = pue.ref(0)
console.log(check)
pue.model.value(checkBox,check);
pue.model.textContent(h1,counter)
pue.interval(()=>{
    check.value = !check.value
    counter.value++;
},1000)