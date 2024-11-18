import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const DetailsContainer = ({ data }: any) => {
  if (!data) {
    return <div>No Data!</div>;
  }
  const getRandomColor = ():
    | "secondary"
    | "primary"
    | "success"
    | "danger"
    | "warning" => {
    const colors: (
      | "secondary"
      | "primary"
      | "success"
      | "danger"
      | "warning"
    )[] = ["primary", "secondary", "success", "danger", "warning"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto lg:flex">
        <div className="pb-10 pr-5">
          <div
            className="rounded-lg overflow-hidden bg-white shadow-md"
            style={{ width: "250px" }}
          >
            <div className="relative h-96">
              <Image
                src={data.image}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Anime Cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className=" pr-4">
          <h1 className="text-3xl font-semibold">{data.title}</h1>
          
          <p className="mt-2 gap-2">
            <strong>Genres: </strong>
           
          </p>
          <p className="mt-4">
            <strong>Total Episodes:</strong> {data.totalEpisodes}
          </p>
          <p className="mt-2">
            <strong>Release Date:</strong> {data.releaseDate}, {data.status}
          </p>
          <p className="mt-2">
            <strong>Description:</strong> {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;