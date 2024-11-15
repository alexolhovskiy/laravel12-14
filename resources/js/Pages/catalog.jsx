import { Footer } from "@/Components/footer"
import { Header } from "@/Components/header"
import { Item } from "@/Components/item";
import { fetchProducts } from "@/redux/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const Catalog=()=>{
    const {token}=useSelector(store=>store.user);
    const {loading,error,items}=useSelector(store=>store.products);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts({url:'/api/products',data:{},token}));
    },[dispatch]);

    return(
        <div className="container">
            <Header/>
            <main>
                {
                    loading?'Loading...':items.length>0?items.map(item=>(
                        <Item key={item.id} item={item}/>
                    )):'No data'
                }
            </main>
            <Footer/>
        </div>
    )
}