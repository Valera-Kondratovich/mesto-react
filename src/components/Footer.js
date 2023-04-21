import React from "react";
const date = new Date();
function Footer() {
  return (
    <footer className="footer">
      <p>© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
