import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";

const Category = () => {
    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">Category</div>
                <hr className="category-hr" />
                <div className="primary-category-box">
                    <h2>Men</h2>
                    <div className="secondary-category-box">
                        <Products headingText="Jeans" primaryCategory="Men" secondaryCategory="Jeans" />
                        <Products headingText="Kurtas and Shirts" primaryCategory="Men" secondaryCategory="Kurta" />
                    </div>
                    <h2>Women</h2>
                    <div className="secondary-category-box">
                        <Products headingText="Dress" primaryCategory="Women" secondaryCategory="Dress" />
                        <Products headingText="Jeans" primaryCategory="Women" secondaryCategory="Jeans" />
                        <Products headingText="Top" primaryCategory="Women" secondaryCategory="Top" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
