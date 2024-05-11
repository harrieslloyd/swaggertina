/**
 * @type {import('tinacms').Collection}
 */
export default {
    label: "General Settings",
    name: "general",
    path: "content/general",
    format: "mdx",
    fields: [
      {
        name: "fav",
        label: "Favicon",
        type: "image",
        required: true,
      },
      {
        name: "order",
        label: "Navbar Order",
        type: "object",
        list: true,
        required: true,
        fields: [
            {
                label: "Page",
                name: "page",
                type: "reference",
                collections: ["page"],
                required: true
            },
            {
                label: "Navigation Name (Optional)",
                name: "navname",
                type: "string"
            }
        ]
      },
    ],
    ui: {
      allowedActions: {
        delete: false,
        create: false,
      }
    }
  };
  