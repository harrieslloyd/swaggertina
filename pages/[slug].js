import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout.js";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Header } from "../components/Header.js";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const pages = data.pageConnection.edges;
  const content = data.page.body;
  return (
    <Layout>
      <Header pages={pages} />
      <section className="titlesection">
      <h1 data-tina-field={tinaField(data.page, "title")} >{data.page.title}</h1>
      </section>
      <section className="mainsection">
      <div data-tina-field={tinaField(data.page, "body")}>
        <TinaMarkdown content={content} />
      </div>
      </section>
    </Layout>
  );
}

// This is an example of a page generated with Serverside Rendering.
// This can be switched to a static page by using getStaticProps
export const getServerSideProps = async ({ params }) => {
  const { data, query, variables } = await client.queries.pageWithNav({
    relativePath: `${params.slug}.mdx`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
