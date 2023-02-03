import { useRouter } from "next/router";
import path from "path";
import fs from "fs/promises";
//========================================
const DetaileFlight = ({ findeTicket }) => {
  const router = useRouter();
  const info = router.query.search;
  console.log("search info:", info);

  if (!info) {
    return (
      <>
        <div className="text-center mt-5">
          <div className="spinner-border " role="status"></div>
          <p> loading...</p>
        </div>
      </>
    );
  }

  if (findeTicket.lengh === 0) {
    <>
      <div className="text-center mt-5">
        <p> هیچ پروازی یافت نشد </p>
      </div>
    </>;
  }
  return (
    <>
      <div className="container">
        <div className="row justfy-content-center text-center mt-2">
          <div className="col-5 bg-secondary  m-1">
            <p> Client Side info</p>
            <p>مبدا---------{info[0]}</p>
            <p>مقصد---------{info[1]}</p>
            <p>تاریخ رفت--- {info[2]}</p>
            <p>تاریخ برگشت--{info[3]}</p>
          </div>

          <div className="col-5 bg-info  m-1 ">
            <p> Server Side info</p>
            <p>مبدا---------{findeTicket.from}</p>
            <p>مقصد---------{findeTicket.to}</p>
            <p>تاریخ رفت--- {findeTicket.date}</p>
            <p>ساعت پرواز --{findeTicket.time}</p>
            <p> تعداد صندلی --{findeTicket.emptyChair}</p>
            <p> قیمت بلیط --{findeTicket.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetaileFlight;

//===================Server Side===================

export async function getStaticProps(context) {
  const { params } = context;
  const searchInfo = params.search;

  //______________fetching Data_____________//
  // دیتا نداشتم یه فایل الکی درست کردم از اونجا میخونم اطلاعاتو
  const filePath = path.join(process.cwd(), "custom-data", "ticketData.json");
  const file = await fs.readFile(filePath);
  const data = JSON.parse(file);
  const allTicket = data.tickets;

  //________If can't access to file________//
  if (!data || !allTicket) {
    return {
      redirect: {
        destination: "/err-file",
      },
    };
  }

  //___If there is no product available___//
  if (allTicket.length === 0) {
    return {
      notFound: true,
    };
  }

  //______finde tickets by search info_____//
  const findeTicket = allTicket.find(
    (ticket) =>
      ticket.from === searchInfo[0] &&
      ticket.to === searchInfo[1] &&
      ticket.date === searchInfo[2]
  );

  return {
    props: { findeTicket },
    revalidate: 60,
  };
}

//________________set Paths_______________//
// اینجام ادرسی چیزی نداشتم که اضاقه کنم!!!!!!
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
