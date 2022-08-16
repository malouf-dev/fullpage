
const fullpage = document.querySelector('.fullpage');
const direction = 'horizontal';
const infinite = true;

let canScroll = true;
let scrollListener = function(e) {
    if(!e.target.classList.contains('section')) return;
    if(canScroll == false) return;
    if(e.deltaY < 0) fsScroll('up');
    if(e.deltaY > 0) fsScroll('down');
};


window.addEventListener('wheel', function(e){
    console.log(e.deltaY);
});

const animations = {
    down: {current: 'exit_left'},
    up: {current: 'exit_right'},
};

function fsScroll(path) {
    canScroll = false;

    let opp = (path == 'down') ? 'up' : 'down';
    let next = document.querySelector(`.section.${path}`);
    let current = document.querySelector('.section.current');

    current.removeEventListener('wheel', scrollListener);

    next.addEventListener('animationend', function endAnimate(e) {
        next.removeEventListener('animationend', endAnimate);
        next.classList.replace(path, 'current');
        current.classList.remove('current');
        fsArrange(next);
    });

    next.classList.add('active');
    current.style.animationName = animations[path].current;
    document.querySelector('body').style.background = next.style.background;
    next.style.animationName = 'enter_x';
}

function fsArrange(current = document.querySelector('.current')) {
    document.querySelectorAll('.up, .down, .active').forEach(p => {
        p.classList.remove('up', 'down', 'active');
    });
    if(previous = current.previousElementSibling) {
        current.previousElementSibling.classList.add('up');
    } else if(infinite === true) {
        document.querySelector('.fullpage .section:last-of-type').classList.add('up');
    }
    if(next = current.nextElementSibling) {
        next.classList.add('down');
    } else {
        document.querySelector('.fullpage .section:first-of-type').classList.add('down');
    }
    current.addEventListener('wheel', scrollListener);
    canScroll = true;

        //     //if(e.originalTarget != e.target) return;
        // //console.log(e.originalTarget.classList);
        // current.removeEventListener('wheel', wheelStart);
        // //console.log(e.target);
        // if(e.deltaY < 0) fsScroll('up');
        // if(e.deltaY > 0) fsScroll('down');
        // return;
}