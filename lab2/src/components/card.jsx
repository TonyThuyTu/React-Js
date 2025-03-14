function Card ({title, content, children}) {

    return (

        <div
        
            // style={{

            //     border: "1px solid #000",
            //     margin: "10px",
            //     padding: "10px",
            //     borderRadius: "5px",

            // }}

        >
        
        <h3>{title}</h3>
        <p>{content}</p>
        {children && <div>{children}</div>}            


        </div>

    );


}

export default Card;