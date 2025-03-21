import formatLink from "./formatLink";

export const Links = (props) => {
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    return (
        <section className={"mainsection " + lastclass}>
            <div className="textwrap">
                {
                (() => {
                    if(props.title != '') {
                        return <h1>{props.title}</h1>
                    }
                })()
                }
                <div id="linkwrap">
                { 
                    props.links.map((link, index) => {
                            return (
                                <a id="link" key={index} href={link.href}><div style={{ backgroundImage: `url("${formatLink(link.img)}")` }} className="circle">
                                <span style={{color: link.textcol}} id="text">{link.label}</span>
                                </div></a>
                            )
                    }
                )}
                </div>
            </div>
        </section>
    )
}