/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    }, 
    {
      name: "titleimage",
      label: "Title Image (Overrides Title Text)",
      type: "image",
    },
    {
      name: "navtitle",
      label: "Navigation name (Overrides Title Text)",
      type: "string"
    },
    {
      name: "background",
      label: "Background Image",
      type: "image",
      required: true,
    },
    {
      name: "blocks", 
      label: "Page Components",
      type: "object",
      list: true,
      templates: [
        {
          name: "textarea",
          label: "Text Area",
          fields: [
            {
              name: "text",
              label: "Text",
              type: 'rich-text',
            }
          ]
        },
        {
          name: "contact",
          label: "Contact Form",
          defaultItem: () => {
            return {
              title: 'Contact',
            }
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: 'string',
            }
          ]
        },
        {
          name: "listen",
          label: "Spotify Embed",
          defaultItem: () => {
            return {
              title: 'Listen',
            }
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: 'string',
            }
          ]
        },
        {
          name: "events",
          label: "Events",
          defaultItem: () => {
            return {
              title: 'Events',
            }
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: 'string',
            }
          ]
        }
      ]
    }
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      else {
        return `/${document._sys.filename}`;
      }
    },
  },
};
