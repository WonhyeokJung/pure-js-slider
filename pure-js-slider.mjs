// Slide 제어
function prevSlide(jsSlider) {
  const {
    params,
    tags
  } = jsSlider;

  const speed = params.transitionSpeed;
  jsSlider.translate += 100;
  jsSlider.curIdx -= 1;
  tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
  if (params.direction === 'vertical') {
    tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
  } else {
    tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
  }
}

function nextSlide(jsSlider) {
  // debugger;
  const {
    params,
    tags,
  } = jsSlider;
  const speed = params.transitionSpeed;
  jsSlider.translate -= 100;
  jsSlider.curIdx += 1;
  tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
  if (params.direction === 'vertical') {
    tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
  } else {
    tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
  }
}

// touchmove, pointermove
function moveSlide(jsSlider) {
  const {
    params,
    tags,
    moves
  } = jsSlider;
  let curr = (moves.curr - moves.start) * 100;
  tags.sliderWrapper.style.transitionDuration = `${0}ms`;
  if (params.direction === 'vertical') {
    curr /= params.height;
    if (curr < 100 && curr > -100) {
      tags.sliderWrapper.style.transform = `translate3d(0, ${curr + jsSlider.translate}%, 0)`;
    }
  } else {
    curr /= params.width;
    if (curr < 100 && curr > -100) {
      tags.sliderWrapper.style.transform = `translate3d(${curr + jsSlider.translate}%, 0, 0)`;
    }
  } 
}

function updateActiveSlide(jsSlider) {
  const {
    params,
    tags,
    moves
  } = jsSlider;

  // moved >20%?
  if (params.direction === 'vertical') {
    if ((moves.end - moves.start) / params.height > 0.2) {
      prevSlide(jsSlider);
    } else if ((moves.start - moves.end) / params.height > 0.2) {
      nextSlide(jsSlider);
    } else {
      const speed = params.transitionSpeed;
      tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    }
  } else {
    if ((moves.end - moves.start) / params.width > 0.2) {
      prevSlide(jsSlider);
    } else if ((moves.start - moves.end) / params.width > 0.2) {
      nextSlide(jsSlider);
    } else {
      const speed = params.transitionSpeed;
      tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }
  }
}

let slides = {
  nextSlide,
  prevSlide,
  moveSlide,
  updateActiveSlide,
}

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}

