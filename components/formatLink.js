export default function formatLink(link) {
    if(link == null || link == '') { return '' } 
    else {return link.replaceAll(" ", "%20")}
}