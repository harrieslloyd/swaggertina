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
      name: "tfont",
      label: "Title Font",
      type: "string",
      options: [
        {
          value: "Poppins",
          label: "Poppins"
        },
        {
          value: "Celtica",
          label: "Celtica"
        },
        {
          value: "Celtic_Gar",
          label: "Celtic Garamond"
        }
      ]
    },
    {
      name: "titleimage",
      label: "Title Image (Overrides Title Text)",
      type: "image",
    },
    {
      name: "tabtitle",
      label: "Title that goes on the browser tab (Optional)",
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
              label: "Title (Optional)",
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
              label: "Title (Optional)",
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
              label: "Title (Optional)",
              type: 'string',
            },
            {
              name: "type",
              label: "Display Type",
              type: "string",
              options: [
                {
                  value: 'long',
                  label: 'Long',
                },
                {
                  value: 'short',
                  label: 'Short',
                },
              ]
            }
          ]
        },
        {
          name: "links",
          label: "Links",
          defaultItem: () => {
            return {
              title: 'Links',
            }
          },
          fields: [
            {
              name: "title",
              label: "Title (Optional)",
              type: 'string',
            },
            {
              name: "links",
              label: "Pages",
              type: 'object',
              list: true,
              required: true,
              fields: [
                {
                  name: "label",
                  label: "Label",
                  type: "string"
                },
                {
                  name: "href",
                  label: "Link",
                  type: 'string',
                  required: true,
                },
                {
                  name: "img",
                  label: "Image (Optional)",
                  type: "image"
                },
                {
                  name: "textcol",
                  label: "Text Color",
                  type: "string",
                  required: true,
                  options: [
                    {
                      value: "black",
                      label: "Black"
                    },
                    {
                      value: "white",
                      label: "White"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "horiz",
          label: "Horizontal Text Stack",
          defaultItem: () => {
            return {
              title: 'Links',
            }
          },
          fields: [
            {
              name: "title",
              label: "Title (Optional)",
              type: 'string',
            },
            {
              name: "fields",
              label: "Horizontal Text",
              type: 'object',
              list: true,
              required: true,
              fields: [
                {
                  name: "label",
                  label: "Label",
                  type: "string"
                },
                {
                  name: "text",
                  label: "Text",
                  type: 'rich-text',
                },
                {
                  name: "img",
                  label: "Image",
                  type: "image"
                },
              ]
            }
          ]
        },
        {
          name: "customhtmlblock",
          label: "Custom HTML (NOT IMPLEMENTED DO NOT USE)",
          fields: [
            {
              name: "customhtml",
              label: "Custom HTML",
              type: 'rich-text',
              required: true,
            }
          ]
        }
      ]
    }
  ],
  // ui: {
  //   router: ({ document }) => {
  //     if (document._sys.filename === "home") {
  //       return `/`;
  //     }
  //     else {
  //       return `/${document._sys.filename}`;
  //     }
  //   },
  // },
};