// allmodulesparams에 모듈 투입과정
function extend() {
  // 받아온 params 세팅(보통 allmodulesparams)
  const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  // console.log(to)
  // console.log(arguments)
  const noExtend = ['__proto__', 'constructor', 'prototype'];

  // 보낸 params 하나씩 돌면서 체크
  for (let i = 1; i < arguments.length; i += 1) {
    // allModulesParams 다음 매개변수로 받은 모듈별 arguments
    const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];

    if (nextSource !== undefined && nextSource !== null) {
      // noExtend 내에 있는 key (value 빼고) 넣기
      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
      // console.log(keysArray, "this is keysarray")
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        // 키값
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        // console.log(`to : ${JSON.stringify(nextSource[nextKey])} \n`, "nextKey : ", nextKey, '\n', "nextSource:", nextSource, "\n nextSource[nextKey]", nextSource[nextKey])
        if (desc !== undefined && desc.enumerable) {
          // console.log(to, desc, nextKey, to[nextKey], nextSource[nextKey]);
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__slider__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};

            if (nextSource[nextKey].__slider__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to
}

function extendParams(userParams, allModulesParams) {
  // module's let setParams = func (obj) {}
  return function (obj) {
    if (obj == null) {
      obj = {};
    }
    
    // module name / module parameters 
    // console.log(obj, userParams, allModulesParams);
    const moduleName = Object.keys(obj)[0];
    const moduleParams = obj[moduleName];

    if (typeof userParams !== 'object' || userParams == null) {
      extend(allModulesParams, obj);
      return
    }

    // search key named 'enabled' & current moduleName in keys of userParamsObj
    if (!(moduleName in userParams && 'enabled' in moduleParams)) {
      extend(allModulesParams, obj);
      return
    }

    // autoplay : { obj }로 사용자가 보낸 경우 enabled = true 로;
    if (typeof userParams[moduleName] === 'object' && !('enabled' in userParams[moduleName])) {
      userParams[moduleName].enabled = true;
    }

    // true or object
    if (userParams[moduleName] === true) {
      userParams[moduleName] = {
        enabled: true
      }
    }
    
    if (!userParams[moduleName]) {
      userParams[moduleName] = {
        enabled: false
      }
    }
    extend(allModulesParams, obj);
  }
}


//default settings
let defaults = {
  init: true,
  direction: 'horizontal',
  //class
  pointerEventTarget: '.slider-wrapper',
  arrowClass: '.slider-arrow',
  prevArrow: '.slider-arrow__prev',
  nextArrow: '.slider-arrow__next',
  slideClass: '.slider-slide',
  pagination: '.slider-pagination',
  
  
  width: null,
  height: null,
  
  slidePerView: 1,
  transitionSpeed: 300,

  autoHeight: false,
  
  useArrow: true,
  loop: true,

  allowSlidePrev: true,
  allowSlideNext: true,
}
const extendedDefaults = {};

export default class PureJsSlider {
  // Arguments Rest Parameter
  constructor(...args) {
    let el;  // 
    let $el;
    let userParams;
    let slideLength;

    // userParams se
    if (args.length === 1 && args[0].constructor && typeof args[0] === 'Object') {
      userParams = args[0];
    } else {
      [el, userParams] = args;

    }
    if (!userParams) userParams = {};

    userParams = extend({}, userParams);

    if (el && !userParams.el) userParams.el = el;
    $el = document.querySelector(el);
    const jsSlider = this;
    // module 삽입
    jsSlider.modules = [...jsSlider.__modules__];
    jsSlider.eventsListeners = {};
    // jsSlider.eventListener = eventListener(document.querySelector('#on-navigation-arrows'), 'click', function () { alert('clicked') });
    const allModulesParams = {};
    jsSlider.modules.forEach(module => {
      module({
        jsSlider,  // class
        setParams: extendParams(userParams, allModulesParams),  // parameter object
        on: jsSlider.on.bind(jsSlider),  // this == class PureJsSlider
        off: jsSlider.off.bind(jsSlider),
        trigger: jsSlider.trigger.bind(jsSlider),
      });
      
    });
    const sliderParams = extend({}, defaults, allModulesParams);
    jsSlider.params = extend({}, sliderParams, extendedDefaults, userParams);
    // slide 이미지 길이
    slideLength = $el.querySelector('.slider-wrapper')? $el.querySelector('.slider-wrapper').children.length : $el.querySelector(jsSlider.params.pointerEventTarget).children.length;
    // 객체 merge
    Object.assign(jsSlider, {
      el,
      $el,
      slideLength,
      classNames: [],
      
      // idx
      realIdx: 0,
      curIdx: 1,
      
      prevTranslate: 0,
      translate: -100,
      
      allowSlidePrev: jsSlider.params.allowSlidePrev,
      allowSlideNext: jsSlider.params.allowSlideNext,
      
      // 이벤트 관리
      addEvent: addEvent,
      removeEvent: removeEvent,

      touchEvents: function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        const pc = ['pointerdown', 'pointermove', 'pointerup'];
      },
      
      moveEventsData: {
        transitionStart: false,
        transitionEnd: true,
      },

      moves: {
        start: 0,
        curr: 0,
        end: 0,
      },
      
      userSettingsData: {
        navigationArrows: false,
        navigationBullets: false,
        paginationNumber: false,
        paginationBullets: false,
      },

      tags: {
        sliderWrapper: $el.querySelector(jsSlider.params.pointerEventTarget) || $el.querySelector('.slider-wrapper'),
        slides: $el.querySelector(jsSlider.params.pointerEventTarget).children || $el.querySelector('.slider-wrapper').children,
        prevArrow: $el.querySelector(jsSlider.params.prevArrow) || $el.querySelector('.slider-arrow__prev'),
        nextArrow: $el.querySelector(jsSlider.params.nextArrow) || $el.querySelector('.slider-arrow__next'),
        pagination: $el.querySelector(jsSlider.params.pagination) || $el.querySelector('.slider-pagination'),
        pageNumber: $el.querySelector(jsSlider.params.pageNumber) || $el.querySelector('.slider-page-number')
      },
    });

    if (jsSlider.params.init) {
      jsSlider.init();
    }

    // option 사용자 선택
    // document.querySelector('.slider-setting-buttons__button--confirm').addEventListener('click', function () {
    //   const result = confirm('적용하시겠습니까?');
    //   if (result) {
    //     let checkboxes = document.querySelector('.slider-setting-list').children;
    //     // 내부 컴포넌트 수정할 때마다 params 길이를 바꿔주어야해서 div구조를 변경할 필요가 있음.
    //     for (let i = 1; i < checkboxes.length; i++) {
    //       console.log(checkboxes[i].children[0])
    //       if (checkboxes[i].children[0].checked) {
    //         // kebab-case > camelCase
    //         jsSlider[checkboxes[i].children[0].dataset.target.replace('-', ' ').replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())] = true;
    //       } else {
    //         console.log(checkboxes[i].children[0]);
    //         jsSlider[checkboxes[i].children[0].dataset.target.replace('-', ' ').replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())] = false;  
    //       }
          
    //     }
    //     console.log(jsSlider);
    //     jsSlider.mount();
    //   } else {
    //     alert('적용을 취소하셨습니다.');
    //   };
    // });
  }  // constructor

  // add DOM
  mount() {
    const jsSlider = this;
    const sliderWrapper = jsSlider.tags.sliderWrapper;
    const slides = jsSlider.tags.slides;
    if (jsSlider.params.pointerEventTarget !== '.slider-wrapper') {
      sliderWrapper.classList.add('slider-wrapper');
    }

    if (jsSlider.el !== '.slider') {
      jsSlider.$el.classList.add('slider');
    }
    // size
    if (!jsSlider.params.width && !jsSlider.params.height) {
      jsSlider.$el.classList.add('slider-default-size');
      jsSlider.params.width = 1200;
      jsSlider.params.height = jsSlider.params.width * 3 / 4;
    }
    if (jsSlider.params.width) {
      jsSlider.$el.style.width = `${jsSlider.params.width}px`;
      if (jsSlider.params.height) {
        jsSlider.$el.style.height = `${jsSlider.params.height}px`;
      } else {
        jsSlider.params.height = jsSlider.params.width * 3 / 4;
        jsSlider.$el.style.height = `${jsSlider.params.height}px`;
      }
    } else {
      jsSlider.$el.style.height = `${jsSlider.params.height}px`;
      jsSlider.params.width = jsSlider.params.height * 4 / 3;
      jsSlider.$el.style.width = `${jsSlider.params.width}px`;
    }

    if (jsSlider.params.direction === 'vertical') {
      sliderWrapper.classList.add('vertical');
    } else {
      // jsSlider.params.direction = 'horizontal';
      sliderWrapper.classList.add('horizontal');
    }
    if (slides) {
      // clone slide
      console.log(jsSlider)
      console.log(slides.length, slides);
      sliderWrapper.insertBefore(slides[slides.length-1].cloneNode(true), slides[0]);
      sliderWrapper.appendChild(slides[1].cloneNode(true));
      console.log(sliderWrapper, slides.length);
    }
    return true;
  }
  
  init() {
    console.log('init() in');
    const jsSlider = this;
    const mounted = jsSlider.mount();
    
    // 각 모듈 init 실행
    if (mounted) {
      console.log('start init');
      jsSlider.trigger('init');
    }
  }

  static installModule(module) {
    if(!PureJsSlider.prototype.__modules__) PureJsSlider.prototype.__modules__ = [];
    const modules = PureJsSlider.prototype.__modules__;
    // console.log(PureJsSlider.prototype.__modules__);
    if (typeof module === 'function' && modules.indexOf(module) < 0) {
      modules.push(module);
    }
  }

  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => PureJsSlider.installModule(m));
      return PureJsSlider;
    }
    PureJsSlider.installModule(module);
    return PureJsSlider;
  }
}

