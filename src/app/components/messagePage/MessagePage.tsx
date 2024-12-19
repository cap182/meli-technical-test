import React from "react";
import styles from "./styles.module.css";


interface MessagePageProps {
  message: string;
}

const MessagePage= ({ message }:MessagePageProps) => {
  return (
    <div className={styles.container}>
      {message}
    </div>
  );
};

export default MessagePage;
