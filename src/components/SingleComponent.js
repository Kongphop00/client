import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Breadcrumbs from './Breadcrumbs';

const SingleComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState('');

  const fetcData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetcData();
  }, []);

  return (
    <>
      <div className='mx-lg container p-8'>
        <div className='border-1 space-y-12 rounded-lg border border-gray-300 bg-white p-10'>
          <Breadcrumbs link={`/blog/${slug}`} slug={`${slug}`} />
          <div className='border-b border-gray-900/10 pb-12'>
            {
              (blog && <h2 className='mb-2 text-2xl'>{blog.title}</h2>,
              typeof blog.content === 'string' ? parse(blog.content) : '')
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleComponent;
