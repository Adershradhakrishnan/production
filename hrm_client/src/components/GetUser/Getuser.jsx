import React,{useEffect,useId,useState}  from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams,} from 'react-router-dom';
import axios from 'axios';
import './Getuser.css';
import Spinner from "../Spinners/Spinners";


function Getuser(){
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentpage, setCurrentpage] = useState(1);
    const [itemsperpage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [token,setToken] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(()=>{

        const storedToken=localStorage.getItem('token');

        if(storedToken){
            setToken(storedToken);
        }

        console.log(token)
    },[]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get('http://localhost:3000/getuser',{

                  params: {
                    page: currentpage,
                    limit: itemsperpage,
                    keyword: keyword
                  },

                   headers: {
                      'Authorization': `Bearer ${token}`,

                   },
                });
                setData(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:',error);
            }
        };
        if(token){
        fetchData();
        }

    },[token, currentpage, itemsperpage,keyword]);

    const HandleViewUser = (userId) => {
        if (userId !== undefined) {
            console.log("View button clicked for user ID:",userId);
        }else {
            console.log("User ID undefined");
        }
    };

    const nextPage = () => {
        if (currentpage < totalPages) {
            setCurrentpage(currentpage + 1);
        }
    };

    const prevPage = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    };

    const handleSearch = (e) => {
        const searchKeyword = e.target.value;
        setKeyword(searchKeyword);
        setCurrentpage(1);
    };
    

    return(
        <>
        {/* <div className="csk"> */}
            
            <div className="rcb">
               
                <h1>Users</h1>
                <input type="text" placeholder="Search" value={keyword} onChange={handleSearch}/>
            </div>
            <div className="mi">
                <h1>Name</h1>
                <h1>Email</h1>
                <h1 className="phone">Phone Number</h1>
            </div>
            {loading ? ( // display spinner if loading is true
                <Spinner/>
            ) : (
                data.map((user)=>(
                    <div className="dry" key={user._id}>
                        <div className="dry1">
                            <p> <input type="text" defaultValue={user.name} /></p>
                        </div>
                       <div className="dry2">
                        <p> <input type="email" defaultValue={user.email} /></p>
                        </div> 

                        <div className="dry3">
                            <p> <input type="phonenumber" defaultValue={user.phonenumber} /></p>
                        </div>

                         <div>
                            <Link to={`/detailsuser/${user._id}`}><button onClick={()=> HandleViewUser(user._id)}>View</button></Link>
                        </div> 

                      </div>  
                ))
           
            )}

            <div className="pagination">
                <button onClick={prevPage} disabled={currentpage === 1}>Prev</button>
                <span>{currentpage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentpage === totalPages}>Next</button>
            </div>
        {/* </div> */}
        </>
    );
}

export default Getuser