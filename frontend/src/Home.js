
import BlogList from './PassesAnalysis';
import useFetch from "./useFetch";

const Home = () => {

    // const [title,setName] = useState('oui1');
    // const handleClick = () => {
    //     setName('oui2');
       
    // }
    // const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

    // const [blogs, setB] = useState([
    //     { name: 'giouxou', body: 'lorem ipsum...', author : 'mario',id : 0},
    //     { name: 'koukou', body: 'lorem ipsum...', author : 'luigi',id : 1},
    //     { name: 'gkoux', body: 'lorem ipsum...', author : 'yoshi',id : 2}

    // ]);

    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter(blog => blog.id !== id);
    //     console.log("koukou");
    //     setB(newBlogs);
    //   };

      //const [isPending,setisPending] = useState(true);


    //   useEffect(() => {
    //       setTimeout(() => {
    //         setisPending(false); 
    //       }, 1000);
          
    //   },[blogs]);

    return ( 
        <div className="home">
            {/* {isPending && <div>Loading...</div> } */}
            <h1>Αρχική</h1>
            <p>
              Το ePass-Όπου πας είναι ένα λογισμικό με στοχο την διαλειτουργικότητα των διοδίων.
              Συγκεκριμένα, είναι να αποτελέσει ένα ενιαίο σύστημα έκδοσης και αποστολής οφειλών 
              από διαφορετικούς λειτουργούς αυτοκινητοδρόμων-γνωρίζοντας τα δεδομένα διέλευσης- που επιτρέπουν την διέλευση οδηγών των οποίων οι πομποδέκτες υπάγονται σε άλλον αυτοκινητόδρομο.
            </p>
            {/* { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs} /> } */}
            {/* <BlogList blogs={blogs} title={title} handleDelete={handleDelete}/> 
            <button onClick={handleClick}>Click me</button> */}
        </div>
     );
}
 
{/* <p>{ name }</p>
            <button onClick={handleClick}>Click me</button> */}


export default Home;