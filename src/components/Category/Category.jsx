import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
const Category = () => {
     
    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">
                   Working on Category
                </div>
                <Products  />
            </div>
        </div>
    );
};

export default Category;
