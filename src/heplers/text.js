import React from 'react';

export const lbToBr = (text) => {
  return text
    .split(/(\n)/g)
    .map((line, index) =>
      line === '\n' ? (
        <br key={index} />
      ) : (
        <React.Fragment key={index}>{line}</React.Fragment>
      )
    );
};