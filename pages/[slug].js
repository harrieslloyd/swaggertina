import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout.js";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Contact } from "../components/contact.js";
import { EventTable } from "../components/eventtable.js";
import { Listen } from "../components/listen.js";
import { TextArea } from "../components/textarea.js";
import fetch from 'node-fetch';
import { Links } from "../components/links.js";
import formatLink from "../components/formatLink.js";

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

  const pages = data.general.order;
  var title
  if(data.page.tabtitle == null || data.page.tabtitle == '') title = data.page.title; else title = data.page.tabtitle
  return (
    <Layout fav={data.general.fav} title={title}>
      <header>
        <table>
          <tbody>
            <tr>
              {
                pages.map((page, index) => {
                  var slug
                  if (page.page._sys.filename == 'home') slug = ''; else slug = page.page._sys.filename;
                  var name
                  if (page.navname != '' && page.navname != null) name = page.navname; else name = page.page.title;
                  
                  return <th key={index} className="navcol"><a href={"/" + slug}>{name}</a></th>
                })
              }
            </tr>
          </tbody>
        </table>
      </header>
      <section className="titlesection" data-tina-field={tinaField(data.page, "background")} style={{ background: `linear-gradient( rgba(29, 31, 29, 0.75), rgba(29, 31, 29, 0.75) ), url(${formatLink(data.page.background)})` }}>
        {
          (() => {
            if (data.page.titleimage == null || data.page.titleimage == '') {
              return <h1 data-tina-field={tinaField(data.page, "title")}>{data.page.title}</h1>
            }
            else {
              return <img width="500vw" data-tina-field={tinaField(data.page, "titleimage")} src={formatLink(data.page.titleimage)} alt="logo" />
            }
          })()
        }
      </section>
      {
        data.page.blocks.map((block, index, array) => {
          var lastclass
          if (index === array.length - 1) lastclass = true; else lastclass = false;
          switch (block.__typename) {
            case 'PageBlocksListen':
              return <Listen key={index} last={lastclass} title={block.title} />
            case 'PageBlocksContact':
              return <Contact key={index} last={lastclass} title={block.title} />
            case 'PageBlocksTextarea':
              return <TextArea key={index} last={lastclass} text={block.text} />
            case 'PageBlocksEvents':
              return (
                  <EventTable key={index} last={lastclass} title={block.title} data={props.eventData} type={block.type} />
              )
            case 'PageBlocksLinks':
              return <Links key={index} last={lastclass} title={block.title} links={block.links}/>
          }
          return <p key={index}>This isn&apos;t working</p>
        })
      }
    </Layout>
  );
}

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getServerSideProps = async ({ params }) => {
  var slug
  if(params.slug == "null") slug = 'home'; else slug = params.slug
  const { data, query, variables } = await client.queries.pageWithNav({
    relativePath: `${slug}.mdx`,
  });
  const eventData = await getData()
  return {
    props: {
      props: {
        data,
      query,
      variables,
      },
      eventData
    },
  };
};
