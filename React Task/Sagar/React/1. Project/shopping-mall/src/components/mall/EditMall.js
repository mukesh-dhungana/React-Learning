import Loader from "../Loader/Loader";
import EditShop from "../shop/EditShop";
import classes from "./mallform.module.css";
import { useHistory, useLocation } from "react-router-dom";
import editReducer from "../../reducers/editReducer";
import addedShopImagesReducer from "../../reducers/addedShopImagesReducer";
import { storage, fireStore } from "../../firebase/config";
import React, { useState, useReducer, useEffect } from "react";

const MallForm = () => {

  //Removed Images
  const [imagesToRemove, setImagesToRemove] = useState([]);

  const history = useHistory();
  const location = useLocation();


  //States
  const [editData, editDispatch] = useReducer(editReducer, location.dataToSend);
  const [mallImage, setMallImage] = useState(null);
  const [mallImageError, setMallImageError] = useState(null);

  //Added Images
  const shopImageValues = [{ id: 0, images: [] }];

  const [addedShopImages, addedShopImagesDispatch] = useReducer(
    addedShopImagesReducer,
    shopImageValues
  );

  //Loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  //Change Handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    editDispatch({
      type: "EDIT_MALL_INFO",
      payload: { name: name, value: value },
    });
  };

  const types = ["image/jpeg", "image/png"];
  const imageHandler = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setMallImage(selected);
      setMallImageError(null);
    } else {
      setMallImageError("Please select an image file  (jpeg or png)");
      setMallImage(null);
    }
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const storageRef = storage.ref();
      let mallImageUrl = null;

      //Mall Image
      if (mallImage !== null) {
        //delete old image
        storageRef
          .child(location.dataToSend.mallImage.imageName)
          .delete()
          .then("DELETED")
          .catch((err) => console.log(err));

        //get url of new image
        const imageRef = storageRef.child(mallImage.name);
        await imageRef.put(mallImage);
        mallImageUrl = await imageRef.getDownloadURL();
      } else {
        mallImageUrl = location.dataToSend.mallImage.imageUrl;
      }

      await Promise.all(
        addedShopImages.map((image) =>
          Promise.all(
            image.images.map((img) => storage.ref().child(img.name).put(img))
          )
        )
      );

      const shopImageUrl = await Promise.all(
        addedShopImages.map((image) =>
          Promise.all(
            image.images.map((img) => storage.ref(img.name).getDownloadURL())
          )
        )
      );

      //Remove Shop Images from Firebase Storage
      imagesToRemove.forEach((image) =>
        storage.ref().child(image.ImageName).delete()
      );

      let setMallImage = location.dataToSend.mallImage;
      if (mallImage) {
        setMallImage = {
          id: Math.random() + mallImage.name,
          imageName: mallImage.name,
          imageUrl: mallImageUrl,
        };
      }

      let mall = {
        mallName: editData?.mallName,
        mallAddress: editData?.mallAddress,
        mallImage: setMallImage,
      };

      let shops = editData?.shops?.map((s, i) =>
        s.shopImages
          ? shopImageUrl[i]
            ? {
                id: i,
                shopName: s.shopName,
                shopDescription: s.shopDescription,
                shopImages: [
                  ...s.shopImages,
                  ...shopImageUrl[i].map((items, index) => ({
                    id: Math.random() + addedShopImages[i].images[index].name,
                    ImageName: addedShopImages[i].images[index].name,
                    url: items,
                  })),
                ],
              }
            : {
                id: i,
                shopName: s.shopName,
                shopDescription: s.shopDescription,
                shopImages: [...s.shopImages],
              }
          : {
              id: i,
              shopName: s.shopName,
              shopDescription: s.shopDescription,
              shopImages: [
                ...shopImageUrl[i].map((items, index) => ({
                  id: Math.random() + addedShopImages[i].images[index].name,
                  ImageName: addedShopImages[i].images[index].name,
                  url: items,
                })),
              ],
            }
      );

      //FireStore
      fireStore
        .collection("Shopping Mall")
        .doc(location.dataToSend.mallName)
        .delete()
        .then(() => console.log("DELETED"))
        .catch((err) => console.log(err));
      fireStore
        .collection("Shopping Mall")
        .doc(editData.mallName)
        .set({
          ...mall,
          shops: shops,
        });
      history.push("/admin/malls");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.formContainer}>
        {isLoading === true && <Loader />}
        <form className={classes.form} action="" onSubmit={submitHandler}>
          <div className={classes.innerDiv}>
            <input
              type="text"
              placeholder="Name of Mall"
              name="mallName"
              value={editData?.mallName}
              onChange={changeHandler}
              className={classes.input}
            />
            <input
              type="text"
              placeholder="Address"
              name="mallAddress"
              onChange={changeHandler}
              value={editData?.mallAddress}
              className={classes.input}
            />
            <label className={classes.label}>
              <input
                className={classes.upload}
                type="file"
                onChange={imageHandler}
              />
              <span>
                <i className="fas fa-image"></i>
              </span>
              <span className={classes.text}>(Add Image)</span>
            </label>
            {mallImageError && <p>{mallImageError}</p>}
          </div>
          <div>
            {mallImage ? mallImage.name : editData?.mallImage?.imageName}
          </div>

          {/*------- Shop ---------*/}
          {editData?.shops?.length > 0 && (
            <h4 className={classes.name}>Shop</h4>
          )}

          {editData?.shops?.map((dataShop, index) => (
            <div key={index}>
              <EditShop
                {...{
                  setImagesToRemove,
                  editData,
                  dataShop,
                  editDispatch,
                  index,
                  addedShopImagesDispatch,
                  addedShopImages,
                }}
              />
              <div className={classes.line}></div>
            </div>
          ))}

          {/* --------------------- */}

          <input
            className={isLoading ? classes.submitBtnOnLoad : classes.submitBtn}
            type="submit"
            value={isLoading ? "Updating..." : "Update"}
          />
        </form>
      </div>
    </div>
  );
};

export default MallForm;
