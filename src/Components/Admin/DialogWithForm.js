import React, { useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";


function DialogWithForm() {

  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateChange = (date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(newDate);
  };

  const [open, setOpen] = React.useState(false);

  function submit(){
    const jsonData = {
      couponName:coupenname,
      discount:discount,
      minimumDiscount:minimumDiscount,
      expiryDate :selectedDate
    }
    console.log(jsonData)
    setOpen((cur) => !cur)
  }
  const handleOpen = () => setOpen((cur) => !cur);

  const [coupenname,setCoupenName] = useState('')
  const [discount, setDiscount] = useState('')
  const [minimumDiscount, setMinimumDiscount] = useState('')

  return (
    <React.Fragment>
      <Button onClick={handleOpen} className="text-red-500">Add Coupen</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-md"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center"

          >
            <Typography variant="h3" color="black">
              Coupen
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">

            <Input
              id="coupenname"
              label=""
              placeholder="Coupen Name"
              size="lg"
              className="pl-8" 
              value={coupenname}
              onChange={(e)=>setCoupenName(e.target.value)}
            />
            <Input
              id="discount"
              label=""
              placeholder="Coupen Discount"
              size="lg"
              className="pl-8" 
              value={discount}
              onChange={(e)=>setDiscount(e.target.value)}
            />
            <Input
              id="minimumDiscount"
              label=""
              placeholder="Minimum  Discount"
              size="lg"
              className="pl-8" 
              value={minimumDiscount}
              onChange={(e)=>setMinimumDiscount(e.target.value)}
            />
            <DatePicker
            id="expiryDate"
            selected={selectedDate} 
            onChange={handleDateChange} 
            placeholderText="Select Date"
            dateFormat="MM/dd/yyyy" 
            size="lg"
            className="pl-8"
          />
          </CardBody>
          <CardFooter className="pt-0 flex justify-center">
            <Button variant="gradient" 
            type="submit"
            onClick={submit} 
            fullWidth className="text-red-500"
            >
              Add Coupen
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogWithForm