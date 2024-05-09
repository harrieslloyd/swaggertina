import { Layout } from "../../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import fetch from 'node-fetch';



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

async function getData(dataID) {
    function RemoveHTMLTags(s) {
        const pattern = /<.*?>/g

        // Use regex_replace function in regex
        // to erase every tags enclosed in <>
        s = new String(s).replace(pattern, "");
        return s;
    }
    let spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0RmKzzPAtkwTDAXfQDnhaqqxmLDgcGFZGlX2-0dpkd95u9fVj_jySVVC2j8GVsSQiH-p2w7zvd4vi/pub?gid=0&single=true&output=csv"
    async function download() {
        try {
            const target = spreadsheet; //file

            const res = await fetch(target, {
                method: 'get',
                headers: {
                    'content-type': 'text/csv;charset=UTF-8',
                    //'Authorization': //in case you need authorisation
                }
            });

            if (res.status === 200) {
                const data = await res.text();
                return data;

            } else {
                console.log(`Error code ${res.status}`);
            }
        } catch (err) {
            console.log(err)
            return `There was an error loading this content,"There was an error loading this content","There was an error loading this content",There was an error loading this content
              There was an error loading this content,There was an error loading this content,There was an error loading this content, There was an error loading this content","There was an error loading this content"`
        }
    }
    let a = RemoveHTMLTags(await download());
    //dont ask me how this works
    const lineRegex = /((\\\n)|[^\n])+/g;
    const datumRegex = /,?(("(\\"|.)+?")|([^",][^,]*))?/g;
    const x = a.match(lineRegex).map((row) =>
        row.match(datumRegex).map((datum) => datum.replace(/^,?"?|"$/g, "").trim()),
    );
    return x;
};

export default function Home(props) {
    // data passes though in production mode and data is updated to the sidebar data in edit-mode
    const { data } = useTina({
        query: props.props.query,
        variables: props.props.variables,
        data: props.props.data,
    });

    const pages = data.pageConnection.edges;
    pages.sort(function (x, y) { return x.node._sys.filename == 'home' ? -1 : y.node._sys.filename == 'home' ? 1 : 0; });
    return (
        <Layout>
            <header>
                <table>
                    <tbody>
                        <tr>
                            {
                                pages.map((page, index) => {
                                    var slug
                                    if (page.node._sys.filename == 'home') slug = ''; else slug = page.node._sys.filename;
                                    var name
                                    if (page.node.navtitle != '') name = page.node.navtitle; else name = page.node.title;

                                    return <th key={index} className="navcol"><a href={"/" + slug}>{name}</a></th>
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </header>
            <section className="titlesection eventtitle" style={{ background: `linear-gradient( rgba(29, 31, 29, 0.75), rgba(29, 31, 29, 0.75) ), url(${data.events.background})` }}>
                <h1>{props.eventData[props.slug][1]}</h1>
                <h2>{new Date(props.eventData[props.slug][0]).toLocaleString(undefined, options)}</h2>
            </section>
            <section>
                <section className="mainsection last">
                    <div className="textwrap eventtext">
                        <p>{urlify(props.eventData[props.slug][3])}</p>
                        <iframe
                            width="600"
                            height="450"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAw6YSYIQmmBgxC6XLrxsVcjXJOeciQ-jE
                        &q=${props.eventData[props.slug][2]}`}>
                        </iframe>
                    </div>
                </section>
            </section>
        </Layout>
    );
}

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getServerSideProps = async ({ params }) => {
    const { data, query, variables } = await client.queries.eventWithNav();
    const eventData = await getData()
    const slug = params.slug
    return {
        props: {
            props: {
                data,
                query,
                variables,
            },
            eventData,
            slug
        },
    };
};
