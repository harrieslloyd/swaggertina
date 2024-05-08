import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';



function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var t = text.split(urlRegex)
    return (
        <span>{t[0]}<a href={t[1]}>{t[1]}</a>{t[2]}</span>

    )
}
const options = {
    dateStyle: "long",
    timeStyle: "short"
};

export const EventTable = (props) => {
    const size = useWindowSize();
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    let x = props.data
    console.log(x)
    if (props.type == "long") {
        return (
            <section className={"mainsection " + lastclass}>
                {
                (() => {
                    if(props.title != '') {
                        return <h1>{props.title}</h1>
                    }
                })()
                }
                <table id="eventtable">
                    <tbody>
                        {x.map((event) => (
                            <tr key={x.indexOf(event)}><td><div className="event">
                                <table><tbody><tr>
                                    <td>{new Date(event[0]).toLocaleString(undefined, options)}</td>
                                    <td>{event[1]}</td>
                                    <td><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event[2])}`}>{event[2].replace(", USA", "")}</a></td>
                                    <td>{urlify(event[3])}</td>
                                </tr></tbody></table>
                            </div>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        )
    }
    else {
        return (
            <section className={"mainsection eventssection" + lastclass}>
                {
                (() => {
                    if(props.title != '') {
                        return <h1>{props.title}</h1>
                    }
                })()
                }
                <div id="car">
                <Carousel width={size.width * 0.7} showStatus={false} showThumbs={false} showIndicators={false} showArrows centerMode emulateTouch swipeable>
                        {x.map((event) => (
                            <a href={`/event/${x.indexOf(event)}`} id="caritemlink">
                            <div className="caritem" key={x.indexOf(event)}><div>
                                    <h3>{event[1]}</h3>
                                    <span>{new Date(event[0]).toLocaleString(undefined, options)}</span>
                            </div>
                            </div>
                            </a>
                        ))}
                </Carousel>
                </div>
            </section>
        )
    }
}


function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }