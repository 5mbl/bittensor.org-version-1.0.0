import { fetcher } from '@/lib/cms/api'

export async function getStaticPaths() {
  const blogData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`);

  //creating an array of objects

  const paths = blogData.data.map(post => {
    return {
      params: {
        id: post.id.toString()
      }
    }

  });

  return { paths: paths, fallback: false };
}

export default function BlogPost({ post }) {
  console.log(post)
  return (
    <>
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.data.attributes.title}</h1>
        <p className="mr-8 whitespace-pre-wrap" >{post.data.attributes.content}</p>
      </div>

    </>
  )
}


export async function getStaticProps({ params }) {
  console.log(params)
  const post = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${params.id.toString()}`);
  return { props: { post } };
}
