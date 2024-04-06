import React,{useState, useEffect, useRef} from 'react'
import {Link } from 'react-router-dom'
import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {AiFillAppstore} from 'react-icons/ai'
import {MdOutlineArticle,MdMiscellaneousServices} from 'react-icons/md'
import {SiAboutdotme,SiNounproject} from 'react-icons/si'
import {RiContactsBookUploadLine} from 'react-icons/ri'
import {GiArmoredBoomerang} from 'react-icons/gi'
import { motion } from 'framer-motion'
import { initialNavBar,animationNavBar,transitionNavBar } from '../anim/Gallery'
import reactLogo from '../assets/react.svg'

const NavBar = () => {

  var scrollPos = 0;
  const ref = useRef();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [show,setShow] = useState(false);
  const [bg,setBg] = useState(false);
  
  const handleScroll = () => {
    scrollPos = window.scrollY;
    if(scrollPos > 0){
      setBg(true);
    }
    if(scrollPos == 0){
      setBg(false);
    }
  }
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll",handleScroll);

    function handleWindowResize(){
      setWindowSize(getWindowSize());
    }
    
    const checkIfClickedOut = (e) => {
      if(show && ref.current && !ref.current.contains(e.target)){
        setShow(false)
      }
    }
    
    window.addEventListener('resize', handleWindowResize)
    document.addEventListener("mousedown",checkIfClickedOut);

    return () => {
      window.removeEventListener("scroll",handleScroll);
      window.removeEventListener('resize',handleWindowResize)
      document.removeEventListener("mousedown",checkIfClickedOut)
/*       console.log(show) */
    }
  },[show])

  function getWindowSize(){
    const {innerWidth, innerHeight} = window
    return {innerWidth,innerHeight}
  }


  let navBarElements = false;
  if(windowSize.innerWidth <= 1270){
    navBarElements = true;
  }


  return (
    <>
    <motion.div className={bg ?  "navBarNocolor" : "navbar-Container" } id="navBar-Container"
      initial={initialNavBar}
      animate={animationNavBar}
      transition={transitionNavBar}
    >
      <div className="navbarFlex" id="navBarFlex">
        <div className="navBar navBar1">
          <div className='navBarBrand'>
          <Link to="/">
            <img src={reactLogo} className='logo'/>
          </Link>
          </div>
        </div>
        <div className="navBar navBar2">
            <ul ref={ref}  className="ul_navBar" id='ul_navBar'>
              {/* {
                searchTrue ? (
                  <li className="li_navBar li_navBar1 li_navBarQuery">Search</li>
                ) : (
                  <li className="li_navBar li_navBar1Hidden li_navBarQuery">Search</li>
                )
              } */}
             <li className="li_navBar li_navBar7">
                <HiOutlineMenuAlt4 className='alt-icon' 
                onClick={() => setShow((oldState) => !oldState)}/>
                { show ? 
                  (<div className={ show == true ? "dropdownContentVisible" : "dropdownContent" }>
                    <ul className="ul_menuBar" id="ul_menuBar">
                      {/*{
                        navBarElements == true ? (
                          <>
                          <li className="li_menuBar1 li_menuBar">
                            <Link to="/about">
                                <div className="menuBar_flex">
                                  <SiAboutdotme className='alt-icon2'/> 
                                  <p className='p_menuBar'>
                                      Conocenos
                                  </p>
                                </div>
                            </Link>
                          </li>
                          <li className="li_menuBar1 li_menuBar">
                            <Link to="/contact">
                              <div className="menuBar_flex">
                                <RiContactsBookUploadLine className='alt-icon2'/> 
                                <p className='p_menuBar'>
                                  Contacto
                                </p>
                              </div>
                            </Link>
                          </li>
                          <li className="li_menuBar1 li_menuBar">
                            <Link to="/projects">
                              <div className="menuBar_flex">
                                <SiNounproject className='alt-icon2'/> 
                                <p className='p_menuBar'>
                                  Proyectos
                                </p>
                              </div>
                            </Link>
                          </li>
                          <li className="li_menuBar1 li_menuBar">
                            <Link to="/BLEDash2">
                              <div className="menuBar_flex">
                                <MdMiscellaneousServices className='alt-icon2'/> 
                                <p className='p_menuBar'>
                                  BLEDASH2
                                </p>
                              </div>
                            </Link>
                          </li>
                          </>
                        
                        ) : null
                      }*/}
                      <li className="li_menuBar1 li_menuBar">
                        <Link to="/Dashboard">
                          <div className="menuBar_flex">
                            <GiArmoredBoomerang className='alt-icon2'/> 
                            <p className='p_menuBar'>
                              Dashboard
                            </p>
                          </div>
                        </Link>
                      </li>
                      <li className="li_menuBar3 li_menuBar">
                        <Link to="/BLEDash">
                          <div className="menuBar_flex">
                            <MdOutlineArticle className='alt-icon2'/> 
                            <p className='p_menuBar'>
                                BLEDashboard
                            </p>
                          </div>
                        </Link>
                      </li>
                     {/*  <li className="li_menuBar3 li_menuBar">
                        <Link to="/galeria">
                          <div className="menuBar_flex">
                            <GrGallery className='alt-icon2'/> 
                            <p className='p_menuBar'>
                                Galeria
                            </p>
                          </div>
                        </Link>
                      </li> */}
                      <li className="li_menuBar2 li_menuBar">
                        <Link to="/Configuracion">

                          <div className="menuBar_flex">
                            <AiFillAppstore className='alt-icon2'/> 
                            <p className='p_menuBar'>Configuracion</p>
                          </div>
                        </Link>
                        </li>
                      {/* <li className="li_menuBar3 li_menuBar">
                      <div className="menuBar_flex">
                          <HiOutlineUserCircle className='alt-icon2'/> 
                          <p className='p_menuBar'></p>
                        </div>
                      </li> */}
                    </ul>
                  </div>) : null
                }
              </li>
            </ul>
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default NavBar