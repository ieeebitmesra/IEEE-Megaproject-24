import productmodel from "../models/productmodel.js";
export const addproductcontroller = async (req,res) =>{
    try {
       const {selectedOption,title,price,quantity,date,image,discription,address,state,district} = req.body; 
    
       if (!selectedOption) {
        return res.send({ message: "catogry is required" });
      }

      if (!title) {
        return res.send({ message: "title is required" });
      }

      if (!price) {
        return res.send({ message: "pricce is required" });
      }

      if (!quantity) {
        return res.send({ message: "quqntity is required" });
      }

    //   if (!date) {
    //     return res.send({ message: "date is required" });
    //   }

    //   if (!image) {
    //     return res.send({ message: "image is required" });
    //   }

      if (!discription) {
        return res.send({ message: "discription is required" });
      }

      if (!address) {
        return res.send({ message: "address is required" });
      }

      if (!state) {
        return res.send({ message: "state is required" });
      }

      if (!district) {
        return res.send({ message: "district is required" });
      }

      const product = await new productmodel({
        selectedOption,title,price,quantity,date,image,discription,address,state,district
      }).save();

      res.status(201).send({
        success: true,
        message: "product added successfully",
      });
    
    
    } catch (error) {
        console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in adding",
    })
}
}
