import React from 'react'

const Footer = () => {
  return (
<footer className="fixed bottom-0 left-0 w-full footer footer-center bg-base-300 text-base-content p-2 sm:p-4 z-50">
  <aside>
    <p className="text-[10px] sm:text-xs md:text-sm">
      <span className="hidden sm:inline">Copyright © {new Date().getFullYear()} devTinder – </span>Connecting Developers Worldwide ❤️ <span className="hidden md:inline">Made with 💻 by developers, for developers</span>
    </p>
  </aside>
</footer>


)
}

export default Footer