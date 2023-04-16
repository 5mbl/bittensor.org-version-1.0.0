import { fetcher } from '@/lib/cms/api'
import React from 'react'
import ListLayout from '@/layouts/ListLayout'

export default function Content({ data, initialDisplayPosts, pagination }) {
    return (

        <div>


            {/* <BlogContent dataFromStrapi={data}></BlogContent> */}

            <ListLayout
                posts={data}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </div>



    )
}

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {

    const blogData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/`);
    //console.log(blogData)
    const initialDisplayPosts = blogData.data.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(blogData.data.length / POSTS_PER_PAGE),
    }

    return {
        props: {
            data: blogData,
            initialDisplayPosts,
            pagination


        }
    }

}