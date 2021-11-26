import React, { useState, useEffect } from "react";
import Create from "../pages/create";
import { Link } from "react-router-dom";
import { getFirebase } from "../firebase";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getFirebase()
      .database()
      .ref("/posts")
      .orderByChild("dateFormatted")
      .once("value")
      .then(snapshot => {
        let posts = [];
        const snapshotVal = snapshot.val();
        for (let slug in snapshotVal) {
          posts.push(snapshotVal[slug]);
        }

        const newestFirst = posts.reverse();
        setBlogPosts(newestFirst);
        setLoading(false);
      });

  }, [])



  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>



      <h1>Blog posts</h1>

      <Link to="/create" style={{
        border: "none",
        color: "#fff",
        backgroundColor: "#039be5",
        borderRadius: "4px",
        padding: "8px 12px",
        fontSize: "0.9rem"
      }}>Create Post</Link>

      {blogPosts.map(blogPost => (
        <section key={blogPost.slug} className="card">
          <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
          <div className="card-content">
            <h2>
              {blogPost.title} &mdash;{" "}
              <span style={{ color: "#5e5e5e" }}>{blogPost.datePretty}</span>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></p>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
