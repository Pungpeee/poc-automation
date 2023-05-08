import {useEffect } from 'react';
import CeroText from "./CeroText";
import { gsap, Power4,TimelineMax, TweenMax, Linear } from "gsap";
import PhonePart from './PhonePart';
import MiddleCoins from './MiddleCoins';
import BigCoin from './BigCoin';
import BgBubbles from './BgBubbles';
import CoeText from './CoeText';


const HeroAnimation = () => {

    
const animations = () => {
    gsap.fromTo("#phonePart", {y: 250, x:50}, {x:20, y: 180, duration: 4, repeat:-1, yoyo: true, ease: Linear.easeNone,});
    gsap.fromTo("#middleCoin", {y: 100}, {y: 70, duration: 4, repeat:-1, yoyo: true, ease: Linear.easeNone,});
    gsap.fromTo("#middleCoin", {autoAlpha: 0.2}, {autoAlpha: 1, duration: 3, repeat:-1, yoyo: true, ease: Linear.easeNone,});

    gsap.fromTo("#bigCoin", {y: 80, rotation:0}, {y: 0, rotation:90, duration: 4, repeat:-1, yoyo: true, ease: Linear.easeNone,});
    gsap.fromTo(".cero-coe-text", {autoAlpha: 0}, {autoAlpha: 1, duration: 3, repeat:-1, yoyo: true, ease: Linear.easeNone});
    gsap.fromTo("#ceroText", {x:50, y: 80}, {x:0, y: 0, duration: 4, repeat:-1, yoyo: true, ease: Linear.easeNone});
    gsap.fromTo("#coeText", {y: 80, x:10}, {x:50, y: 0, duration: 4, repeat:-1, yoyo: true, ease: Linear.easeNone});
    gsap.fromTo("#BgBubbles", {autoAlpha: 0.2, scale:1}, {scale:2, autoAlpha: 0, duration: 3, repeat:-1, yoyo: true, ease: Linear.easeNone});
}

useEffect(() => {
    animations()
}, []);
    
 
    return ( 
        <>
        <div className='hero-animation'>
            
            <CeroText />
            <CoeText />
            <MiddleCoins />
            <BigCoin />
            <PhonePart />
            <BgBubbles />
        </div>
        
        </>
     );
}
 
export default HeroAnimation;