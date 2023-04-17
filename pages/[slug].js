import { fetcher } from "@/lib/cms/api";

export async function getStaticPaths() {
  // api fetch to different api endpoints
  const blogData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`);
  const docsData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/docs`);

  const blogPaths = blogData.data.map((post) => {
    return {
      params: {
        slug: post.attributes.slug,
      },
    };
  });

  const docsPaths = docsData.data.map((post) => {
    return {
      params: {
        slug: post.attributes.slug,
      },
    };
  });

  const paths = [...blogPaths, ...docsPaths]; // spreading over these to arrays -> creating one big array ( paths returns an array )
  // console.log(paths)

  return { paths: paths, fallback: false };
}

export default function BlogPost({ postBlog, postProjects, slug }) {
  const bloogPool = [...postBlog.data, ...postProjects.data]; // creating an array of all blog-data i received

  const matchingBlog = bloogPool.find((post) => post.attributes.slug == slug); // find the post in the blogPool that suits to the slug

  // returning that matchingBlog
  return (
    <>
      {matchingBlog && (
        <div className="flex flex-col items-start">
          <h1 className="mb-6 text-4xl font-bold text-gray-800">
            {matchingBlog.attributes.title}
          </h1>
          <p className="mr-8 whitespace-pre-wrap">
            {matchingBlog.attributes.content}
          </p>
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  //console.log(params)

  const slug = params.slug;
  const postBlog = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/?slug=${params.slug}`
  );
  const postProjects = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/docs/?slug=${params.slug}`
  );

  console.log("slug: " + slug);

  return { props: { postBlog, postProjects, slug } };
}
