# DOCS

## 목차

---

0. [Pure JavaScript Slider](#Pure JavaScript Slider)
1. [CSS](#CSS)
   1. [:root](#:root)
   2. [Slider](#슬라이더)
   3. [Arrow](#화살표)
   4. [Page Number](#현재 페이지)
   4. [Pagination](#페이지네이션)
   4. [etc](#기타)
2. [JavaScript](#JavaScript)
   1. [Prototype 함수](#Prototypes)
      1. [Slides](#slides)
      2. [Events Emitter](#eventsEmitter)

   2. [Modules](#Modules)
      1. [Autoplay](#autoplay)
      2. [Touch Move](#touchMove)
      3. [Pointer Move](#pointerMove)
      4. [Arrow](#arrow)
      5. [Pagination](#Pagination)


---

## Pure JavaScript Slider

> [Swiper](https://swiperjs.com/)의 코드를 바탕으로 순수 자바스크립트 및 CSS로 개발된 슬라이더입니다.

- 현재 구현된 기능
  - 터치 이용한 슬라이드
  - 마우스 커서 이용한 슬라이드
  - 슬라이드 화살표
  - 슬라이드 페이지네이션
  - 슬라이드 현재 페이지

## CSS

> 코드에 작성되어 있으나 DOCS 내에 설명이 없는 경우 현재 적용하지 않고 있는 코드입니다.

### :root

```css
:root {
  color-scheme: dark;
  /* Slide Default Width */
  --slider-width: 1200px;
  /* Slide Default Height(4:3) */
  --slider-height: calc(var(--slide-width) * (3 / 4));
  /* 최소 slide width */
  --slider-min-width: 300px;
  /* 최대 slide width */
  --slider-max-width: 100vw;
  /* 최대 slide height(4:3) */
  --slider-max-height: calc(var(--slide-max-width) * (3 / 4));
  /* 페이지네이션 컴포넌트 width */
  --slider-pagination-dot-width: 10px;
  /* 페이지네이션 컴포넌트 height */
  --slider-pagination-dot-height: 10px;
  /* 페이지네이션 비활성화 컴포넌트 색, 불투명도 */
  --slider-pagination-dot-inactive-color: rgb(255,255,255);
  --slider-pagination-dot-inactive-opacity: 0.75;
}
```

### 슬라이더

#### .slider.slider-default-size

```css
.slider.slider-default-size {
  /* 슬라이더 기본 사이즈 1200*900(width 4 : 3 height) */
  width: var(--slider-width) !important;
  aspect-ratio: 4 / 3;
}
```



#### .slider

```css
.slider {
  position: relative;
	/* 화면 내 슬라이더 위치 조정 */
  left: 50%;
  transform: translate(-50%);
  /* 최대 크기(슬라이더 크기 조절) */
  max-width: var(--slider-max-width);
  max-height: var(--slider-max-height);
  border-radius: 5px;
  overflow: hidden;
}
```



#### .slider-wrapper

```css
.slider-wrapper {
  display: flex;
  position: relative;
  /* 슬라이더 내 슬라이드/이미지 크기 조절  */
  width: 100%;
  height: 100%;
  /* 커서 모양 grab */
  cursor: grab;
  /* 적용할 트랜지션 설정 */
  transition: transform 0ms ease;
}
```



#### .slider-wrapper.horizontal

- 가로 방향 슬라이더의 첫 슬라이드위치 지정

```css
.slider-wrapper.horizontal {
  transform: translate3d(-100%, 0, 0);
}
```



#### .slider-wrapper.vertical

- 세로 방향 슬라이더의 첫 슬라이드 위치 지정

```css
.slider-wrapper.vertical {
  flex-direction: column;
  transform: translate3d(0, -100%, 0);
}
```



#### .slider-slide

```css
.slider-slide {
  position: relative;
  /* .slider-wrapper에서 설정해둔 슬라이드 크기 적용 */
  min-width: 100%;
  min-height: 100%;
  /* 모서리 처리 */
  border-radius: 5px;
  /* 슬라이드 작동시 이미지 깜빡임 방지 */
  backface-visibility: hidden;
}
```



#### .slider-slide img

```css
.slider-slide img {
  /* 이미지 슬라이드 크기에 맞게 적용 */
  width:100%;
  height:100%;
  border-radius: 5px;
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  /* 비율에 맞춰 이미지 크기 확장 */
  object-fit: cover;
}
```



### 화살표

#### \[class^='slider-arrow']

```css
[class^='slider-arrow'] {
  border: none;
  /* 화살표 사이즈 조정 */
  font: bold 3rem sans-serif;
  /* 화살표 색상 */
  color: rgb(255,255,255); 
  z-index: 2;
  cursor: pointer;
  background: none;
  /* 화살표 수직 중앙 정렬 */
  vertical-align: middle;
  /* 블록 방지 */
  user-select: none;
}
```



#### .slider-arrow__prev

```css
.slider-arrow__prev {
  /* 이전 화살표 위치 조정 */
  position: absolute;
  transform: translate(-50%, -50%);
}
```



#### .slider-arrow-horizontal__prev

```css
.slider-arrow-horizontal__prev {
  /* 수평 슬라이드 이전 화살표 위치 조정 */
  top: 50%;
  left: 5%;
}
```



#### .slider-arrow-horizontal__prev::after

```css
.slider-arrow-horizontal__prev::after {
  /* 수평 슬라이드 이전 화살표 */
  content: '<';
}
```



#### .slider-arrow-vertical__prev

```css
.slider-arrow-vertical__prev {
  /* 수직 슬라이드 이전 화살표 위치 조정 */
  top: 5%;
  left: 50%;
}
```



#### .slider-arrow-vertial__prev *

```css
.slider-arrow-vertical__prev * {
  /* 수직 슬라이드 이전 화살표 위치 조정 */
  display: flex; 
  flex-direction: column;
  justify-content: flex-end;
  height: 50px; 
  transform: rotate(90deg);
}
```



#### .slider-arrow__next

```css
.slider-arrow__next {
  /* 다음 화살표 위치 조정 */
  position: absolute;
  transform: translate(-50%, -50%);
}
```



#### .slider-arrow-horizontal__next

```css
.slider-arrow-horizontal__next {
  /* 수평 슬라이드 다음 화살표 위치 조정 */
  top: 50%;
  left: 95%;
}
```



#### .slider-arrow-horizontal__next::after

```css
.slider-arrow-horizontal__next::after {
  /* 수평 슬라이드 다음 화살표 */
  content: '>';
}
```



#### .slider-arrow-vertical__next

```css
.slider-arrow-vertical__next {
  /* 수직 슬라이드 다음 화살표 위치 조정 */
  top: 95%;
  left: 50%;
}
```



#### .slider-arrow-vertical__next *

```css
.slider-arrow-vertical__next * {
  /* 수직 슬라이드 다음 화살표 위치 조정 */
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  height: 50px; 
  transform: rotate(90deg);
}
```



### 현재 페이지

#### div.slider-page-number

```css
div.slider-page-number {
  /* 하위속성 absolute 기준점 */
  position: relative;
  margin: 0px auto;
}
```



#### .slider-page-number__content

```css
.slider-page-number__content {
  display: flex;
  /* 컴포넌트 밖으로 넘치는 경우 돌출 */
  white-space: nowrap;
  /* absolute 위치 설정 */
  position: absolute;
  right: 10px;
  bottom: 20px;
  /* 현재 페이지 컴포넌트 크기 설정 */
  width: 50px;
  height: 20px;
  /* 모서리 */
  border-radius: 1rem;
  /* 배경색 */
  background-color: rgba(0, 0, 0, 0.15);
  /* 현재 페이지 폰트 관련 설정 */
  color: white;
  font-size: 12px;
  font-weight: 600;
  /* 가운데 정렬 */
  justify-content: center;
  align-items: center;
  z-index: 3;
}
```



### 페이지네이션

#### .slider-pagination

```css
.slider-pagination {
  /* absolute 이용한 컴포넌트 내 위치 정렬 */
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  z-index: 5;
}
```



#### .slider-pagination-vertical

```css
.slider-pagination-vertical {
  /* 수직 슬라이드 페이지네이션 위치 정렬 */
  display: flex;
  flex-direction: column;
  /* 좌측 배치 */
  /* flex-wrap: wrap; */
  /* left: 5%; */
  
  /* 우측 배치 */
  flex-wrap: wrap-reverse;
  left: 95%;
  justify-content: center;
  /* 배치 및 크기 조정 */
  bottom: 50%;
  height: 80%;
  overflow: visible;
  transform: translate(-50%, 50%);
}
```



#### .slider-pagination__dot

```css
.slider-pagination__dot {
  /* 페이지네이션 컴포넌트 크기 조절 위한 inline-block */
  display: inline-block;
  /* 가로/세로 길이 설정 */
  width: var(--slider-pagination-dot-width);
  height: var(--slider-pagination-dot-height);
  /* 컴포넌트간 간격 */
  margin: 4px 4px;
  /* 동그라미화 */
  border-radius: 50%;
  /* 뒷배경 및 불투명도 설정 */
  background: var(--slider-pagination-dot-inactive-color);
  opacity: var(--slider-pagination-dot-inactive-opacity);
  transform: scale(0.9);
}
```



#### .slider-pagination__dot--active

```css
.slider-pagination__dot--active {
  /* 활성화 중인 컴포넌트 색 및 불투명도 지정 */
  background-color: skyblue;
  opacity: 1;
}
```



#### .slider0pagination__dot--click

```css
.slider-pagination__dot--click {
  cursor: pointer;
}
```



### 기타

#### @media (pointer:coarse)

```css
@media (pointer:coarse) {
  /* 터치/모바일 기기의 경우 화살표 숨김 */
  [class^='slider-arrow'] {
    visibility: hidden;
  }
}
```



#### .disable

```css
/* 비활성화시 컴포넌트 숨김 제어 */
.disable {
  /* repaint 발생 */
  visibility: hidden;
  /* 가능한 옵션 */
  /* z-index: -1; */
}
```



## JavaScript

### Prototypes

> **Class PureJsSlider**에 삽입할 Prototype 함수를 정의한다.

#### Slides

**nextSlide**

다음 슬라이드로 이동한다.

```javascript
function nextSlide(jsSlider) {
  const {
    params,
    tags,
  } = jsSlider;
  const speed = params.transitionSpeed;
  jsSlider.translate -= 100;
  tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
  if (params.direction === 'vertical') {
    tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
  } else {
    tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
  }
}
```



**prevSlide**

이전 슬라이드로 이동한다.

```javascript
function prevSlide(jsSlider) {
  const {
    params,
    tags
  } = jsSlider;

  const speed = params.transitionSpeed;
  jsSlider.translate += 100;
  tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
  if (params.direction === 'vertical') {
    tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
  } else {
    tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
  }
}
```



**moveSlide**

터치/마우스로 슬라이드를 움직일 시 위치를 제어한다.

```javascript
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
```



**updateActiveSlide**

터치/마우스로 움직인 슬라이드의 위치를 바탕으로 현재 슬라이드를 재조정한다.

```javascript
function updateActiveSlide(jsSlider) {
  const {
    params,
    tags,
    moves
  } = jsSlider;

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
```



#### eventsEmitter

> 사용자 정의 이벤트를 제어할 때 사용한다.

**On**

새로운 사용자 정의 이벤트를 생성한다.

```javascript
function on(events, handler, priority) {
  const self = this;
  if (typeof handler !== 'function') return self;
  const method = priority ? 'unshift' : 'push';
  events.split(' ').forEach(event => {
    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
    self.eventsListeners[event][method](handler);
  });
  return self;
}
```



**Off**

사용자 정의 이벤트를 해제하고 삭제한다.

```javascript
function off(events, handler) {
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
```



**Trigger**

지정한 사용자 정의 이벤트를 실행한다.

```javascript
function trigger(...args) {
  const self = this;
  if (!self.eventsListeners) return self;
  let events;
  let data;
  let context;

  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];

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
        eventHandler.apply(context, data);
      });
    }
  });
  return self;
}
```



### Modules

#### autoplay

> 자동 재생 관련 모듈이다.

```javascript
function autoplay(_ref) {
  let {
    jsSlider,
    setParams,
    on,
    off,
    trigger
  } = _ref;
  let autoSlideControl;
	
  jsSlider.autoplay = {
    running: false,
    paused: false,
  }
	
  // 외부에서 전달받을 수 있는 Parameters
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
	
  // 다음 슬라이드
  function autoNextSlide() {
    const {
      params,
      tags,
    } = jsSlider;
    
    if (!jsSlider.moveEventsData.transitionEnd) return;
    jsSlider.moveEventsData.transitionEnd = false;

    const speed = params.transitionSpeed;
    jsSlider.translate -= 100;
    tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }
  }
	
  // 이전 슬라이드
  function autoPrevSlide() {
    const {
      params,
      tags,
    } = jsSlider;
  
    if (!jsSlider.moveEventsData.transitionEnd) return;
    jsSlider.moveEventsData.transitionEnd = false;

    const speed = params.transitionSpeed;
    jsSlider.translate += 100;
    tags.sliderWrapper.style.transitionDuration = `${speed}ms`;
    if (params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }

  }
	
  // 자동 재생
  function run() {
    if (jsSlider.autoplay.running) return;
    let delay = jsSlider.params.autoplay.delay;
    jsSlider.autoplay.running = true;
    jsSlider.autoplay.paused = false;

    attachTransitionEvent();

    if (jsSlider.params.autoplay.toForward) {
      autoSlideControl = setInterval(autoNextSlide, delay);
    } else {
      autoSlideControl = setInterval(autoPrevSlide, delay);
    }
  }
	
  // 일시 정지
  function pause() {
    if (!jsSlider.autoplay.running) return;
    if (jsSlider.autoplay.paused) return;
    jsSlider.autoplay.running = false;
    jsSlider.autoplay.paused = true;
    
    detachTransitionEvent();

    if (autoSlideControl) clearInterval(autoSlideControl);
  }
  
  // 시작
  function start() {
    if (jsSlider.autoplay.running) return;
    on('runAutoplay', () => {
      run(); 
    })
    trigger('runAutoplay');
  }
  
  // 영구정지
  function stop() {
    clearInterval(autoSlideControl);
    off('runAutoplay');
  }
  
  // 터치시 제거/일시정지
  function onTouchStart() {
    if (jsSlider.params.autoplay.disableOnInteraction) {
      return stop();
    }
    pause();
  }
  
  // 터치 끝난 경우 다시 실행
  function onTouchEnd() {
    run();
  }
  
  // 터치와 같은 구조의 마우스 이벤트
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
    jsSlider.moveEventsData.transitionEnd = true;
    run();
  }

  function onTransitionStart() {
    jsSlider.moveEventsData.transitionEnd = false;
  }
	
  // 트랜지션 엔드 후 슬라이드 위치 조정
  function onTransitionEnd() {
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
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
  
  // 이벤트 등록
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
	
  // 이벤트 삭제
  function detachTransitionEvent() {
    jsSlider.removeEvent(jsSlider.$el, 'transitionstart', onTransitionStart);
    jsSlider.removeEvent(jsSlider.$el, 'transitionend', onTransitionEnd);
  }
	
  // init
  on('init', () => {
    if (jsSlider.params.autoplay.enabled) {
      jsSlider.addEvent(document, 'visibilitychange', onVisibilityChange);

      if (jsSlider.params.autoplay.pauseOnInteraction) {
        attachTouchEvent();
        attachMouseEvent();
      }

      start();
    }
  })
}
```



#### touchMove

> 터치 이벤트 관련 모듈이다.

```javascript
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
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }

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
```



#### pointerMove

> 마우스 이벤트 관련 모듈이다.

```javascript
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
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
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
```



#### arrow

> 슬라이드 화살표 관련 모듈이다.

```javascript
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
  
  function onPrevClick() {
    if (!jsSlider.arrow.transitionEnd) return;
    jsSlider.arrow.transitionEnd = false;
    return jsSlider.prevSlide(jsSlider);
  }
  
  function onNextClick() {
    if (!jsSlider.arrow.transitionEnd) return;
    jsSlider.arrow.transitionEnd = false;
    return jsSlider.nextSlide(jsSlider);
  }

  function onTransitionEnd(e) {
    jsSlider.tags.sliderWrapper.style.transitionDuration = '0ms';
    if (jsSlider.translate === 0){
      jsSlider.translate = -100 * (jsSlider.tags.slides.length - 2);
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    } else if (jsSlider.translate === -100 * (jsSlider.tags.slides.length -1)) {
      jsSlider.translate = -100;
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
      } else {
        jsSlider.tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
      }
    }
    
    jsSlider.arrow.transitionEnd = true;
  }

  function start() {
    if (jsSlider.params.useArrow.followDirection) {
      if (jsSlider.params.direction === 'vertical') {
        jsSlider.tags.prevArrow.classList.add('slider-arrow-vertical__prev');
        jsSlider.tags.nextArrow.classList.add('slider-arrow-vertical__next');
      } else {
        jsSlider.tags.prevArrow.classList.add('slider-arrow-horizontal__prev');
        jsSlider.tags.nextArrow.classList.add('slider-arrow-horizontal__next');
      }
    } else {
      jsSlider.tags.prevArrow.classList.add('slider-arrow-horizontal__prev');
      jsSlider.tags.nextArrow.classList.add('slider-arrow-horizontal__next');
    }

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
```



#### pageNumber

> 현재 페이지 번호 출력 관련 모듈이다.

```javascript
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
    document.querySelector('.slider-page-number').appendChild(pageNum);
    pageNum.classList.add('slider-page-number__content');
    pageNum.innerHTML = `${jsSlider.curIdx} / ${jsSlider.slideLength}`;
    run();
  }

  on('init', () => {
    if (!jsSlider.params.usePageNumber.enabled) return;
    create();
  })
}
```



#### pagination

> 슬라이드 페이지네이션 관련 모듈이다.

```javascript
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

    jsSlider.translate = this.dataset.index * (-100);
    tags.sliderWrapper.style.transitionDuration = `${jsSlider.params.transitionSpeed}ms`;
    if (jsSlider.params.direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${jsSlider.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${jsSlider.translate}%, 0, 0)`;
    }
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
```

