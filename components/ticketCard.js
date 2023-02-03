import styles from "../styles/TicketCard.module.css";
import { setCityName } from "../util/setCityName";

//======================================
const TicketCard = ({ ticketInfo }) => {
  const from = ticketInfo.from;
  const to = ticketInfo.to;
  const { fromCityName, toCityName } = setCityName({ from, to });

  return (
    <>
      <div className={styles.ticketBox}>
        <div className="row align-items-center text-center">
          <p>اطلاعات پرواز</p>
          <hr />
          <div className="col-md-4">
            <p>مبدا : " {fromCityName} "</p>
            <p>مقصد :" {toCityName} "</p>
          </div>
          <div className="col-md-4">
            <p>تاریخ پرواز : {ticketInfo.date}</p>
            <p>ساعت پرواز : {ticketInfo.time}</p>
          </div>
          <div className="col-md-4">
            <p> قیمت بلیط : {ticketInfo.price}</p>
            <p> تعداد صندلی خالی : {ticketInfo.emptyChair}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
