'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const confettiColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
];

export default function BirthdayWish() {
  // State variables
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [celebrating, setCelebrating] = useState<boolean>(false);
  
  const [name, setName] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [showAnimation, setShowAnimation] = useState<boolean>(false)

  // Constants
  const totalCandles: number = 5;
  const totalBalloons: number = 5;

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to show confetti when all candles are lit and balloons are popped
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true);
    }
  }, [candlesLit, balloonsPoppedCount]);

  // Function to light a candle
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };

  // Function to pop a balloon
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount((prev) => prev + 1);
    }
  };

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAnimation(true)
  }

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  // Function to reset the component state
  const resetWish = () => {
    setName('');
    setDate('');
    setShowAnimation(false);
    setCandlesLit(0);
    setBalloonsPoppedCount(0);
    setShowConfetti(false);
    setCelebrating(false);
  }

  if (!showAnimation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">Birthday Wish</CardTitle>
            <CardDescription>Enter the details to start the celebration</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter the person's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Birthday Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Start Celebration</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border-2 border-black">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-black">
              Happy {calculateAge(date)}th Birthday!
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-600">
              {name}
            </CardDescription>
            <p className="text-lg text-gray-500">
              {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
          <div>
  <h3 className="text-lg font-semibold text-black mb-2">
    Light the candles:
  </h3>
  <div className="flex justify-center space-x-2">
    {[...Array(totalCandles)].map((_, index) => (
      <AnimatePresence key={index}>
        {index < candlesLit ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaBirthdayCake
              className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
              style={{
                color: balloonColors[index % balloonColors.length],
              }}
            />
          </motion.div>
        ) : (
          <FaBirthdayCake
            className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
            onClick={() => lightCandle(index)}
          />
        )}
      </AnimatePresence>
    ))}
  </div>
</div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Pop the balloons:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{
                        color:
                          index < balloonsPoppedCount
                            ? "#D1D5DB"
                            : balloonColors[index % balloonColors.length],
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="bg-gray-200 text-black hover:bg-gray-300 transition-all duration-300"
              onClick={resetWish}
            >
              Wish Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
}
