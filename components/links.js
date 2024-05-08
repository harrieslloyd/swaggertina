export const Links = (props) => {
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    console.log(props.title != '')
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
                    props.links.map((link) => {
                            return (
                                <a id="link" href={link.href}><div style={{ backgroundImage: `url("${link.img}")` }} className="circle">
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