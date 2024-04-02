import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout.js";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Contact } from "../components/contact.js";
import { EventTable } from "../components/eventtable.js";
import { Listen } from "../components/listen.js";
import { TextArea } from "../components/textarea.js";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  var pages = data.pageConnection.edges;
  
  pages.sort(function(x,y){ return x.node._sys.filename == 'home' ? -1 : y.node._sys.filename == 'home' ? 1 : 0; });
  return (
    <Layout>
      <header>
        <table>
          <tbody>
            <tr>
            {
                pages.map((page, index) => {
                  var slug
                  if(page.node._sys.filename == 'home') slug = ''; else slug = page.node._sys.filename;
                  var name
                  if(page.node.navtitle != '') name = page.node.navtitle; else name = page.node.title;
                  return <th key={index} className="navcol"><a href={"/" + slug}>{name}</a></th>
                })
              }
            </tr>
          </tbody>
        </table>
      </header>
      <section className="titlesection" data-tina-field={tinaField(data.page, "background")} style={{background: `linear-gradient( rgba(29, 31, 29, 0.75), rgba(29, 31, 29, 0.75) ), url(${data.page.background})`}}>
      {
                    (() => {
                        if(data.page.titleimage == null) {
                            return <h1 data-tina-field={tinaField(data.page, "title")}>{data.page.title}</h1>
                        }
                        else {
                            return <img width="500vw" data-tina-field={tinaField(data.page, "titleimage")} src={data.page.titleimage} alt="logo" />
                        }
                    })()
                }
      </section>
      {
                    data.page.blocks.map((block, index, array) => {
                        var lastclass
                        if(index === array.length-1) lastclass = true; else lastclass = false;
                        switch(block.__typename) {
                            case 'PageBlocksListen':
                                return <Listen key={index} last={lastclass} title={block.title} />
                            case 'PageBlocksContact':
                                return <Contact key={index} last={lastclass} title={block.title} />
                            case 'PageBlocksTextarea':
                                return <TextArea key={index} last={lastclass} text={block.text} />
                            case 'PageBlocksEvents':
                                return (
                                      <EventTable last={lastclass} text={block.text} />
                                )
                        }
                        return <p>This isn't working</p>
                    })
            }
    </Layout>
  );
}

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getServerSideProps = async () => {
  const { data, query, variables } = await client.queries.pageWithNav({
    relativePath: `home.mdx`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
