# Swagger Website Dev Docs

Hey There Mr. Marshall / Anyone else looking to help out!

Here's a basic overview of the file structure/how it works. In each file, I'll have comments explaining what everything does. 

## Running the application

To run the development application from the command line, run `npm run dev`. Remember to install npm and run `npm install` before you try to run it! 

If it doesn't work due to a tina error like "Unexpected end of JSON input" or something, try again a couple times. If it still doesn't work, delete the `/tina/__generated__` directory and try again. If it *still* doesn't run, you have a real problem. This is a slight quirk with tina. 

## Next.JS & Tina

This is a basic [Tina](https://tina.io/) template that works with [Next.JS](https://nextjs.org/). NextJS is a [React](https://react.dev/) framework, which means it is totally based off React. As such, all the react functions/structure are there. It is a react application under the hood. 

### What does it mean to be a react application?

Each page is a big javascript function that gets called by react. In each page, there are functions for every HTML component. You can use default html components (like `<div>` or `<p>`), or you can use custom components, which are really custom functions. I recommend reading the docs for both [React](https://react.dev/learn/thinking-in-react) and [NextJS](https://nextjs.org/docs). **Keep in mind I am using the Pages Router for NextJS, so look for solutions/documentation using that (as opposed to the app router).**

### But what about Tina?

Tina is a content managment system that runs in the app. It differs from other CMSs because it 1. Runs within the app, 2. Has live/intuitive editing (live editing is disabled right now which I will explain later) and 3. Is super easy to grab data from (no apis!! kinda...). However, it's relatively new and is open source, so it might be a little buggy/not well maintained. However, I havn't had many issues. 

Here's what happens with Tina. Basically, Tina wraps the NextJS app into it's own application. It runs Tina first, then runs the Next app as a subprocess. When you edit things in the Admin page, Tina edits little markdown files (found in the `/content` directory.) Then, my code grabs those markdown files and uses the content in them. 

Because the files change, every time you change something in Tina, it will push the new content to git. This leads to some interesting mechanics. It's just good to know about. 

As for the tina configuration, all of the config/files are stored in the `/tina` directory. Here's how that works. 

#### Tina Directory

Tina works with things called Collections. Each Collection is a Javascript object that describes what content you want to be editable. I like to think of a collection as a template for each content editing page. For example, the `page` collection (found at `/tina/collections/page.js`) describes all of the content that I want editable in my pages. I have it set so the editor can add/delete new pages, so the editor can add any page they want, and the CMS panel will show what I put in `page.js`. When the editor does add a page, it creates a new markdown file in `/content/page/`, which I can reference in my actual nextjs file. 

The `page` collection describes settings for each page, but if I wanted to describe general settings for the whole site, I could make a new collection (such as `general.js`). In this one, I'll set it so the editor can not add/delete new pages, so they're not creating multiple general settings files. And to make it so it changes the whole site, I'll just reference it in every nextjs file!

[Here's the docs on collection fields.](https://tina.io/docs/reference/fields/)

All of the actual tina config is found in `/tina/config.js`. Here's where you're actually supposed to define collections, but I just create files for them and then import them in. There's not much you have to do in here (except add your collection files when you create new ones!), but I'll comment the code so you can see what does what. 

### Grabbing content

You can grab content in each nextjs page file with the `getServerSideProps()` function. This is a little complicated and I'm not sure I fully understand how it works, so if you're having trouble with it, [here's the link to the docs on it.](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props). 

What I do know is that it can pass variables into the actual page function, which you can then use. I use this to get data from the google sheets (the calendar data), and the Tina data. 

To actually get the Tina data, you call a **[GraphQL](https://graphql.org/) function**. You can either call a default GraphQL function, like `client.queries.page`, which are autogenerated by Tina for each collection. For these, you need to define which markdown file you want to reference.

However, you can also make your own GraphQL functions to grab data from multiple collections. These can be found in `/tina/queries/`. I use this to grab both the general settings and the specific page for each page. [Here's the tina docs on custom queries](https://tina.io/docs/data-fetching/custom-queries/). 

There's a GraphQL playground built into tina that you can use to play around with what you can grab from each markdown file. It's found at `localhost:3000/admin/index.html#/graphql` when you run the app. 
