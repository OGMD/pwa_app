//Animaciones Framer Motion para Gallery

const initial = {
    opacity:0
}

const animation = {
    opacity:1
}

const exit = {
    opacity:0
}

const transition ={
    duration:1.5
}

//NavBar Framer Motion 

const initialNavBar = {
    opacity:0,
}

const animationNavBar = {
    opacity:1,
}

const transitionNavBar ={
    ease:[.49,.01,0,1],
    duration:2
}

/*Home Animations*/

const initialHome = {
    opacity:0,
    x:"-10%"
}

const initialHome2 ={
    opacity:0,
    y:"-10%"
}

const initialHome3 = {
    opacity:0,
    x:"10%"
}

const animationHome = {
    opacity:1,
    x:0
}

const transitionHome = {
    ease:[.49,.01,0,1],
    duration:1,
    delay:.3
}


export 
{
    initial,
    animation, 
    exit, 
    transition,
    initialNavBar,
    animationNavBar, 
    transitionNavBar,
    initialHome,
    initialHome2,
    initialHome3,
    animationHome,
    transitionHome
}