// 중복되는 이벤트 리스너 한번에? 작동함. 코드가 복잡해져서 각 function에서 한번에 쏴주는 구조로 만드는 것이 필요하다고 보임.
function addEvent(el, event, handler) {
  return el.addEventListener(event, handler)
}

function removeEvent(el, event, handler) {
  return el.removeEventListener(event, handler)
}

// const arrowBox = document.querySelector('#on-navigation-arrows');
// arrowBox.addEventListener('change', function () {
//   if (arrowBox.checked) {
//     // el.classList.add('arrow-active');
//   }
// })

let eventsEmitter = {
  on(events, handler, priority) {
    const self = this;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },

  off(events, handler) {
    const self = this;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },

  trigger(...args) {
    const self = this;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;
    
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      // handler 있을 시 handler 복사
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }

    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          // activate event
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
  
};

// prototype에 공통 method 추가
const prototypes = {
  slides,
  eventsEmitter,
};

Object.keys(prototypes).forEach(prototypegroup => {
  Object.keys(prototypes[prototypegroup]).forEach(protoMethod => {
    PureJsSlider.prototype[protoMethod] = prototypes[prototypegroup][protoMethod];
    // console.log(PureJsSlider.prototype);
  })
})

// detect DOM changes
// const observer = new MutationObserver(function (mutation) {
//   console.log('mutation observed!', mutation);
// });
// const slider = document.querySelector('.slider');
// observer.observe(slider, {
//   attributes: true,
//   childList: true,
//   subtree: true,
// });

