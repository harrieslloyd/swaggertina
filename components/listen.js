export const Listen = (props) => {
    var lastclass
    if(props.last) lastclass = "last"; else lastclass = '';
    return (
        <section className={"mainsection " + lastclass}>
        <table>
          <tbody>
            <tr>
              <th>
                <h1>{props.title}</h1>
              </th>
              <th>
                <iframe src="https://open.spotify.com/embed/album/75frkfgSRdxcQOhCNuGyod?utm_source=generator" width="100%" height="200" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
    )
}