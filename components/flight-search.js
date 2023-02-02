import Link from "next/link";
import { AiOutlineSwap } from "react-icons/ai";
import { DatePicker } from "jalali-react-datepicker";
import { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
//===================================
const FlightSearch = () => {
  //---------initial data ans states---------
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const from = useRef(null);
  const to = useRef(null);

  //-----------get departure and return Date-----------
  const getDate = ({ value, from }) => {
    let date = value.value._i.split("-//");

    if (from === "departureDate") {
      setDepartureDate(date[0]);
    }
    if (from === "returnDate") {
      setReturnDate(date[0]);
    }
  };

  //---------handle Reverse Location------------
  const reversLocation = (e) => {
    e.preventDefault();
    if (from && to) {
      let temp = to.current.value;
      to.current.value = from.current.value;
      from.current.value = temp;
    }
  };

  //---------handle Search (submit form)--------
  const handleSearch = async (e) => {
    e.preventDefault();

    const cityFrom = from.current.value;
    const cityTo = to.current.value;
    const searchInfo = {
      cityFrom,
      cityTo,
      departureDate,
      returnDate,
    };
    console.log("searchInfo", searchInfo);

    location = `/flight/${cityFrom}/${cityTo}/${departureDate}/${returnDate}`;
  };

  //--------------------------
  return (
    <>
      <div className="container text-center  ">
        <div className="row justify-content-center mt-4  ">
          <div className="col-md-9 box  ">
            <form
              className="needs-validation"
              onSubmit={handleSearch}
              noValidate
            >
              <div className="row justify-content-center align-items-center mb-3">
                <div className="col">
                  <select
                    required
                    ref={from}
                    name="cityFrom"
                    className="form-select"
                    id="from"
                  >
                    <option value={null}>مبدا</option>
                    <option value="MHD">مشهد</option>
                    <option value="THR">تهران</option>
                    <option value="AWZ">اهوار</option>
                    <option value="SYZ">شیراز</option>
                    <option value="BND">بندرعباس</option>
                    <option value="KIH">کیش</option>
                  </select>
                </div>
                <div className="col ">
                  <button
                    onClick={reversLocation}
                    className="btn btn-secondary m-1"
                  >
                    <AiOutlineSwap className="fs-4 " />
                  </button>
                </div>
                <div className="col">
                  <select
                    required
                    ref={to}
                    name="cityTo"
                    className="form-select"
                    id="to"
                  >
                    <option value={null}>مقصد</option>
                    <option value="MHD">مشهد</option>
                    <option value="THR">تهران</option>
                    <option value="AWZ">اهوار</option>
                    <option value="SYZ">شیراز</option>
                    <option value="BND">بندرعباس</option>
                    <option value="KIH">کیش</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 ">
                <div className="col">
                  <DatePicker
                    label="تاریخ رفت"
                    timePicker={false}
                    onClickSubmitButton={(value) => {
                      getDate({ value, from: "departureDate" });
                    }}
                  />
                </div>
                <div className="col">
                  <DatePicker
                    label="تاریخ برگشت"
                    timePicker={false}
                    onClickSubmitButton={(value) => {
                      getDate({ value, from: "returnDate" });
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-info mb-3">
                جستجو
                <BiSearchAlt fontSize={25} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
