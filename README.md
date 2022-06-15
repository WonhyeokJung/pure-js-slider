# Pure JavaScript Slider

## 초기설정

### HTML Layout 설정

**기본 HTML 구조를 추가한다.**

```html
<body>
	<div class="slider">
    <div class="slider-wrapper"></div>
  	<!-- 화살표 사용 -->
    <div class="slider-arrow__prev"></div>
    <div class="slider-arrow__next"></div>
  </div>
</body>
```

### CSS 설정

**\<head>내에 CSS를 추가한다.**

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="pure-js-slider.css">
  <title></title>
</head>
```

### 스크립트 설정

**PureJsSlider 스크립트를 불러온다.**

```html
<body>
  ...
  <script type="module" src="./${path}../pure-js-slider.mjs"></script>
</body>
```

### 시작하기

**새로운 클래스를 선언 및 초기화하여 PureJsSlider를 불러온다.**

```html
<body>
  ...
  <script>
  	import PureJsSlider from './${path}../pure-js-slider.mjs';
    const mySlider = new PureJsSlider('.slider', { 
    	parameters...
    });
  </script>
</body>
```

### Default

```javascript
const mySlider = new PureJsSlider ('.slider', {
  // 슬라이더 사용
  init: true,
  // 슬라이드 방향
  direction: 'horizontal',
  // class명
  pointerEventTarget: '.slider-wrapper',
  slideClass: '.slider-slide',
  prevArrow: '.slider-arrow__prev',
  nextArrow: '.slider-arrow__next',
  // 자동 재생
  autoplay: {
    enabled: false,
    toForward: true,
    delay: 3300,
    disableOnInteraction: false,
    pauseOnInteraction: true,
  },
  // 터치
  touchMove: {
    enabled: true,
  },
  // 마우스
  pointerMove: {
    enabled: true,
  },
  // 화살표
  useArrow: {
    enabled: true,
    followDirection: true,
  },
  // 페이지네이션
  usePagination: {
    enabled: false,
    clickable: false,
    followDirection: true,
  },
  // 페이지 번호
  usePageNumber: {
    enabled: false,
  },
  // 슬라이드 속도
  transitionSpeed: 300,
  // 가로세로
  width: 1200,
  height: width * (3/4),
});
```



## API

|        Name        |  Type   |        Default        |                         Description                          |
| :----------------: | :-----: | :-------------------: | :----------------------------------------------------------: |
|        init        | Boolean |         true          |           슬라이더를 선언 및 초기화할 지 결정한다.           |
|     direction      | String  |      horizontal       | 슬라이더의 방향을 결정한다. 오타/미입력시 'horizontal'이 기본 설정.<br />'vertical' / 'horizontal' |
| pointerEventTarget | String  |   '.slider-wrapper'   | '.slider-wrapper'의 클래스명을 변경하여 사용하고 싶은 경우(**비추천**) |
|     slideClass     | String  |    '.slider-slide'    | '.slider-slide'의 클래스명을 변경하여 사용하고 싶은 경우(**비추천**) |
|     prevArrow      | String  | '.slider-arrow__prev' | '.slider-arrow__prev'의 클래스명을 변경하여 사용하고 싶은 경우(**비추천**) |
|     nextArrow      | String  | '.slider-arrow__next' | '.slider-arrow__next'의 클래스명을 변경하여 사용하고 싶은 경우(**비추천**) |
|      autoplay      | Object  |    enabled: false     |                     자동 재생 관련 제어                      |
|     touchMove      | Object  |     enabled: true     |                        터치 관련 제어                        |
|    pointerMove     | Object  |     enabled: true     |                       마우스 관련 제어                       |
|  transitionSpeed   | Number  |        300(ms)        |     슬라이드 이동 속도 설정<br />권장속도 : 1500ms 이하      |
|      useArrow      | Object  |     enabled: true     |                슬라이드 이동 화살표 관련 제어                |
|   usePagination    | Object  |    enabled: false     |                  슬라이드 페이지네이션 제어                  |
|   usePageNumber    | Object  |    enabled: false     |                슬라이드 페이지 번호 출력 제어                |
|       width        | Number  |       1200(px)        |                   슬라이드 가로 길이 설정                    |
|       height       | Number  |     width * (3/4)     |                   슬라이드 세로 길이 설정                    |

### API Objects

#### autoplay

```javascript
autoplay: {
  // 자동재생 사용 여부
  enabled: true/false,
  // 정방향(true), 역방향(false) 재생
  toForward: true/false,
  // 자동재생 주기(transitionSpeed보다 길어야 정상 작동한다.)
  delay: 3300(ms),
  // 상호작용(마우스를 올리거나, 터치하거나 등) 발생시 자동재생 미사용
  disableOnInteraction: true/false,
  // 상호작용 발생시 자동재생 일시 정지
  pauseOnInteraction: true/false,
}
```

#### touchmove

```javascript
touchMove: {
  // 터치로 슬라이드 제어 사용 여부
  enabled: true/false, 
},
```

#### pointermove

```javascript
pointerMove: {
  // 포인터(마우스)로 슬라이드 제어 사용 여부
  enabled: true/false,
},
```

#### useArrow

```javascript
useArrow: {
  // 화살표 사용 여부
  enabled: true/false,
  // direction에 맞게 화살표 방향을 설정할 지 여부(기본 수평)
  followDrection: true/false,
}
```

#### usePagination

```javascript
usePagination: {
  // 페이지네이션 사용 여부
  enabled: true/false,
  // 클릭 가능한 페이지네이션 사용 여부
  clickable: true/false,
  // direction에 맞게 페이지네이션 설정 여부(기본 수평)
  followDirection: true,
},
```

#### usePageNumber

```javascript
usePageNumber: {
  // 페이지 번호 사용 여부
  enabled: true/false,
},
```



## Tips

### 외부 서버 이미지 이용시 코드 예시

외부 서버 (Lorem Picsum)등을 이용해 테스트할 경우 이미지 로드 순서보다 Slider 생성이 빨라 이미지 추가시 생성한 Div를 읽어오지 못하는 경우가 있다. 그런 경우를 대비한 예시이다.

- 기존

```html
<body>
  <div class="slider">
    <div class="slider-wrapper"></div>
  </div>
  <script type="module">
    import PureJsSlider from './pure-js-slider.mjs';
    const slides = document.querySelector('.slider-wrapper');
    let url = 'https://picsum.photos/v2/list?page=1&limit=10';
    
    let useAsync = async function(url, method) {
      let data = {
        method: method,
        headers: {
          "content-Type": "applcation/json",
        },
      }
      try {
        const res = await fetch(url, data);
        const resText = await res.json();

        await preloadImg(resText);
        // Slider Load 위치(이미지 로드 완료 후 슬라이더 생성)
        const mySlider = new PureJsSlider ('.slider', { 
        	// options..
        });
      } catch(e) {
        console.error(e);
      }
    }
    useAsync(url, "GET");
    
    function preloadImg(images) {
      for (let i = 0; i < images.length; i++) {
        const slide = document.createElement('div');
        slide.setAttribute('class', 'slider-slide');
        const img = document.createElement('img');
        img.src = images[i].download_url;
        img.alt = `image${i+1}`;
        // slide div 및 div 내 img 추가
        slide.appendChild(img);
        slides.appendChild(slide);
      }
    }
  </script>
