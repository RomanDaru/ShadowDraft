// app/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css"; // Use a custom CSS file for the home page styles

const HomePage = () => {
  // Handle client-specific logic after the page has been hydrated
  useEffect(() => {
    // Make sure window.close is only called on the client-side
    const handleExit = () => {
      if (typeof window !== "undefined") {
        window.close(); // Only close the window on the client-side
      }
    };

    // Attach the exit functionality to the button
    const exitButton = document.getElementById("exitButton");
    if (exitButton) {
      exitButton.addEventListener("click", handleExit);
    }

    // Cleanup the event listener
    return () => {
      if (exitButton) {
        exitButton.removeEventListener("click", handleExit);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className={styles.homePage}>
      <p className={styles.description}>
        Enter a dark and dangerous world filled with peril and ancient
        treasures. Your journey begins now. Will you survive the Shadow Draft?
      </p>

      <div className={styles.menu}>
        <Link href='/draft' className={styles.menuButton}>
          Start Draft
        </Link>
        <Link href='/instructions' className={styles.menuButton}>
          View Instructions
        </Link>
        <button id='exitButton' className={styles.menuButton}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default HomePage;
