import React, { useState, useEffect } from "react";

const CardDetails = props => {
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    setCardInfo(
      props.userPhotos.filter(function(photo) {
        return photo.id === props.match.params.id;
      })
    );
  }, []);
  console.log(cardInfo);
  console.log(props.userPhotos);
  console.log(props.match.params.id);

  return <div></div>;
};

export default CardDetails;
