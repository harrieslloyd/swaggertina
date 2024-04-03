export const Contact = (props) => {
    var lastclass
    if(props.last) lastclass = "last"; else lastclass = '';
    return (
            <section className={"mainsection " + lastclass}>
               <script src="email.js"></script>
                <div className="textwrap">
                    
                  <h1>{props.title}</h1>
                  <form id="contactform">
                    <div id="contactmeta">
                      <input id="contactemail" type="email" placeholder="Enter your email" name="email" />
                      <input id="contactname" placeholder="Enter your name" name="name" />
                    </div>
                    <textarea id="contactbody" placeholder="Enter your text" name="body" />
                    <button type="submit">Send -&gt;</button><span id="formstatus"></span>
                  </form>
                </div>
              </section>
    )
}