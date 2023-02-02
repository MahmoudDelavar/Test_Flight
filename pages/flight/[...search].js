import { useRouter } from "next/router";
//========================================
const DetaileFlight = (props) => {
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
            <p>مبدا---------{props.fiterInfo[0]}</p>
            <p>مقصد---------{props.fiterInfo[1]}</p>
            <p>تاریخ رفت--- {props.fiterInfo[2]}</p>
            <p>تاریخ برگشت--{props.fiterInfo[3]}</p>
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

  //______Fetching Data_____//
  // هیچ دیتایی نداشتم که پری رندر کنم
  return {
    props: { fiterInfo: params.search },
  };
}

//______set Paths_____//
// اینجام ادرسی چیزی نداشتم که اضاقه کنم!!!!!!
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