// userSetting
// userSetting 확인 들어오면 off('autoplay') 등으로 방지
function userSetting(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;
  let autoSlideControl;
  
  // 외부 변경이 필요없는 params
  jsSlider.userSetting = {};
  // run let setParams = func (obj) {}, 외부변경을 수용할 params
  setParams({
    userSetting: {
      enabled: false,
    }
  });
  
  // virtual DOM
  function h(type, props, ...children) {
    return { type, props, children: children.flat() };
  }
  const attrs = [
    { id: 'on-direction-vertical', className: 'slider-setting-list__checkbox', content: '세로 슬라이드', dataTarget: 'direction' },
    { id: 'on-navigation-arrows', className: 'slider-setting-list__checkbox', content: '네비게이션 화살표', dataTarget: 'navigation-arrows' },
    { id: 'on-navigation-bullets', className: 'slider-setting-list__checkbox', content: '네비게이션 불릿', dataTarget: 'navigation-bullets' },
    { id: 'on-pagination-number', className: 'slider-setting-list__checkbox', content: '페이지 수', dataTarget: 'pagination-number' },
    { id: 'on-pagination-bullets', className: 'slider-setting-list__checkout', content: '페이지 불릿', dataTarget: 'pagination-bullets' },
  ]
  function createDom(node) {
    const $el = document.createElement(node.type);
    Object.entries(node.props || {})
          .filter(([attr, value]) => value)
          .forEach(([attr, value]) => {
            if (attr === 'content') {
              $el.innerText = value;
            } else if (attr === 'dataTarget') {
              $el.setAttribute('data-target', value);
            } else {
              $el.setAttribute(attr, value);
            }
          });
  
    const children = node.children.map(createDom);
    children.forEach(child => $el.appendChild(child));
  
    return $el
  }
  
  // create User Setting DOM
  function userSettings() { 
    const settingDom = createDom(
      h('div', { class: 'slider-setting'},
        h('div', { class: 'slider-setting-container' },
          h('h6', { content: '설정' }),
          h('ul', { class: 'slider-setting-list' },
            attrs.map(({ id, className, content, dataTarget }) => 
              h('li', null,
                h('input', { type: 'checkbox', id: id, dataTarget: dataTarget }),
                h('label', { for: id, content: content })
              )
            )
          ),
          h('div', { class: 'slider-setting-buttons' },
            h('button', { class: 'slider-setting-buttons__button--confirm', content: '적용' }),
            h('button', { class: 'slider-setting-buttons__button--cancel', content: '리셋(취소)' })
          ),
          h('p', { content: '설정 적용시 현재 보고 계신 화면이 초기화됩니다.' })
        )
      )
    );
  
    document.querySelector(jsSlider.el).appendChild(settingDom);
  };

  // init
  on('init', function () {
    if (jsSlider.params.userSetting.enabled) {
      userSettings();
    }
  })
}

