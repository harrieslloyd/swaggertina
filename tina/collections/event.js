/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Event Content",
  name: "events",
  path: "content/events",
  format: "mdx",
  fields: [
    {
      name: "background",
      label: "Background Image",
      type: "image",
      required: true,
    },
  ],
  ui: {
    allowedActions: {
      delete: false,
      create: false,
    }
  }
};
