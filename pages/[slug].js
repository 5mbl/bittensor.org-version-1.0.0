import { fetcher } from '@/lib/cms/api'

export async function getStaticPaths() {
    const blogData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`);

    //creating an array of objects

    const paths = blogData.data.map(post => {
        return {
            params: {
                slug: post.attributes.slug
            }
        }

    });

    return { paths: paths, fallback: false };
}



export default function BlogPost({ post, blogSlug }) {




    const matchingBlog = post.data.find((post) => post.attributes.slug === blogSlug);
    console.log(matchingBlog)



    //console.log(blogSlug)

    return (
        <>
            <div className="flex flex-col items-start">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">{matchingBlog.attributes.title}</h1>
                <p className="mr-8 whitespace-pre-wrap" >{matchingBlog.attributes.content}</p>
            </div>

        </>
    )
}


export async function getStaticProps({ params }) {
    //console.log(params)

    const blogSlug = params.slug
    const post = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/?slug=${params.slug}`);
    return { props: { post, blogSlug } };

}
