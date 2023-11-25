import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Textarea, Select } from '@windmill/react-ui';
import ReactTagInput from '@pathofdev/react-tag-input';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import InputValue from '../form/InputValue';
import SelectOption from '../form/SelectOption';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import ChildrenCategory from '../category/ChildrenCategory';
import ParentCategory from '../category/ParentCategory';
import useProductSubmit from '../../hooks/useProductSubmit';
import { AddProductApi } from '../../Axios/Axios';

const ProductDrawer = ({ id }) => {
  const {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  } = useProductSubmit(id);

  const [product,SetProduct]=useState({
    p_name :'',
    p_image :'',
    p_brand :'',
    p_status :'1',
    p_des :'',
    p_price :'',
    disc_price :'', 
    discount :'', 
    category :'', 
    sub_category :'', 
    user_data :'',
    mobile_processor : '',
    mobile_battery : '' ,
    mobile_memory : '' ,
    mobile_display : '' ,
    mobile_camera : '' ,
    laptop_processor : '' ,
    laptop_battery : '' ,
    laptop_memory : '' ,
    laptop_display : '' ,
    laptop_generation : '' ,
    lcd_display : '' ,
    lcd_power_consumption : '' ,
    lcd_audio : '' ,
    lcd_chip : '' ,
    ac_capacity : '' ,
    ac_type : '' ,
    ac_inverter : '' ,
    ac_warranty : '' ,
    ac_energy_efficiency : '' ,
    color : '' ,
    quantity : ''
  });
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const [selectedValue, setSelectedValue] = useState('');
  const [productDetails, setProductDetails] = useState([]);

  const handleProductTypeChange = (event) => {
    const selectedProduct = event.target.value;
    setSelectedValue(selectedProduct);

    // Clear previously entered product details when the user selects a different product
    setProductDetails([]);
  };

  const handleAddDetails = (event) => {
    event.preventDefault();
    // Get the entered details from the input fields
    const newDetails = {
      id: event.target.id.value,
      processor: event.target.processor.value,
      memory: event.target.memory.value,
      display: event.target.display.value,
      camera: event.target.camera ? event.target.camera.value : null, // Only for Mobile product
      powerConsumption: event.target.powerConsumption ? event.target.powerConsumption.value : null, // Only for LCD product
      audio: event.target.audio ? event.target.audio.value : null, // Only for LCD product
      chip: event.target.chip ? event.target.chip.value : null, // Only for LCD product
      category: event.target.category ? event.target.category.value : null, // Only for LCD product
      battery: event.target.battery ? event.target.battery.value : null, // Only for Laptop product
      generation: event.target.generation ? event.target.generation.value : null, // Only for Laptop product
      product: event.target.product ? event.target.product.value : null, // Only for Laptop product
      invertor: event.target.invertor ? event.target.invertor.value : null, // Only for AC product
      warranty: event.target.warranty ? event.target.warranty.value : null, // Only for AC product
      energyEfficiency: event.target.energyEfficiency ? event.target.energyEfficiency.value : null, // Only for AC product
    };

    // Add the new details to the productDetails array
    setProductDetails([...productDetails, newDetails]);

    // Clear the input fields after adding the details
    event.target.reset();
  };


  const handleChange=(e)=>{
    if(e.target.name=='p_image'){
        console.log(e.target.files[0])
        SetProduct({...product,[e.target.name]:e.target.files[0]});
    }else{

      SetProduct({...product,[e.target.name]:e.target.value});
    }
    console.log({name:e.target.name,value:e.target.value})
  }


  const handleSubmitForm= async()=>{
      const response = await AddProductApi(product,user_id);
  }
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Product"
            description="Updated your product and necessary information from here"
          />
        ) : (
          <Title
            title="Add Product"
            description="Add your product and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            {/* Product Image */}
           

            {/* Product Title/Name */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Title/Name <span style={{ color: 'red' }}>*</span></span>} />
             
              <div className="col-span-8 sm:col-span-4">
                <InputArea
               
                  register={register}
                  label="Product Title/Name*"
                  name="p_name"
                  type="text"
                  placeholder="Product title "
                  value={product.p_name}
                  
                  onChange={handleChange}
                />
               
                <Error errorName={errors.title} />
              </div>
            </div>

            {/* Product Description */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Description <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('description', {
                    required: 'Description is required!',
                    minLength: {
                      value: 20,
                      message: 'Minimum 20 characters!',
                    },
                  })}
                  name="p_des"
                  value={product.p_des}
                  onChange={handleChange}
                  placeholder="Product details"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Category <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="category" 
                  value={product.category} onChange={handleChange}
                >
                  <option value="" defaultValue hidden>
                    Select Product Category
                  </option>
                  <option value="LCD" name="">LCD</option>
                  <option value="Phones">Mobile</option>
                  <option value="Laptops">Laptop</option>
                  <option value="AC">AC</option>
                </Select>
                
                {product.category && (
        <div>
          <h2>Product Details for {product.category}</h2>
        
            
            {product.category === 'Phones' && (
              <>
              <label>
                  Processor:
                  <input name='mobile_processor' value={product.mobile_processor} placeholder="Processor" onChange={handleChange} />
                </label>
                <br />
                <label>
                  Battery:
                  <input name='mobile_battery' value={product.mobile_battery} placeholder="Battery"  onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Memory:
                  <input name='mobile_memory' value={product.mobile_memory} placeholder="Memory"  onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Display:
                  <input name='mobile_display' value={product.mobile_display} placeholder="Display"  onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Camera:
                  <input name='mobile_camera' value={product.mobile_camera} placeholder="Camera"  onChange={handleChange}/>
                </label>
                <br />
              </>
            )}
            {product.category === 'LCD' && (
              <>
              <label>
                  Display:
                  <input name='lcd_display' value={product.lcd_display} placeholder="Display"  onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Power Consumption:
                  <input name='lcd_power_consumption' value={product.lcd_power_consumption} placeholder="Power Consumption" onChange={handleChange} />
                </label>
                <br />
                <label>
                  Audio:
                  <input name='lcd_audio' value={product.lcd_audio} placeholder="Audio" onChange={handleChange} />
                </label>
                <br />
                <label>
                  Chip:
                  <input name='lcd_chip' value={product.lcd_chip} placeholder="Chip " onChange={handleChange}/>
                </label>
                <br />
               
                <br />
              </>
            )}
            {product.category === 'Laptops' && (
              <>
              <label>
                  Processor:
                  <input name='laptop_processor' value={product.laptop_processor} placeholder="Processor" onChange={handleChange} />
                </label>
                <br />
                <label >
                  Battery:
                  <input name='laptop_battery' value={product.laptop_battery} placeholder="Battery" onChange={handleChange} />
                </label>
                <br />
               
                <label>
                  Memory:
                  <input name='laptop_memory' value={product.laptop_memory} placeholder="Memory" onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Display:
                  <input name='laptop_display' value={product.laptop_display} placeholder="Display" onChange={handleChange}/>
                </label>
                <br />
                <label   >
                  generation:
                  <input register={register}
                  value={product.laptop_generation}
                  label="Quantity"
                  name="laptop_generation"
                  type="number"
                  onChange={handleChange}
                  placeholder="Generation"  />
                </label>
                <br />
              </>
            )}
            {product.category === 'AC' && (
              <>
              <label>
                  Capacity:
                  <input value={product.ac_capacity} name='ac_capacity' placeholder="Capacity" onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Type:
                  <input value={product.ac_type} name='ac_type' placeholder="Type" onChange={handleChange}/>
                </label>
                <br />
          <label>
          Invertor:
            <input type="radio" name="ac_inverter" value="true" required onChange={handleChange}/> True
          </label>
          <label>
            <input type="radio" name="ac_inverter" value="false" required onChange={handleChange}/> False
          </label>
          
                <br />
                <label>
                  Warranty:
                  <input name='ac_warranty' value={product.ac_warranty} placeholder="Warranty" onChange={handleChange}/>
                </label>
                <br />
                <label>
                  Energy Efficiency:
                  <input  register={register}
                  value={product.ac_energy_efficiency}
                  label="Quantity"
                  name="ac_energy_efficiency"
                  type="number"
                  onChange={handleChange}
                  placeholder="Energy efficiency"/>
                </label>
                <br />
              </>
            )}
           
          
        </div>
                 )}
              </div>
            </div>

            
           
            {/* Rest of the form... */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Brand <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  value={product.p_brand}
                  name="p_brand"
                  placeholder=" Product Brand"
                  onChange={handleChange}
                />
                <Error errorName={errors.unit} />
              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Price <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">

                
                <InputValue
                  register={register}
                  value={product.p_price}
                  label="Price"
                  name="p_price"
                  type="text"
                  placeholder="Price"
                  onChange={handleChange}
                />
                <Error errorName={errors.originalPrice} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Sale Price <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  value={product.disc_price}
                  defaultValue="0"
                  required="false"
                  label="Sale price"
                  name="disc_price"
                  onChange={handleChange}
                  type="number"
                  placeholder="Sale price"
                />
                <Error errorName={errors.disc_price} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Discount in percent <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  placeholder="Discount in percent"
                  value={product.discount}
                  onChange={handleChange}
                  name="discount"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Product Image <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4">
             
                <input type="file" name='p_image'  onChange={handleChange} />
              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <h2 style = {{fontSize:'26px'}}><b> Variations</b>  </h2> 
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={<span>Produt Quantity <span style={{ color: 'red' }}>*</span></span>} />
              <div className="col-span-8 sm:col-span-4" >
                <InputValue
                  register={register}
                  value={product.quantity}
                  label="Quantity"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  placeholder="Quantity"
                />
                <Error errorName={errors.quantity} />
              </div>
            </div>
            
            <div className="font-size-selector">
            <h2 className>Colours: </h2>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <input
            type="radio"
            name="color"
            value="white" 
            onChange={handleChange}
            />
            <label>White</label>
            <input
            type="radio"
            name="color"
            value="grey"
            onChange={handleChange}

            />
            <label>Grey</label>
            <input
            type="radio"
            name="color"
            value="black"
            onChange={handleChange}
            />
            <label>Black</label>
            </div>



            
            </div>


          </div>

          {/* <DrawerButton id={id} title="Product" /> */}
          <button type="button" onClick={handleSubmitForm} style={{ backgroundColor: 'Green', width : '200px' , color: 'white', padding: '8px', borderRadius: '3px', cursor: 'pointer' , marginLeft: '300px' , marginBottom : '50px' }}>Add Product</button>
        </form>
      </Scrollbars>
    </>
  );

            
};

export default React.memo(ProductDrawer);
