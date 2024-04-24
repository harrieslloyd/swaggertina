import React, { useEffect, useState } from 'react'

export const Contact = (props) => {
  const [isSent, setIsSent] = useState(false)
    var lastclass
    if(props.last) lastclass = "last"; else lastclass = '';

    async function onSubmit(event) {
      event.preventDefault()

      setIsSent(true)
   
      try {
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData,
        })
   
        // Handle response if necessary
        // const data = await response.json()
        // ...
      } catch (error) {
        // Handle error if necessary
        console.error(error)
      } finally {
        setIsSent(false)
      }
    }
    return (
            <section className={"mainsection " + lastclass}>
                <div className="textwrap">
                    
                  <h1>{props.title}</h1>
                  <form id="contactform" onSubmit={onSubmit}>
                    <div id="contactmeta">
                      <input id="contactemail" type="email" required placeholder="Enter your email" name="email" />
                      <input id="contactname" required placeholder="Enter your name" name="name" />
                    </div>
                    <textarea id="contactbody" required placeholder="Enter your text" name="body" />
                    <span><button id="submitbutton" disabled={isSent} type="submit">{isSent ? 'Loading...' : 'Send >'}</button><button type='reset' id='reset'>↺</button></span>
                  </form>
                </div>
              </section>
    )
}