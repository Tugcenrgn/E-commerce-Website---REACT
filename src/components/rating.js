import "./rating.css"

export default function Rating(props){
    const {rating, reviews} = props;
    return(
        <div className="rating">
           <div className="rating-stars">
            <span>
                    <i className={
                        rating >= 1 
                        ? 'fa fa-star star' 
                        : rating >= 0.5 
                        ? 'fas fa-star-half-alt star' 
                        : 'far fa-star star'}/>
                </span>

                <span>
                    <i className={
                        rating >= 2 
                        ? 'fa fa-star star' 
                        : rating >= 1.5 
                        ? 'fas fa-star-half-alt star' 
                        : 'far fa-star star'}/>
                </span>

                <span>
                    <i className={
                        rating >= 3 
                        ? 'fa fa-star star' 
                        : rating >= 2.5 
                        ? 'fas fa-star-half-alt star' 
                        : 'far fa-star star'}/>
                </span>

                <span>
                    <i className={
                        rating >= 4 
                        ? 'fa fa-star star' 
                        : rating >= 3.5 
                        ? 'fas fa-star-half-alt star' 
                        : 'far fa-star star'}/>
                </span>
                <span >
                <i className={
                    rating >= 5 
                    ? 'fa fa-star star' 
                    : rating >= 4.5 
                    ? 'fas fa-star-half-alt star' 
                    : 'far fa-star star'}/>
            </span>
           </div>

            <span className="rating-text">  {reviews}  reviews</span>
        </div>
    )
}