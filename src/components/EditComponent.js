// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {getToken} from '../services/authorize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditComponent = () => {
  const { slug } = useParams();

  const Alert = withReactContent(Swal);

  const [state, setState] = useState({
    title: '',
    author: '',
    slug: '',
  });

  const { title, author } = state;
  const [content, setContent] = useState('');

  const submitContent = (event) => {
    setContent(event);
  };

  const inputValue = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author },{headers:{authorization:`Bearer ${getToken()}`}})
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, author, content, slug });
        Alert.fire({
          icon: 'success',
          timer: 1500,
          title: 'Update Done.',
          showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='mx-lg container p-8'>
      <form onSubmit={submitForm} className='flex w-full flex-col items-center justify-center'>
        <div className='border-1 space-y-12 rounded-lg border border-gray-300 bg-white p-10'>
          <Breadcrumbs link={`/blog/edit/${slug}`} slug={`Edit`} />
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>Edit Blog</h2>
            
            <div className=' mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Title
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      autoComplete='title'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder=' Title Name'
                      defaultValue={title}
                      onChange={(event) => inputValue(event)}
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='author'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Author
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      type='text'
                      name='author'
                      id='author'
                      autoComplete='author'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder=' author Name'
                      defaultValue={author}
                      onChange={(event) => inputValue(event)}
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='content'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Content
                </label>
                <div className='mt-2'>
                  <ReactQuill
                    className='max-w-md'
                    theme='snow'
                    value={content}
                    onChange={submitContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Link to={'/'}>
            <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
