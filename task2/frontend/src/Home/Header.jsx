import React from 'react';

export default function Header(props) {
  return (
    <header {...props}>
      <div className="header-content">
        <h1>
          <a>
            <span>wallet</span>
          </a>
          <span>transaction</span>
        </h1>
      </div>
    </header>
  );
}
