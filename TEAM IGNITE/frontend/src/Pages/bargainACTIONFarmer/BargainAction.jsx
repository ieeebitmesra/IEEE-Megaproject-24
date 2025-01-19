// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AllHeader from '../../components/Layout/AllHeader/AllHeader/AllHeader';
import MenusFarmer from '../../components/Menus/MenusFarmer/MenusFarmer';
import BargainRes from '../../components/Layout/bargainRes/BargainRes'; // Import the BargainResponse component
import { useNavigate } from 'react-router-dom';
import nofile from "../../assets/Screenshot_2023-11-07_130533-removebg-preview (1).png"; // Provide the correct path to your nofile image
import "../bargainACTIONFarmer/bargainAction.css"

const AfterLoginPageCommon = () => {
  const [products, setProducts] = useState([]);
  const [bargainRequests, setBargainRequests] = useState([]);
  const navigate = useNavigate();

  const getSingleProduct = async (slug) => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      // Assuming these state-setting functions exist, adapt based on your code
      setTitle(data.product.title);
      setCategory(data.product.category._id);
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

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting product');
    }
  };

  // Fetch bargain requests for a specific product
  const getBargainRequestsForProduct = async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/bargain/respond/${productId}`);
      setBargainRequests(data.bargainRequests);
    } catch (error) {
      console.error('Error fetching bargain requests:', error);
    }
  };

  // Fetch all bargain requests
  const getBargainRequests = async () => {
    try {
      const allBargainRequests = await Promise.all(products.map(async (p) => {
        const response = await axios.get(`/api/v1/bargain/respond/${p._id}`);
        return response.data;
      }));

      setBargainRequests(allBargainRequests);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching bargain requests');
    }
  };

  const getAllBargainRequests = async () => {
    try {
      const { data } = await axios.get("/api/v1/bargain/all");
      setBargainRequests(data.bargainRequests);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching all bargain requests');
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllBargainRequests();
  }, []);

  const BargainAction = () => {
    return (
      <div >
        <AllHeader />
        <MenusFarmer />
        <div className='main-container'>
        <div >
        <h1>Bargain Requests</h1>
        <div className='Cards-Container'>
        {bargainRequests.length > 0 ? (
          bargainRequests.map((bargain) => (
            <BargainRes
              key={bargain._id}
              bargain={bargain}
              bargainId={bargain._id}
              onRespond={getBargainRequests}
            />
          ))
        ) : (
          <section className="headingAfterlogin">
            <h1>Nothing to show here yet</h1>
          </section>
        )}
        </div>
      </div>
      </div>
      </div>
    );
  };

  return <BargainAction />;
};

export default AfterLoginPageCommon;
