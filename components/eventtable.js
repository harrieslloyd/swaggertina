function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var t = text.split(urlRegex)
    return (
        <span>{t[0]}<a href={t[1]}>{t[1]}</a>{t[2]}</span>

    )
}
const options = {
    dateStyle: "long",
    timeStyle: "short"
};

export const EventTable = (props) => {
    var lastclass
    if (props.last) lastclass = "last"; else lastclass = '';
    let x = props.data
    return (
        <section className={"mainsection " + lastclass}>
            <table id="eventtable">
                <tbody>
                    {x.map((event) => (
                        <tr key={x.indexOf(event)}><td><div className="event">
                            <table><tbody><tr>
                                <td>{new Date(event[0]).toLocaleString(undefined, options)}</td>
                                <td>{event[1]}</td>
                                <td><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event[2])}`}>{event[2].replace(", USA", "")}</a></td>
                                <td>{urlify(event[3])}</td>
                            </tr></tbody></table>
                        </div>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}