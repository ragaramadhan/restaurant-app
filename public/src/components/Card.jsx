import { useEffect, useState } from "react";
// import cuisineJson from "../../cuisines.json";
import axios from "axios";

export default function Card({ cuisines }) {
  // const [cuisines, setCuisines] = useState([]);
  // console.log(search);

  // async function fetchCuisine() {
  //   try {
  //     const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines`);
  //     // console.log(data.data.query);
  //     setCuisines(data.data.query);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchCuisine();
  // }, []);
  return (
    <>
      <div id="PAGE-HOME">
        <main className=" p-3 mt-2 bg-[url('https://cdn.vectorstock.com/i/500p/02/01/restaurant-background-vector-400201.jpg')] grid grid-cols-4 gap-4 ml-2 mr-2 ">
          {/* card 1 */}
          {cuisines.map((el) => {
            return (
              <>
                <div key={el.id}>
                  <div className="w-80 h-full border-green-900 border-2 rounded-md hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-green-900 p-1  ">
                    <article className="w-full h-full bg-green-300">
                      <figure className="w-full h-1/2 border-black border-b-1">
                        <img src={el.imgUrl} alt="thumbnail" className="w-screen h-full object-cover border-2" />
                      </figure>
                      <div className="px-6 py-5 text-left h-full ">
                        <div className="flex justify-end space-x-6 ">
                          <button className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]">Order Menu</button>
                        </div>
                        <div>
                          <span className="flex items-center mt-5">
                            <span className="h-px flex-1 bg-black"></span>
                            <span className="shrink-0 px-6 ">{el.name}</span>
                            <span className="h-px flex-1 bg-black"></span>
                          </span>
                        </div>
                        {/* <h1 className="text-[32px] ">{el.name}</h1> */}
                        <div className="">
                          <p className="text-base mt-4 line-clamp-4">{el.description}</p>
                        </div>
                        {/* <strong>Read More</strong> */}
                      </div>
                    </article>
                  </div>
                </div>
              </>
            );
          })}
        </main>
      </div>
    </>
  );
}
