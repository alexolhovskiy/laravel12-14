export const Item=({item})=>{
    return(
        <div className="item">
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.description}</div>
        </div>
    );
}