import { TinaMarkdown } from "tinacms/dist/rich-text";
import formatLink from "./formatLink";

export const Horiz = (props) => {
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    return (
        <section className={"mainsection " + lastclass}>
            <div className="textwrap">
                {/* {
                (() => {
                    if(props.title != '') {
                        return <h1>{props.title}</h1>
                    }
                })()
                } */}
                <div id="linkwrap">
                { 
                    props.fields.map((field, index) => {
                            return (
                                <div>
                                    <img href={(field.img)} alt={field.label} />
                                    <h2>{field.label}</h2>
                                    <TinaMarkdown content={field.text} />
                                </div>
                            )
                    }
                )}
                </div>
            </div>
        </section>
    )
}