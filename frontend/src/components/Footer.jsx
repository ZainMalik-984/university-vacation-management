const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-900 text-white py-3 z-50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
        <p className="opacity-80">&copy; {new Date().getFullYear()} Univerty of tech. All rights reserved.</p>
        <p className="opacity-60">Built by ❤️ Zahid Yasin</p>
      </div>
    </footer>
  );
};

export default Footer;
