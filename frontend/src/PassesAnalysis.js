import { Link } from 'react-router-dom';

const PassesAnalysisList = ({ data }) => {
  const l = data.PassesList;
  return (
    <div className="PassesAnalysisList">
      <table>
      <tr>
        <th>PassIndex</th>
        <th>PassID</th>
        <th>Timestamp</th>
        <th>VehicleID</th>
        <th>StationID</th>
        <th>PassCharge</th>
      </tr>
      {l.map(elem => (
      <tr key={elem.PassIndex}>
        <th>{ elem.PassIndex }</th>
        <th>{ elem.PassID }</th>
        <th>{ elem.TimeStamp }</th>
        <th>{ elem.VehicleID } </th>
        <th>{ elem.stationID }</th>
        <th>{ elem.PassCharge }</th>
      </tr>
      ))}
      </table>
    </div>
  );
}
 
export default PassesAnalysisList;









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
