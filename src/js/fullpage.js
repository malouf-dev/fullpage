const fullpage = document.querySelector('.fullpage');

const preferences = {
    infinite: 'both',
    direction: 'vertical'
};

function fsScroll(path) {
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
    current.style.animationName = animations[direction][path].current;
    //document.querySelector('body').style.background = next.style.background;
    next.style.animationName = 'enter';
}