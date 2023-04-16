
export default function BlogContent({ dataFromStrapi }) {
    return (
        <div>
            {dataFromStrapi && dataFromStrapi.data.map((item) => {
                return (
                    <>
                        <h3>{item.attributes.title}</h3>
                        <a href={`content/${item.id}`}>{item.attributes.title}</a>
                        <p>{item.attributes.content}</p>
                    </>
                )
            })}

        </div>
    )
}
