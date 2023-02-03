import path from "path";
import fs from "fs/promises";
import TicketCard from "../../components/ticketCard";
//========================================
const DetaileFlight = ({ ticketsInfo }) => {
  if (!ticketsInfo) {
    return (
      <>
        <div className="text-center mt-5">
          <div className="spinner-border " role="status"></div>
          <p> loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row justfy-content-center text-center mt-2">
          {ticketsInfo.map((ticket, index) => (
            <TicketCard key={index} ticketInfo={ticket} />
          ))}
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

  //_______If not found any ticket_______//
  if (!findeTicket) {
    return {
      notFound: true,
    };
  }
  return {
    props: { ticketsInfo: [findeTicket] },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
