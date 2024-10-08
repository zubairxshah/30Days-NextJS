import Link from "next/link";
import styles from "./styles/Widgets.module.css";
import React from "react";

const Widgets = () => {
  return (
    <div className={styles.container}>
      <div
        id="main"
        className="w-30 h-12 flex flex-wrap
						bg-green-200 border-solid border-4
						border-green-900 space-y-4 ..."
      >
        <h1 className="text-3xl font-bold underline text-black-600">My Apps</h1>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex ml-24 mt-6 mb-6">
          <div className={styles.cardContainer}>
            <Link href="/pages/Weather" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Weather App
              </h2>
              <p>Click to view Weather in Your Area!</p>
            </Link>
            <Link href="/pages/countdown" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Countdown App
              </h2>
              <p>Click to run this app</p>
            </Link>
            <Link href="/pages/numberguess" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Number Guessing App
              </h2>
              <p>Click to try your luck!</p>
            </Link>
            <Link href="/pages/birthday" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Wish Someone Birthday
              </h2>
              <p>Who can be that?</p>
            </Link>
            <Link href="/pages/calculator" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Calculator App
              </h2>
              <p>It's a simple calculator..</p>
            </Link>
            <Link href="/pages/dclock" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Digital Clock App
              </h2>
              <p>A simple clock UI..</p>
            </Link>
            <Link href="/pages/randomjokes" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Get a Joke, Now!
              </h2>
              <p>Your daily dose of a joke..</p>
            </Link>
            <Link href="/pages/colorpicker" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Color Picker App
              </h2>
              <p>Pick a color of your liking..</p>
            </Link>
            <Link href="/pages/tipcalculator" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Tip Calculator App
              </h2>
              <p>How much tip do you like to offer?</p>
            </Link>
            <Link href="/pages/genpassword" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Generate Random Password!
              </h2>
              <p>Get a unique password..</p>
            </Link>
            <Link href="/pages/bmicalculator" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                BMI Calculator App!
              </h2>
              <p>Calculate your 'Body Mass Index'..</p>
            </Link>
            <Link href="/pages/unitconverter" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Unit Conversion Tool!
              </h2>
              <p>Convert units into required system!</p>
            </Link>
            <Link href="/pages/htmlviewer" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                HTML Previewer App!
              </h2>
              <p>A little HTML playground for you.</p>
            </Link>
            <Link href="/pages/pomodorotimer" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Pomodoro Timer App
              </h2>
              <p>Work efficiently and don't burn out..</p>
            </Link>
            <Link href="/pages/expensetracker" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Expense Tracker App
              </h2>
              <p>Why not organize your expenses?</p>
            </Link>
            <Link href="/pages/moviesearch" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Movie Search App
              </h2>
              <p>Looking for a movie, use this tool!</p>
            </Link>
            <Link href="/pages/memegenerator" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Meme Generator App
              </h2>
              <p>Generate funny memes. LOL!</p>
            </Link>

            <Link href="/pages/currencyconverter" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Currency Converter App
              </h2>
              <p>Convert different currencies and get exchange rates.</p>
            </Link>
            <Link href="/pages/githubprofilesearch" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                GitHub Profile Viewer
              </h2>
              <p>A small widget that shows profiles from Github..</p>
            </Link>
            <Link href="/pages/notesapp" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Generic Notes App
              </h2>
              <p>Make some notes for quick reminders!</p>
            </Link>
            <Link href="/pages/recipesearch" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
                Recipe Finder App
              </h2>
              <p>Find a perfect recipe for your cooking plan..</p>
            </Link>
            <Link href="/pages/wordcounter" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Word Counter App
              </h2>
              <p>Count word in a sentense or in an essay!</p>
            </Link>
            <Link href="/pages/imageslider" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Image Slider App
              </h2>
              <p>View images in a slider!</p>
            </Link>
            <Link href="/pages/quizapp" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Quiz App
              </h2>
              <p>Test your knowledge!</p>
            </Link>
            <Link href="/pages/stopwatch" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Stop Watch App
              </h2>
              <p>Count your priceless time!</p>
            </Link>
            <Link href="/pages/snakegame" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Snake Game
              </h2>
              <p>Can you beat the snake?</p>
            </Link>
            <Link href="/pages/urlshortener" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              URL Shortener App
              </h2>
              <p>Shorten long URLs into tiny bits..</p>
            </Link>
            <Link href="/pages/todolistpage" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Todo List Builder
              </h2>
              <p>Note down import task with ease!</p>
            </Link>
            <Link href="/pages/randomusergen" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Generate Random User
              </h2>
              <p>Create a random user for any app!</p>
            </Link>
            <Link href="/pages/audioplayerapp" className={styles.card}>
              <h2 className="underline underline-offset-2 font-medium mb-2">
              Audio Player App
              </h2>
              <p>Listen to music with ease!</p>
            </Link>

            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
