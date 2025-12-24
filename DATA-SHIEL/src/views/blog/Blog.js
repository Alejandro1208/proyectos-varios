import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BannerMedio from '../../componentes/bannerMedio/BannerMedio';
import { getBlogPosts } from './data';
import backgroundImage from '../../images/banner-medio.jpeg';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const list = await getBlogPosts();
        if (active) {
          setPosts(list);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="blog">
      <BannerMedio texto="BLOG" backgroundImage={backgroundImage} bannerKey="blog" />
      {loading && (
        <div className="blog-loading">
          Cargando publicaciones...
        </div>
      )}
      <div className="blog-container">
        {posts.map((post) => (
          <article key={post.id} className="post">
            <div
              className="post-image"
              style={{ backgroundImage: `url(${post.bannerImage || post.image})` }}
            ></div>
            <div className="post-content">
              <p className="post-meta">{post.date} · {post.author}</p>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-subtitle">{post.description}</p>
              <Link className="post-button" to={post.url}>
                Ver blog
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
