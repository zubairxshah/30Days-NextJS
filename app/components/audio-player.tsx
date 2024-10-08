"use client"; // Enables client-side rendering for this component

import md5 from "crypto-js/md5";
import React, { useState, useRef, useEffect } from "react"; // Import React hooks
import { Button } from "@/components/ui/button"; // Import custom Button component
import { Card, CardContent } from "@/components/ui/card"; // Import custom Card components
import { Progress } from "@/components/ui/progress"; // Import custom Progress component
import {
  ForwardIcon,
  PlayIcon,
  RewindIcon,
  UploadIcon,
  PauseIcon,
} from "lucide-react"; // Import icons from lucide-react
import Image from "next/image"; // Import Next.js Image component

// Define types for the component props and state
interface AudioPlayerProps {}

// Define the Track interface
interface Track {
  title: string;
  artist: string;
  src: string;
  type: "file" | "stream";
}

const fetchTrackInfo = async (artist: string, track: string) => {
  console.log(
    <code>
      Fetching info for ${artist} - ${track}
    </code>
  );

  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(
    artist
  )}&track=${encodeURIComponent(track)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.track;
  } catch (error) {
    console.error("Error fetching track info:", error);
    return null;
  }
};

const generateSignature = (
  params: Record<string, string>,
  apiSecret: string
) => {
  const sortedKeys = Object.keys(params).sort();
  let signatureBase = "";
  for (const key of sortedKeys) {
    signatureBase += key + params[key];
  }
  signatureBase += apiSecret;
  return md5(signatureBase).toString();
};
const scrobbleTrack = async (artist: string, track: string) => {
  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_LASTFM_API_SECRET;
  const username = 'YOUR_LASTFM_USERNAME'; // Replace with actual username
  const timestamp = Math.floor(Date.now() / 1000).toString();

  if (!apiKey || !apiSecret) {
    console.error('Last.fm API key or secret is missing');
    return;
  }

  const params = {
    method: 'track.scrobble',
    api_key: apiKey,
    artist: artist,
    track: track,
    timestamp: timestamp,
    sk: 'YOUR_SESSION_KEY', // You need to obtain this through authentication
  };

  const signature = generateSignature(params, apiSecret);

  const url = 'https://ws.audioscrobbler.com/2.0/';
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('api_sig', signature);
  formData.append('format', 'json');

  try {
    const response = await fetch(url, { 
      method: 'POST', 
      body: formData 
    });
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      console.log('Scrobbled:', data);
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
    }
  } catch (error) {
    console.error('Error scrobbling track:', error);
  }
};


const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // State to manage the list of tracks
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // State to manage the current track index
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // State to manage the play/pause status
  const [progress, setProgress] = useState<number>(0); // State to manage the progress of the current track
  const [currentTime, setCurrentTime] = useState<number>(0); // State to manage the current time of the track
  const [duration, setDuration] = useState<number>(0); // State to manage the duration of the track
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to manage the audio element
  const [trackInfo, setTrackInfo] = useState<any>(null);
  // Radio staton handler
  const addStreamingStation = (url: string, title: string, artist: string) => {
    const newTrack: Track = {
      title,
      artist,
      src: url,
      type: "stream",
    };
    setTracks((prevTracks) => [...prevTracks, newTrack]);
  };

  // Function to handle track change
  const handleTrackChange = async () => {
    if (tracks[currentTrackIndex]) {
      const { artist, title } = tracks[currentTrackIndex];
      try {
        const info = await fetchTrackInfo(artist, title);
        setTrackInfo(info);
        // Attempt to scrobble the track
        await scrobbleTrack(artist, title);
      } catch (error) {
        console.error("Error handling track change:", error);
      }
    }
  };

  // Function to handle file upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newTracks: Track[] = Array.from(files).map((file) => ({
        title: file.name,
        artist: "Unknown Artist",
        src: URL.createObjectURL(file),
        type: "file",
      }));
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
    }
  };

  // Function to handle play/pause toggle
  const handlePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error toggling play/pause:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Current tracks:", tracks);
    console.log("Current track index:", currentTrackIndex);
    console.log("Current track:", tracks[currentTrackIndex]);
  }, [tracks, currentTrackIndex]);

  // Function to handle next track
  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  // Function to handle previous track
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  // Function to handle time update of the track
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  // Function to handle metadata load of the track
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Function to format time in minutes and seconds
  const formatTime = (time: number, isStream: boolean) => {
    if (isStream) return "Live";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // useEffect to handle track change
  useEffect(() => {
    const playTrack = async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = tracks[currentTrackIndex]?.src || "";
        audioRef.current.load();

        if (tracks[currentTrackIndex]?.type === "stream") {
          setDuration(0);
        } else {
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
          setProgress(0);
        }

        if (isPlaying) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Add a small delay
            await audioRef.current.play();
          } catch (error) {
            console.error("Error playing track:", error);
            setIsPlaying(false);
          }
        }

        handleTrackChange();
      }
    };

    playTrack();
  }, [currentTrackIndex, tracks, isPlaying]);

  // JSX return statement rendering the Audio Player UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Audio Player</h1>
          <label className="flex items-center cursor-pointer">
            <UploadIcon className="w-5 h-5 mr-2" />
            <span>Upload</span>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <Image
              src="/music.svg"
              alt="Album Cover"
              width={100}
              height={100}
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">
                {tracks[currentTrackIndex]?.title || "Audio Title"}
              </h2>
              <p className="text-muted-foreground">
                {tracks[currentTrackIndex]?.artist || "Person Name"}
              </p>
              {trackInfo && (
                <div>
                  <p>Listeners: {trackInfo.listeners}</p>
                  <p>Playcount: {trackInfo.playcount}</p>
                </div>
              )}
            </div>
            <div className="w-full">
              <Progress value={progress} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {formatTime(
                    currentTime,
                    tracks[currentTrackIndex]?.type === "stream"
                  )}
                </span>
                <span>
                  {formatTime(
                    duration,
                    tracks[currentTrackIndex]?.type === "stream"
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handlePrevTrack}>
                <RewindIcon className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextTrack}>
                <ForwardIcon className="w-6 h-6" />
              </Button>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleNextTrack}
              onError={(e) => console.error("Audio error:", e)}
            >
              <source src={tracks[currentTrackIndex]?.src} type="audio/mpeg" />
              <source src={tracks[currentTrackIndex]?.src} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
        <div>
          <Button
            onClick={() =>
              addStreamingStation(
                "http://example.com/stream.m3u8",
                "My FM Station",
                "FM Radio"
              )
            }
          >
            Add FM Station
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