// 자동재생
// jsSlider.modules.forEach 통해서 _ref 전달됨.
function autoplay(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;
  let autoSlideControl;

  // 외부 변경이 필요없는 params
  jsSlider.autoplay = {
    running: false,
    paused: false,
  }
  // run let setParams = func (obj) {}, 외부변경을 수용할 params
  setParams({
    autoplay: {
      enabled: false,
      toForward: true,
      delay: 3300,
      waitForTransition: true,
      disableOnInteraction: false,
      pauseOnInteraction: true,
    }
  });
  function autoNextSlide() {
    const {
      params,
      tags,
    } = jsSlider;
    
    if (!jsSlider.moveEventsData.transitionEnd) return;
    jsSlider.moveEventsData.transitionEnd = false;

    const speed = params.transitionSpeed;
    jsSlider.translate -= 100;
    jsSlider.curIdx += 1;
    tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }
  }

  function autoPrevSlide() {
    const {
      params,
      tags,
    } = jsSlider;
  
    if (!jsSlider.moveEventsData.transitionEnd) return;
    jsSlider.moveEventsData.transitionEnd = false;

    const speed = params.transitionSpeed;
    jsSlider.translate += 100;
    jsSlider.curIdx -= 1;
    tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }

  }

  function run() {
    if (jsSlider.autoplay.running) return;
    let delay = jsSlider.params.autoplay.delay;
    jsSlider.autoplay.running = true;
    jsSlider.autoplay.paused = false;

    attachTransitionEvent();
    
    // params 있는 함수 보낼때 setInterval
    if (jsSlider.params.autoplay.toForward) {
      autoSlideControl = setInterval(autoNextSlide, delay);
    } else {
      autoSlideControl = setInterval(autoPrevSlide, delay);
    }
  }

  function pause() {
    if (!jsSlider.autoplay.running) return;
    if (jsSlider.autoplay.paused) return;
    jsSlider.autoplay.running = false;
    jsSlider.autoplay.paused = true;
    
    detachTransitionEvent();

    if (autoSlideControl) clearInterval(autoSlideControl);
    // debugger;
  }
  
  function start() {
    if (jsSlider.autoplay.running) return;
    on('runAutoplay', () => {
      run(); 
    })
    trigger('runAutoplay');
  }
  
  // remove eventListener
  function stop() {
    clearInterval(autoSlideControl);
    off('runAutoplay');
  }
  
  function onTouchStart() {
    if (jsSlider.params.autoplay.disableOnInteraction) {
      return stop();
    }
    pause();
  }
  
  function onTouchEnd() {
    run();
  }
  
  function onPointerEnter(e) {
    if (e.pointerType !== 'mouse') return;
    jsSlider.moveEventsData.transitionEnd = false;
    if (jsSlider.params.autoplay.disableOnInteraction) {
      return stop();
    }
    pause();
  }
  
  function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return;
    // jsSlider.$el.removeEventListener('pointerenter', onPointerEnter);
    jsSlider.moveEventsData.transitionEnd = true;
    run();
  }

  function onTransitionStart() {
    // delay가 빠른 경우 여기서 방지가 필요함.
    jsSlider.moveEventsData.transitionEnd = false;
  }

  function onTransitionEnd() {
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      jsSlider.curIdx = jsSlider.slideLength;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      jsSlider.curidx = 1;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }

    jsSlider.moveEventsData.transitionEnd = true;
  }
  
  // active 화면 체크
  function onVisibilityChange() {
    if (document.hidden && jsSlider.autoplay.running) {
      pause();
    } else {
      run();
    }
  }
  
  function attachTouchEvent() {
    jsSlider.addEvent(jsSlider.$el, 'touchstart', onTouchStart);
    jsSlider.addEvent(jsSlider.$el, 'touchend', onTouchEnd);
  }
  
  function attachMouseEvent() {
      jsSlider.addEvent(jsSlider.$el, 'pointerenter', onPointerEnter);
      jsSlider.addEvent(jsSlider.$el, 'pointerleave', onPointerLeave);
  }
  
  function attachTransitionEvent() {
    jsSlider.addEvent(jsSlider.$el, 'transitionstart', onTransitionStart);
    jsSlider.addEvent(jsSlider.$el, 'transitionend', onTransitionEnd);
  }

  function detachTransitionEvent() {
    jsSlider.removeEvent(jsSlider.$el, 'transitionstart', onTransitionStart);
    jsSlider.removeEvent(jsSlider.$el, 'transitionend', onTransitionEnd);
  }

  on('init', () => {
    if (jsSlider.params.autoplay.enabled) {
      jsSlider.addEvent(document, 'visibilitychange', onVisibilityChange);

      if (jsSlider.params.autoplay.pauseOnInteraction) {
        attachTouchEvent();
        attachMouseEvent();
        // attachTransitionEvent();
      }

      start();
    }
  })
}