</body>
```

### 스크립트 상에서 로컬 이미지를 추가하는 경우

일반적인 코드 형식으로도 불러오기가 가능하다.

```html
<body>
  <div class="slider">
    <div class="slider-wrapper"></div>
  </div>
  <script type="module">
    let images = ["./assets/horizontal1.jpg", "./assets/horizontal2.jpg", "./assets/horizontal3.jpg"];
    const slides = document.querySelector('.slider-wrapper');

    for (let i = 0; i < images.length; i++) {
      let div = document.createElement('div')
      div.setAttribute('class', 'slider-slide');
      slides.appendChild(div);
      let img = document.createElement('img');
      img.src = images[i];
      div.appendChild(img);
    }

  </script>
  <script type="module">
    import PureJsSlider from './pure-js-slider.mjs';
    const mySlider = new PureJsSlider ('.slider', {  });
  </script>
</body>
```

### Arrow 디자인 변경

각 arrow div 안에 원하는 Tag를 추가한다.

```html
<div class="slider-arrow__prev"><i class="fa-solid fa-arrow-left-long" style="color: white"></i>
<div class="slider-arrow__next"><i class="fa-solid fa-arrow-right-long" style="color: white"></i>
```

기본 세팅

![image-20220511170043448](.\README.assets\image-20220511170043448.png)

추가 예시

![image-20220511170145426](.\README.assets\image-20220511170145426.png)
