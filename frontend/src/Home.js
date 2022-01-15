import  { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {

    const [title,setName] = useState('oui1');
    const handleClick = () => {
        setName('oui2'); 
    }

    const [blogs, setB] = useState([
        { name: 'giouxou', body: 'lorem ipsum...', author : 'mario',id : 0},
        { name: 'koukou', body: 'lorem ipsum...', author : 'luigi',id : 1},
        { name: 'gkoux', body: 'lorem ipsum...', author : 'yoshi',id : 2}

    ]);

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        console.log("koukou");
        setB(newBlogs);
      };


      useEffect(() => {
          console.log("effect");
          console.log(title);
      },[title]);

    return ( 
        <div className="home">
            <h1>Homepage</h1>
            <BlogList blogs={blogs} title={title} handleDelete={handleDelete}/> 
            <button onClick={handleClick}>Click me</button>
        </div>
     );
}
 
{/* <p>{ name }</p>
            <button onClick={handleClick}>Click me</button> */}


export default Home;