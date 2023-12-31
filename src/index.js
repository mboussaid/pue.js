import Mustache from 'mustache';

class Pue {
  constructor() {
    this.$refs = {};
    this.onLoad(()=>{
        document.querySelectorAll(`[ref]`).forEach((e) => {
            const refName = e.getAttribute('ref');
            this.$refs[refName] = e;
        });
    })
  }
  onLoad(callback){
    this.#handleEvent(window,'DOMContentLoaded',callback)
  }
  el(selector, all = false) {
    if (!selector) return;
    const fn = all ? 'querySelectorAll' : 'querySelector';
    return document[fn](selector);
  }

  els(selector) {
    return this.el(selector, true);
  }
  state(initialValue){
    let value = initialValue;
    const getValue = ()=> value
    let watchCallbacks = [];
    const setValue = (newValue)=>{
      if(typeof newValue === "function"){
        value = newValue(value)
      }else{
        value = newValue
      }
      watchCallbacks.forEach(c=>c())
    }
    const watchValue = (callback)=>{
      if(typeof callback === "function"){
        if(watchCallbacks.find(c=>c=== callback)) return
        watchCallbacks.push(callback)
      }
    }
    return [getValue,setValue,watchValue]
  }
  ref(value) {
    if (value) {
      const refElement = document.querySelector(`[ref="${value}"]`);
      if(refElement) return refElement;
    }

    const obj = {
      value: value,
      _effects: [],
    };

    let proxy = new Proxy(obj, {
      get: (target, key) => target[key],
      set: (target, key, newValue) => {
        if (target[key] === newValue) return true;
        target[key] = newValue;
        obj._effects.forEach((e) => e(target, key, newValue));
        return true;
      },
    });

    obj._effects = [];
    return proxy;
  }

  watch(ref, effect,options={}) {
    if (!ref || !effect) return;
    let _refs = Array.isArray(ref) ? ref : [ref];
    _refs.forEach((r) => {
      r._effects.push(effect);
    });
    if(options && options.execute){
      effect();
    }
  }

  computed(callback, refs) {
    const ref = this.ref(callback());
    let _refs = Array.isArray(refs) ? refs : [refs];
    _refs.forEach((r) => {
      this.watch(r, () => {
        ref.value = callback();
      });
    });
    return ref;
  }

  timeout(callbacks, interval) {
    const _callbacks = typeof callbacks === "function" ? [callbacks] : (Array.isArray(callbacks) ? callbacks : []);
    _callbacks.forEach(c => {
      setTimeout(c, interval);
    });
  }

  interval(callbacks, interval) {
    const _callbacks = typeof callbacks === "function" ? [callbacks] : (Array.isArray(callbacks) ? callbacks : []);
    _callbacks.forEach(c => {
      setInterval(c, interval);
    });
  }

