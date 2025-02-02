"use client";

import React from "react";
import styles from "@/app/page.module.css"; // ✅ Import global styles

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className={styles.main}>
      <h1>Welcome to Shadow Draft</h1>
      <button
        className={`${styles.button} ${styles.primary}`}
        onClick={onStart}>
        Start Game
      </button>
    </div>
  );
};

export default IntroScreen;
