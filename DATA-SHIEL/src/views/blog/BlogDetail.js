import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { findPostBySlug } from './data';
import './Blog.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const found = await findPostBySlug(slug);
        if (active) {
          setPost(found || null);
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
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail blog-detail-page">
        <p>Cargando publicación...</p>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const paragraphs = (post.content || '').split('\n\n');

  return (
    <div className="blog-detail blog-detail-page">
      <div
        className="blog-banner"
        style={{ backgroundImage: `url(${post.bannerImage})` }}
      >
        <div className="blog-banner__content">
          <p className="post-meta">{post.date} · {post.author}</p>
          <h1 className="blog-banner__title">{post.title}</h1>
          <h3 className="blog-banner__subtitle">{post.subtitle}</h3>
        </div>
      </div>

      <div className="blog-detail__content">
        <p className="blog-detail__meta">{post.date} · {post.author}</p>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <div className="blog-detail__footer">
          <p className="blog-detail__meta">{post.date} · {post.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
