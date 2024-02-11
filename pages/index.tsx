import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import homeStyles from "@/styles/Home.module.css";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
const Home = ({
  allPostData,
}: {
  allPostData: {
    date: string;
    title: string;
    id: string;
  };
}) => {
  return (
    <div>
      <Head>
        <title>Hayeom</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[John Ahn Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd}${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostData.map(({ id, title, date }) => (
            <li className={homeStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={homeStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default Home;
export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData();
  return {
    props: { allPostData },
  };
};
