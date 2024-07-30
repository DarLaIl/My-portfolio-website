let pageSlider = new Swiper ('.page', {
    //свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    //вертикальный слайдер
    direction: "vertical",
    
    //Кол-во слайдов для показа
    slidePerView: "auto",
    //Пралакс
    parallax: true, 

    //Управление клавой
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity:1,
    },
    watchOverflow:true,

    speed: 1000,

    observer: true,
    observerParents:true,
    observerSliderChildren: true,

    pagination: {
        el: ".page__pagination",
        type: "bullets",
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },
    scrollbar: {
        el: ".page__scroll",
        dragClass: "page__drag-scroll",
        draggable: true
    },
    init: false,
    

    on: {
        init: function(){
            menuSlider();

        },
        slideChange: function(){
            menuSliderRemove()
            menuLinks[pageSlider.realIndex].classList.add("_active");
        },
        resize: function(){
         
        }
    }
})
let menuLinks = document.querySelectorAll(".menu__link");

function menuSlider() {
    if(menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add("_active");
        for(let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            menuLink.addEventListener("click", (e) => {
                menuSliderRemove()
                e.preventDefault();
                pageSlider.slideTo(index, 800);
                menuLink.classList.add("_active");

            })
        }
    }
}
function menuSliderRemove() {
    let menuLinkActive = document.querySelector(".menu__link._active");
    if(menuLinkActive) {
        menuLinkActive.classList.remove("_active");
    }
}


pageSlider.init();



let PARTICLE_NUM = 600;
let PARTICLE_BASE_RADIUS = 0.5;
let FL = 500;
let DEFAULT_SPEED = 2;
let BOOST_SPEED = 200;

let canvas;
let canvasWidth, canvasHeight;
let context;
let centerX, centerY;
let mouseX, mouseY;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;
let particles = [];

window.addEventListener('load', function() {
    canvas = document.getElementById('c');
    
    let resize = function() {
        canvasWidth  = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
        centerX = canvasWidth * 0.5;
        centerY = canvasHeight * 0.5;
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(255, 255, 255)';
    };
    
    document.addEventListener('resize', resize);
    resize();
    
    mouseX = centerX;
    mouseY = centerY;
    
    for (let i = 0, p; i < PARTICLE_NUM; i++) {
        particles[i] = randomizeParticle(new Particle());
        particles[i].z -= 500 * Math.random();
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, false);
    
    document.addEventListener('mousedown', function(e) {
        targetSpeed = BOOST_SPEED;
    }, false);
    
    document.addEventListener('mouseup', function(d) {
        targetSpeed = DEFAULT_SPEED;
    }, false);
    
    setInterval(loop, 1000 / 60);
}, false);

function loop() {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();
    
    speed += (targetSpeed - speed) * 0.01;
    
    let p;
    let cx, cy;
    let rx, ry;
    let f, x, y, r;
    let pf, px, py, pr;
    let a, a1, a2;
    
    let halfPi = Math.PI * 0.5;
    let atan2  = Math.atan2;
    let cos    = Math.cos;
    let sin    = Math.sin;
    
    context.beginPath();
    for (let i = 0; i < PARTICLE_NUM; i++) {
        p = particles[i];
        
        p.pastZ = p.z;
        p.z -= speed;
        
        if (p.z <= 0) {
            randomizeParticle(p);
            continue;
        }
        
        cx = centerX - (mouseX - centerX) * 1.25;
        cy = centerY - (mouseY - centerY) * 1.25;
        
        rx = p.x - cx;
        ry = p.y - cy;
        
        f = FL / p.z;
        x = cx + rx * f;
        y = cy + ry * f;
        r = PARTICLE_BASE_RADIUS * f;
        
        pf = FL / p.pastZ;
        px = cx + rx * pf;
        py = cy + ry * pf;
        pr = PARTICLE_BASE_RADIUS * pf;
        
        a  = atan2(py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;
        
        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a2, a1, true);
        context.closePath();
    }
    context.fill();
}

function randomizeParticle(p) {
    p.x = Math.random() * canvasWidth;
    p.y = Math.random() * canvasHeight;
    p.z = Math.random() * 1500 + 500;
    return p;
}


/**
 * Particle
 */
function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}



const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["интересно", "весело", "сложно", "приключение", "жизнь"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});



/***********************
 *    Helper Functions   *
 ***********************/

function mapNumberRange(n, a, b, c, d) {
    return ((n - a) * (d - c)) / (b - a) + c
}
  
  /***********************
   *        Setup        *
   ***********************/
  
function setup() {
    Array.from(document.querySelectorAll('.card')).map((cardEl) =>
      initCard(cardEl)
    )
}
  
  /***********************
   *      initCard       *
   ***********************/
  
function initCard(card) {
    const cardContent = card.querySelector('.card__content')
    const gloss = card.querySelector('.card__gloss')
  
    requestAnimationFrame(() => {
      gloss.classList.add('card__gloss--animatable')
    })
  
    card.addEventListener('mousemove', (e) => {
      const pointerX = e.clientX
      const pointerY = e.clientY
  
      const cardRect = card.getBoundingClientRect()
  
      const halfWidth = cardRect.width / 2
      const halfHeight = cardRect.height / 2
  
      const cardCenterX = cardRect.left + halfWidth
      const cardCenterY = cardRect.top + halfHeight
  
      const deltaX = pointerX - cardCenterX
      const deltaY = pointerY - cardCenterY
  
      const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  
      const maxDistance = Math.max(halfWidth, halfHeight)
  
      const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10)
  
      const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1)
      const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1)
  
      cardContent.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`
  
      gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`
  
      gloss.style.opacity = `${mapNumberRange(
        distanceToCenter,
        0,
        maxDistance,
        0,
        0.6
      )}`
    })
  
    card.addEventListener('mouseleave', () => {
      cardContent.style = null
      gloss.style.opacity = 0
    })
}
  

setup();


let swiper = new Swiper(".swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
        keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    pagination: {
      el: ".swiper-pagination",
      bulletActiveClass: "swiper-pagination__bullet_active",
      clickable: true,
    },
  });
  swiper.init();


const windowInnerWidth = window.innerWidth;
if(windowInnerWidth > 1024){
  const glowElems = document.querySelectorAll(".glow");
  glowElems.forEach((glow,index) => {
    
      glow.setAttribute("data-swiper-parallax-opacity", "0");
      glow.setAttribute("data-swiper-parallax", "-100%");
      glow.setAttribute("ddata-swiper-parallax-duration", "1000");
  });
  const parallaxEls = document.querySelectorAll(".parallaxEl");
  parallaxEls.forEach((parallaxEl,index) => {
    
      parallaxEl.setAttribute("data-swiper-parallax-opacity", "0");
      parallaxEl.setAttribute("data-swiper-parallax", "-100%");
      parallaxEl.setAttribute("ddata-swiper-parallax-duration", "800");
  });
  gsap.to(".screen__text_SecondSlide_img", {duration:5, rotationY: -360, repeat:-1 })
}