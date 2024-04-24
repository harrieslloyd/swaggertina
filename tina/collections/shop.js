/**
 * @type {import('tinacms').Collection}
 */
export default {
    label: "Shop Content",
    name: "shop",
    path: "content/shop",
    format: "mdx",
    fields: [
        {
            name: "name",
            label: "Item Name",
            type: 'string',
            required: true
        },
        {
            name: "price",
            label: "Item Price",
            type: "number",
            required: true
        },
        {
            name: "desc",
            label: "Item Description",
            type: "rich-text"
        },
        {
            name: "image",
            label: "Item Image",
            type: 'image'
        },
    ]
};
