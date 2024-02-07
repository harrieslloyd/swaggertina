export default function Header(props) {
    return (
        <header>
            <table>
                <tbody>
                    <tr>
                        {
                            props.pages.map((page) => {
                                return <th className="navcol"><a href={"/" + page.node._sys.filename}>{page.node.title}</a></th>
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </header>
    )
}