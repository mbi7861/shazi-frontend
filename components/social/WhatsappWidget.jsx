"use client";

import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { assets } from "@/assets/assets";

const WhatsappWidget = ({
  phoneNumber,
  accountName = "Dilawar Traders",
  statusMessage = "Active 24/7",
  chatMessage = "Hi! How can we help?",
  placeholder = "Type a message...",
  allowClickAway = false,
  allowEsc = true,
  notification = true,
  notificationSound = true,
  darkMode = false,
  className,
  delay = 3000, // default 3 seconds
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!phoneNumber) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [phoneNumber, delay]);

  if (!phoneNumber || !show) {
    return null;
  }

  return (
    <div className={className}>
      <FloatingWhatsApp
        phoneNumber={phoneNumber}
        accountName={accountName}
        avatar={assets.logo?.src}
        statusMessage={statusMessage}
        chatMessage={chatMessage}
        placeholder={placeholder}
        allowClickAway={allowClickAway}
        allowEsc={allowEsc}
        notification={notification}
        notificationSound={notificationSound}
        darkMode={darkMode}
      />
    </div>
  );
};

export default WhatsappWidget;
