"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EpisodeContainer from "@/components/episode";
import { Skeleton, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import { CONSUMET_URL } from "@/config";
import Link from "next/link";

interface EpisodeDetails {
  id: number;
  title: string;
}

interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  quality: string;
}

interface WatchData {
  sources: WatchDataSources[];
  subtitles: { url: string; lang: string }[];
}

const Watch = ({ params }: any) => {
  const { id, episode } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState<WatchData | null>(null);
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchDetails = useCallback(async () => {
    try {
      const episode_link = await axios.get(
        CONSUMET_URL + "/watch?episodeId=" + id + "$episode$" + episode + "$both&", 
        { params: { server: "vidcloud" } }
      );
      const details_res = await axios.get(CONSUMET_URL + "/" + id);
      setWatchData(episode_link.data);
      setEpisodeDetails(details_res.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      await sleep(5000);
      setIsLoading(false);
    }
  }, [id, episode]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (!watchData) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center pb-5"></div>
        ) : (
          <div className="flex flex-col items-center justify-center pb-5">
            <div className="text-4xl font-bold mb-4">No Results Found</div>
            <div className="text-gray-500">Took a wrong turn?</div>
          </div>
        )}
        <Skeleton className="rounded-md">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
          <iframe
            src={""}
            title="Embedded Video"
            width="100%"
            height="450"
            scrolling="no"
            allowFullScreen
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </Skeleton>
      </div>
    );
  }

  // Log watchData to check if it's structured correctly
  console.log("Watch Data:", watchData);

  // Ensure the sources array is populated
  const videoSource = watchData.sources && watchData.sources[0] ? watchData.sources[0].url : null;

  // Log the video URL to check it
  console.log("Video URL:", videoSource);

  if (!videoSource) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-4">
        <div className="flex flex-col items-center justify-center pb-5">
          <div className="text-4xl font-bold mb-4">Video Not Available</div>
          <div className="text-gray-500">Sorry, we couldn't find the video</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-1 mx-auto px-4 pt-10">
      <div className="pb-4">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="flex flex-col flex-wrap pb-2">
            <Breadcrumbs size="lg">
              <BreadcrumbItem>
                <Link href={`/${id}`}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{episode}</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex">
        <MediaPlayer src={videoSource}>
          <MediaProvider>
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaProvider>
        </MediaPlayer>
      </div>
    </div>
  );
};

export default Watch;
