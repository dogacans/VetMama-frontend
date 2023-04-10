export default function SEO (props) {
    return (
    <>
        <link rel="icon" href="/favicon.ico" />
        <title>{props.title}</title>
        <meta
        name="description"
        content={props.description}
        />

        <meta name="twitter:card" content="summary_large_image" />
    </>
    )
}