// touch
function touchMove(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;

  jsSlider.touchMove = {
    touchStart: false,
  }

  setParams({
    touchMove: {
      enabled: true,
      waitForTransition: true,
    }
  });

  function onTouchStart(e) {
    jsSlider.touchMove.touchStart = true;
    // change translate
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      jsSlider.curIdx = jsSlider.slideLength;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      jsSlider.curIdx = 1;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }

    // 
    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.start = e.targetTouches[0].clientY;
    } else {
      jsSlider.moves.start = e.targetTouches[0].clientX;
    }
    return
  }

  function onTouchMove(e) {
    if (!jsSlider.touchMove.touchStart) return;

    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.curr = e.targetTouches[0].clientY;
    } else {
      jsSlider.moves.curr = e.targetTouches[0].clientX;
    }
    return jsSlider.moveSlide(jsSlider);
  }

  function onTouchEnd(e) {
    jsSlider.touchMove.touchStart = false;

    const speed = jsSlider.params.transitionSpeed;
    jsSlider.tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.end = e.changedTouches[0].clientY;
    } else {
      jsSlider.moves.end = e.changedTouches[0].clientX;
    }
    return jsSlider.updateActiveSlide(jsSlider);
  }

  function start() {
    jsSlider.addEvent(jsSlider.$el, 'touchstart', onTouchStart);
    jsSlider.addEvent(jsSlider.$el, 'touchmove', onTouchMove);
    jsSlider.addEvent(jsSlider.$el, 'touchend', onTouchEnd);
    return
  }

  on('init', () => {
    if (jsSlider.params.touchMove.enabled) {
      start();
    }
  })
}

// pointerMove
function pointerMove(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;

  jsSlider.pointerMove = {
    pointerDown: false,
  }

  setParams({
    pointerMove: {
      enabled: true,
      waitForTransition: true,
    }
  });

  function onPointerDown(e) {
    if (e.pointerType === 'touch') return;
    jsSlider.pointerDown = true;

    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      jsSlider.curIdx = jsSlider.slideLength;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      jsSlider.curIdx = 1;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }

    // 
    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.start = e.clientY;
    } else {
      jsSlider.moves.start = e.clientX;
    }
    return
  }

  function onPointerMove(e) {
    if (!jsSlider.pointerDown || e.pointerType === 'touch') return;
    e.preventDefault();
    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.curr = e.clientY;
    } else {
      jsSlider.moves.curr = e.clientX;
    }
    return moveSlide(jsSlider);
  }

  function onPointerUp(e) {
    if (e.pointerType === 'touch') return;
    
    jsSlider.pointerDown = false;
    const speed = jsSlider.params.transitionSpeed;
    jsSlider.tags.sliderWrapper.style.transitionDuration = `${speed}ms`;

    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.end = e.clientY;
    } else {
      jsSlider.moves.end = e.clientX;
    }
    return jsSlider.updateActiveSlide(jsSlider);
  }

  function onPointerLeave(e) {
    if (!jsSlider.pointerDown) return;
    jsSlider.pointerDown = false;

    const speed = jsSlider.params.transitionSpeed;
    jsSlider.tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (jsSlider.params.direction === 'vertical') {
      jsSlider.moves.end = e.clientY;
    } else {
      jsSlider.moves.end = e.clientX;
    }

    return jsSlider.updateActiveSlide(jsSlider);
  }

  function start() {
    jsSlider.addEvent(jsSlider.tags.sliderWrapper, 'pointerdown', onPointerDown);
    jsSlider.addEvent(jsSlider.tags.sliderWrapper, 'pointermove', onPointerMove);
    jsSlider.addEvent(jsSlider.tags.sliderWrapper, 'pointerup', onPointerUp);
    jsSlider.addEvent(jsSlider.tags.sliderWrapper, 'pointerleave', onPointerLeave);
  }

  on('init', () => {
    if (jsSlider.params.pointerMove.enabled) {
      start();
    }
  })
}

