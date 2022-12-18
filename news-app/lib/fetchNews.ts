import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean,
) => {
    const query = gql`
    query MyQuery(
        $categories: String!,
        $keywords: String,
        $access_key: String!,
    ) {
        MyQuery(
            categories: $categories,
            keywords: $keywords,
            access_key: $access_key,
            countries: "gb,us,tr",
            sort:"published_desc",
        ) {
            data {
                author
                category
                image
                description
                country
                language
                published_at
                source
                title
                url
            }
            pagination {
                limit
                offset
                count
                total
            }
    }
    `;
    const res = await fetch("https://baishishan.stepzen.net/api/looping-moose/__graphql ", {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? {revalidate:0} : {revalidate: 20},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                categories: category,
                keywords: keywords,
                access_key: process.env.MEDIASTACK_API_KEY,
            }
        }),
    });
    console.log(
        "LOADING NEW DATA FROM API for category",
        category,
        keywords
    );
    const newRes = await res.json();

    const news = sortNewsByImage(newRes?.data?.MyQuery);
    return news;
};

export default fetchNews; 


   /*  stepzen import curl  "http://api.mediastack.com/v1/news?access_key=ddab9a1c3946a3ac522983dc7a415107&sources=business,sports"   */
 