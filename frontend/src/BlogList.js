import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;









// const BlogList = ({ blogs, title, handleDelete }) => {
//     // const blogs = props.blogs;
//     // const title = props.title;
//     // console.log(props,blogs);


//     return ( 
//         <div className="blog-list">
//             <h2>{title}</h2>
//             {blogs.map((blog) => ( //to key einai primary key
//                 <div className ="blog-preview" key={blog.id}> 
//                     <h2>{ blog.name }</h2>
//                     <p>Written by { blog.author }</p>
//                     <button onClick={() => handleDelete(blog.id)}>delete blog</button>
//                 </div>
//             ))}
//         </div>
//     );
// }
 
// export default BlogList;