  #handleEvent(el, type, callback) {
    const els = Array.isArray(el) ? el : [el];
    els.forEach(e => {
      e.removeEventListener(type, callback);
      e.addEventListener(type, callback);
    });
  }

  style(el, obj) {
    const els = Array.isArray(el) ? el : [el];
    els.forEach(e => {
      for (let key in obj) {
        e.style[key] = obj[key];
      }
    });
  }

  render(template, obj) {
    return Mustache.render(template, obj);
  }

  onClick(el, callback) {
    this.#handleEvent(el, 'click', callback);
  }
   // Event listener for double-click
   onDoubleClick(el, callback) {
    this.#handleEvent(el, 'dblclick', callback);
  }

  // Event listener for keydown
  onKeyDown(el, callback) {
    this.#handleEvent(el, 'keydown', callback);
  }

  // Event listener for keyup
  onKeyUp(el, callback) {
    this.#handleEvent(el, 'keyup', callback);
  }

  // Event listener for mouseenter
  onMouseEnter(el, callback) {
    this.#handleEvent(el, 'mouseenter', callback);
  }

  // Event listener for mouseleave
  onMouseLeave(el, callback) {
    this.#handleEvent(el, 'mouseleave', callback);
  }

  // Event listener for mousemove
  onMouseMove(el, callback) {
    this.#handleEvent(el, 'mousemove', callback);
  }

  // Event listener for contextmenu (right-click)
  onContextMenu(el, callback) {
    this.#handleEvent(el, 'contextmenu', callback);
  }

  // Event listener for dragstart
  onDragStart(el, callback) {
    this.#handleEvent(el, 'dragstart', callback);
  }

  // Event listener for dragend
  onDragEnd(el, callback) {
    this.#handleEvent(el, 'dragend', callback);
  }

  // Event listener for dragover
  onDragOver(el, callback) {
    this.#handleEvent(el, 'dragover', callback);
  }

  // Event listener for drop
  onDrop(el, callback) {
    this.#handleEvent(el, 'drop', callback);
  }

  // Event listener for touchstart
  onTouchStart(el, callback) {
    this.#handleEvent(el, 'touchstart', callback);
  }

  // Event listener for touchend
  onTouchEnd(el, callback) {
    this.#handleEvent(el, 'touchend', callback);
  }

  // Event listener for touchmove
  onTouchMove(el, callback) {
    this.#handleEvent(el, 'touchmove', callback);
  }

  // Event listener for touchcancel
  onTouchCancel(el, callback) {
    this.#handleEvent(el, 'touchcancel', callback);
  }
  // hooks
  #useStorage(prefix,type){
    let fn;
    switch(type){
      case 'localStorage':
        fn = window.localStorage;
        break;
      case 'sessionStorage':
        fn = window.sessionStorage;
        break;
    }
    if(!fn) return
    return {
      set(key,value){
        const name = prefix ? `${prefix}.${key}` : key;
        try{
          fn.setItem(name,JSON.stringify(value))
        }catch(err){}
      },
      get(key){
        const name = prefix ? `${prefix}.${key}` : key;
        const item = fn.getItem(name);
        try{
          return item ? JSON.parse(item) : undefined
        }catch(err){}
      },
      delete(key){
        const name = prefix ? `${prefix}.${key}` : key;
        fn.removeItem(name)
      },
      watch:(callback)=>{
        this.#handleEvent(window,'storage',(e)=>{
          console.log("???")
          callback(e)
        })
      }
    }
  }
  useLocalStorage(prefix){
    return this.#useStorage(prefix,'localStorage')
  }
  useSessionStorage(prefix){
    return this.#useStorage(prefix,'sessionStorage');
  }
  get model(){
    const obj = {
      textContent:(el,ref)=>{
        if(!el || !ref) return
        if(!ref._effects){
          ref = this.ref(ref)
        }
        const tagName = el.tagName.toLowerCase();
        this.watch(ref,()=>{
          el.textContent = ref.value;
        },{
          execute:true
        })
      },
      innerHTML:(el,ref)=>{
        if(!el || !ref) return
        if(!ref._effects){
          ref = this.ref(ref)
        }
        const tagName = el.tagName.toLowerCase();
        this.watch(ref,()=>{
          el.innerHTML = ref.value
        },{
          execute:true
        })
      },
      value:(el,ref)=>{
        if(!el || !ref) return
        if(!ref._effects){
          ref = this.ref(ref)
        }
        if(el.type === "checkbox"){
          const syncElToref = ()=>{
            ref.value = el.checked;
          }
          const syncRefToEl = ()=>{
            el.checked = ref.value? true : false
          }
          this.#handleEvent(el,'change',syncElToref);
          syncRefToEl();
        }
        this.watch(ref,()=>{
          if(el.type === "checkbox"){
            el.checked = ref.value? true : false
          }
          if(el.type === "text" || el.type === "password"){
            el.value = ref.value
            el.addEventListener('input',e=>{
              ref.value = el.value;
            })
          }
        })
      }
    }
    return obj;
  }
}

const pue = Object.freeze(new Pue());
if(typeof window === "object"){
    window.pue = pue;
}
export default pue;
