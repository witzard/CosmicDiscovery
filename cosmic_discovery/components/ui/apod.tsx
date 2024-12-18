'use client'
import { useEffect, useState } from "react";

interface ApodData {
    url: string;
    title: string;
    date: string;
    media_type: string;
    explanation: string;
}

export default function APODPost() {
    const [apodData, setApodData] = useState<ApodData | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiKey = "OHQwKf2fCHQMzRATCbakVrqPeEfGd5LkigLXzhnH";
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
                const apodData = await response.json();
                setApodData(apodData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, []);

    if (!apodData) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="mb-4 text-lg md:text-4xl font-bold text-white"> Astronomy Picture of the Day</h1>
        <div className="flex flex-col lg:flex-row gap-3">
                <div className="min-w-[50%]">

                    {apodData.media_type === 'image' ? (
                        <img
                            src={apodData.url}
                            alt={apodData.title}
                            className="h-64 w-full rounded-xl object-cover sm:h-72 lg:h-96"
                        />
                    ) : apodData.media_type === 'video' ? (
                        <iframe
                            width="100%"
                            src={apodData.url}
                            title={apodData.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p className="my-12 text-center text-red-500">Unsupported media type</p>
                    )}

                    <div className=" mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                        <strong className="text-white font-medium">{apodData.date} </strong>
                        <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-[#7b337d]"></span>
                        <p className="text-white mt-0.5 opacity-50 sm:mt-0"> {apodData.title} </p>
                    </div>
                </div>
                <div className="hidden lg:block w-1 h-[100%] bg-white "></div>

                <div className=" text-white text-xs md:text-medium lg:text-lg">{" "}{apodData.explanation}</div>
            </div>
        </div>
    );
}
