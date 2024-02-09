import { TinaMarkdown } from "tinacms/dist/rich-text";

export const TextArea = (props) => {
    var lastclass
    if(props.last) lastclass = "last"; else lastclass = '';
    return (
        <section className={"mainsection " + lastclass}>
                <div className="textwrap">
                    <TinaMarkdown content={props.text}/>

                </div>
            </section>
    )
}