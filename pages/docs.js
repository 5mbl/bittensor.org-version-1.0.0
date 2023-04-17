import siteMetadata from "@/data/siteMetadata";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";
import { fetcher } from "@/lib/cms/api";

export default function Projects({ data, imageUrlsArr }) {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Docs
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {data.data.map((item, index) => (
              <>
                <Card
                  key={item.id}
                  title={item.attributes.title}
                  description={item.attributes.Description}
                  imgSrc={
                    "https://strapi-deploy-tut.herokuapp.com" +
                    imageUrlsArr[index]
                  }
                  href={`${item.attributes.slug}`}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const blogData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/docs/`);
  const imageData = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/docs?populate=image`
  );

  const imageUrls = imageData.data.map((item) => {
    return item.attributes.image.data[0].attributes.url;
  });

  //console.log(imageUrls[0])

  return {
    props: {
      data: blogData,
      imageUrlsArr: imageUrls,
    },
  };
}
