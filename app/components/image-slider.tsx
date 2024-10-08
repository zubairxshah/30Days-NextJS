"use client"; // Enables client-side rendering for this component

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon } from "lucide-react";

// Define the ImageData interface
interface ImageData {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
}

export default function ImageSlider() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const interval = 3000; // Interval for the carousel autoplay

  const fetchImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&per_page=10`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const nextImage = useCallback((): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(nextImage, interval);
      return () => clearInterval(id);
    }
  }, [isPlaying, nextImage]);

  const togglePlayPause = (): void => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
        
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mb-4">Image Slider</h1>
          <p className="text-center text-gray-600 mb-8">
            A simple dynamic image slider/carousel with Unsplash.
          </p>
          <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
            <Carousel className="carousel-container">
              <CarouselContent>
                {Array.isArray(images) && images.length > 0 ? (
                  images.map((image, index) => (
                    <CarouselItem
                      key={image.id}
                      className={index === currentIndex ? "block" : "hidden"}
                    >
                      <Image
                        src={image.urls.regular}
                        alt={image.alt_description}
                        width={800}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-2 bg-white/75 text-center">
                        <h2 className="text-lg font-bold">{image.user.name}</h2>
                        <p className="text-sm">
                          {image.description || image.alt_description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <div className="p-4 text-center">Loading images...</div>
                )}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
              className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6 text-gray-800" />
              ) : (
                <PlayIcon className="w-6 h-6 text-gray-800" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
