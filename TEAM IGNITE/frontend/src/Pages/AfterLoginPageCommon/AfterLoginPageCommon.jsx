import AllHeader from "../../components/Layout/AllHeader/AllHeader/AllHeader";
import nofile from "../../assets/Screenshot_2023-11-07_130533-removebg-preview (1).png";
import "../AfterLoginPageCommon/AfterLoginPageCommon.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, json } from "react-router-dom";
import MenusFarmer from "../../components/Menus/MenusFarmer/MenusFarmer";
import "../ViewProducts/ViewProducts.css";
import { useAuth } from "../../../src/context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "antd";
import SearchInput from "../../components/SearchInput/SearchInput.js";

const HomepageForWholeseller = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setTitle(data.product.title);
      setCategory(data.product.category._id);
      // setCategories(data.product.categories);
      setQuantity(data.product.quantity);
      setId(data.product._id);
      setDate(data.product.date);
      setImage(data.product.image);
      setDiscription(data.product.discription);
      setAddress(data.product.address);
      setState(data.product.state);
      setDistrict(data.product.district);
      setPrice(data.product.price);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length) getAllCategory();
  }, [checked]);

  useEffect(() => {
    if (checked.length) filterproduct();
  });

  const filterproduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went very wrong");
    }
  };

  const handleDelete = async () => {
    try {
      // let answer = window.prompt('are you sure you want to delete.?')
      // if(!answer) return
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("error in deleting product");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <AllHeader />
      <MenusFarmer />
      <div className="gient2"></div>
      <div className="megaContainerGIENT">
        <div className="massContiner">
          <div className="filterContainer">
            <h5>Filter By Category</h5>
            {/* <SearchInput /> */}
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="maincontainerviewproductWholeseller">
            <div className="headerAndSeachbar">
              <h2 className="productHeading">All Products List</h2>
              <SearchInput />
            </div>

            {/* {JSON.stringify(checked,null,4)} */}
            <div className="d-flex flex-wrap cardsDiv">
              {products?.map((p) => (
                <div className="card m-2 cardPRDUCY" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{ width: "18rem", height: "14rem" }}
                    alt={p.title}
                  />
                  <div className="card-body productcardMainDiv">
                    <h5 className="card-title cardTitle">{p.title}</h5>
                    <p className="card-text cardTitle">{p.discription}</p>  
                    <h3 className="card-text cardTitle">₹{p.price} Per KGs</h3>{" "}
                     
                    <section className="BargainBtnSection">
                      {/* <button href="#" className="BargainBTN">
                        Bargain
                      </button>
                      <button href="#" className="cartBTN">
                        Cart
                      </button> */}

                      <button
                        href="#"
                        onClick={() =>
                          navigate(`/HomepageWholeseller/product/${p.slug}`)
                        }
                        className="DetailsBTN"
                      >
                        More Details
                      </button>
                      {/* <button href="/cart" className="BuyBTN">
                        Buy Now
                      </button> */}
                    </section>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <section className="headingAfterlogin">
          <h1>Nothing to show here yet</h1>
        </section>
  
        <section className="afterloginNoFilePng">
          <img className="noFilePng" src={nofile} alt="" />
        </section> */}
      </div>
    </div>
  );
};

export default HomepageForWholeseller;
