import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean,
) => {
    const query = gql`
        query MyQuery(
        $access_key: String!,
        $categories: String!,
        $keywords: String,
    ) {
        myQuery(
            categories: $categories,
            keywords: $keywords,
            access_key: $access_key,
            countries: "gb",
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
    }
    `;
    const res = await fetch("https://baishishan.stepzen.net/api/sweet-mink/__graphql", {
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
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            }
        }),
    });
    console.log(
        "LOADING NEW DATA FROM API for category",
        category,
        keywords
    );
    const newsResponse = await res.json();

    const news = sortNewsByImage(newsResponse?.data?.myQuery);
    return news;
};

export default fetchNews; 


   /*  stepzen import curl  "http://api.mediastack.com/v1/news?access_key=ddab9a1c3946a3ac522983dc7a415107&sources=business,sports"   */
 