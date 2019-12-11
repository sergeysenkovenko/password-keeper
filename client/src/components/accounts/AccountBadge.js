import React from "react";

const AccountBadge = ({ date }) => {
  const badgeDate = new Date() - Date.parse(date);

  const calcTime = duration => {
    let minutes = Math.floor(duration / (1000 * 60)),
        hours = Math.floor(duration / (1000 * 60 * 60)),
        days = Math.floor(duration / (1000 * 60 * 60 * 24));

    if (minutes === 0) {
      return `less than a minute`;
    }

    if (hours === 0) {
      return `${minutes} ${minutes < 2 ? "minute" : "minutes"}`;
    }

    if (days === 0) {
      return `${hours} ${hours < 2 ? "hour" : "hours"}`;
    }
    return `${days} ${days < 2 ? "day" : "days"}`;
  };

  return (
    <span className={"badge badge-success"}>{`${calcTime(badgeDate)} ago`}</span>
  );
};

export default AccountBadge;