// arrow
function arrow(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;

  jsSlider.arrow = {
    transitionEnd: true,
  }

  setParams({
    useArrow: {
      enabled: true,
      followDirection: true,
    }
  });
  
  function onPrevClick(e) {
    if (!jsSlider.arrow.transitionEnd) return;
    jsSlider.arrow.transitionEnd = false;
    return jsSlider.prevSlide(jsSlider);
  }
  
  function onNextClick(e) {
    if (!jsSlider.arrow.transitionEnd) return;
    jsSlider.arrow.transitionEnd = false;
    return jsSlider.nextSlide(jsSlider);
  }

  function onTransitionEnd(e) {
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      jsSlider.curIdx = jsSlider.slideLength;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      jsSlider.curIdx = 1;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }
    
    jsSlider.arrow.transitionEnd = true;
  }

  function start() {
    // if (jsSlider.params.arrowClass !== '.slider-arrow') {
    //   jsSlider.tags.prevArrow.classList.add('slider-arrow');
    //   jsSlider.tags.nextArrow.classList.add('slider-arrow');
    // }

    // 방향 설정
    if (jsSlider.params.useArrow.followDirection) {
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.prevArrow.classList.add('slider-arrow-vertical__prev');
        jsSlider.tags.nextArrow.classList.add('slider-arrow-vertical__next');
        // after 대용
        if (!jsSlider.tags.prevArrow.innerHTML) {
          jsSlider.tags.prevArrow.innerHTML = `<div>&lt;</div>`;
        }
        if (!jsSlider.tags.nextArrow.innerHTML) {
          jsSlider.tags.nextArrow.innerHTML = `<div>&gt;</div>`;
        }
      } else {
        jsSlider.tags.prevArrow.classList.add('slider-arrow-horizontal__prev');
        jsSlider.tags.nextArrow.classList.add('slider-arrow-horizontal__next');
      }
    } else {
      jsSlider.tags.prevArrow.classList.add('slider-arrow-horizontal__prev');
      jsSlider.tags.nextArrow.classList.add('slider-arrow-horizontal__next');
    }

    // default 아이콘 숨기기
    if (jsSlider.tags.prevArrow.innerHTML) {
      jsSlider.tags.prevArrow.classList.add('slider-arrow-no-after');
    }
    if (jsSlider.tags.nextArrow.innerHTML) {
      jsSlider.tags.nextArrow.classList.add('slider-arrow-no-after');
    }

    jsSlider.addEvent(jsSlider.tags.prevArrow, 'click', onPrevClick);
    jsSlider.addEvent(jsSlider.tags.nextArrow, 'click', onNextClick);
    jsSlider.addEvent(jsSlider.$el, 'transitionend', onTransitionEnd);

  }

  function stop() {
    jsSlider.tags.prevArrow.classList.add('disable');
    jsSlider.tags.nextArrow.classList.add('disable');

    jsSlider.removeEvent(jsSlider.tags.prevArrow, 'click', onPrevClick);
    jsSlider.removeEvent(jsSlider.tags.nextArrow, 'click', onNextClick);
    jsSlider.removeEvent(jsSlider.$el, 'transitionend', onTransitionEnd);
  }

  on('init', () => {
    if (!jsSlider.tags.prevArrow || !jsSlider.tags.nextArrow) return;
    if(jsSlider.params.useArrow.enabled) {
      start();
    } else {
      stop();
    }
  })
}


