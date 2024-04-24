import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Shop = (props) => {
    let shopitems = props.shop
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    return (
        <section className={"mainsection " + lastclass}>
            <div className="textwrap">
                <h1>{props.title}</h1>
                <div id="shopcontainer">
                    {
                        shopitems.map((item, index) => {
                            return (
                                <a href={`/shop/${item.node._sys.filename}`}>
                                <div className="itemcontainer" key={index}>
                                    <img src={item.node.image} />
                                    <div>
                                        <h3>{item.node.name}</h3>
                                        <span>${item.node.price}</span>
                                        <TinaMarkdown content={item.node.desc} />
                                    </div>
                                </div>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}