function pagination(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;

  jsSlider.pagination = {
  }

  setParams({
    usePagination: {
      enabled: false,
      dynamic: false,
      clickable: false,
      followDirection: true,
    }
  });

  function start() {
    const target = jsSlider.tags.sliderWrapper;
    const option =  {
      attributes: true,
      attributeFilter: ['style'],
    }

    const observer = new MutationObserver((mutations) => {
      for (const dot of jsSlider.tags.pagination.children) {
        if ((jsSlider.slideLength + 1)* 100 === -jsSlider.translate && dot.dataset.index === "1") {
          dot.classList.add('slider-pagination__dot--active');
        } else if (jsSlider.translate === 0 && dot.dataset.index/1 === jsSlider.slideLength) {
          dot.classList.add('slider-pagination__dot--active');
        } else if (dot.dataset.index/1 === jsSlider.translate / (-100)) {
          dot.classList.add('slider-pagination__dot--active');
        } else {
          dot.classList.remove('slider-pagination__dot--active');
        }
      }
    })

    observer.observe(target, option);
  }

  function onClick(e) {
    const {
      tags
    } = jsSlider;

    // for (const dot of tags.pagination.children) {
    //   if (dot.dataset.index !== this.dataset.index) {
    //     dot.classList.remove('slider-pagination__dot--active');
    //   }
    // }

    jsSlider.translate = this.dataset.index * (-100);
    // type변경
    jsSlider.curIdx = this.dataset.index / 1;

    tags.sliderWrapper.style.transitionDuration = `${jsSlider.params.transitionSpeed}ms`;
    if (jsSlider.params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }
    // this.classList.add('slider-pagination__dot--active');
  }

  function create() {
    if (jsSlider.tags.pagination !== '.slider-pagination') {
      jsSlider.tags.pagination.classList.add('slider-pagination');
    }
    if (jsSlider.params.usePagination.followDirection && jsSlider.params.direction === 'vertical') {
      jsSlider.tags.pagination.classList.add('slider-pagination-vertical');
    }

    for (let i = 0; i < jsSlider.slideLength; i++) {
      let dot = document.createElement('span');
      if (jsSlider.params.usePagination.dynamic) {
        dot.setAttribute('class', 'slider-pagination__dot--dynamic')
      } else {
        dot.setAttribute('class', 'slider-pagination__dot');
      }

      if (jsSlider.params.usePagination.clickable) {
        dot.classList.add('slider-pagination__dot--click');
        jsSlider.addEvent(dot, 'click', onClick);
      }
      dot.dataset.index = i + 1;
      jsSlider.tags.pagination.appendChild(dot);
    }

    jsSlider.tags.pagination.children[0].classList.add('slider-pagination__dot--active')

    start();
  }

  function destroy() {
    off('init')
  }

  on('init', () => {
    if (!jsSlider.tags.pagination) return;
    if (!jsSlider.params.usePagination.enabled) return;
    create();
  })
}

function pageNumber(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;

  jsSlider.pagination = {
  }

  setParams({
    usePageNumber: {
      enabled: false,
    }
  });

  function run() {
    const pageNum = document.querySelector('.slider-page-number__content');
    const target = jsSlider.tags.sliderWrapper;
    const option =  {
      attributes: true,
      attributeFilter: ['style'],
    }
  
    const observer = new MutationObserver((mutations) => {
      if (jsSlider.curIdx === (jsSlider.slideLength + 1)) {
        jsSlider.curIdx = 1;
      } else if (jsSlider.curIdx === 0) {
        jsSlider.curIdx = jsSlider.slideLength;
      }
      pageNum.innerHTML = `${jsSlider.curIdx} / ${jsSlider.slideLength}`;
    })
  
    observer.observe(target, option);
  }

  function create() {
    const pageNum = document.createElement('div');
    jsSlider.tags.pageNumber.appendChild(pageNum);
    pageNum.classList.add('slider-page-number__content');
    pageNum.innerHTML = `${jsSlider.curIdx} / ${jsSlider.slideLength}`;
    run();
  }

  on('init', () => {
    if (!jsSlider.params.usePageNumber.enabled) return;
    create();
  })
}

const modules = [userSetting, autoplay, touchMove, pointerMove, arrow, pagination, pageNumber];
PureJsSlider.use(modules);





